import { Avatar } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { forwardRef } from 'react';

import styles from './styles.module.css';

function OrganizationCard(props, ref) {
	const {
		current : {
			third_party = '',
		},
	} = ref;

	const str = third_party;

	const avatarName = `${str.split(' ')[0]} ${str.split(' ')[1] || ''}`;

	return (
		<div className={styles.card}>
			<Avatar personName={avatarName || '--'} size="72px" />
			<div className={styles.details}>
				Data Organization Name:
				<span className={styles.name}>{startCase(third_party || '--')}</span>
			</div>
		</div>

	);
}

export default forwardRef(OrganizationCard);
