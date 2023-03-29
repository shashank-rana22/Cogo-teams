import { Avatar } from '@cogoport/components';

import styles from './styles.module.css';

function OrganizationCard({ third_party = '' }) {
	const str = third_party;
	const avatarName = `${str.split(' ')[0]} ${str.split(' ')[1] || ''}`;

	return (
		<div className={styles.card}>
			<Avatar personName={avatarName || '--'} size="72px" />
			<div className={styles.details}>
				Data Organization Name:
				<span className={styles.name}>{third_party || '--'}</span>
			</div>
		</div>

	);
}

export default OrganizationCard;
