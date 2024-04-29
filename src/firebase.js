import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBH61o2SzUCz7SFYe75IWWmnUdftu8D99E",
  authDomain: "netflix-clone-d8597.firebaseapp.com",
  projectId: "netflix-clone-d8597",
  storageBucket: "netflix-clone-d8597.appspot.com",
  messagingSenderId: "503134048333",
  appId: "1:503134048333:web:11a48560fb946e371a0c04"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (name, email, password)=>{
        try {
          const res =  await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
          });
        } catch (error) {
            console.log(error)
            toast.error(error.code.split('/')[1].split('-').join(" "))

        }
}

const login = async (email, password)=>{
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "))
        }
}

const logout = () =>{
        signOut(auth);
}
export { auth, db, login, signup, logout };