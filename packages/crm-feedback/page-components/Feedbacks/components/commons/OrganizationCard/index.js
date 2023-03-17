import { Avatar, Pill } from '@cogoport/components';
import { forwardRef } from 'react';

import styles from './styles.module.css';

function OrganizationCard(props, ref) {
	const {
		current : {
			organization = '',
			organization_id = '',
			status = '',
		},
	} = ref;
	const str = organization || '';
	const avatarName = `${str.split(' ')[0]} ${str.split(' ')[1] || ''}`;

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

export default forwardRef(OrganizationCard);
