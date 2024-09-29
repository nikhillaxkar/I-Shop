const express = require("express");
const CategoryRouter = express.Router();
const CategoryController = require("../controller/category");
const fileUpload=require('express-fileupload');
CategoryRouter.get("/:id?", (req, res) => {
  const result = new CategoryController().read(req.params.id);
  result
  .then((success) => {
    res.send(success);
  })
  .catch((error) => {
    res.send(error);
  });
});

CategoryRouter.post("/create",
  fileUpload({
    createParentPath:true
  }),
  (req, res) => {
  
  const data=req.body;
  const image=req.files?.image;

  const result = new CategoryController().create(data,image);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});
CategoryRouter.delete("/delete/:id/:image_name", (req, res) => {
  const result = new CategoryController().delete(req.params.id,req.params.image_name);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});
CategoryRouter.patch("/change-status/:id/:new_status", (req, res) => {
  const result = new CategoryController().updateStatus(req.params.id,req.params.new_status);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});
CategoryRouter.put("/update/:id", 
  fileUpload({
    createParentPath:true
  }),
  (req, res) => {

  const result = new CategoryController().update(req.params.id,req.body,req.files?.image);
  result
    .then((success) => {
      res.send(success);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = CategoryRouter;
