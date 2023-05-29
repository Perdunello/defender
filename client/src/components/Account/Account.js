import {useDispatch, useSelector} from "react-redux";
import {logoutRequest} from "../../redux/AuthReducer";
import {Navigate} from "react-router-dom";

const Account = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const authData = useSelector(state => state.auth.authData)

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutRequest())
    }
    if (!isAuth) {
        return <Navigate to={'/'}/>
    }
    return <div>
        {authData && <div>
            <div>{authData.name}</div>
            <div>{authData.email}</div>
        </div>}
        <button onClick={logout}>Log out</button>
    </div>
}

export default Account