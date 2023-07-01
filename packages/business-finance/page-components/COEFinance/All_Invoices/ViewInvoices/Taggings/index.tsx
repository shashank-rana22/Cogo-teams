import { Accordion } from '@cogoport/components';
import { IcCFtick, IcMCrossInCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';
import TagMap from './TagMap';

function Tagging({ billId, setRemarksVal, status }:
{
	billId: string, status: string, setRemarksVal: React.Dispatch<React.SetStateAction<{
		collectionPartyRemark: string;
		billingPartyRemark: string;
		invoiceDetailsRemark: string;
		taggingRemark: string;

	}>> }) {
	const [value, setValue] = useState({ approve: '', reject: '', undo: '', remark: '' });
	const showIcon = () => {
		if (value?.approve === 'approve') {
			return <IcCFtick height="17px" width="17px" />;
		} if (value?.reject === 'reject') {
			return (
				<div className={styles.color_reject}>
					<IcMCrossInCircle height="17px" width="17px" />
				</div>
			);
		}
		return null;
	};

	return (
		<div className={styles.container}>
			<Accordion
				type="text"
				title={(
					<div className={styles.heading_data}>
						<div className={styles.business_name}>
							Invoice Tagging
							{' '}
							{showIcon()}
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
