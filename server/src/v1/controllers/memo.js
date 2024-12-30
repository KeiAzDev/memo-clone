import Memo from '../models/memo.js';

export const create = async(req, res) => {
  try {
    const memoCount = await Memo.countDocuments();
    //メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (err){
    res.status(500).json(err)
  }
};

export const getAllMemo = async(req, res) => {
  try {
    const memos = await Memo.find({user: req.user._id}).sort('-position');
    res.status(200).json(memos);
  } catch (err){
    res.status(500).json(err)
  }
};

export const getOne = async(req, res) => {
  const {memoId} = req.params;
  try {
    const memo = await Memo.findOne({user: req.user._id, _id: memoId});
    if(!memo) return res.status(404).json({message: 'メモが存在しません'});
    res.status(200).json(memo);
  } catch(err) {
    res.status(500).json(err);
  }
};