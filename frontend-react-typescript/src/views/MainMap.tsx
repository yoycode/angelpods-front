import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import SearchWindow from '../components/main/SearchWindow';
import EachPost from '../components/main/EachPost';
import ModalFind from '../components/main/ModalFind';

import '../css/test.css';

const MainMap = () => {

  // 모달창
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 카카오맵 렌더링
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);
    const overlay = `<div>This is overlay</div>`
    var position = new window.kakao.maps.LatLng(33.450701, 126.570667);
    // 커스텀 오버레이를 생성합니다
    var customOverlay = new window.kakao.maps.CustomOverlay({
      position: position,
      content: overlay
    });

    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);
  }, []); // created

  return (
    <div id="map" style={{ width: "100vw", height: "calc(100vh - 70px)" }}>
      {
        !open
          ? <div className="overMap">
            <Stack direction="row" justifyContent="flex-end" alignItems="baseline" spacing={1}>
              <SearchWindow />
              <Button onClick={handleOpen} variant="contained" className="btn-write" >발견했어요</Button>
              <Button onClick={handleOpen} variant="contained" className="btn-write" >찾아주세요</Button>
            </Stack>

            <Stack className="posts" direction="row" justifyContent="flex-start" alignItems="flex-end" spacing={2}>
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
              <EachPost />
            </Stack>
          </div>
          : <ModalFind open={open} handleClose={handleClose} />
      }
    </div >
  );
};

export default MainMap;