import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DisplayDetails({
	vendorInformation,
}) {
	return (
		<div
			className={styles.container}
		>
			{
                Object.keys(vendorInformation).map((title) => (<h3>{startCase(title)}</h3>))
            }
		</div>
	);
}

export default DisplayDetails;
