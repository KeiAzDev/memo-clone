import React, { useEffect, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useNavigate, useParams } from 'react-router-dom'
import memoApi from '../api/memoApi'
import { useDispatch, useSelector } from 'react-redux'
import { setMemo } from '../redux/features/memoSlice'
import EmojiPicker from '../components/common/EmojiPicker'

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        console.log(res);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);

      const newMemos = memos.filter((e) => e._id !== memoId);
      if (newMemos.length === 0) {
        navigate('/memo');
      } else {
        navigate(`/memo/${newMemos[0]._id}`)
      }
      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  };

  const onIconChange = async (newIcon) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = {...temp[index], icon: newIcon};
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, {icon: newIcon});
    } catch(err) {
      alert(err);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant='outlined' color='error' onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ p: '10px 50px' }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange}/>
          <TextField onChange={updateTitle} value={title} placeholder='無題' variant='outlined' fullWidth sx={{ '.MuiOutlinedInput-input': { padding: 0 }, '.MuiOutlinedInput-notchedOutline': { border: 'none' }, '.MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' } }} />
          <TextField onChange={updateDescription} value={description} placeholder='追加' variant='outlined' fullWidth sx={{ '.MuiOutlinedInput-input': { padding: 0 }, '.MuiOutlinedInput-notchedOutline': { border: 'none' }, '.MuiOutlinedInput-root': { fontSize: '1rem' } }} />
        </Box>
      </Box>
    </>
  )
}

export default Memo
