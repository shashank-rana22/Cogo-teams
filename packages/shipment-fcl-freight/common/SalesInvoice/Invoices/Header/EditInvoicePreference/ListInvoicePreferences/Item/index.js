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

const mainServices = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
];

function Item({
	invoice = {},
	shipmentData = {},
	handleServiceChange,
	openedService,
	setOpenedService,
	allTakenServices,
}) {
	const { shipment_type = '' } = shipmentData;
	const {
		billing_address,
		invoice_currency = '',
		invoice_source = '',
	} = invoice || {};

	const open = openedService && openedService?.id === invoice?.id;

	const handleServiceToggle = () => {
		if (open) {
			setOpenedService(null);
		} else {
			setOpenedService(invoice);
		}
	};

	const onServiceChange = (currentInvoice, value) => {
		handleServiceToggle();
		handleServiceChange(currentInvoice, value);
	};

	const isBookingParty = billing_address?.organization_id === shipmentData?.importer_exporter_id ? (
		<div className={styles.booking_text}> - Booking Party</div>
	) : null;

	const renderServicesTaken = (invoice?.services || []).map((service) => {
		const trade_type = !mainServices.includes(service?.service_type)
			? service?.trade_type
			: null;

		let tradeType = '';
		if (trade_type === 'export') {
			tradeType = 'Origin';
		} else if (trade_type === 'import') {
			tradeType = 'Destination';
		}
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

	const noActionState = ['reviewed', 'approved', 'revoked'].includes(
		invoice?.status,
	);

	const invoiceAmount = formatAmount({
		amount   : invoice?.invoicing_party_total_discounted || 0,
		currency : invoice?.invoice_total_currency,
		options  : {
			style           : 'currency',
			currencyDisplay : 'code',
		},
	});

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
				<div style={{ width: '100%' }}>
					<div className={styles.details}>
						<div className={styles.details_child}>
							<div className={styles.heading}>
								{billing_address?.name || billing_address?.business_name}
							</div>

							{isBookingParty}
						</div>

						{noActionState ? (
							<div className={styles.invoice_status}>
								{startCase(invoice?.status)}
							</div>
						) : null}
					</div>

					<div
						className={styles.flex}
					>
						<div className={styles.icon_wrapper}>
							<IcMHome />
						</div>

						<div className={styles.address_text}>
							{billing_address?.address}
						</div>
					</div>

					<div className={styles.gst_number}>
						GST Number :
						{billing_address?.tax_number}
					</div>

					<div className={styles.invoice_currency}>
						Invoice Currency:
						{' '}
						{invoice_currency}
					</div>

					{invoiceAmount && (
						<div className={styles.overall_amount}>
							Invoice Amount:
							{invoiceAmount}
						</div>
					)}
					<div
						className={styles.flex}
						style={{ flexWrap: 'wrap' }}
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
