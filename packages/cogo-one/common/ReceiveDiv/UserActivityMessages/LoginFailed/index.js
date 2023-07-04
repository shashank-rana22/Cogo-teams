import styles from './styles.module.css';

function LoginFailed() {
	return (
		<>
			<div className={styles.title}>Login Attempt Failed.</div>
			<div className={styles.message}>
				Entered incorrect password for email “worxxxxxtpa@gmail.com”
			</div>
		</>
	);
}

export default LoginFailed;
