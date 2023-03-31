import { Accordion } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import TagMap from './TagMap';

function Tagging({ billId }:
{ billId: string }) {
	return (
		<div className={styles.container}>
			<Accordion
				type="text"
				title={(
					<div className={styles.heading}>
						<div className={styles.business_name}>Invoice Tagging</div>
					</div>
				)}
			>
				<div className={styles.line} />
				<TagMap billId={billId} />
			</Accordion>
		</div>
	);
}

export default Tagging;
