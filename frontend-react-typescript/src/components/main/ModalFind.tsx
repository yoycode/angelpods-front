import React, { useState, useEffect } from 'react';
import axios from 'axios'

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
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';

import '../../css/test.css';
import fakeCategory from '../../assets/fakeCategory';

const moment = require('moment');
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



const ModalFind = (props: any) => { //TODO props type 확정되면 interface 넣기
  const [userID, setUserID] = useState<string>('yoy');
  const [mCategory, setMCategory] = useState<string>(''); //TODO key: value값으로 바꿔야할지 생각해보기
  const [sCategory, setSCategory] = useState<string>('');
  const [lat, setLat] = useState<Number>(0);
  const [lng, setLng] = useState<Number>(0);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string | null>(null);
  const [iName, setIName] = useState<string>('');
  const [getTime, setGetTime] = useState(moment);  //TODO type 생각해보기
  const [getLoc, setGetLoc] = useState<string>('');
  const [images, setImages] = useState(''); //TODO type 추가해주기
  const [phone, setPhone] = useState<string>('');

  const [mCateList, setMCateList] = useState<string[]>([]);
  const [sCateList, setSCateList] = useState<string[]>([]);
  const formParam = {
    userID,
    mCategory,
    sCategory,
    lat,
    lng,
    title,
    desc,
    iName,
    getTime,
    getLoc,
    images,
    phone
  }
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (props.layout === 1) {  // 모달창 켜지면
      setOpen(true);
      if (props.getLoc) {
        setLat(props.latLng.La);
        setLng(props.latLng.Ma);
        setGetLoc(props.getLoc)
      }
    }
  }, [props.layout])

  useEffect(() => {
    const m = fakeCategory.map(x => x.mCategory)
    setMCateList(['대분류 선택', ...m])
    setSCateList(['소분류 선택', ...sCateList])
  }, [fakeCategory])

  useEffect(() => {
    if (mCategory) {
      const matchedSList = fakeCategory.filter(x => {
        return x.mCategory === mCategory
      })
      setSCateList(matchedSList[0].sCategory)
      setSCategory(matchedSList[0].sCategory[0])
    }
  }, [mCategory])

  const changeMCate = (event: SelectChangeEvent) => {
    setMCategory(event.target.value as string);
  };
  const changeSCate = (event: SelectChangeEvent) => {
    setSCategory(event.target.value as string);
  };

  const postItem = async () => {
    console.log(formParam)
    const validation = true;
    if (validation) {
      axios.post('localhost:8080/api/find')
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
        })

    }
    props.setLayout(0)
  }



  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2" >
            발견했을까요 잃어버렸을까요
          </Typography>
          <TextField onFocus={() => { props.setLayout(2) }} value={getLoc} helperText={`( 위도: ${lat} , 경도: ${lng} )`} label="습득장소" variant="outlined" size="small" required />
          <Stack direction="row" justifyContent="" spacing={1}>
            <FormControl fullWidth>
              <InputLabel focused id="mCate">대분류</InputLabel>
              <Select labelId="mCate" defaultValue={'대분류 선택'} onChange={changeMCate} size="small" required >
                {
                  mCateList.map((cate, idx) => (
                    <MenuItem value={cate} key={idx}>{cate}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="sCate">소분류</InputLabel>
              <Select labelId="sCate" defaultValue={'소분류 선택'} onChange={changeSCate} size="small" required >
                {
                  sCateList.map((cate, idx) => (
                    <MenuItem value={cate} key={idx}>{cate}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Stack>
          <TextField onChange={e => setIName(e.target.value)} label="아이템명" variant="outlined" size="small" required />

          <Stack direction="row" justifyContent="flex-start" spacing={1} style={{ overflowX: 'scroll' }}>
            {
              [1, 2, 3, 4, 5].map((img, idx) => {
                return <div key={idx} style={{ minWidth: '85px', height: '85px', backgroundColor: 'lightgrey' }}>test{img}</div>
              })
            }

          </Stack>
          <TextField onChange={e => setTitle(e.target.value)} label="제목" variant="outlined" size="small" required />

          <TextareaAutosize
            onChange={e => setDesc(e.target.value)}
            aria-label="empty textarea"
            placeholder="textarea 못생겼다.." //TODO textarea 디자인 맞추기
            style={{ width: '100%', height: '150px' }}
          />

          <Stack direction="row" justifyContent="flex-start" spacing={1}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDateTimePicker
                value={getTime}
                onChange={(newValue) => {
                  setGetTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="습득일시" variant="outlined" size="small" />}

              />
            </LocalizationProvider>
            <TextField label="연락처" onChange={e => setPhone(e.target.value)} variant="outlined" size="small" />
          </Stack>

          mCategory: {formParam.mCategory}<br />
          sCategory: {formParam.sCategory}<br />
          lat: {formParam.lat}<br />
          lng: {formParam.lng}<br />
          iName: {formParam.iName}<br />
          title: {formParam.title}<br />
          getLoc: {formParam.getLoc}<br />
          desc: {formParam.desc}<br />
          phone: {formParam.phone}

          <Stack direction="row" justifyContent="space-between">
            <Button onClick={props.handleClose}>취소</Button>
            <Button onClick={postItem} variant="contained">등록</Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};



export default ModalFind;