import { Tooltip } from '@cogoport/components';
import { IcCRedCircle, IcCYelloCircle, IcMLiveChat } from '@cogoport/icons-react';
import { startCase, format, upperCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../commons/EmptyState';

import styles from './styles.module.css';

function ShipmentExtraDetails({ item = {} }) {
	const { freight_service = {}, bill_of_ladings = {}, delivery_orders = {} } = item;

	const {
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	} = freight_service;

	const docsList = bill_of_ladings || delivery_orders || [];

	const IconMapping = {
		red    : <IcCRedCircle height={12} width={12} />,
		yellow : <IcCYelloCircle height={12} width={12} />,
	};

	const remarks = docsList.flatMap(
		(doc) => (doc?.bl_remarks || doc?.remarks || []).flatMap(
			(remark) => (remark?.comment !== 'System Invalidated'
				? { ...remark, bl_number: doc.bl_number }
				: []),
		),
	);

	const blContent = (
		<div className={styles.bl_remark_detail}>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Comment</th>
						<th>Date and time</th>
						<th>Bl Number</th>
					</tr>
				</thead>
				<tbody>
					{remarks.length ? (
						<td colSpan={5}>
							<EmptyState customClass={styles.customized_empty_state} />
						</td>
					) : remarks.map((rm) => (
						<tr>
							<td>{rm?.name}</td>
							<td>{startCase(rm?.status)}</td>
							<td>{rm?.comment}</td>
							<td>{format(rm?.created_at, 'dd MMM yyyy - hh:mm a', null, true)}</td>
							<td>{rm?.bl_number}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	return (
		<div className={styles.shipment_extra_details}>
			<div className={styles.detention_demurrage}>
				<span>
								&nbsp; Origin : &nbsp;
					{free_days_detention_origin || 0}
								&nbsp; Detention days , &nbsp;
					{free_days_demurrage_origin || 0}
								&nbsp; Dumurrage Days
				</span>
				<br />
				<span>
								&nbsp; Destination : &nbsp;
					{free_days_detention_destination || 0}
								&nbsp; Detention days, &nbsp;
					{free_days_demurrage_destination || 0}
								&nbsp; Demurrage days &nbsp;
				</span>
			</div>

			<div className={styles.documents_and_invoices}>
				<div className={styles.validation}>
					{item?.invoice_status?.is_payment_validated
						? IconMapping.yellow
						: IconMapping.red}
					Sales Invoice Status:
					<span className={styles.text}>
						{item?.invoice_status?.is_invoice_validated
							? 'System Validated '
							: 'Validation Pending'}
									&nbsp;
					</span>
				</div>
			</div>

			<div className={styles.bl_details}>
				<div>
					<div>
						BL Type : &nbsp;
						{upperCase(
							item?.freight_service?.bl_category,
						)}
					</div>
					<div>
						Expected Release Date : &nbsp;
						{format(
							item?.bill_of_ladings
								?.expected_release_date,
							'dd MMM yyyy',
							null,
							true,
						)}
					</div>
				</div>
				<div>
					<Tooltip
						placement="top"
						content={blContent}
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
