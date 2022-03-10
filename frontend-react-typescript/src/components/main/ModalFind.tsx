import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AttachEmailRounded } from '@mui/icons-material';

import '../../css/test.css';
import fakeCategory from '../../assets/fakeCategory';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const postItem = () => {

}


const ModalFind = (props: any) => { //TODO : 타입 바꿔주기

  const [userID, setUserID] = useState('');
  const [mCategory, setMCategory] = useState('');
  const [sCategory, setSCategory] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [iName, setIName] = useState('');
  const [getTime, setGetTime] = useState('');
  const [getLoc, setGetLoc] = useState('');
  const [images, setImages] = useState('');
  const [phone, setPhone] = useState('');
  const [map, setMap] = useState(false);

  const [mCateList, setMCateList] = useState<string[]>([]);
  const [sCateList, setSCateList] = useState<string[]>([]);

  const form = {
    userID,
    mCategory,
    sCategory,
    title,
    desc,
    iName,
    getTime,
    getLoc,
    images,
    phone
  }

  useEffect(() => {
    const m = fakeCategory.map(x => x.mCategory)
    setMCateList(m)
  }, [fakeCategory])

  useEffect(() => {
    if (mCategory) {
      //TODO 여기 로직바꾸기
      const s = fakeCategory.filter(x => {
        return x.mCategory === mCategory
      })
      setSCateList(s[0].sCategory)
    }
  }, [mCategory])

  const changeMCate = (event: SelectChangeEvent) => {
    setMCategory(event.target.value as string);
  };
  const changeSCate = (event: SelectChangeEvent) => {
    setSCategory(event.target.value as string);
  };

  const loadMap = () => {
    setMap(true)
    const container = document.getElementById('modalMap');
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
  }


  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2" >
            발견했을까요 잃어버렸을까요
          </Typography>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Select label="mCate" onChange={changeMCate} size="small" required >
              {
                mCateList.map((cate, idx) => (
                  <MenuItem value={cate} key={idx}>{cate}</MenuItem>
                ))
              }
            </Select>
            <Select label="sCate" onChange={changeSCate} size="small" required >
              {
                sCateList.map((cate, idx) => (
                  <MenuItem value={cate} key={idx}>{cate}</MenuItem>
                ))
              }
            </Select>
            {/* <TextField onChange={e => setMCategory(e.)(e.target.value)} name="user_id" label="대분류" variant="outlined" size="small" required /> */}
            {/* <TextField onChange={e => setSCategory(e.target.value)} label="소분류" variant="outlined" size="small" /> */}
            <TextField onChange={e => setIName(e.target.value)} label="아이템명" variant="outlined" size="small" required />
          </Stack>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            여기는 state : {mCategory} {sCategory} {iName}
          </Stack>

          <Stack direction="row" justifyContent="flex-start" spacing={1} style={{ overflowX: 'scroll' }}>
            <div style={{ minWidth: '85px', height: '85px', backgroundColor: 'lightgrey' }}></div>
            <div style={{ minWidth: '85px', height: '85px', backgroundColor: 'lightgrey' }}>img</div>
            <div style={{ minWidth: '85px', height: '85px', backgroundColor: 'lightgrey' }}>img</div>
            <div style={{ minWidth: '85px', height: '85px', backgroundColor: 'lightgrey' }}>img</div>
            <div style={{ minWidth: '85px', height: '85px', backgroundColor: 'lightgrey' }}>img</div>
          </Stack>
          <TextField label="제목" variant="outlined" size="small" required />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="흠..."
            style={{ width: '100%', height: '100px' }}
          />
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <TextField label="이걸 누르면!!*" variant="outlined" size="small" onClick={loadMap} />
            <TextField label="습득일시" variant="outlined" size="small" />
            <TextField label="연락처" variant="outlined" size="small" />
          </Stack>
          {
            map
              ? <div id="modalMap" style={{ width: "100%", height: "300px" }}></div>
              : null
          }
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            form : mCategory{form.mCategory} sCategory{form.sCategory} iName{form.iName}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={props.handleClose}>취소</Button>
            <Button onClick={postItem}>등록</Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalFind;