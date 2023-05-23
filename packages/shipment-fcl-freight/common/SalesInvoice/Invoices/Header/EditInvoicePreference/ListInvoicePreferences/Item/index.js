import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import {
	IcMHome,
	IcMArrowRotateUp,
	IcMArrowRotateDown,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import SelectService from './SelectService';
import styles from './styles.module.css';

const MAIN_SERVICES = 'fcl_freight_service';
const ACTION_STATE = ['reviewed', 'approved', 'revoked'];

function Item({
	invoice = {},
	shipmentData = {},
	handleServiceChange = () => {},
	openedService = null,
	setOpenedService = () => {},
	allTakenServices = [],
}) {
	const { shipment_type = '' } = shipmentData;
	const {
		billing_address,
		invoice_currency = '', invoice_source = '',
		invoicing_party_total_discounted = '',
		invoice_total_currency = '',
		services = [],
		status = '',
		id = '',
	} = invoice || {};

	const open = openedService && openedService?.id === id;

	const handleServiceToggle = () => {
		setOpenedService(open ? null : invoice);
	};

	const onServiceChange = (currentInvoice, value) => {
		handleServiceToggle();
		handleServiceChange(currentInvoice, value);
	};

	const isBookingParty = billing_address?.organization_id === shipmentData?.importer_exporter_id ? (
		<div className={styles.booking_text}> - Booking Party</div>
	) : null;

	const renderServicesTaken = (services || []).map((service) => {
		const trade_type = MAIN_SERVICES !== service?.service_type
			? service?.trade_type
			: null;

		const tradeType = trade_type === 'export' ? 'Origin' : 'Destination';
		const isBas = (service?.line_items || []).some(
			(lineItem) => lineItem?.code === 'BAS',
		);

		return service?.service_type ? (
			<div className={styles.service_name}>
				{`${tradeType} ${startCase(service?.service_type)} ${
					service?.is_igst ? '(IGST INVOICE)' : ''
				} ${isBas && !service?.is_igst ? '(BAS)' : ''}`}
			</div>
		) : null;
	});

	const noActionState = ACTION_STATE.includes(status);

	return (
		<div className={styles.container}>
			{invoice_source === 'pass_through' ? (
				<div className={styles.invoice_source}>
					Source -
					{startCase(invoice_source)}
				</div>
			) : null}

			<div
				className={cl`${styles.header_container} ${open ? styles.open : ''}`}
				style={{ cursor: noActionState ? 'default' : '' }}
				onClick={!noActionState ? () => handleServiceToggle() : null}
			>
				<div className={styles.info_div}>
					<div className={styles.details}>
						<div className={styles.details_child}>
							<div className={styles.heading}>
								{billing_address?.name || billing_address?.business_name}
							</div>

							{isBookingParty}
						</div>

						{noActionState ? (
							<div className={styles.invoice_status}>
								{startCase(status)}
							</div>
						) : null}
					</div>

					<div className={styles.flex}>
						<div className={styles.icon_wrapper}>
							<IcMHome />
						</div>

						<div className={styles.address_text}>
							{billing_address?.address}
						</div>
					</div>

					<div className={styles.billing_info}>
						GST Number:&nbsp;
						{billing_address?.tax_number}
					</div>

					<div className={styles.billing_info}>
						Invoice Currency:
						&nbsp;
						{invoice_currency}
					</div>

					{invoicing_party_total_discounted ? (
						<div className={styles.overall_amount}>
							Invoice Amount:
							&nbsp;
							{formatAmount({
								amount   : invoicing_party_total_discounted,
								currency : invoice_total_currency,
								options  : {
									style           : 'currency',
									currencyDisplay : 'code',
								},
							})}
						</div>
					) : null}

					<div
						className={styles.flex}
					>
						{renderServicesTaken}
					</div>
				</div>

				{!noActionState ? (
					<div className={styles.header}>
						{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
					</div>
				) : null}
			</div>

			{open ? (
				<SelectService
					shipment_type={shipment_type}
					handleServiceChange={onServiceChange}
					invoice={invoice}
					onClose={handleServiceToggle}
					allTakenServices={allTakenServices}
				/>
			) : null}
		</div>
	);
}

export default Item;
