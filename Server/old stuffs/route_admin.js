// const express = require('express');
// const router = express.Router();
// const { readFile, writeFile } = require("fs");

// async function write_on_file(){
//     console.log("write")
//     list_of_users.sort(function (a, b) {
//       return b.rating - a.rating;
//     }); 
//     writeFile("users_data_file.txt",JSON.stringify(list_of_users),(err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     }
//    );
//   }

// function write_on_admin_file(list_of_admins){
 
//     writeFile("admin_list.txt",JSON.stringify(list_of_admins),(err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     }
//    );
//   }
// async function delete_user(my_email,cb)
// {
  
//   readFile("users_data_file.txt"
//   , "UTF-8", (err, data) => {
//     try{
//       list_of_users=JSON.parse(data).filter(function(item){
//         return item.email!=my_email
//       })
//       cb()
//     }
//     catch (err){
//      console.log(err);
//     } 
//   })

// }
// async function get_admin_list(cb)
// {
//   readFile("admin_list.txt", "UTF-8",(err, data) => {
//     try{
//       cb(JSON.parse(data))
//     }
//     catch (err){
//      console.log(err);
//     }
//    });

// }
// async function check_admin(guser,cb)
// {
//   get_admin_list(function(data){
//     if(data.findIndex((user_data) => user_data.email == guser.email) != -1)
//       cb(true)
//    else
//     cb(false)
//    })
// }
// router.get('/all_admins',async (req,res)=>{
//   await get_admin_list(function(data){
//      res.send(data)
//    })
// })
// router.post('/remove_user_list',async(req,res)=>{
//   //Removing CF USER by admin
//   console.log("Params pass : ")
//   console.log(req.body)
//   check_admin(req.body,async function(data){
//     if(data)
//      {
//        await delete_user(req.body.remove_email,write_on_file)
//        res.status(200).json({
//          error: false,
//          message: "removed Successfully",
//          isAdmin: true,
//        })
//      }
//     else
//        res.status(200).json({
//          error: false,
//          message: "Not removed",
//          isAdmin: false,
//        })
//    })
// })
// async function add_admin(my_email)
// {
//   get_admin_list(function(data){
//     if(data.findIndex((value)=>{value.email==my_email})==-1)
//      {
//         data.push({
//           email : my_email,
//           verified : false,
//           name: '',
//        })
//        write_on_admin_file(data)
//      }
//   })
// }
// router.post('/add_admin',async (req,res)=>{
//   console.log(req.body.add_email)
//   check_admin(req.body,async function(data){
//    if(data)
//     {
//       await add_admin(req.body.add_email)
//       res.status(200).json({
//         error: false,
//         message: "Added Successfully",
//         isAdmin: true,
//       })
//     }
//    else
//       res.status(200).json({
//         error: false,
//         message: "Not Add",
//         isAdmin: false,
//       })
//   })
  
// })
// async function remove_admins(emails)
// {
//   get_admin_list(function(data){

//   write_on_admin_file(
//       data.filter((val)=>{
//           console.log(emails.findIndex(value =>value==val.email)==-1)
//           return emails.findIndex(value =>value==val.email)==-1
//         })
//   )})
// }
// router.post('/remove_admins',(req,res)=>{

  
//   console.log(req.body.email)
//   console.log(req.body.email_list)
//   check_admin(req.body,async function(data){
//     console.log(data)
//    if(data)
//     {
//       await remove_admins(req.body.email_list)
//       res.status(200).json({
//         error: false,
//         message: "Successfully Removed Admins",
//         isAdmin: true,
//       })
//     }
//    else
//     res.status(200).json({
//       error: false,
//       message: "Not Removed Admins",
//       isAdmin: false,
//     })
//   })
// })
// router.get('/is_admin',(req,res)=>{
//  if(req.user)
//   check_admin(req.user._json,function(data){
//     res.send(data)
//   })
//   else
//    res.send(false)
// })

// module.exports = router;




// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------//
