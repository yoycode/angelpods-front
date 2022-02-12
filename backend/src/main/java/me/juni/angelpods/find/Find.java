package me.juni.angelpods.find;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Find {

	@Id @GeneratedValue
	private Long id;
	private String mCategory;
	private String sCategory;
	private String lat;
	private String lng;
	private String title;
	private String desc;
	private String iName;
	private LocalDateTime getTime;
	private String getLoc;
//	private Array<Image> images;
	private String phone;
	private LocalDateTime createdAt;
	private LocalDateTime lastUpdatedAt;
}
