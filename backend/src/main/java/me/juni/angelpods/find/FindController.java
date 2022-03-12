package me.juni.angelpods.find;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import me.juni.angelpods.find.dto.FindCreateDto;

@CrossOrigin
@Controller
@RequestMapping("/api/find")
public class FindController {

	@Autowired private FindRepository findRepository;
	
	@PostMapping
	public ResponseEntity<?> create(@Valid @RequestBody FindCreateDto dto, Errors errors){
		if (errors.hasErrors()) {
			return ResponseEntity.badRequest().body(null);
		}
		Find newFind = dto.createFind();
		Find savedFind = findRepository.save(newFind);
		
		return ResponseEntity.created(null).body(savedFind); 
	}
	
	@GetMapping
	public ResponseEntity<?> getFindPage(Pageable pageable){
		Page<Find> finded = findRepository.findAll(pageable);
		return ResponseEntity.ok(finded);
	}
}
