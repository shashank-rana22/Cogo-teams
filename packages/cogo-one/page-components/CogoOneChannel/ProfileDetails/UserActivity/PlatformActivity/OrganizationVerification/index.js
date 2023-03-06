import { format, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function OrganizationVerification({ organization }) {
	const { created_at, short_name, kyc_verified_at } = organization || {};
	if (isEmpty(organization)) {
		return (
			<div className={styles.empty_state}>
				No Data Found...
			</div>
		);
	}
	return (
		<>
			<div className={styles.activity_date}>
				<div className={styles.dot} />
				<div className={styles.durations}>
					{format(created_at, 'HH:mm a dd MMM')}
				</div>
			</div>
			<div className={styles.main_card}>
				<div className={styles.card}>
					<div className={styles.title}>{short_name}</div>
					<div className={styles.description}>
						Kyc is verified on
						<span>
							{format(kyc_verified_at, 'dd MMM yyyy')}
						</span>
						at
						<span>
							{format(kyc_verified_at, 'HH:mm a')}
						</span>
					</div>
				</div>

			</div>
		</>
	);
}
export default OrganizationVerification;
