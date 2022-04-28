import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase from '../utils/firebase';

export default function Test() {
    const [userInfo, setuserInfo] = useState({
        title: '',
      });

      const onChangeValue = (e) => {
        setuserInfo({
          ...userInfo,
          [e.target.name]:e.target.value
        });
      } 
     
    const [isUsers, setUsers] = useState([]);
    {/* Fetch ------------------------------------------- */}  
      useEffect(() => {
        // db.collection('users').orderBy('datetime', 'desc').onSnapshot(snapshot => {
        //   setUsers(snapshot.docs.map(doc => {
        //     return {
        //       id: doc.id,
        //       title: doc.data().title,
        //       image: doc.data().images,
        //       datetime: doc.data().datetime
        //     }
        //   }))
        // })
      }, []);
    //----------------------------------------------------------
      const [isfile, setFile] = useState(null);
      const handleImageAsFile = (e) => {
        setFile(e.target.files[0]);
      }
    
    {/* Insert ------------------------------------------- */}
      const addlist = async(event) => {
        try {
          event.preventDefault();
          let file = isfile;
                        const time = new Date().getTime();
              const data = {
                change_at: time,
                change_by: "test" ,
                create_at: time,
                create_by: "test",
                image: downloadURL,
                name: "abc",
              };
          firebase.createWithImg(file.name, "categories", data);

        // //   const storage = getStorage();
        //   const storage = firebase.storage;
        //   var storagePath = 'uploads/' + file.name;
        //   console.log(file.name);
    
        //   const storageRef = ref(storage, storagePath);
        //   const uploadTask = uploadBytesResumable(storageRef, file);
    
        //   uploadTask.on('state_changed', (snapshot) => {
        //     // progrss function ....
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //   }, 
        //   (error) => { 
        //     // error function ....
        //     console.log(error);
        //   }, 
        //   () => {
        //     // complete function ....
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //       console.log('File available at', downloadURL);
        //       const time = new Date().getTime();
        //       const data = {
        //         change_at: time,
        //         change_by: "test" ,
        //         create_at: time,
        //         create_by: "test",
        //         image: downloadURL,
        //         name: "abc",
        //       };
        //       firebase.create("categories", data)
        //       setFile(null);
        //     });
        //   });
        } catch (error) { throw error;}  
      }
    
      return (<>
        <div className="App">
          <h1> React Firebase storage Image Upload </h1>
          <div className="wrapper">
            {/* Insert users -------------------------------------------*/}
            <form onSubmit={addlist}>
              <input type="text" id="title"  name="title" value={userInfo.title} onChange={onChangeValue} placeholder=" Title " required />
              <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
              <button type="submit" className="btn__default btn__add" > Upload </button>  
            </form>
          </div>
          {/* Fetch users ------------------------------------------------*/}
          {isUsers.map((items,index) => (
            <div key={items.id} >
              <div className="wrapper__list">
                <p><b> Title : </b> {items.title}</p>
                <img src={items.image} alt=""/>
              </div>    
            </div>
          ))}
        </div>
      </>)
}