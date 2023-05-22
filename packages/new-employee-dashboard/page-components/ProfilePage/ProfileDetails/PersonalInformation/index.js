import styles from './styles.module.css';

function PersonalInformation({ detail }) {
	const {
		name,
		gender,
		personal_email,
		mobile_country_code,
		mobile_number,
	} = detail || {};

	return (
		<div className={styles.container}>
			<div className={styles.flex_wrapper}>
				<div className={styles.label}>Name </div>
				<div>
					:
					{' '}
					{name}
				</div>
			</div>

			<div className={styles.flex_wrapper}>
				<div className={styles.label}>Personal Email </div>
				<div>
					:
					{' '}
					{personal_email}
				</div>
			</div>

			<div className={styles.flex_wrapper}>
				<div className={styles.label}>Mobile Number</div>
				<div>
					:
					{' '}
					{mobile_country_code}
					{mobile_number}
				</div>
			</div>

			<div className={styles.flex_wrapper}>
				<div className={styles.label}>Gender </div>
				<div>
					:
					{' '}
					{gender}
				</div>
			</div>

		</div>
	);
}

export default PersonalInformation;
