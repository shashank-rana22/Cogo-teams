// import { Flex } from '@cogoport/components';
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

	const isBookingParty =		billing_address?.organization_id === shipmentData?.importer_exporter_id ? (
		<div className={styles.BookingText}> - Booking Party</div>
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

		return service?.display_name ? (
			<div className={styles.ServiceName}>
				{`${tradeType} ${startCase(service?.display_name)} ${
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
		<div className={styles.Container}>
			{invoice_source === 'pass_through' ? (
				<div className={styles.InvoiceSource}>
					Source -
					{startCase(invoice_source)}
				</div>
			) : null}
			<div
				className={styles.HeaderContainer}
				// className={open ? 'open' : ''}
				style={{ cursor: noActionState ? 'default' : '' }}
				onClick={!noActionState ? () => handleServiceToggle() : null}
			>
				<div style={{ width: '80%' }}>
					<div className={styles.details}>
						<div className={styles.details_child}>
							<div className={styles.Heading}>
								{billing_address?.name || billing_address?.business_name || 'VOLTAS LIMITED'}
							</div>

							{isBookingParty}
						</div>

						{noActionState ? (
							<div style={{ color: '#6CC077', fontWeight: 500 }}>
								{startCase(invoice?.status)}
							</div>
						) : null}
					</div>

					<div
						className={styles.Flex}
						// alignItems="center"
						// marginBottom={4}
					>
						<div className={styles.IconWrapper}>
							<IcMHome />
						</div>

						<div className={styles.AddressText}>
							{billing_address?.address}
						</div>
					</div>

					<div className={styles.GstNumber}>
						GST Number :
						{billing_address?.tax_number}
					</div>

					<div className={styles.InvoiceCurrency}>
						Invoice Currency:
						{' '}
						{invoice_currency}
					</div>

					{invoiceAmount && (
						<div className={styles.OverallAmount}>
							Invoice Amount:
							{invoiceAmount}
						</div>
					)}

					<div
						className={styles.Flex}
						// alignItems="center"
						// marginBottom={4}
						style={{ flexWrap: 'wrap' }}
					>
						{renderServicesTaken}
					</div>
				</div>

				{!noActionState ? (
					<div className={styles.Header}>
						{open ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
					</div>
				) : null}
			</div>

			{open ? (
				<div>
					<SelectService
						shipment_type={shipment_type}
						handleServiceChange={onServiceChange}
						invoice={invoice}
						onClose={handleServiceToggle}
						allTakenServices={allTakenServices}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Item;
