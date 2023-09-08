import { Accordion } from '@cogoport/components';
import React, { useState } from 'react';

import ShowIcon from './ShowIcon';
import styles from './styles.module.css';
import TagMap from './TagMap';

function Tagging({ billId = '', setRemarksVal = () => {}, status = '' }:
{
	billId: string, status: string, setRemarksVal: React.Dispatch<React.SetStateAction<{
		collectionPartyRemark: string[];
		billingPartyRemark: string[];
		invoiceDetailsRemark: string[];
		taggingRemark: string[];

	}>> }) {
	const [value, setValue] = useState({ approve: '', reject: '', undo: '', remark: '' });

	return (
		<div>
			<Accordion
				type="text"
				title={(
					<div className={styles.heading_data}>
						<div className={styles.business_name}>
							Invoice Tagging
							{' '}
							<ShowIcon value={value} />
						</div>
					</div>
				)}
			>
				<div className={styles.line} />
				<TagMap
					billId={billId}
					value={value}
					setValue={setValue}
					setRemarksVal={setRemarksVal}
					status={status}
				/>
			</Accordion>
		</div>
	);
}

export default Tagging;
