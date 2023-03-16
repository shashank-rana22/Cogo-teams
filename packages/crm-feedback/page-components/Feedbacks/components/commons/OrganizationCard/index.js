import { Avatar, Pill } from '@cogoport/components';

import styles from './styles.module.css';

function OrganizationCard({ organization = '', status = '' }) {
	const str = organization;
	const words = str.split(' ');
	words.splice(-1, 1);
	const avatarName = words.join(' ');
	return (
		<div className={styles.card}>
			<Avatar personName={avatarName || '--'} size="72px" />
			<div className={styles.details}>
				<span>
					Organization Name:
					<span className={styles.name}>{organization || '--'}</span>
				</span>

				<Pill
					size="md"
					color={status === 'Request Created' ? ('blue') : ('green')}
					className={styles.pill}
				>
					{status || 'Status not found'}
				</Pill>
			</div>
		</div>

	);
}

export default OrganizationCard;
