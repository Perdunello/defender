import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Chapters from "./components/Chapters/Chapters";
import Authorisation from "./components/Login/Authorisation";
import {useDispatch, useSelector} from "react-redux";
import {toggleForm} from "./redux/AuthReducer";
import Modal from 'react-modal';

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
    const form = useSelector(state => state.auth.form)
    const dispatch = useDispatch()
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}></Route>
                <Route path={'/chapters/*'} element={<Chapters/>}></Route>
            </Routes>
            <Modal
                isOpen={isOpenForm}
                onRequestClose={() => dispatch(toggleForm())}
                style={customModalStyles}
                contentLabel="Authorisation Modal"
            ><Authorisation/></Modal>
        </div>
    );
}

export default App;
