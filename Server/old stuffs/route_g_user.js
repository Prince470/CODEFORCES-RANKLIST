// const express = require('express');
// const router = express.Router();
// const { readFile, writeFile } = require("fs");

// const CF_API = "https://codeforces.com/api/user.info?handles="
// var list_of_users=[]
// async function get_list()
//   {
//     readFile("users_data_file.txt"
//     , "UTF-8", (err, data) => {
//       try{
//         console.log("DATA is")
//         console.log(data)
//         list_of_users=JSON.parse(data)
//       }
//       catch (err){
//        console.log(err);
//       } 
//     })
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

//   async function write_on_file(){
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
//   async function update_on_file(user,guser,user_id){
//     list_of_users[user_id]={
//           email: guser.email,
//           // isAdmin : false,
//           name : guser.name,
//           cf_handle: user.handle,
//           rating: user.rating?user.rating:0,
//           image: user.titlePhoto,
//           maxRating : user.maxRating,
//           rank : user.rank
//     }
//     write_on_file()
//   }
//   function add_on_file(user,guser){
//     try{
//         list_of_users.push({
//           email: guser.email,
//           name : guser.name,
//           cf_handle: user.handle,
//           rating: user.rating?user.rating:0,
//           image: user.titlePhoto,
//           maxRating : user.maxRating,
//           rank : user.rank
//         });
//     }
//     catch(err) {
//       console.log(err)
//     }
//     finally{
//       write_on_file()
//     }
//   }
//   async function add_user(response,guser)
//   {
//     // let list_of_users=[]
//     readFile("users_data_file.txt", "UTF-8", (err, data) => {
//      try{
//        list_of_users=JSON.parse(data)
//      }
//      catch (err){
//       console.log(err);
//      }
//      finally{
  
//       let user_id = list_of_users.findIndex((user_data) => user_data.email === guser.email)
//       if(user_id!=-1)
//        update_on_file(response.result[0],guser,user_id)
//       else
//        add_on_file(response.result[0],guser)
//      }
//     });
  
//   }
//   async function get_admin_list(cb)
//   {
//     readFile("admin_list.txt", "UTF-8",(err, data) => {
//       try{
//         cb(JSON.parse(data))
//       }
//       catch (err){
//        console.log(err);
//       }
//      });
  
//   }
//   function verify_admin(guser)
//   {
//     //Linked with g_user
//     // verify if admin present
//     get_admin_list(function(data){
//       let id=data.findIndex((user_data) => user_data.email == guser.email)
//       if(id != -1 && data[id].verified == false)
//        {
//          data[id].verified=true
//          data[id].name=guser.name
//          write_on_admin_file(data)
//        }
//     })
//   }
//   router.get('/user_g_info',(req,res)=>{
//         if (req.user) {
//           verify_admin(req.user._json)
//             res.status(200).
//             json({
//               error: false,
//               message: "Successfully Loged In",
//               user: {
//                 name : req.user._json.name,
//                 picture : req.user._json.picture,
//                 email : req.user._json.email,
//               },
//             });
//           // })
//         } else {
//           res.status(403).json({ error: true, message: "Not Authorized" });
//         }
//     })
  
//   async function find_cfuser_email(my_email)
//   {
//      await get_list()
//      for(let i=0;i<list_of_users.length;i++)
//       if(list_of_users[i].email == my_email)
//       {
//        return list_of_users[i]
//       }
//      return null
     
//   }
//     router.get('/is_linked',async (req,res)=>{
//          if (req.user) {
//            const cf_data=await find_cfuser_email(req.user._json.email)
//            res.status(200).json({
//              error: false,
//              message: "Successfully Loged In",
//              user: cf_data,
//            });
//          } else {
//            res.status(403).json({ error: true, message: "Not Authorized" });
//          }
//      })
  
//   async function check_and_add(handle,guser)
//   {
//     //handle should not contain ; semicolon
//     let is_semicolon_present=false
//     for(let i=0;i<handle.length;i++)
//         if(handle[i]==';')
//          is_semicolon_present=true
  
//     let url=CF_API+handle
    
//     let cf_user=null
//     if(!is_semicolon_present)
//     {
//         await fetch(url).then((response)=>{
//             if(response.ok) {
//                 return response.json();
//               }
//               throw new Error('Something went wrong');
//         })
//         .then(async (response)=>{
//            await add_user(response,guser)
//            console.log(response.result[0])
//            cf_user ={
//             cf_handle : response.result[0].handle,
//             email : guser.email,
//             image  : response.result[0].titlePhoto,
//             maxRating : response.result[0].maxRating,
//             name : guser.name,
//             rank : response.result[0].rank,
//             rating : response.result[0].rating?response.result[0].rating:0,
//            }
//         })
//         .catch((error) => {
//             console.error(error)
//           });
//     }
//     return cf_user
//   }
  
  
//   router.get('/new_cf_user',async (req,res)=>{
//       if (req.user) {
//         console.log(req.query.cf_id)
//         const cf_user=await check_and_add(req.query.cf_id,req.user._json)
//         if(cf_user)
//         {
//           res.status(200).json({
//             error: false,
//             message: "Successfully Loged In",
//             user: cf_user,
//           });
//         }
//         else {
//           res.status(403).json({ error: true, message: "No such user found!" });
//         }
//       } else {
//         res.status(403).json({ error: true, message: "Not Authorized" });
//       }
//   })
//   async function delete_user(my_email,cb)
//   {
    
//     readFile("users_data_file.txt"
//     , "UTF-8", (err, data) => {
//       try{
//         list_of_users=JSON.parse(data).filter(function(item){
//           return item.email!=my_email
//         })
//         cb()
//       }
//       catch (err){
//        console.log(err);
//       } 
//     })
  
//   }
//   router.get('/remove_user',(req,res)=>{
//     //Removing CF USER by own
//     console.log("user mail")
//     console.log(req.user.email)
//     delete_user(req.user._json.email,write_on_file)
//   })

// module.exports = router;









//--------------------------------------------------------------------------------------------------------------------------------------------------------------//













