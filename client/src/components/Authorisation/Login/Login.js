import styles from "../Authorisation.module.scss";
import {changeModalForm, loginRequest} from "../../../redux/AuthReducer";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

const Login = () => {
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm();

    return <div className={styles.main}>
        <div className={styles.buttonWrapper}>
            <button className={styles.button}>Вхід</button>
            <button className={[styles.button, styles.nonactive_button].join(' ')}
                    onClick={() => dispatch(changeModalForm())}>Реєстрація
            </button>
        </div>
        <form className={styles.form}>
            <div className={styles.text}>Вхід до особистого кабінету</div>
            <div className={styles.input_wrapper}>
                <input type="email" placeholder={'E-mail'} {...register("email", {required: true})}
                       className={styles.input}/>
                <input type="password" placeholder={'Пароль'}{...register("password", {required: true})}
                       className={styles.input}/>
            </div>
        </form>
        <div className={styles.enter_button_wrapper}>
            <button className={styles.enter_button}
                    onClick={handleSubmit((data) => dispatch(loginRequest(data)))}>Увійти
            </button>
        </div>
    </div>
}
export default Login