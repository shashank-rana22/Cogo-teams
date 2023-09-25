import { Input } from '@cogoport/components';
// import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CreatableHeader() {
	return (
		<div className={styles.container}>
			<div className={styles.group_name}>
				Group Name :
				{' '}
				<Input size="xs" placeholder="Enter Group Name" />
			</div>
			To :
			{' '}
		</div>

	);
}

export default CreatableHeader;
