import { Button, Tooltip, CheckboxGroup, Toast } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React, { useState, useEffect, useMemo } from 'react';

import POST_REVIEWED_INVOICES from '../../../../../../helpers/post-reviewed-sales-invoices';
import ChangeCurrency from '../../ChangeCurrency';

import styles from './styles.module.css';

const OPTIONS = [];
const INITIAL_STATE_OF_TAX_TOTAL = 0;

function SelectService({
	invoice = {},
	handleServiceChange = () => {},
	onClose = () => {},
	allTakenServices = [],
}) {
	const { services = [], invoice_currency, invoice_source = '' } = invoice;
	const selected = useMemo(() => services?.map((service) => service?.serviceKey || ''), [services]);

	const [value, onChange] = useState(selected);
	const [invoiceCurrency, setInvoiceCurrency] = useState(invoice_currency);

	allTakenServices?.forEach((service) => {
		if (!POST_REVIEWED_INVOICES.includes(service?.status)) {
			const { service_total_discounted = 0 } = service || {};
			const trade_type = service?.trade_type;

			const tradeType = trade_type === 'export' ? 'Origin' : 'Destination';
			const invoiceAmount = formatAmount({
				amount   : service_total_discounted,
				currency : service?.service_total_currency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});

			const content = (
				<div className={styles.service_details}>
					<div>
						<b>Invoice Currency: </b>
						&nbsp;
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

					{invoiceAmount ? (
						<div>
							<b>Invoice Amount: </b>
							<span>{invoiceAmount}</span>
						</div>
					) : null}
				</div>
			);

			const id = service?.serviceKey;

			const serviceName = service?.service_name || service?.service_type;

			const serviceType = service?.service_type === 'shipment'
				? 'Convenience Fees'
				: `${tradeType} ${startCase(serviceName)}`;

			const servicesToPush = {
				label: (
					<Tooltip content={content} placement="bottom" theme="light">
						<div className={styles.service_name}>
							{serviceType}
						</div>
					</Tooltip>
				),
				isTaxable : service?.tax_total > INITIAL_STATE_OF_TAX_TOTAL,
				value     : id,
				...service,
			};

			OPTIONS.push(servicesToPush);
		}
	});

	const handleChange = (newValue) => {
		const addedValue = newValue?.find((id) => !value?.includes(id));

		const addedValueObj = invoice?.services?.find((objItem) => objItem?.serviceKey === addedValue);

		if (addedValueObj?.service_source === 'pass_through' && addedValueObj?.service_source !== invoice_source) {
			Toast.error("Service from different sources can't be merged!");
		} else {
			onChange(newValue);
		}
	};

	useEffect(() => {
		if (selected?.length) {
			onChange(selected);
		}
	}, [invoice.id, selected]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Select service and invoice currency</div>

			<ChangeCurrency
				invoice={invoice}
				invoiceCurrency={invoiceCurrency}
				setInvoiceCurrency={setInvoiceCurrency}
			/>

			<CheckboxGroup
				options={OPTIONS}
				onChange={handleChange}
				value={value}
			/>

			<div className={styles.row}>
				<Button
					size="sm"
					themeType="secondary"
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					size="sm"
					themeType="accent"
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
