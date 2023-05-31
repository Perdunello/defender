import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Chapters from "./components/Chapters/Chapters";
import Authorisation from "./components/Authorisation/Authorisation";
import {useDispatch, useSelector} from "react-redux";
import {autoLoginRequest, toggleForm} from "./redux/AuthReducer";
import Modal from 'react-modal';
import {useEffect, useRef, useState} from "react";
import Account from "./components/Account/Account";
import FileReader from "./components/FileReader/FileReader";

const customModalStyles = {
    overlay: {
        background: 'rgba(134, 134, 134, 0.76)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        border: 0,
        background: 'transparent',
    },
};

function App() {
    const isOpenForm = useSelector(state => state.auth.isOpenForm)
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const [isLoading, setLoading] = useState(true); // Добавляем состояние загрузки

    const isEffectExecuted = useRef(false);


    useEffect(() => {
        if (!isEffectExecuted.current) {
            dispatch(autoLoginRequest()).then(() => setLoading(false));
            isEffectExecuted.current = true; // Устанавливаем флаг выполнения useEffect
        }
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(autoLoginRequest()).then(() => {
    //         console.log('render')
    //         setLoading(false)
    //     })
    // }, [])
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // console.log('render')
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/chapters/*'} element={<Chapters/>}/>
                <Route path={'/account'} element={<Account/>}/>
                <Route path={'/file'} element={<FileReader/>}/>
            </Routes>
            {!isAuth && <Modal
                isOpen={isOpenForm}
                onRequestClose={() => dispatch(toggleForm())}
                style={customModalStyles}
                contentLabel="Authorisation Modal"
                appElement={document.getElementById('root')}
            ><Authorisation/></Modal>}
        </div>
    );
}

export default App;
