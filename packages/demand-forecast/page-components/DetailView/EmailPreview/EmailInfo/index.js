import styles from './styles.module.css';

function EmailInfo() {
	return (
		<div>
			<div className={styles.title}>
				Dear Valued Supplier,
			</div>

			<div className={styles.body}>
				We would like to receive quotes from
				you for the below requirements (Please refer to attachment). Please feel free to reach out to the
				Supplier Relations Team if you have any doubts or concerns.
			</div>
			<div className={styles.footer}>
				Thanks & Regards,
			</div>
		</div>
	);
}

export default EmailInfo;
