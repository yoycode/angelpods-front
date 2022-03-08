package me.juni.angelpods.find;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@EqualsAndHashCode(of = "id")
@Getter 
@Setter 
@Builder 
@NoArgsConstructor 
@AllArgsConstructor
public class Find {

	@Id @GeneratedValue
	private Long id;
	private String mCategory;
	private String sCategory;
	private String lat;
	private String lng;
	private String title;
	private String description;
	private String iName;
	private LocalDateTime getTime;
	private String getLoc;
	private String phone;
	private LocalDateTime createdAt;
	private LocalDateTime lastUpdatedAt;
	
}
