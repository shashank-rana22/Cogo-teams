import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ShowIcon from './ShowIcon';
import styles from './styles.module.css';
import TagMap from './TagMap';

const PRESENT_TAB = 'taggingTab';
const TAB_TO_OPEN = 'sidDataTab';

function Tagging({
	setRemarksVal = () => {},
	status = '',
	onTabClick = () => {},
	onAccept = () => {},
	showTab = false,
	taggingChecked = false,
	mappingsData = {},
	setCheckItem = () => {},
}) {
	const [value, setValue] = useState({ approve: '', reject: '', undo: '', remark: '' });

	const switchDetails = () => {
		onAccept({
			tabName      : PRESENT_TAB,
			tabToOpen    : TAB_TO_OPEN,
			timelineItem : 'taggingCheck',
		});
	};

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

			{showTab ? (
				<div>
					<TagMap
						value={value}
						setValue={setValue}
						setRemarksVal={setRemarksVal}
						status={status}
						mappingsData={mappingsData}
						switchDetails={switchDetails}
						taggingChecked={taggingChecked}
						setCheckItem={setCheckItem}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Tagging;
