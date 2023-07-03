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

const INCLUDE_STATUS = ['generated', 'uploaded'];

const INCLUDE_DOCUMENT = ['draft_airway_bill', 'hawb_freight_certificate'];

function CheckAWBDoStatus({
	docType,
	item,
	uploadedItem,
	handleView,
	handleSave,
}) {
	const buttonContainer = () => (
		<>
			<div className={styles.tooltip_container}>
				<Tooltip
					content="View"
					placement="top"
					interactive
				>
					<Button
						themeType="link"
						onClick={() => handleView(uploadedItem?.document_url)}
					>
						<IcMEyeopen />
					</Button>
				</Tooltip>
			</div>
			<div className={styles.tooltip_container}>
				<Tooltip
					content="Download"
					placement="top"
					interactive
				>
					<Button
						themeType="link"
						onClick={() => handleSave(uploadedItem?.document_url, uploadedItem?.document_type)}
					>
						<IcMDownload />
					</Button>
				</Tooltip>
			</div>
		</>
	);

	if (
		INCLUDE_DOCUMENT.includes(docType) && item?.trade_type === 'export'
	) {
		if (INCLUDE_STATUS.includes(JSON.parse(uploadedItem?.data)?.status)) {
			if (uploadedItem?.bl_detail_status === 'approved') {
				return buttonContainer();
			} return (
				<h4 className={styles.hold_document}>
					{DOCUMENT_STATUS_MAPPING[uploadedItem?.bl_detail_status]}
				</h4>
			);
		}
	} else if (
		uploadedItem?.do_detail_status !== 'approved'
		&& item?.trade_type === 'import'
	) {
		return <h4 className={styles.hold_document}>{DOCUMENT_STATUS_MAPPING[uploadedItem?.bl_detail_status]}</h4>;
	} else {
		return buttonContainer();
	}

	return null;
}

export default CheckAWBDoStatus;
