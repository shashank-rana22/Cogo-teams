// import { stakeholderCheck } from '@cogoport/bookings/commons/helpers/stakeholderCheck';
import { cl, Popover } from '@cogoport/components';
// import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

// import SupplierReallocation from '../../../../ShipmentDetails/commons/EditCancelService/SupplierReallocation';
import CancelAdditionalService from '../../CancelAdditionalService';

import styles from './styles.module.css';

const serviceCancelAllowedBy = [
	'requested_by_importer_exporter',
	'amendment_requested_by_importer_exporter',
];

const roleForCancel = ['is_so1', 'is_so2'];

function Item({
	item = {},
	actionButton,
	status = {},
	refetch = () => {},
	services = [],
	isSeller,
}) {
	console.log('item', item);
	const [show, setShow] = useState(false);
	const [showCancel, setShowCancel] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	// const stakeholder = stakeholderCheck();

	// const role = Object.keys(stakeholder || {})?.find(
	// 	(itm) => stakeholder[itm] === true,
	// );

	// TEMPORARY
	const role = 'SUPERADMIN';

	const showCancelInfo =		serviceCancelAllowedBy.includes(item?.state)
		|| (!roleForCancel.includes(role)
			&& item?.state === 'quoted_by_service_provider');

	const showEditBtn = status?.status === 'approved';

	const serviceData = services?.filter(
		(service) => service?.service_type === item?.name,
	);
	const price = isSeller ? item?.buy_price : item?.price;

	return (
		<div className={cl`${styles.container} ${styles.additional_service_item_container}`}>
			<div className={styles.additional_service_item_row}>
				<div className={styles.name_type}>
					<div className={styles.circle} />
					<div className={`${styles.additional_service_item_heading} ${styles.heading}`}>
						{startCase(item?.name)}
					</div>
					{price ? (
						<div className={styles.label}>
							<div className={styles.circle} />
							<div className={styles.heading}>
								Price:
								&nbsp;
								{/* {formatAmount({
									amount   : price,
									currency : item?.currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})} */}
							</div>
						</div>
					) : null}
				</div>

				{showCancelInfo || showEditBtn ? (
					<Popover
						show={show}
						theme="light-border"
						content={(
							<div>
								{showCancelInfo ? (
									<div
										className={styles.button_text}
										onClick={() => {
											setShow(false);
											setShowCancel(true);
										}}
										role="button"
										tabIndex={0}
									>
										Cancel
									</div>
								) : null}

								{showEditBtn ? (
									<div
										className={styles.button_text}
										onClick={() => {
											setShow(false);
											setShowEdit(true);
										}}
										role="button"
										tabIndex={0}
									>
										Edit
									</div>
								) : null}
							</div>
						)}
						interactive
					>
						<div>
							<IcMOverflowDot
								style={{ width: '10px', height: '10px', cursor: 'pointer' }}
								onClick={() => setShow(!show)}
							/>
						</div>
					</Popover>
				) : null}
			</div>

			<div className={styles.status}>
				<div className={cl`${styles.tag}`}>{status?.statusName}</div>
				{actionButton}
			</div>

			{showCancel ? (
				<CancelAdditionalService
					id={item?.id}
					showCancel={showCancel}
					setShowCancel={setShowCancel}
					setShow={setShow}
				/>
			) : null}
			{/*
			{showEdit ? (
				<SupplierReallocation
					show={showEdit}
					setShow={setShowEdit}
					serviceData={serviceData}
					refetchServices={refetch}
					isAdditional
				/>
			) : null} */}

		</div>
	);
}

export default Item;
