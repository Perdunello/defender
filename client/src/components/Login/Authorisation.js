import styles from './Authorisation.module.scss'
import {changeModalForm} from "../../redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";

const Authorisation = () => {
    const dispatch = useDispatch()
    const form = useSelector(state => state.auth.form)
    return form === 'login'
        ? <div className={styles.main}>
            <div className={styles.buttonWrapper}>
                <button className={styles.button}>Вхід</button>
                <button className={[styles.button, styles.nonactive_button].join(' ')}
                        onClick={() => dispatch(changeModalForm())}>Реєстрація
                </button>
            </div>
            <div className={styles.form}>
                <div className={styles.text}>Вхід до особистого кабінету</div>
                <div className={styles.input_wrapper}>
                    <input type="email" placeholder={'E-mail'} className={styles.input}/>
                    <input type="password" placeholder={'Пароль'} className={styles.input}/>
                </div>
            </div>
            <div className={styles.enter_button_wrapper}>
                <button className={styles.enter_button}>Увійти</button>
            </div>
        </div>
        : <div className={styles.main}>
            <div className={styles.buttonWrapper}>
                <button className={[styles.button, styles.nonactive_button].join(' ')}
                        onClick={() => dispatch(changeModalForm())}>Вхід
                </button>
                <button className={styles.button}>Реєстрація</button>
            </div>
            <div className={styles.form}>
                <div className={styles.text}>Вхід до особистого кабінету</div>
                <div className={styles.input_wrapper}>
                    <input type="email" placeholder={'Прізвище'} className={styles.input}/>
                    <input type="password" placeholder={'Ім`я'} className={styles.input}/>
                    <input type="password" placeholder={'E-mail'} className={styles.input}/>
                    <input type="password" placeholder={'Пароль'} className={styles.input}/>
                </div>
            </div>
            <div className={styles.enter_button_wrapper}>
                <button className={styles.enter_button}>Зареєструватися</button>
            </div>
        </div>

}

export default Authorisation