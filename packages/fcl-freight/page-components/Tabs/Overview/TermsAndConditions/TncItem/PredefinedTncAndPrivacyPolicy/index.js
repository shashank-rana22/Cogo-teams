import styles from './styles.module.css';

function PredefinedTncAndPrivacyPolicy() {
	return (
		<div className={styles.container}>
			For more Info. regarding Terms And Conditions, Please refer our
			<div
				className={styles.anchor}
				href="https://www.cogoport.com/terms-and-conditions"
				target="_blank"
			>
				Terms & Conditions
			</div>
			and
			<div className={styles.anchor} href="https://www.cogoport.com/privacy-policy" target="_blank">
				Privacy policy
			</div>
		</div>
	);
}

export default PredefinedTncAndPrivacyPolicy;
