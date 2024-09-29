const { getRandomName } = require("../helper");
const Category = require("../model/Category");
const { unlinkSync } = require('fs');
const Product = require("../model/Product");

class CategoryController {
  create(data, image) {
    return new Promise((res, rej) => {
      try {
        //save the fileto the server
        const imageName = getRandomName(image.name);
        const destination = "./public/images/category/" + imageName;
        image.mv(destination, (err) => {
          if (err) {
            rej({
              msg: "Internal server error",
              status: 0,
            });
          } else {
            data.image = imageName;
            const category = new Category(data);
            category
              .save()
              .then((success) => {
                res({
                  msg: "Data added",
                  status: 1,
                });
              })
              .catch((error) => {
                rej({
                  msg: "Unable to add the data",
                  status: 0,
                });
              });
          }
        });
      } catch (err) {
        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }

  read(id) {
    return new Promise(async (res, rej) => {
      try {
        let data = [];
        if (id != undefined) {
          data = await Category.findById(id);
        } else {
          data = await Category.find();
        }
        let finalData=[];
        for(let d of data){
          const count=await Product.find({category:d._id}).countDocuments();
          finalData.push(
            {
              ...d.toJSON(),
              count
            }
          )
        }
        res({
          msg: "Data found",
          status: 1,
          data:finalData,
          imgBaseUrl: "/images/category/",
        });
      } catch (err) {

        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }

  updateStatus(id,new_staus) {
    return new Promise(
    (res,rej)=>{
             try {
              Category.updateOne({_id: id}, {status:new_staus})
              .then(
                (success)=>{
                  res(
                    {
                      msg:"Status changed",
                      status:1
                    }
                  )
                }
              ).catch(
                (error)=>{
               rej(
                {
                  msg:"Unable to change the status",
                  status:0
                }
               )
                }
              )
    } catch (err) {
    rej({
    msg: 'Internal sever error',
    status: 0
    })
    }
    }
    )
  }

  update(id, data,file) {
    return new Promise(
    (res,rej)=>{
             try {
              if(file!=undefined ){
             const imageName=getRandomName(file.name);
             const destination = "./public/images/category/" + imageName;
               file.mv(destination,(err)=>{
                if(err){
                  rej({
                    msg:"Internal sever error",
                    status:0
                  })
                }
                else{
                  
                  Category.updateOne({ _id: id},{name:data.name,slug: data.slug,image:imageName})
                  .then(
                    (success)=>{
                      unlinkSync("./public/images/category/"+data.old_image)
                      res(
                        {
                          msg:"Data update",
                          status:1
                        }
                      )
                    }
                  ).catch(
                    (error)=>{
                   rej(
                    {
                      msg:"Unable to updagte the data",
                      status:0
                    }
                   )
                    }
                  )
                }
               })
              }
            else{
              Category.updateOne({ _id: id},{name:data.name,slug: data.slug})
              .then(
                (success)=>{
                  res(
                    {
                      msg:"Data update",
                      status:1
                    }
                  )
                }
              ).catch(
                (error)=>{
               rej(
                {
                  msg:"Unable to updagte the data",
                  status:0
                }
               )
                }
              )
            }
    } catch (err) {
    rej({
    msg: 'Internal sever error',
    status: 0
    })
    }
    }
    )
  }

  delete(id,image_name) {
    return new Promise(
   async (res,rej)=>{
    const productCount=await Product.find({category:id}).countDocuments();
    if(productCount !=0){
      rej({
        msg:"Cannot delete category having products",
        status:0
      })
    }
   
  
   Category.deleteOne({_id: id}).
   then(
    (success)=>{
      unlinkSync("./public/images/category/" + image_name);
      res({msg: "data deleted",status:1})
    }
   ).catch(
    (error)=>rej({msg:"Unable to delete data",status:0})
   )
             try {
    } catch (err) {
    rej({
    msg: 'Internal sever error',
    status: 0
    })
    }
    }
    )
  }
}
module.exports = CategoryController;
