import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
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
  // 레이아웃
  const [layout, setLayout] = useState(0);
  const [searchString, setSearchString] = useState('');
  useEffect(() => {

  }, [searchString])

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
  }, []);

  return (
    <div id="map" style={{ width: "100vw", height: "calc(100vh - 70px)" }}>
      {
        (() => {
          if (layout === 0) {
            return (
              <Stack direction="column" justifyContent="space-between" className="overMap">
                <Stack direction="row-reverse" justifyContent="flex-end" alignItems="baseline" flexWrap="wrap" spacing={1}>
                  <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto' }}>
                    <Button onClick={() => setLayout(1)} variant="contained" className="btn-write" >발견했어요</Button>
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
              <ModalFind layout={layout} setLayout={setLayout} setSearchString={setSearchString} handleClose={() => { setLayout(0) }} />
            )
          } else if (layout === 2) {
            return (
              <Stack direction="column" className="overMap">
                <Stack direction="row" spacing={1}>
                  <Paper component="form" sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'flex-start', flexGrow: '2', padding: '0' }}>
                    <IconButton aria-label="menu">
                      <MenuIcon sx={{ fontSize: "45px" }} />
                    </IconButton>
                    <InputBase
                      value={searchString} autoFocus
                      onChange={e => setSearchString(e.target.value)}
                      placeholder="Search Google Maps"
                      inputProps={{ 'aria-label': 'search google maps' }}
                      sx={{ ml: 1, flex: 1 }}
                    />
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon sx={{ fontSize: "45px" }} />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" aria-label="directions">
                      <DirectionsIcon sx={{ fontSize: "45px" }} />
                    </IconButton>
                  </Paper>
                  <Paper elevation={5} className="searchWindow"></Paper>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ marginTop: 'auto' }}>
                  <Button onClick={() => { setLayout(1) }} variant="contained">돌아가기</Button>
                  <Button onClick={() => { setLayout(1) }} variant="contained">확인</Button>
                </Stack>
              </Stack>
            )
          }
        })()
      }
    </div >
  );
};

export default MainMap;