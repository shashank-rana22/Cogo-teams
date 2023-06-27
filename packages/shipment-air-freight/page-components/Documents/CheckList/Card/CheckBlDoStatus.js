import { Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DOCUMENT_STATUS_MAPPING = {
	hold       : 'Document On Hold',
	requested  : 'Pending for Approval',
	eligible   : 'At Authority Desk',
	ineligible : 'At Authority Desk',
};

const includeStatus = ['generated', 'uploaded'];

function CheckBlDoStatus({
	docType,
	item,
	uploadedItem,
	handleView,
	handleSave,
}) {
	if (
		['draft_airway_bill', 'hawb_freight_certificate']?.includes(docType) && item?.trade_type === 'export'
	) {
		if (includeStatus.includes(JSON.parse(uploadedItem?.data)?.status)) {
			if (uploadedItem?.bl_detail_status === 'approved') {
				return (
					<>
						<Button
							themeType="link"
							onClick={() => handleView(uploadedItem?.document_url)}
						>
							View
						</Button>
						<Button
							themeType="link"
							onClick={() => handleSave(uploadedItem?.document_url)}
						>
							Download
						</Button>
					</>
				);
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
		return (
			<>
				<Button
					themeType="link"
					onClick={() => handleView(uploadedItem?.document_url)}
				>
					View
				</Button>
				<Button
					themeType="link"
					onClick={() => handleSave(uploadedItem?.document_url)}
				>
					Download
				</Button>
			</>
		);
	} else if (
		uploadedItem?.do_detail_status === 'hold'
		&& item?.trade_type === 'import'
	) {
		return <h4 className={styles.hold_document}>Document On Hold</h4>;
	} else if (
		uploadedItem?.do_detail_status === 'requested'
		&& item?.trade_type === 'import'
	) {
		return <h4 className={styles.hold_document}>Pending for Approval</h4>;
	} else if (
		(uploadedItem?.do_detail_status === 'ineligible'
			|| uploadedItem?.do_detail_status === 'eligible')
		&& item?.trade_type === 'import'
	) {
		return <h4 className={styles.hold_document}>At Authority Desk</h4>;
	} else {
		return (
			<>
				<Button
					themeType="link"
					onClick={() => handleView(uploadedItem?.document_url)}
				>
					View
				</Button>
				<Button
					themeType="link"
					onClick={() => handleSave(uploadedItem?.document_url)}
				>
					Download
				</Button>
			</>
		);
	}

	return null;
}

export default CheckBlDoStatus;
