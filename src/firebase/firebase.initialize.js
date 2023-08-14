import firebaseConfig from "./firebase.config"
import { initializeApp } from "firebase/app";

export default function initalizeApp(){
    initializeApp(firebaseConfig)
}