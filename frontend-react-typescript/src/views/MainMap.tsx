import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


import SearchWindow from '../components/main/SearchWindow';
import EachPost from '../components/main/EachPost';
import ModalFind from '../components/main/ModalFind';
import '../css/test.css';

const MainMap = () => {
  const container = useRef(null);
  const infoDiv = useRef(null);
  const menu_wrap = useRef(null);
  const [layout, setLayout] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [latLng, setLatLng] = useState('');
  const [getLoc, setGetLoc] = useState('');
  const [keyword, setKeyword] = useState('');

  // let searchPlaces;
  // window.kakao.maps.load(() => {
  //   // 마커를 담을 배열입니다
  //   var markers: any[] = [];

  //   var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
  //     mapOption = {
  //       center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
  //       level: 3 // 지도의 확대 레벨
  //     };

  //   // 지도를 생성합니다    
  //   var map = new window.kakao.maps.Map(mapContainer, mapOption);

  //   // 장소 검색 객체를 생성합니다
  //   var ps = new window.kakao.maps.services.Places();

  //   // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  //   var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
  //   searchPlaces = () => {

  //     if (!keyword.replace(/^\s+|\s+$/g, '')) {
  //       alert('키워드를 입력해주세요!');
  //       return false;
  //     }

  //     // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  //     ps.keywordSearch(keyword, placesSearchCB);
  //   }

  //   // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  //   function placesSearchCB(data: any, status: any, pagination: any) {
  //     if (status === window.kakao.maps.services.Status.OK) {

  //       // 정상적으로 검색이 완료됐으면
  //       // 검색 목록과 마커를 표출합니다
  //       displayPlaces(data);

  //       // 페이지 번호를 표출합니다
  //       // displayPagination(pagination);

  //     } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {

  //       alert('검색 결과가 존재하지 않습니다.');
  //       // return;

  //     } else if (status === window.kakao.maps.services.Status.ERROR) {

  //       alert('검색 결과 중 오류가 발생했습니다.');
  //       // return;

  //     }
  //   }

  //   // 검색 결과 목록과 마커를 표출하는 함수입니다
  //   function displayPlaces(places: any) {

  //     var listEl = document.getElementById('placesList'),
  //       menuEl = document.getElementById('menu_wrap'),
  //       fragment = document.createDocumentFragment(),
  //       bounds = new window.kakao.maps.LatLngBounds(),
  //       listStr = '';

  //     // 검색 결과 목록에 추가된 항목들을 제거합니다
  //     removeAllChildNods(listEl);

  //     // 지도에 표시되고 있는 마커를 제거합니다
  //     removeMarker();

  //     for (var i = 0; i < places.length; i++) {

  //       // 마커를 생성하고 지도에 표시합니다
  //       var placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x),
  //         marker = addMarker(placePosition, i, null),
  //         itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       bounds.extend(placePosition);

  //       // 마커와 검색결과 항목에 mouseover 했을때
  //       // 해당 장소에 인포윈도우에 장소명을 표시합니다
  //       // mouseout 했을 때는 인포윈도우를 닫습니다
  //       (function (marker, title) {
  //         window.kakao.maps.event.addListener(marker, 'mouseover', function () {
  //           displayInfowindow(marker, title);
  //         });

  //         window.kakao.maps.event.addListener(marker, 'mouseout', function () {
  //           infowindow.close();
  //         });

  //         itemEl.onmouseover = function () {
  //           displayInfowindow(marker, title);
  //         };

  //         itemEl.onmouseout = function () {
  //           infowindow.close();
  //         };
  //       })(marker, places[i].place_name);

  //       fragment.appendChild(itemEl);
  //     }
  //     console.log("listEl", listEl, fragment)
  //     // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
  //     // listEl.appendChild(fragment);
  //     // menuEl.scrollTop = 0;

  //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //     map.setBounds(bounds);
  //   }
  //   // 검색결과 항목을 Element로 반환하는 함수입니다
  //   function getListItem(index: any, places: any) {

  //     var el = document.createElement('li'),
  //       itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
  //         '<div class="info">' +
  //         '   <h5>' + places.place_name + '</h5>';

  //     if (places.road_address_name) {
  //       itemStr += '    <span>' + places.road_address_name + '</span>' +
  //         '   <span class="jibun gray">' + places.address_name + '</span>';
  //     } else {
  //       itemStr += '    <span>' + places.address_name + '</span>';
  //     }

  //     itemStr += '  <span class="tel">' + places.phone + '</span>' +
  //       '</div>';

  //     el.innerHTML = itemStr;
  //     el.className = 'item';

  //     return el;
  //   }

  //   // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  //   function addMarker(position: any, idx: any, title: any) {
  //     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
  //       imageSize = new window.kakao.maps.Size(36, 37),  // 마커 이미지의 크기
  //       imgOptions = {
  //         spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
  //         spriteOrigin: new window.kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
  //         offset: new window.kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  //       },
  //       markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
  //       marker = new window.kakao.maps.Marker({
  //         position: position, // 마커의 위치
  //         image: markerImage
  //       });

  //     marker.setMap(map); // 지도 위에 마커를 표출합니다
  //     markers.push(marker);  // 배열에 생성된 마커를 추가합니다

  //     return marker;
  //   }

  //   // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  //   function removeMarker() {
  //     for (var i = 0; i < markers.length; i++) {
  //       markers[i].setMap(null);
  //     }
  //     markers = [];
  //   }

  //   // // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  //   // function displayPagination(pagination: any) {
  //   //   var paginationEl = pagination,
  //   //     fragment = document.createDocumentFragment(),
  //   //     i;

  //   //   // 기존에 추가된 페이지번호를 삭제합니다
  //   //   while (paginationEl.hasChildNodes()) {
  //   //     paginationEl.removeChild(paginationEl.lastChild);
  //   //   }

  //   //   for (i = 1; i <= pagination.last; i++) {
  //   //     var el = document.createElement('a');
  //   //     el.href = "#";
  //   //     el.innerHTML = i;

  //   //     if (i === pagination.current) {
  //   //       el.className = 'on';
  //   //     } else {
  //   //       el.onclick = (function (i) {
  //   //         return function () {
  //   //           pagination.gotoPage(i);
  //   //         }
  //   //       })(i);
  //   //     }

  //   //     fragment.appendChild(el);
  //   //   }
  //   //   paginationEl.appendChild(fragment);
  //   // }

  //   // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  //   // 인포윈도우에 장소명을 표시합니다
  //   function displayInfowindow(marker: any, title: any) {
  //     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

  //     infowindow.setContent(content);
  //     infowindow.open(map, marker);
  //   }

  //   // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  //   function removeAllChildNods(el: any) {
  //     while (el.hasChildNodes()) {
  //       el.removeChild(el.lastChild);
  //     }
  //   }
  // })


  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  function displayCenterInfo(result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      // var infoDiv = document.getElementById('centerAddr');

      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === 'H') {
          setSearchString(result[i].address_name)
          // infoDiv.innerHTML = result[i].address_name;
          break;
        }
      }
    }
  }
  function test() {
    alert('dd')
  }

  useEffect(() => {

    // 카카오맵 클릭해서 현재 위도경도 얻기
    window.kakao.maps.load(() => {

      function searchAddrFromCoords(coords: any, callback: any) { // 여기 있어야됨 
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
      }

      function searchDetailAddrFromCoords(coords: any, callback: any) { // 여기 있어야됨 
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      const map = new window.kakao.maps.Map(container.current, options);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new window.kakao.maps.services.Geocoder();

      var marker = new window.kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
        infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

      // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);

      if (layout === 2) {
        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
          searchDetailAddrFromCoords(mouseEvent.latLng, function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {

              var detailAddr =
                !!result[0].road_address
                  ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>'
                  : '';
              detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

              var content =
                '<div class="bAddr">' +
                '<span class="title">법정동 주소정보</span>' +
                detailAddr +
                '</div>';

              // 마커를 클릭한 위치에 표시합니다 
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, marker);

              setLatLng(mouseEvent.latLng);
              setGetLoc(result[0].address.address_name);
            }
          });
        });
        // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'idle', function () {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        });

      }
    });
  }, [layout])


  return (
    <>
      <div ref={container} id="map" style={{ width: "100vw", height: "calc(100vh - 70px)" }}>
        {
          (() => {
            if (layout === 0) {
              return (
                <Stack direction="column" justifyContent="space-between" className="overMap">
                  <Stack direction="row-reverse" justifyContent="flex-end" alignItems="baseline" flexWrap="wrap" spacing={1}>
                    <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto' }}>
                      <Button onClick={() => setLayout(2)} variant="contained" className="btn-write" >발견했어요</Button>
                      <Button onClick={() => setLayout(2)} variant="contained" className="btn-write" >찾아주세요</Button>
                    </Stack>
                    <SearchWindow />
                  </Stack>
                  <Stack className="posts" direction="row" justifyContent="flex-start" alignItems="flex-end" spacing={2}>
                    {
                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((post, idx) => {
                        return <EachPost key={idx} />
                      })
                    }
                  </Stack>
                </Stack>
              )
            } else if (layout === 1) {
              return (
                <ModalFind
                  layout={layout}
                  setLayout={setLayout}
                  latLng={latLng}
                  getLoc={getLoc}
                  setSearchString={setSearchString}
                  handleClose={() => { setLayout(0) }} />
              )
            } else if (layout === 2) {
              return (
                <Stack direction="column" className="overMap">
                  <Stack direction="row" spacing={1}>
                    <Paper component="form" sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'flex-start', flexGrow: '2', padding: '0' }}>
                      <div className="hAddr">
                        <span ref={infoDiv}></span>
                      </div>
                      {/* <div ref={menu_wrap} className="bg_white">
                        <div className="option">
                          <div>
                            <form onSubmit="searchPlaces(); return false;">
                            키워드 : <TextField defaultValue={searchString} onChange={e => setKeyword(e.target.value)} />
                            <Button onClick={searchPlaces}>검색하기</Button>
                            </form>
                          </div>
                        </div>
                        <ul id="placesList" ></ul>
                        <div id="pagination"></div>
                      </div> */}

                      <IconButton aria-label="menu">
                        <MenuIcon sx={{ fontSize: "45px" }} />
                      </IconButton>
                      <InputBase
                        value={searchString} autoFocus
                        onChange={e => setSearchString(e.target.value)}
                        placeholder="검색"
                        inputProps={{ 'aria-label': '검색' }}
                        sx={{ ml: 1, flex: 1 }}
                      />
                      <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
                      <IconButton type="submit" aria-label="search">
                        <SearchIcon sx={{ fontSize: "45px" }} />
                      </IconButton>
                    </Paper>
                    <Paper elevation={5} className="searchWindow" id="placesList"></Paper>
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ marginTop: 'auto' }}>
                    <Button onClick={() => { setLayout(0) }} variant="contained" size="large">돌아가기</Button>
                    <Button onClick={() => { setLayout(1) }} variant="contained" size="large">확인</Button>
                  </Stack>
                </Stack>
              )
            }
          })()
        }
      </div>
    </>
  );
};

export default MainMap;