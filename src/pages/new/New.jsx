import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getFirestore
} from "firebase/firestore";
import initalizeApp from "../../firebase/firebase.initialize";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const auth=getAuth()
const storage = getStorage();
const db=getFirestore(initalizeApp)

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({})
  const [perc, setPerc]= useState(null)

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(perc);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(data);
    try{
      const res= await createUserWithEmailAndPassword(auth, data.email ,data.password)
      // console.log(res);
      await setDoc(doc(db, "Seller",res.user?.uid), data);
    }catch(err){
      console.log(err);
    }
  }

  const handleInput=(e)=>{
    const id = e.target.id;
    const value = e.target.value;
    setData({...data, [id]:value, file})
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
          <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} id={input.id}  placeholder={input.placeholder} onChange={handleInput}/>
                </div>
              ))}
              <button disabled={perc!==null && perc !== 100 } type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
