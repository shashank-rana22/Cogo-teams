import styles from './styles.module.css';

function OrganizationUsers({
	user = {},
}) {
	console.log('user:', user);
	const { email, mobile_country_code, mobile_number, name } = user || {};

	// const handleCallModal = () => {
	// 	setModalType({
	// 		type : 'voice_call_component',
	// 		data : {
	// 			mobile_number,
	// 			country_code: mobile_country_code,
	// 		},
	// 	});
	// };

	return (
		<div className={styles.container} role="presentation">
			<div className={styles.content}>
				<div className={styles.agent_type}>Name : </div>
				<div className={styles.name}>{name || 'NA'}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.type}>Email : </div>
				<div className={styles.name}>{email || '-'}</div>
			</div>
			<div className={styles.content}>
				<div className={styles.type}>Mobile No : </div>
				<div className={styles.name}>
					{mobile_country_code}
					{mobile_number || '-'}
				</div>
			</div>
		</div>
	);
}

export default OrganizationUsers;
