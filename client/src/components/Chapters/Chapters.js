import styles from './Chapters.module.scss'
import {useEffect, useState} from "react";

const Chapters = () => {
    const [showedSelect, setShowedSelect] = useState(true)
    const [sortBy, setSortBy] = useState('за популярністю')
    const files = [
        {id: 1, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 2, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 3, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 4, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 5, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 6, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 7, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 8, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 9, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
        {id: 10, author: 'Johanes', name: 'Тактика легкої піхоти для малих підрозділів', img: "/file_img.png"},
    ]
    useEffect(() => {
        console.log(window.location.pathname.match(/\/chapters\/(.+)/)[1])
    }, [])
    const closeSelect = () => {
        setShowedSelect(!showedSelect)
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
            {files.map(file => {
                return <div key={file.id} className={styles.file}>
                    <img src={file.img} alt=""/>
                    <div className={styles.author}>{file.author}</div>
                    <div className={styles.name}>{file.name}</div>
                    <div className={styles.button_wrapper}>
                        <button style={{background: '#625C4C', color: 'white'}}>Скачати</button>
                        <button>Перегляд</button>
                    </div>
                    <img src="/common/saves_icon.svg" className={styles.save_icon} alt="saves icon"/>
                </div>
            })}
        </div>
    </div>
}

export default Chapters