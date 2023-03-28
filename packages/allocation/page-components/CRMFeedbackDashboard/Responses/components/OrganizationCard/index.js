import { Avatar } from '@cogoport/components';

import styles from './styles.module.css';

function OrganizationCard({ organization = '' }) {
	const str = organization;
	const avatarName = `${str.split(' ')[0]} ${str.split(' ')[1] || ''}`;

	return (
		<div className={styles.card}>
			<Avatar personName={avatarName || '--'} size="72px" />
			<div className={styles.details}>
				<span>
					Data Organization Name:
					<span className={styles.name}>{organization || '--'}</span>

				</span>
				<span className={styles.dates}>
					<span>
						Request Date :
						<b> 23 Sept 2023</b>
					</span>
					<span>
						Response Date :
						<b> 23 Sept 2023</b>
					</span>
				</span>

			</div>
		</div>

	);
}

export default OrganizationCard;
