package me.juni.angelpods.find;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import me.juni.angelpods.find.dto.FindCreateDto;

@Controller("/api/lost")
public class FindController {

	@PostMapping
	public ResponseEntity<?> create(FindCreateDto dto){
		
		return null; 
	}
}
