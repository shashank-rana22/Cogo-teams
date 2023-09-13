import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ShowIcon from './ShowIcon';
import styles from './styles.module.css';
import TagMap from './TagMap';

const PRESENT_TAB = 'taggingTab';
const TAB_TO_OPEN = 'sidDataTab';

function Tagging({
	billId = '',
	setRemarksVal = () => {},
	status = '',
	onTabClick = (prop) => (prop),
	onAccept = (prop) => (prop),
	showTab = false,
	taggingChecked = false,
}:
{
	billId: string, status: string, onTabClick: Function,
	showTab: boolean, taggingChecked: boolean, onAccept: Function, setRemarksVal: React.Dispatch<React.SetStateAction<{
		collectionPartyRemark: string[];
		billingPartyRemark: string[];
		invoiceDetailsRemark: string[];
		taggingRemark: string[];
	}>> }) {
	const [value, setValue] = useState({ approve: '', reject: '', undo: '', remark: '' });

	return (
		<div style={{ padding: '0 20px' }}>
			<div
				className={styles.heading_data}
				role="presentation"
				onClick={() => onTabClick({ tabName: PRESENT_TAB })}
			>
				<div className={styles.business_name}>
					Invoice Tagging
					{' '}
					<ShowIcon value={value} />
				</div>
				<div>
					{
					showTab
						? <IcMArrowRotateUp height={16} width={16} />
						: <IcMArrowRotateDown height={16} width={16} />
}
				</div>
			</div>

			{showTab && (
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
						disabled={taggingChecked}
						onClick={() => onAccept({
							tabName      : PRESENT_TAB,
							tabToOpen    : TAB_TO_OPEN,
							timelineItem : 'taggingCheck',
						})}
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
