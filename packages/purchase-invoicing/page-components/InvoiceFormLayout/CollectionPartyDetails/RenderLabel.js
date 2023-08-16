import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RenderLabel({ bank = {} }) {
	return (
		<div className={styles.flex}>
			{bank?.data?.bank_name}
			{' '}
			/
			{' '}
			{bank?.data?.branch_name}
			<div className={styles.verification_status}>
				{startCase(bank?.verification_status)}
			</div>
		</div>
	);
}
export default RenderLabel;
