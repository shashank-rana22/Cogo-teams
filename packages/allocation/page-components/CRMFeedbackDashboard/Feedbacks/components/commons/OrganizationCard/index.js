import { Avatar, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { forwardRef } from 'react';

import styles from './styles.module.css';

function OrganizationCard(props, ref) {
	const {
		current : {
			organization = '',
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
					<span className={styles.name}>{startCase(organization || '--')}</span>
				</span>

				<Pill
					size="md"
					color={status === 'Request Created' ? 'blue' : 'green'}
					className={styles.pill}
				>
					{status || 'Nil'}
				</Pill>
			</div>
		</div>

	);
}

export default forwardRef(OrganizationCard);
