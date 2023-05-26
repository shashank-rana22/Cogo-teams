import { cl, Popover } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import SupplierReallocation from '../../../../SupplierReallocation';
import CancelAdditionalService from '../../CancelAdditionalService';

import styles from './styles.module.css';

const SERVICE_CANCEL_STATE = [
	'requested_by_importer_exporter',
	'amendment_requested_by_importer_exporter',
	'quoted_by_service_provider',
];

const ACTION_BUTTONS = [
	{ label: 'Edit', value: 'supplier_reallocation' },
	{ label: 'Cancel', value: 'cancel_service' },
];

function Item({
	item = {},
	actionButton,
	status = {},
	refetch = () => {},
	services = [],
	isSeller,
}) {
	const [showPopover, setShowPopver] = useState(false);
	const [showModal, setShowModal] = useState(null);

	ACTION_BUTTONS[0].show = status?.status === 'approved';
	ACTION_BUTTONS[1].show = SERVICE_CANCEL_STATE.includes(item?.state);

	const serviceData = services?.filter((service) => service?.service_type === item?.name);

	const price = isSeller ? item?.buy_price : item?.price;

	const closeModal = () => setShowModal(null);

	const openModal = (key) => {
		setShowPopver(false);
		setShowModal(key);
	};

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
								&nbsp;
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

				{ACTION_BUTTONS.some((btn) => btn.show) ? (
					<Popover
						visible={showPopover}
						placement="right"
						render="right"
						content={(
							<>
								{ACTION_BUTTONS.map(({ label, value, show = false }) => (show ? (
									<div
										key={value}
										className={styles.button_text}
										onClick={() => openModal(value)}
										role="button"
										tabIndex={0}
									>
										{label}
									</div>
								) : null))}
							</>
						)}
					>
						<div>
							<IcMOverflowDot
								style={{ width: '10px', height: '10px', cursor: 'pointer' }}
								onClick={() => setShowPopver(!showPopover)}
							/>
						</div>
					</Popover>
				) : null}
			</div>

			<div className={styles.status}>
				<div className={cl`${styles.tag} ${styles[status.status]}`}>
					{status?.statusName}
				</div>
				{actionButton}
			</div>

			{showModal === 'cancel_service' ? (
				<CancelAdditionalService
					id={item?.id}
					closeModal={closeModal}
					refetch={refetch}
				/>
			) : null}

			{showModal === 'supplier_reallocation' ? (
				<SupplierReallocation
					closeModal={closeModal}
					serviceData={serviceData}
					isAdditional
				/>
			) : null}

		</div>
	);
}

export default Item;
