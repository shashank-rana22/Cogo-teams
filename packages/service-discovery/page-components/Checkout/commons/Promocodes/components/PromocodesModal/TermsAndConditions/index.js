import styles from './styles.module.css';

function TermsAndConditions({ termsAndConditions = [] }) {
	return (
		<div className={styles.terms_and_conditions_container}>
			<div className={styles.title}>Terms and Conditions</div>
			{termsAndConditions?.map((item) => (
				<div key={item}>
					<span>-</span>
					<span>{item}</span>
				</div>
			))}
		</div>
	);
}

export default TermsAndConditions;
