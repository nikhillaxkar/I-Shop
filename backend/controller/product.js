const { getRandomName } = require("../helper");
const Product = require("../model/Product");
const Category=require("../model/Category");
class ProductController {
  create(data, image) {
    return new Promise((res, rej) => {
      try {
        
        //save the fileto the server
        const imageName = getRandomName(image.name);
        
        const destination = "./public/images/product/" + imageName;
        image.mv(destination, (err) => {
          if (err) {
            rej({
              msg: "Internal server error",
              status: 0,
            });
          } else {
            data.image = imageName;
            data.color=JSON.parse(data.color);
            const product = new Product(data);
            product
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

  read(id,query) {
    return new Promise(async (res, rej) => {
      try {
        let data = [];
        if (id != undefined) {
          data = await Product.findById(id).populate(['category','color']);
        } else {
          const category=await Category.findOne({slug: query.category});
          const filterQuery={};
          if(category !=null){
            filterQuery.category=category._id;

          }
          if(query.color && query.color != "null"){
            filterQuery.color=query.color;
          }
          data=await Product.find(filterQuery).populate(['category','color']).limit(parseInt(query.limit));
         
        }
        res({
          msg: "Data found",
          status: 1,
          data,
          imgBaseUrl: "/images/product/",
        });
      } catch (err) {

        rej({
          msg: "Internal sever error",
          status: 0,
        });
      }
    });
  }

//   updateStatus(id,new_staus) {
//     return new Promise(
//     (res,rej)=>{
//              try {
//               Category.updateOne({_id: id}, {status:new_staus})
//               .then(
//                 (success)=>{
//                   res(
//                     {
//                       msg:"Status changed",
//                       status:1
//                     }
//                   )
//                 }
//               ).catch(
//                 (error)=>{
//                rej(
//                 {
//                   msg:"Unable to change the status",
//                   status:0
//                 }
//                )
//                 }
//               )
//     } catch (err) {
//     rej({
//     msg: 'Internal sever error',
//     status: 0
//     })
//     }
//     }
//     )
//   }

//   update(id, data,file) {
//     return new Promise(
//     (res,rej)=>{
//              try {
//               if(file!=undefined ){
//              const imageName=getRandomName(file.name);
//              const destination = "./public/images/category/" + imageName;
//                file.mv(destination,(err)=>{
//                 if(err){
//                   rej({
//                     msg:"Internal sever error",
//                     status:0
//                   })
//                 }
//                 else{
                  
//                   Category.updateOne({ _id: id},{name:data.name,slug: data.slug,image:imageName})
//                   .then(
//                     (success)=>{
//                       unlinkSync("./public/images/category/"+data.old_image)
//                       res(
//                         {
//                           msg:"Data update",
//                           status:1
//                         }
//                       )
//                     }
//                   ).catch(
//                     (error)=>{
//                    rej(
//                     {
//                       msg:"Unable to updagte the data",
//                       status:0
//                     }
//                    )
//                     }
//                   )
//                 }
//                })
//               }
//             else{
//               Category.updateOne({ _id: id},{name:data.name,slug: data.slug})
//               .then(
//                 (success)=>{
//                   res(
//                     {
//                       msg:"Data update",
//                       status:1
//                     }
//                   )
//                 }
//               ).catch(
//                 (error)=>{
//                rej(
//                 {
//                   msg:"Unable to updagte the data",
//                   status:0
//                 }
//                )
//                 }
//               )
//             }
//     } catch (err) {
//     rej({
//     msg: 'Internal sever error',
//     status: 0
//     })
//     }
//     }
//     )
//   }

//   delete(id,image_name) {
//     return new Promise(
//     (res,rej)=>{
//    Category.deleteOne({_id: id}).
//    then(
//     (success)=>{
//       unlinkSync("./public/images/category/" + image_name);
//       res({msg: "data deleted",status:1})
//     }
//    ).catch(
//     (error)=>rej({msg:"Unable to delete data",status:0})
//    )
//              try {
//     } catch (err) {
//     rej({
//     msg: 'Internal sever error',
//     status: 0
//     })
//     }
//     }
//     )
//   }
}
module.exports = ProductController;
