import styles from './Chapters.module.scss'
import {useEffect, useRef, useState} from "react";
import {getFilesRequest} from "../../redux/FilesReducer";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import API from "../../api/api";
import {useLocation} from "react-router-dom";

const Chapters = () => {
    const dispatch = useDispatch()
    const [showedSelect, setShowedSelect] = useState(true)
    const [sortBy, setSortBy] = useState('за популярністю')
    const files = useSelector(state => state.files.filesData)
    const chapter = useLocation();
    useEffect(() => {
        dispatch(getFilesRequest(chapter.pathname.match(/\/chapters\/(.+)/)[1]))
    }, [chapter.pathname])

    const closeSelect = () => {
        setShowedSelect(!showedSelect)
    }
    const openFile = (name) => {
        API.openFile(name).then(response => {
            if (response.status === 200) {
                const file = new Blob([response.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        })
    }
    const downloadFile = (name) => {
        const fileUrl = `http://localhost:3001/files/download/${chapter.pathname.match(/\/chapters\/(.+)/)[1]}/${name}`; // Путь к файлу на сервере
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${name}.pdf`; // Имя файла для сохранения на клиенте
        link.click();
    };
    const saveFile = (name) => {
        console.log(name)
        // API.saveFile(name).then(response => response)
    }

    return <div className={styles.main}>
        <div className={styles.settings_wrapper}>
            <div className={styles.search_wrapper}>
                <div style={{position: 'relative'}}><input placeholder={'Пошук'} className={styles.search_input}
                                                           type="search"/>
                    <img src='/common/search_icon.svg' className={styles.search_icon} width={24} height={24}
                         alt="search icon"/></div>
            </div>
            <div className={styles.select_wrapper}>
                <div className={styles.select}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                         onClick={closeSelect}>
                        <div style={{fontSize: '17px'}}>{sortBy}</div>
                        <img src="/common/arrow.svg" width={15} height={7.5}
                             className={[styles.arrow_icon, showedSelect && styles.open_arrow_icon].join(' ')}
                             alt="arrow"/>
                    </div>
                    {showedSelect &&
                    <div className={styles.filters_wrapper}>{['за популярністю', 'дата додавання'].map(filter => {
                        return <div key={filter}
                                    className={sortBy === filter ? styles.checked_filter : styles.filter}
                                    onClick={() => setSortBy(filter)}>
                            <div>{filter}</div>
                            {sortBy === filter &&
                            <img src="/common/check_mark.svg" width={15} height={11} alt="check mark"/>}</div>
                    })}</div>
                    }
                </div>
            </div>
        </div>
        <div className={styles.files_wrapper}>
            {files && files.map(file => {
                const base64Image = btoa(String.fromCharCode.apply(null, file.cover.data));
                return <div key={file.file_id} className={styles.file}>
                    <img src={`data:image/jpeg;base64, ${base64Image}`} height={150} width={150}
                         className={styles.file_cover}
                         alt={file.name + ' cover'}/>
                    <div className={styles.author}>{file.author.replace(/_/g, ' ')}</div>
                    <div className={styles.name}>{file.name.replace(/_/g, ' ')}</div>
                    <div className={styles.button_wrapper}>
                        <button style={{background: '#625C4C', color: 'white'}}
                                onClick={() => downloadFile(file.name)}>Скачати
                        </button>
                        <button onClick={() => openFile(file.name)}>Перегляд</button>
                    </div>
                    <img src="/common/saves_icon.svg" className={styles.save_icon} width={30} height={30}
                         onClick={() => saveFile(file.name)} alt="saves icon"/>
                    {/*<img src="/common/saves_icon_filled.svg" className={styles.save_icon} width={30} height={30} alt="saves icon"/>*/}
                </div>
            })}
        </div>
    </div>
}

export default Chapters