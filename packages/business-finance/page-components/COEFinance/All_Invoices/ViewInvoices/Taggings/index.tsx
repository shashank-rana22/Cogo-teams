import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ShowIcon from './ShowIcon';
import styles from './styles.module.css';
import TagMap from './TagMap';

function Tagging({ billId = '', setRemarksVal = () => {}, status = '', setCheckItem = (prop) => (prop) }:
{
	billId: string, status: string, setCheckItem: Function, setRemarksVal: React.Dispatch<React.SetStateAction<{
		collectionPartyRemark: string[];
		billingPartyRemark: string[];
		invoiceDetailsRemark: string[];
		taggingRemark: string[];
	}>> }) {
	const [value, setValue] = useState({ approve: '', reject: '', undo: '', remark: '' });
	const [showData, setShowData] = useState(false);

	const onAccept = () => {
		setShowData(false);
		setCheckItem(
			(prev: any) => ({ ...prev, taggingCheck: true }),
		);
	};

	return (
		<div style={{ padding: '0 20px' }}>
			<div
				className={styles.heading_data}
				role="presentation"
				onClick={() => setShowData(!showData)}
			>
				<div className={styles.business_name}>
					Invoice Tagging
					{' '}
					<ShowIcon value={value} />
				</div>
				<div>
					{
					showData
						? <IcMArrowRotateUp height={16} width={16} />
						: <IcMArrowRotateDown height={16} width={16} />
}
				</div>
			</div>

			{showData && (
				<div>
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
						onClick={onAccept}
						className={styles.approve_button}
					>
						Accept
					</Button>
				</div>
			)}
		</div>
	);
}

export default Tagging;
