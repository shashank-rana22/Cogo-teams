import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_FIRST_ELEMENT = 0;

function SingleCheckedAccount({ modalDetailsArray = [] }) {
	return (
		<div className={styles.single_container}>
			<div className={styles.heading}>
				You are about to
				<strong> de-allocate </strong>
				&quot;
				{startCase(modalDetailsArray[DEFAULT_FIRST_ELEMENT].business_name)}
				&quot;.
				Please verify from the list below before de-allocation

			</div>

		</div>
	);
}

export default SingleCheckedAccount;
