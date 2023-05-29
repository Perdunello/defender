import styles from './Authorisation.module.scss'
import {useSelector} from "react-redux";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const Authorisation = () => {
    const form = useSelector(state => state.auth.form)
    return form === 'login'
        ? <Login/>
        : <Signup/>
}

export default Authorisation