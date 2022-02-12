package me.juni.angelpods.find;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import me.juni.angelpods.find.dto.FindCreateDto;

@Controller
@RequestMapping("/api/find")
public class FindController {

	@PostMapping
	public ResponseEntity<?> create(@RequestBody FindCreateDto dto){
		return ResponseEntity.created(null).build(); 
	}
}
