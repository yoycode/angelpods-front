package me.juni.angelpods.find.dto;

import java.time.LocalDateTime;


public class FindPageElementDto {

	private String boardId;
	private String userId;
	private String mCategory;
	private String sCategory;
	private String lat;
	private String lng;
	private String title;
	private String desc;
	private String iName;
	private LocalDateTime getTime;
	private String getLoc;
	//private Array<Image> images;
	public String getBoardId() {
		return boardId;
	}
	public void setBoardId(String boardId) {
		this.boardId = boardId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
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
	
}
