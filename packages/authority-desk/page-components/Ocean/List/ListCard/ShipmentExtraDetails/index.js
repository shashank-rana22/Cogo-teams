import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCRedCircle, IcCYelloCircle, IcMLiveChat } from '@cogoport/icons-react';
import { upperCase } from '@cogoport/utils';
import React from 'react';

import { BlContent } from './BlContent';
import DetentionAndDemurrage from './DetentionAndDemurrage';
import styles from './styles.module.css';

function ShipmentExtraDetails({ item = {}, tabsState = {} }) {
	const { bill_of_ladings = [], delivery_orders = [] } = item;

	const docsList = tabsState?.activeTab === 'do' ? delivery_orders : bill_of_ladings;

	const IconMapping = {
		red    : <IcCRedCircle height={12} width={12} />,
		yellow : <IcCYelloCircle height={12} width={12} />,
	};

	const remarks = (docsList || []).flatMap(
		(doc) => (doc?.bl_remarks || doc?.remarks || []).flatMap(
			(remark) => (remark?.comment !== 'System Invalidated'
				? { ...remark, bl_number: doc.bl_number || doc.do_number }
				: []),
		),
	);

	return (
		<div className={styles.shipment_extra_details}>

			<DetentionAndDemurrage item={item} />

			<div className={styles.documents_and_invoices}>
				<div className={styles.validation}>
					{item?.invoice_status?.is_payment_validated
						? IconMapping.yellow
						: IconMapping.red}
					{' '}
					Sales Invoice Status:
					{' '}
					<span className={styles.text}>
						{item?.invoice_status?.is_invoice_validated
							? 'System Validated'
							: 'Validation Pending'}
						{' '}
					</span>
				</div>
			</div>

			<div className={styles.bl_details}>
				<div>
					<div>
						BL Type:
						{' '}
						{upperCase(
							item?.freight_service?.bl_category || item?.local_service?.bl_category,
						)}
					</div>
					<div>
						Expected Release Date:
						{' '}
						{formatDate({
							date       : docsList?.expected_release_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</div>
				</div>
				<div>
					<Tooltip
						placement="top"
						content={<BlContent remarks={remarks} />}
						interactive
						className={styles.all_remarks}
					>
						<div>
							<IcMLiveChat />
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
}

export default ShipmentExtraDetails;
