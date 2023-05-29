import styles from "../Authorisation.module.scss";
import {changeModalForm, signupRequest} from "../../../redux/AuthReducer";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

const Signup = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch()
    return <div className={styles.main}>
        <div className={styles.buttonWrapper}>
            <button className={[styles.button, styles.nonactive_button].join(' ')}
                    onClick={() => dispatch(changeModalForm())}>Вхід
            </button>
            <button className={styles.button}>Реєстрація</button>
        </div>
        <form className={styles.form}>
            <div className={styles.text}>Вхід до особистого кабінету</div>
            <div className={styles.input_wrapper}>
                <input type="text" placeholder={'Прізвище'}
                       className={styles.input}{...register("last_name", {required: true})}/>
                <input type="text" placeholder={'Ім`я'}
                       className={styles.input}{...register("name", {required: true})}/>
                <input type="email" placeholder={'E-mail'}
                       className={styles.input}{...register("email", {required: true})}/>
                <input type="password" placeholder={'Пароль'}
                       className={styles.input}{...register("password", {required: true})}/>
            </div>
        </form>
        <div className={styles.enter_button_wrapper}>
            <button className={styles.enter_button}
                    onClick={handleSubmit((data) => dispatch(signupRequest(data)))}>Зареєструватися
            </button>
        </div>
    </div>
}

export default Signup