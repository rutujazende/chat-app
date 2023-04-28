import React from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase'
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link  } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const nav = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
        (snapshot) => {},
        (error) => {
            setErr(true)
        }, 
        () => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", res.user.uid),{
                    uid : res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                });
                await setDoc(doc(db, "userChats", res.user.uid), {});
                nav("/")
            });
        }
        );
    }catch(err){
        setErr(true);
    }   
  };
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chatify</span>
            <span className='title'>Create Account</span>
            <form onSubmit={handleSubmit}>
                <input type = 'text' placeholder='Name'/>
                <input type = 'email' placeholder='Email'/>
                <input type = 'password' placeholder='Password'/>
                <input style={{display:'none'}} type = 'file' id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an Avatar</span>
                </label>
                <button>Sign Up</button>
                
                {err && <span>Something went wrong.</span>}
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register