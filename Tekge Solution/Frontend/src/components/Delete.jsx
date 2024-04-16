import React, { useEffect, useState } from "react";

import { Navigate, useNavigate, useParams } from "react-router-dom";


const Delete = async(userId) => {
    const params=useParams();
    const [data , setData]=useState([])
    const {_id}=params
const noteId=_id;
const {id}=params;

// const getNotes = async() => {
       
//     await fetch(`http://localhost:8080/notes/read`, {
//         method : "GET",
//         headers: {
//             "Content-Type" : "application/json",
//             "Authorization" : `Bearer ${localStorage.getItem("token")}` ,
//             userId
//         }, 
//     })
//     .then((res) => res.json())
//     .then((res) => {
//         setData([...res]);
//     })
//     .catch((err) => console.log(err)) 
// }
// useEffect(() => {
//     getNotes()
//   }, [])

    await fetch(`http://localhost:8080/notes/${noteId}/delete`, {
      method : "DELETE",
      body : JSON.stringify({userId}),
      headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }, 
  }).then((res)=>{
   // getNotes()
   console.log(res)
  }).catch((err)=>{
      alert("something went wrong")
  })


    return(
        <h1>Delete Page</h1>
    )
}

export   {Delete};