const router = require("express").Router();
const User = require("../models/User");
const Member = require("../models/Member");
router.post("/", async (req, res) => {
  const newMember = new Member(req.body);
  const members = await Member.find();
  var check = true;
  let current = new Date();
  for (var i = 0; i < members.length;i++){
    var expired_date = new Date(members[i].end_date);
    if (members[i].user_id === newMember.user_id){
      if (expired_date.getTime() > current.getTime() ){
          check = false;
          break;
      }
       
    }
  }
  if (check){
    try {
      const savedMember = await newMember.save();
      res.status(200).json(savedMember);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get("/", async (req, res) => {
    try {
      const members = await Member.find();
      res.status(200).json(members);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.put("/:id", async (req, res) => {
      try {
        const members = await Member.find();
        let member_id;
        for (var i=0;i<members.length;i++) {
            if (members[i].user_id === req.params.id)
                  {
                      member_id = members[i]._id;
                      break;
                  }
          }
        const updatedMember = await Member.findByIdAndUpdate(
          member_id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMember);
      } catch (err) {
        res.status(500).json(err);
      }
});
// router.delete("/:id", async (req, res) => {
    
//   try {
//         const members = await Member.find();
//         let member_id;
//         for (var i=0;i<members.length;i++) {
//           if (members[i].user_id === req.params.id)
//           {
//               member_id = members[i]._id;
//               break;
//           }
//         }
//         try {
//           // await Member.findByIdAndDelete(member_id);
//           res.status(200).json("Member has been deleted...");
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } catch (err) {
//         res.status(404).json("Member not found!");
//       }
//     }
//   );
module.exports = router;
