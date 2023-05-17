import { Button, Tooltip, CheckboxGroup, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import ChangeCurrency from '../../ChangeCurrency';

import styles from './styles.module.css';

const mainServices = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
];

function SelectService({
	invoice,
	handleServiceChange,
	onClose,
	allTakenServices,
}) {
	const selected = invoice.services?.map((service) => service?.serviceKey);

	const [value, onChange] = useState(selected);

	const { invoice_currency, invoice_source = '' } = invoice;
	const [invoiceCurrency, setInvoiceCurreny] = useState(invoice_currency);

	const options = [];
	allTakenServices?.forEach((service) => {
		if (!['reviewed', 'approved', 'revoked'].includes(service?.status)) {
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

			const invoiceAmount = formatAmount({
				amount   : service?.service_total_discounted || 0,
				currency : service?.service_total_currency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});

			const content = (
				<div className={styles.ServiceDetails}>
					<div>
						<b>Invoice Currency: </b>
						{' '}
						<span>{service?.currency}</span>
					</div>

					{service?.detail?.container_size ? (
						<div>
							<b>Container Size: </b>
							<span>{`${startCase(service?.detail?.container_size)} FT`}</span>
						</div>
					) : null}

					{service?.detail?.commodity ? (
						<div>
							<b>Commodity: </b>
							<span>{startCase(service?.detail?.commodity)}</span>
						</div>
					) : null}

					{invoiceAmount && (
						<div>
							<b>Invoice Amount: </b>
							<span>{invoiceAmount}</span>
						</div>
					)}
				</div>
			);

			const id_with_igst = service?.serviceKey;

			const servicesToPush = {
				label: (
					<Tooltip content={content} placement="top" theme="light">
						<div className={styles.ServiceName}>
							{service?.service_type === 'shipment'
								? 'Convenience Fees'
								: `${tradeType} ${startCase(
									service?.service_name || service?.service_type,
								)} ${service?.is_igst ? '(IGST)' : ''} ${
									isBas && !service?.is_igst ? '(BAS)' : ''
								}`}
						</div>
					</Tooltip>
				),
				isTaxable : service?.tax_total > 0,
				value     : id_with_igst,
				...service,
			};
			const isCountryIdOtherThanIndia =				service?.service_type === 'cargo_insurance_service'
				&& invoice?.billing_address?.organization_country_id
					!== GLOBAL_CONSTANTS?.country_ids.IN;

			if (!isCountryIdOtherThanIndia) {
				options.push(servicesToPush);
			}
		}
	});

	const handleChange = (newValue, obj) => {
		const addedValue = newValue?.find((id) => !value?.includes(id));
		const addedValueObj = obj?.find((objItem) => objItem?.value === addedValue);

		if (
			addedValueObj?.service_source === 'pass_through'
			&& addedValueObj?.service_source !== invoice_source
		) {
			Toast.error("Service from different sources can't be merged!");
		} else {
			onChange(newValue);
		}
	};

	useEffect(() => {
		if (selected?.length) {
			onChange(selected);
		}
	}, [invoice?.id]);

	return (
		<div className={styles.Container}>
			<div className={styles.Heading}>Select service and invoice currency</div>
			<ChangeCurrency
				invoice={invoice}
				invoiceCurrency={invoiceCurrency}
				setInvoiceCurreny={setInvoiceCurreny}
			/>

			<CheckboxGroup
				options={options}
				onChange={handleChange}
				multiple
				className="primary lg"
				theme="admin"
				value={value}
			/>

			<div className={styles.Row}>
				<Button
					style={{ marginRight: 16 }}
					className="secondary sm"
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					className="primary sm ie_add_services"
					onClick={() => handleServiceChange(invoice, {
						service_ids      : value,
						invoice_currency : invoiceCurrency,
					})}
				>
					Add Services
				</Button>
			</div>
		</div>
	);
}

export default SelectService;
