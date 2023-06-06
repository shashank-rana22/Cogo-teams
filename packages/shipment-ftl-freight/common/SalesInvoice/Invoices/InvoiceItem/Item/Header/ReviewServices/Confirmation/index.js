import { Checkbox } from '@cogoport/components';
import React from 'react';

import ClickableDiv from '../../../../../../../ClickableDiv';

import styles from './styles.module.css';

function Confirmation({ value = false, setValue = () => {} }) {
	return (
		<ClickableDiv
			className={styles.container}
			onClick={() => setValue(!value)}
		>
			<Checkbox checked={value} />

			<div className={styles.confirm_label}>
				I have verified the invoice and ensured that all the services taken &
				charges incurred during the shipment have been billed to the customer
			</div>
		</ClickableDiv>
	);
}

export default Confirmation;
