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
	private String description;
	private String iName;
	private LocalDateTime getTime;
	private String getLoc;
//	private Array<Image> images;
	private String phone;
	private LocalDateTime createdAt;
	private LocalDateTime lastUpdatedAt;
	
	public Find() {
	}
	
	public Find(Long id, String mCategory, String sCategory, String lat, String lng, String title, String description,
			String iName, LocalDateTime getTime, String getLoc, String phone, LocalDateTime createdAt,
			LocalDateTime lastUpdatedAt) {
		this.id = id;
		this.mCategory = mCategory;
		this.sCategory = sCategory;
		this.lat = lat;
		this.lng = lng;
		this.title = title;
		this.description = description;
		this.iName = iName;
		this.getTime = getTime;
		this.getLoc = getLoc;
		this.phone = phone;
		this.createdAt = createdAt;
		this.lastUpdatedAt = lastUpdatedAt;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getmCategory() {
		return mCategory;
	}
	public void setmCategory(String mCategory) {
		this.mCategory = mCategory;
	}
	public String getsCategory() {
		return sCategory;
	}
	public void setsCategory(String sCategory) {
		this.sCategory = sCategory;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLng() {
		return lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getiName() {
		return iName;
	}
	public void setiName(String iName) {
		this.iName = iName;
	}
	public LocalDateTime getGetTime() {
		return getTime;
	}
	public void setGetTime(LocalDateTime getTime) {
		this.getTime = getTime;
	}
	public String getGetLoc() {
		return getLoc;
	}
	public void setGetLoc(String getLoc) {
		this.getLoc = getLoc;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public LocalDateTime getLastUpdatedAt() {
		return lastUpdatedAt;
	}
	public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) {
		this.lastUpdatedAt = lastUpdatedAt;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}
