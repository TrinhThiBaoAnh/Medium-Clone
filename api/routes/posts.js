const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
//CREATE POST
router.post("/", async (req, res) => {
    let nextId;
    const posts = await Post.find();
    if (posts.length == 0) {
      nextId =1;
    }
    else {
      let tmp = posts.map(function(item){
        return item.postId;
      });
      nextId = Math.max(...tmp) + 1;
    }
  const newPost = new Post({
    postId: nextId,
    authorId: req.body.authorId,
    title: req.body.title,
    desc: req.body.desc,
    shortDesc: req.body.shortDesc,
    photo: req.body.photo,
    categories: req.body.categories,
    tags: req.body.tags
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    // const user = await User.find();
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  // console.log('req.query:', req.query);
  const cats = await Category.find();
  // let catId = 0;
  // for (var i = 0;i<cats.length;i++){
  //   if (cats[i].cat_name === req.query.cat)
  //   {
  //     catId = (cats[i].cat_id);
  //     break;
  //   }
  // }
  // console.log(typeof(catId));
  const userId = req.query.user;
  const txt = req.query.search;
  const regex = new RegExp(txt, 'i') 
  // console.log('text:', req.query.cat);
  try {
    let posts;
    if (userId) {
      posts = await Post.find({ userId });
    } else if (req.query.cat) {

      posts = await Post.find({
        categories: {
        $in: [req.query.cat]
        }
      });
      // console.log('posts:', catId);
    } else if (txt)
    {
      posts = await Post.find({title: {$regex: regex}})
      // posts1 = await Post.find({: {$regex: regex}})
    } 
    else
    {
      posts = await Post.find();
      // console.log("Successful!", posts);
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user.userId});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
