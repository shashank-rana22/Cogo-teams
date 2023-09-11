import { Accordion, Button } from '@cogoport/components';
import React, { useState } from 'react';

import ShowIcon from './ShowIcon';
import styles from './styles.module.css';
import TagMap from './TagMap';

function Tagging({ billId = '', setRemarksVal = () => {}, status = '', setCheckItem = () => {} }:
{
	billId: string, status: string, setCheckItem: Function, setRemarksVal: React.Dispatch<React.SetStateAction<{
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
				animate
				title={(
					<div className={styles.heading_data}>
						<div className={styles.business_name}>
							Invoice Tagging
							{' '}
							<ShowIcon value={value} />
						</div>
					</div>
				)}
				style={{ padding: '6px 0' }}
			>
				<TagMap
					billId={billId}
					value={value}
					setValue={setValue}
					setRemarksVal={setRemarksVal}
					status={status}
				/>
				<Button
					size="md"
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={() => setCheckItem(
						(prev: any) => ({ ...prev, taggingCheck: true }),
					)}
					className={styles.approve_button}
				>
					Accept
				</Button>
			</Accordion>
		</div>
	);
}

export default Tagging;
