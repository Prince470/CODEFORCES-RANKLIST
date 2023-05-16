// const express = require('express');
// const router = express.Router();
// const { readFile, writeFile } = require("fs");

// const CF_API = "https://codeforces.com/api/user.info?handles="
// var list_of_users=[]

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

// async function update_list()
// {
//   readFile("users_data_file.txt", "UTF-8",async (err, data) => {
//     try{
//       list_of_users=JSON.parse(data)
//     }
//     catch (err){
//      console.log(err);
//     } 
//     finally{
//       let list_of_handles=""
//       for(let i=0;i<list_of_users.length;i++)
//        list_of_handles+=list_of_users[i].cf_handle+((i==list_of_users.length-1)?"":";")
//       let url = CF_API + list_of_handles
//       await fetch(url).then((response)=>{
           
//             if(response.ok) {
//                 return response.json();
//               }
//               throw new Error('Something went wrong');
//         })
//         .then((response)=>{
          
//             let new_list=response.result;
//             for(let i=0;i<list_of_users.length;i++)
//             {
//               list_of_users[i].maxRating = new_list[i].maxRating
//               list_of_users[i].rating = new_list[i].rating?new_list[i].rating:0
//               list_of_users[i].image = new_list[i].titlePhoto
//               list_of_users[i].rank = new_list[i].rank
//             }
//             write_on_file()
            
//         })
//         .catch((error) => {
//              console.log(error)
//           });
//     }
//    }) 
  
// }
// setInterval(update_list, 1000*60*1); // 5mins interval refresh data


// //from DB
// router.get('/user_list',(req,res)=>{
  
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
// router.get('/user_list_current',(req,res)=>{

//   console.log("called")
//   readFile("users_data_file.txt", "UTF-8",async (err, data) => {
//    try{
//      list_of_users=JSON.parse(data)
//    }
//    catch (err){
//     console.log(err);
//    } 
//    finally{
//       res.send(list_of_users);
//    }
//   }) 
// })


// module.exports = router;




//--------------------------------------------------------------------------------------------------------------------------------------------------//
