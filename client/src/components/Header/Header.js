import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toggleForm} from "../../redux/AuthReducer";

const Header = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)

    return <div className={styles.main_wrapper}>
        <div className={styles.logo_wrapper}>
            <NavLink to={'/'}>
                <img src="/common/defender_logo.png" width={200} height={'auto'} className={styles.logo}
                     alt="logo defender"/>
            </NavLink>
        </div>
        <nav className={styles.navigation}>
            <ul className={styles.chapters_wrapper}>
                <NavLink to={'chapters/small_arms'}>
                    <li className={styles.chapter}>Стрілецька зброя</li>
                </NavLink>
                <NavLink to={'chapters/tactical_medicine'}>
                    <li className={styles.chapter}>Тактична медицина</li>
                </NavLink>
                <NavLink to={'chapters/survival'}>
                    <li className={styles.chapter}>Виживання</li>
                </NavLink>
                <NavLink to={'chapters/statutes'}>
                    <li className={styles.chapter}>Статути</li>
                </NavLink>
                <NavLink to={'chapters/machinery'}>
                    <li className={styles.chapter}>Техніка</li>
                </NavLink>
                <NavLink to={'chapters/tactics'}>
                    <li className={styles.chapter}>Тактика</li>
                </NavLink>
                <NavLink to={'chapters/general_military_literature'}>
                    <li className={styles.chapter}>Загально-військова література</li>
                </NavLink>

            </ul>
            <ul className={styles.icons_wrapper}>
                <li className={styles.icon_item}><img src="/common/search_icon.svg" className={styles.icon_image}
                                                      width={30} height={30} alt="search icon"/></li>
                <li className={styles.icon_item}><img src="/common/saves_icon.svg" className={styles.icon_image}
                                                      width={30} height={30} alt="saves icon"/></li>
                <li className={styles.icon_item}><img src="/common/downloads_icon.svg" className={styles.icon_image}
                                                      width={30} height={30} alt="downloads icon"/></li>
                <li className={styles.icon_item} onClick={() => dispatch(toggleForm())}>{isAuth ? <NavLink
                    to={'/account'}><img
                    src="/common/account_icon.svg" className={styles.icon_image}
                    width={30} height={30} alt="account icon"/></NavLink> : <img
                    src="/common/account_icon.svg" className={styles.icon_image}
                    width={30} height={30} alt="account icon"/>}</li>
            </ul>
        </nav>
    </div>
}

export default Header