import { Button, Tooltip } from '@cogoport/components';
import { IcMEyeopen, IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const DOCUMENT_STATUS_MAPPING = {
	hold       : 'Document On Hold',
	requested  : 'Pending for Approval',
	eligible   : 'At Authority Desk',
	ineligible : 'At Authority Desk',
};

const includeStatus = ['generated', 'uploaded'];

function CheckAWBDoStatus({
	docType,
	item,
	uploadedItem,
	handleView,
	handleSave,
}) {
	const buttonContainer = () => (
		<>
			<Button
				themeType="link"
				onClick={() => handleView(uploadedItem?.document_url)}
			>
				<div className={styles.tooltip_container}>
					<Tooltip
						content="View"
						placement="top"
						interactive
					>
						<IcMEyeopen />
					</Tooltip>
				</div>
			</Button>
			<Button
				themeType="link"
				onClick={() => handleSave(uploadedItem?.document_url, uploadedItem?.document_type)}
			>
				<div className={styles.tooltip_container}>
					<Tooltip
						content="Download"
						placement="top"
						interactive
					>
						<IcMDownload />
					</Tooltip>
				</div>
			</Button>
		</>
	);

	if (
		['draft_airway_bill', 'hawb_freight_certificate']?.includes(docType) && item?.trade_type === 'export'
	) {
		if (includeStatus.includes(JSON.parse(uploadedItem?.data)?.status)) {
			if (uploadedItem?.bl_detail_status === 'approved') {
				return buttonContainer();
			} return (
				<h4 className={styles.hold_document}>
					{DOCUMENT_STATUS_MAPPING[uploadedItem?.bl_detail_status]}
				</h4>
			);
		}
	} else if (
		uploadedItem?.do_detail_status === 'approved'
		&& item?.trade_type === 'import'
	) {
		return buttonContainer();
	} else if (
		item?.trade_type === 'import'
	) {
		return <h4 className={styles.hold_document}>{DOCUMENT_STATUS_MAPPING[uploadedItem?.bl_detail_status]}</h4>;
	} else {
		return buttonContainer();
	}

	return null;
}

export default CheckAWBDoStatus;
