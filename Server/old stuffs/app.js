// const express = require('express')
// const session = require('express-session')
// const passport = require('passport')
// const cookieSession = require("cookie-session");
// require('./auth')
// const app = express()
// var cors = require('cors')
// //connection with frontend
// app.use(
//   cors({
//     origin: "http://localhost:4000",
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//     credentials: true,
//   })
// );
// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["aniketkundu"],
// 		maxAge: 24 * 60 * 60 * 1000,
// 	})
// );
// const { readFile, writeFile } = require("fs");
// const fs = require('fs');
// const { verify } = require('crypto');

// const CF_API = "https://codeforces.com/api/user.info?handles="

// app.use(express.json());       
// app.use(express.urlencoded({extended: true})); 


// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.get('/auth/google',
//   passport.authenticate('google', { scope: [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
//   passport.authenticate( 'google', {
//     successRedirect: 'http://localhost:4000',
//     failureRedirect: '/http://localhost:4000'
//   })
// );




// //  Functions
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

// // async function create_table(res,is_user){

// //   res.write(`<a class="" href=${!is_user?"/auth/google":"/logout"}>
// //      <img width="15px" style="margin-bottom:3px; margin-right:5px" alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
// //      ${!is_user?"Sign in with Google":"Sign Out"}
// //    </a>`);
// //   res.write("<p>table will be shown here<p>");
// //   for (let i = 0; i < list_of_users.length; i++) {
// //     res.write(
// //       `<p style="display:inline;">The rating of ${list_of_users[i].cf_handle} is ${list_of_users[i].rating} .</p>`
// //     ); 
// //     res.write("<img src=" + list_of_users[i].image + ">");
// //   }
// //   return res;
// // }
// async function write_on_file(){
//   console.log("write")
//   list_of_users.sort(function (a, b) {
//     return b.rating - a.rating;
//   }); 
//   writeFile("users_data_file.txt",JSON.stringify(list_of_users),(err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
//  );
// }
// function write_on_admin_file(list_of_admins){
 
//   writeFile("admin_list.txt",JSON.stringify(list_of_admins),(err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
//  );
// }

// async function update_on_file(user,guser,user_id){
//   list_of_users[user_id]={
//         email: guser.email,
//         // isAdmin : false,
//         name : guser.name,
//         cf_handle: user.handle,
//         rating: user.rating,
//         image: user.titlePhoto,
//         maxRating : user.maxRating,
//         rank : user.rank
//   }
//   write_on_file()
// }
// function add_on_file(user,guser){
//   try{
//       list_of_users.push({
//         email: guser.email,
//         // isAdmin : false,
//         name : guser.name,
//         cf_handle: user.handle,
//         rating: user.rating,
//         image: user.titlePhoto,
//         maxRating : user.maxRating,
//         rank : user.rank
//       });
//   }
//   catch(err) {
//     console.log(err)
//   }
//   finally{
//     write_on_file()
//   }
// }
// async function add_user(response,guser)
// {
//   // let list_of_users=[]
//   readFile("users_data_file.txt", "UTF-8", (err, data) => {
//    try{
//      list_of_users=JSON.parse(data)
//    }
//    catch (err){
//     console.log(err);
//    }
//    finally{

//     let user_id = list_of_users.findIndex((user_data) => user_data.email === guser.email)
//     if(user_id!=-1)
//      update_on_file(response.result[0],guser,user_id)
//     else
//      add_on_file(response.result[0],guser)
//    }
//   });

// }

// async function update_list()
// {
//   let list_of_handles=""
//   for(let i=0;i<list_of_users.length;i++)
//    list_of_handles+=list_of_users[i].cf_handle+((i==list_of_users.length-1)?"":";")
//   let url = CF_API + list_of_handles
//   await fetch(url).then((response)=>{
       
//         if(response.ok) {
//             return response.json();
//           }
//           throw new Error('Something went wrong');
//     })
//     .then((response)=>{
      
//         let new_list=response.result;
//         for(let i=0;i<list_of_users.length;i++)
//         {
//           list_of_users[i].maxRating = new_list[i].maxRating
//           list_of_users[i].rating = new_list[i].rating?new_list[i].rating:0
//           list_of_users[i].image = new_list[i].titlePhoto
//         }
//         write_on_file()
        
//     })
//     .catch((error) => {
//          console.log(error)
//       });
//     return list_of_users
// }

// // app.get('/dashboard',(req,res)=>{
// //   // let list_of_users=[]
// //   readFile("users_data_file.txt", "UTF-8",async (err, data) => {
// //    try{
// //      list_of_users=JSON.parse(data)
// //    }
// //    catch (err){
// //     console.log(err);
// //    } 
// //    finally{
// //       //refresh new data 
// //       list_of_users=await update_list()
// //       res=await create_table(res,req.isAuthenticated())
// //       res.send();
// //    }
// //   })
 
// // })

// // app.get('/handle',(req, res, next)=>{
// //     req.isAuthenticated()?next():res.redirect('/dashboard')
// // },(req,res)=>{
    
// //     res.sendFile(__dirname+'/handle.html')
// // })
// // app.post('/handle',(req,res)=>{
//     // let handle=req.body.cf_handle;
//     // //handle should not contain ; semicolon
//     // let is_semicolon_present=false
//     // for(let i=0;i<handle.length;i++)
//     //     if(handle[i]==';')
//     //      is_semicolon_present=true

//     // let url=CF_API+handle
//     // if(!is_semicolon_present)
//     // {
//     //     fetch(url).then((response)=>{
//     //         if(response.ok) {
//     //             return response.json();
//     //           }
//     //           throw new Error('Something went wrong');
//     //     })
//     //     .then(async (response)=>{
//     //        await add_user(response,req.user.email)
           
//     //     })
//     //     .catch((error) => {
//     //         console.log('You got an error')
//     //         console.error(error)
//     //         res.redirect('/handle')
//     //       });
//     // }
//     // else
//     // {
//     //     console.log('You entered wrong')
//     //     res.redirect('/handle')
//     // }
    
// // })



// app.get('/logout', function(req, res) {
//   // req.logout(function(err) {
//   //   if (err) { return next(err); }
//   //    res.redirect('/dashboard');
//   // });
//   req.logout();
// 	res.redirect('http://localhost:4000');
// });



// //from DB
// app.get('/user_list',(req,res)=>{
  
//   readFile("users_data_file.txt", "UTF-8", (err, data) => {
//    try{
//      list_of_users=JSON.parse(data)
//    }
//    catch (err){
//     console.log(err);
//     res.send([])
//    }
//   finally
//   {
//     res.send(list_of_users);
//   }});   
// })
// // updated one
// app.get('/user_list_current',(req,res)=>{

//   console.log("called")
//   readFile("users_data_file.txt", "UTF-8",async (err, data) => {
//    try{
//      list_of_users=JSON.parse(data)
//    }
//    catch (err){
//     console.log(err);
//    } 
//    finally{
//       //refresh new data 
//       list_of_users=await update_list(list_of_users)
//       res.send(list_of_users);
//    }
//   }) 
// })




// // app.get('/user_g_info',(req,res)=>{
// //    let g_data= {"email":"kunduaniket7@gmail.com","cf_handle":"Benq","rating":3783,"image":"https://userpic.codeforces.org/312472/title/7cf0a442d4071e87.jpg","maxRating":3813,"rank":"legendary grandmaster"}
// //   // console.log(g_data)
// //   //req.user.body
// //   // console.log(req.isAuthenticated())
// //   // console.log("called")
// //   console.log("__guser")
// //   console.log(req.user)

// //   // if(req.user)
// //   //  g_data=req.user.body
// //   // res.body=g_data
// //   res.send(g_data)
// // })


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
// // function add_admin(guser)
// // {
  
// // }
// // async function check_and_add_admin(guser)
// // {
// //   await get_admin_list()
// //   if(list_of_admins.findIndex((user_data) => user_data.email === guser.email) == -1)
// //   {
// //     add_admin(guser)
// //   }
// // }
// async function check_admin(guser,cb)
// {
//   get_admin_list(function(data){
//     if(data.findIndex((user_data) => user_data.email == guser.email) != -1)
//       cb(true)
//    else
//     cb(false)
//    })
// }
// function verify_admin(guser)
// {
//   // verify if admin present
//   get_admin_list(function(data){
//     let id=data.findIndex((user_data) => user_data.email == guser.email)
//     if(id != -1 && data[id].verified == false)
//      {
//        data[id].verified=true
//        data[id].name=guser.name
//        write_on_admin_file(data)
//      }
//   })
// }
// app.get('/user_g_info',(req,res)=>{
//       if (req.user) {
//         verify_admin(req.user._json)
//         // let isAdmin=false
//         // check_admin(req.user._json,function(data){
//         //   isAdmin=data
//         //   console.log("Admin :")
//         //   console.log(isAdmin)
//           res.status(200).json({
//             error: false,
//             message: "Successfully Loged In",
//             user: {
//               name : req.user._json.name,
//               picture : req.user._json.picture,
//               email : req.user._json.email,
//               // email_verified : req.user._json.email_verified,
//               // isAdmin : isAdmin,
//             },
//           });
//         // })
//       } else {
//         res.status(403).json({ error: true, message: "Not Authorized" });
//       }
//   })
// app.get('/all_admins',async (req,res)=>{
//   await get_admin_list(function(data){
//      res.send(data)
//    })
  
// })
// async function find_cfuser_email(my_email)
// {
//    await get_list()
//    for(let i=0;i<list_of_users.length;i++)
//     if(list_of_users[i].email == my_email)
//     {
//      return list_of_users[i]
//     }
//    return null
   
// }
//   app.get('/is_linked',async (req,res)=>{
//        if (req.user) {
//          const cf_data=await find_cfuser_email(req.user._json.email)
//          res.status(200).json({
//            error: false,
//            message: "Successfully Loged In",
//            user: cf_data,
//          });
//        } else {
//          res.status(403).json({ error: true, message: "Not Authorized" });
//        }
//    })

// async function check_and_add(handle,guser)
// {
//   //handle should not contain ; semicolon
//   let is_semicolon_present=false
//   for(let i=0;i<handle.length;i++)
//       if(handle[i]==';')
//        is_semicolon_present=true

//   let url=CF_API+handle
  
//   let cf_user=null
//   if(!is_semicolon_present)
//   {
//       await fetch(url).then((response)=>{
//           if(response.ok) {
//               return response.json();
//             }
//             throw new Error('Something went wrong');
//       })
//       .then(async (response)=>{
//          await add_user(response,guser)
//          console.log(response.result[0])
//          cf_user ={
//           cf_handle : response.result[0].handle,
//           email : guser.email,
//           image  : response.result[0].titlePhoto,
//           maxRating : response.result[0].maxRating,
//           name : guser.name,
//           rank : response.result[0].rank,
//           rating : response.result[0].rating,
//          }
//       })
//       .catch((error) => {
//           console.error(error)
//         });
//   }
//   return cf_user
// }

// app.get('/new_cf_user',async (req,res)=>{
//     if (req.user) {
//       console.log(req.query.cf_id)
//       const cf_user=await check_and_add(req.query.cf_id,req.user._json)
//       if(cf_user)
//       {
//         res.status(200).json({
//           error: false,
//           message: "Successfully Loged In",
//           user: cf_user,
//         });
//       }
//       else {
//         res.status(403).json({ error: true, message: "No such user found!" });
//       }
//     } else {
//       res.status(403).json({ error: true, message: "Not Authorized" });
//     }
// })

// // app.get('/admin_entry',(req,res)=>{
// //   if(req.user){
// //     check_and_add_admin(req.user)
// //   }
// //   else
// //    res.status(403).json({ error: true, message: "Not Authorized" });
// // })
// async function remove_from_list(my_email)
// {
//   list_of_users=list_of_users.filter(function(item){
//     return item.email!=my_email
//   })
// }
// async function delete_user(my_email,cb)
// {
//   // await get_list()
//   // await remove_from_list(my_email)
//   // await write_on_file()
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
// app.get('/remove_user',(req,res)=>{
//   // removing , so cf_user must be there(guaranteed)
//   console.log("user mail")
//   console.log(req.user.email)
//   delete_user(req.user._json.email,write_on_file)
// })
// app.post('/remove_user_list',async(req,res)=>{
 
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
//   // await delete_user(req.body.remove_email,write_on_file)
  
//   // // console.log(req.query.email)
//   // // await delete_user(req.query.email,write_on_file)
//   // res.end()
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
// app.post('/add_admin',async (req,res)=>{
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
// app.post('/remove_admins',(req,res)=>{

  
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
// app.get('/is_admin',(req,res)=>{
//  if(req.user)
//   check_admin(req.user._json,function(data){
//     res.send(data)
//   })
//   else
//    res.send(false)
// })

// app.listen(3000,()=>{
//     console.log("Server port :3000 ")
// })
