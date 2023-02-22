import styles from './styles.module.css';

function Partners({ detailsData }) {
	const {
		partner = {},
		roles_data = [],
		manager_data = {},
	} = detailsData || {};

	return (
		<div className={styles.card_container}>

			<div className={styles.header_container}>
				<div className={styles.header_text}>Partners</div>

			</div>

			<div className={styles.elements}>
				<div className={styles.label_value_container}>
					<div className={styles.label_text}>Partner </div>
					<div className={styles.value_text}>
						{partner?.business_name || '-'}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}>Role</div>
					<div className={styles.value_text}>
						{roles_data?.[0]?.name || '-'}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}>Manager Name</div>
					<div className={styles.value_text}>
						{manager_data?.name || '-'}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label_text}> Manager Email</div>
					<div className={styles.value_text}>
						{manager_data?.email}
					</div>
				</div>

			</div>

		</div>
	);
}
export default Partners;
