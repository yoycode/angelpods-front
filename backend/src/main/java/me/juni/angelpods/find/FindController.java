package me.juni.angelpods.find;
import java.time.LocalDateTime;

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
		Find newFind = createFind(dto);
		Find savedFind = findRepository.save(newFind);
		
		return ResponseEntity.created(null).body(savedFind); 
	}
	
	@GetMapping
	public ResponseEntity<?> getFindPage(Pageable pageable){
		Page<Find> finded = findRepository.findAll(pageable);
		return ResponseEntity.ok(finded);
	}

	private Find createFind(FindCreateDto dto) {
		Find find = new Find();
		find.setMCategory(dto.getmCategory());
		find.setSCategory(dto.getsCategory());
		find.setLat(dto.getLat());
		find.setLng(dto.getLng());
		find.setTitle(dto.getTitle());
		find.setDescription(dto.getDesc());
		find.setIName(dto.getiName());
		find.setGetTime(dto.getGetTime());
		find.setGetLoc(dto.getGetLoc());
		find.setPhone(dto.getPhone());
		find.setCreatedAt(LocalDateTime.now());
		find.setLastUpdatedAt(LocalDateTime.now());
		return find;
	}
}
