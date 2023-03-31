import { Button, Accordion } from '@cogoport/components';
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
				<div className={styles.button_container}>
					<Button
						size="md"
						themeType="secondary"
					>
						Approve
					</Button>
					<Button
						size="md"
						themeType="secondary"
						style={{ border: '1px solid #ed3726', marginLeft: '10px' }}
					>
						Reject
					</Button>
				</div>
			</Accordion>
		</div>
	);
}

export default Tagging;
