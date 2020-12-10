package com.polito.bookingsystem.controller;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.polito.bookingsystem.dto.BookingDto;
import com.polito.bookingsystem.dto.LectureDto;
import com.polito.bookingsystem.dto.ManagerDto;
import com.polito.bookingsystem.dto.ProfessorDto;
import com.polito.bookingsystem.dto.StudentDto;
import com.polito.bookingsystem.service.BookingService;
import com.polito.bookingsystem.service.LectureService;
import com.polito.bookingsystem.service.ManagerService;
import com.polito.bookingsystem.service.NotificationProfessorService;
import com.polito.bookingsystem.service.NotificationStudentService;
import com.polito.bookingsystem.service.ProfessorService;
import com.polito.bookingsystem.service.StudentService;
import com.polito.bookingsystem.utils.BookingEntry;
import com.polito.bookingsystem.utils.BookingInfo;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", maxAge= 3000)
@RestController
public class HomeController {
	private static final String PASSWORD = "password";
	private static final String USERNAME = "username";
	
	@Autowired
	StudentService studentService;
	
	@Autowired
	BookingService bookingService;
	
	@Autowired
	LectureService lectureService;
	
	@Autowired
	ProfessorService professorService;
	
	@Autowired
	NotificationStudentService notificationStudentService;
	
	@Autowired
	ManagerService managerService;
	
	
	@Autowired
	NotificationProfessorService notificationProfessorService;
	
	
	@GetMapping(value="studentinfo/{email}")
	public StudentDto getStudentInfo(@PathVariable String email) {
        return studentService.getStudent(email);
	}
	
	@GetMapping(value="studentbookings/{email}")
	public List<BookingDto> getStudentBookings(@PathVariable String email) {
        return bookingService.getListBooking(email);
	}
	
	@GetMapping(value="studentlectures/{email}")
	public List<LectureDto> getStudentLectures(@PathVariable String email) {
		List<BookingDto> bookingList=bookingService.getListBooking(email);
		List<Integer> ids=bookingList.stream().map(b->b.getLectureDto().getLectureId()).collect(Collectors.toList());
		return lectureService.getListLectures(email).stream().filter(l->{
			for(Integer id: ids) {
				if(l.getLectureId().equals(id)) {
					return false;
				}
			}
			return true;
		})
		.filter(l -> !l.getDeleted())
		.collect(Collectors.toList());
	}
	
	@PostMapping(value = "addbooking", headers="Content-Type=application/json")
    @ResponseBody
	public BookingDto addBooking(@RequestBody Map<String, String> lectureId) {
		 Integer lectId=Integer.parseInt(lectureId.get("lectureId"));
         return bookingService.addBooking(lectId, lectureId.get("email"));
	}
	
	
	@DeleteMapping(value="deletebooking/{bookingId}")
	public Boolean deleteStudentBookings(@PathVariable String bookingId) {
		Integer bookingid=Integer.parseInt(bookingId);
        return bookingService.deleteBooking(bookingid);
	}
	
	
	@PostMapping(value= "studentlogin")
	public String login(@RequestBody Map<String, String> userPass) {
			String email= studentService.login(userPass.get(USERNAME), userPass.get(PASSWORD));
			if(email!=null) {
				return email;
			}
			return "";
	}
	
	@PostMapping(value= "professorlogin")
	public String loginProf(@RequestBody Map<String, String> userPass) {
			String email= professorService.login(userPass.get(USERNAME), userPass.get(PASSWORD));
			if(email!=null) {
				return email;
			}
			return "";
	}
	
	@PostMapping(value= "managerlogin")
	public String loginManager(@RequestBody Map<String, String> userPass) {
		String email = managerService.login(userPass.get(USERNAME), userPass.get(PASSWORD));
		
		if(email != null) return email;
		
		return "";
	}
	
	@PutMapping(value = "lecture/toremote/{id}")
	public boolean lectureToRemote(@PathVariable Integer id) {
		LectureDto lectureDto = lectureService.getLectureById(id);
		
		if(lectureDto == null)
			return false;
		
		Date date = new Date();  
		
		long diffInMillies = lectureDto.getDate().getTime() - date.getTime();
		long diffInMinutes = TimeUnit.MINUTES.convert(diffInMillies,TimeUnit.MILLISECONDS);
		if(diffInMinutes>30) {
			lectureDto.setRemotly(true);
			lectureService.save(lectureDto);
			List<BookingDto> bookingDtos = bookingService.getBookingsByLecture(lectureDto);
			for (BookingDto bookingDto : bookingDtos) {
				if(bookingDto.getBookingInfo()==BookingInfo.CANCELED_BY_STUD) {
					continue;
				}
				bookingDto.setBookingInfo(BookingInfo.MOVED_AS_REMOTLY);
				bookingService.save(bookingDto);
			}
			return true;
		}
		return false;
	} 


	
	
	@GetMapping(value= "professorbookings/{email}")
	public List<BookingEntry> getBooking(@PathVariable String email) {
			return bookingService.getBooking(email);
	}
	
	@GetMapping(value="professorinfo/{email}")
	public ProfessorDto getProfessorInfo(@PathVariable String email) {
        return professorService.getProfessor(email);
	}
	
	@GetMapping(value="professorlectures/{email}")
	public List<LectureDto> getProfessorLectures(@PathVariable String email){
		return lectureService.getProfessorLectures(email);
	}
	
	@GetMapping(value="listbookings")
	public List<BookingDto> getAllBookings() {
        return bookingService.getListAllBookings();
	}
	
	@GetMapping(value="listlectures")
	public List<LectureDto> getAllLectures() {
        return lectureService.getListAllLectures();
	}
	
	@DeleteMapping(value="professor/deletelecture/{lectureId}")
	public Boolean deleteLecture(@PathVariable Integer lectureId) {
        return lectureService.deleteLecture(lectureId);
	}
	
	
	@GetMapping(value = "managerinfo/{email}")
	public ManagerDto getManagerInfo(@PathVariable String email) {
		return managerService.getManager(email);
	}
	
	@PutMapping(value = "lecture/{lectureId}/attendance")
	public Boolean attendance(@RequestBody Map<String, List<Integer>> studentsList, @PathVariable Integer lectureId) {
		List<Integer> students = studentsList.get("studentIds");
		BookingDto bookingDto;
		
		for(Integer id : students) {
			bookingDto = bookingService.getByLectureAndStudent(lectureId, id);
			if(bookingDto == null) return false;
			
			bookingDto.setBookingInfo(BookingInfo.ATTENDED);
		}
		
		return true;
	}
}
