import styles from './MainPage.module.scss'
import {NavLink} from "react-router-dom";

const MainPage = () => {
    return <div className={styles.main_wrapper}>
        <div className={styles.photo_wrapper}>
            <img src="main_photo.png" className={styles.defender_photo} alt="Defender photo"/>
            <div className={styles.name}>DEFENDER</div>
        </div>
        <div className={styles.grid_wrapper}>
            <div className={styles.block_a}>
                <NavLink to={'chapters/small_arms'}>
                    <div className={styles.item}>
                        <img src="chapter_image.jpg" className={styles.chapter_img} alt=""/>
                        <div className={styles.chapter_name}>Стрілецька зброя</div>
                    </div>
                </NavLink>
                <NavLink to={'chapters/tactical_medicine'}>
                    <div className={styles.item}>
                        <img src="chapter_image.jpg" className={styles.chapter_img} alt=""/>
                        <div className={styles.chapter_name}>Тактична медицина</div>
                    </div>
                </NavLink>
            </div>
            <div className={styles.block_b}>
                <NavLink to={'chapters/survival'}>
                    <div className={styles.item}>
                        <img src="chapter_image.jpg" className={styles.chapter_img} alt=""/>
                        <div className={styles.chapter_name}>Виживання</div>
                    </div>
                </NavLink>
                <NavLink to={'chapters/statutes'}>
                    <div className={styles.item}>
                        <img src="chapter_image.jpg" className={styles.chapter_img} alt=""/>
                        <div className={styles.chapter_name}>Статути</div>
                    </div>
                </NavLink>
                <NavLink to={'chapters/machinery'}>
                    <div className={styles.item}>
                        <img src="chapter_image.jpg" className={styles.chapter_img} alt=""/>
                        <div className={styles.chapter_name}>Техніка</div>
                    </div>
                </NavLink>
            </div>
            <div className={styles.block_c}>
                <NavLink to={'chapters/tactics'}>
                    <div className={styles.item}>
                        <img src="chapter_image.jpg" className={styles.chapter_img} alt=""/>
                        <div className={styles.chapter_name}>Тактика</div>
                    </div>
                </NavLink>
                <NavLink to={'chapters/general_military_literature'}>
                    <div className={styles.item}>
                        <img src="chapter_image.jpg" className={styles.chapter_img} alt=""/>
                        <div className={styles.chapter_name}>Загально-військова література</div>
                    </div>
                </NavLink>
            </div>
        </div>
    </div>
}

export default MainPage