import { cl, Popover } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import SupplierReallocation from '../../../../SupplierReallocation';
import CancelAdditionalService from '../../CancelAdditionalService';

import Action from './Action';
import styles from './styles.module.css';

const serviceCancelAllowedBy = [
	'requested_by_importer_exporter',
	'amendment_requested_by_importer_exporter',
];

function Item({
	item = {},
	status = {},
	refetch = () => {},
	services = [],
	isSeller = false,
	stakeholderConfig = {},
	serviceListItem = {},
	activeStakeholder = '',
	setShowModal = () => {},
	setItem = () => {},
}) {
	const [show, setShow] = useState(false);
	const [showCancel, setShowCancel] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	const showCancelInfo = serviceCancelAllowedBy.includes(item?.state)
	|| (item?.state === 'quoted_by_service_provider');

	const canEditCancelService = !!stakeholderConfig?.overview?.can_edit_cancel_service;

	const showEditBtn = status?.status === 'approved';

	const serviceData = services?.filter(
		(service) => service?.service_name === item?.name,
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
							<div className={styles.price}>
								Price:
								{' '}
								{formatAmount({
									amount   : price,
									currency : item?.currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
							</div>
						</div>
					) : null}
				</div>

				{showCancelInfo || showEditBtn ? (
					<Popover
						show={show}
						placement="right"
						render="right"
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
				<div className={cl`${styles.tag} ${styles[status.status]}`}>
					{status?.statusName}
				</div>
				<Action
					status={status}
					serviceListItem={serviceListItem}
					setShowModal={setShowModal}
					setItem={setItem}
					activeStakeholder={activeStakeholder}
					canEditCancelService={canEditCancelService}
				/>
			</div>

			{showCancel ? (
				<CancelAdditionalService
					id={item?.id}
					showCancel={showCancel}
					setShowCancel={setShowCancel}
					refetch={refetch}
				/>
			) : null}

			{showEdit ? (
				<SupplierReallocation
					setShow={setShowEdit}
					serviceData={serviceData}
					isAdditional
				/>
			) : null}

		</div>
	);
}

export default Item;
