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

const BL_AMEND_DOCUMENT = ['draft_airway_bill', 'delivery_order', 'hawb_freight_certificate'];

function ButtonContainer({ handleView = () => {}, uploadedItem = {}, handleSave = () => {} }) {
	return (
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
}

function CheckAWBDoStatus({
	docType = '',
	item = {},
	uploadedItem = {},
	handleView = () => {},
	handleSave = () => {},
}) {
	if (
		INCLUDE_DOCUMENT.includes(docType) && item?.trade_type === 'export'
	) {
		if (INCLUDE_STATUS.includes(JSON.parse(uploadedItem?.data)?.status)) {
			if (uploadedItem?.bl_detail_status === 'approved') {
				return <ButtonContainer handleView={handleView} handleSave={handleSave} uploadedItem={uploadedItem} />;
			} return (
				<h4 className={styles.hold_document}>
					{DOCUMENT_STATUS_MAPPING[uploadedItem?.bl_detail_status]}
				</h4>
			);
		}
	} else if (!BL_AMEND_DOCUMENT?.includes(docType)) {
		return <ButtonContainer handleView={handleView} handleSave={handleSave} uploadedItem={uploadedItem} />;
	} else if (
		!['approved', null]?.includes(uploadedItem?.do_detail_status)
		&& item?.trade_type === 'import'
	) {
		return (
			<h4 className={styles.hold_document}>
				{DOCUMENT_STATUS_MAPPING[uploadedItem?.bl_detail_status
			|| uploadedItem?.do_detail_status]}
			</h4>
		);
	} else {
		return <ButtonContainer handleView={handleView} handleSave={handleSave} uploadedItem={uploadedItem} />;
	}

	return null;
}

export default CheckAWBDoStatus;
