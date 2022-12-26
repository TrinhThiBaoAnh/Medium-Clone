const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  const newCom = new Comment(req.body);
  try {
    const savedCom = await newCom.save();
    res.status(200).json(savedCom);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  if (req.query.cmtId){
    try {
      const coms = await Comment.find();
      let result;
      for (var i = 0;i<coms.length;i++){
          if (coms[i].comId === req.query.cmtId){
            result=coms[i];
          }
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else{
    try {
      const coms = await Comment.find();
      res.status(200).json(coms);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get("/:id", async (req, res) => {
    try {
      const coms = await Comment.find();
      let check = true;
      let result = [];
      for (var i = 0;i<coms.length;i++){
          if (coms[i].postId === req.params.id){
            result.push(coms[i]);
          }
      }
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }        
});
// router.get("/:id", async (req, res) => {
//     console.log(req.params.id);
//     try {
      
//       const com = await Comment.findById(req.params.id);
//       res.status(200).json(com);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
router.put("/:id", async (req, res) => {
    const coms = await Comment.find();
    let cmt_id;
    for (var i = 0;i<coms.length;i++){
      if (coms[i].comId === req.params.id){
        cmt_id = coms[i]._id;
      }
    }
    console.log(req.body);
    try {
      const cmt = await Comment.findById(cmt_id);
      try {
          const updatedCmt = await Comment.findByIdAndUpdate(
            cmt_id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedCmt);
        } catch (err) {
          res.status(500).json(err);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete("/:id", async (req, res) => {
  console.log("req.params.id",req.params.id);
  const coms = await Comment.find();
    let cmt_id;
    for (var i = 0;i<coms.length;i++){
      if (coms[i].comId === req.params.id){
        cmt_id = coms[i]._id;
      }
    }  
  try {
      const cmt = await Comment.findById(cmt_id);
      console.log(cmt_id);
      try {
          await cmt.delete();
          res.status(200).json("Comment has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
