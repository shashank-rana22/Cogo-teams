import { Button, Tooltip, CheckboxGroup, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';
import { startCase } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import POST_REVIEWED_INVOICES from '../../../../../../helpers/post-reviewed-sales-invoices';
import ChangeCurrency from '../../ChangeCurrency';

import styles from './styles.module.css';

const MAIN_SERVICES = 'fcl_freight_service';

const TAX_TOTAL_CUTOFF_VALUE = 0;

function Content({ service = {}, invoiceAmount = {} }) {
	return (
		<div className={styles.service_details}>
			<div>
				<b>
					Invoice Currency:
					{' '}
				</b>
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
}

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

	let options = [];

	allTakenServices?.forEach((service) => {
		const countryCode = getCountryDetails({ country_id: invoice?.billing_address?.organization_country_id });

		if (!POST_REVIEWED_INVOICES.includes(service?.status)) {
			const trade_type = !MAIN_SERVICES.includes(service?.service_type)
				? service?.trade_type
				: null;

			let tradeType = '';
			if (trade_type === 'export') {
				tradeType = 'Origin';
			} else if (trade_type === 'import') {
				tradeType = 'Destination';
			}

			const isBas = (service?.line_items || []).some((lineItem) => lineItem?.code === 'BAS');

			const invoiceAmount = formatAmount({
				amount   : service?.service_total_discounted,
				currency : service?.service_total_currency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			});

			const id_with_igst = service?.serviceKey;

			const serviceName = service?.service_name || service?.service_type;

			const serviceType = service?.service_type === 'shipment'
				? 'Convenience Fees'
				: `${tradeType} ${startCase(serviceName)} ${service?.is_igst ? '(IGST)' : ''} ${isBas
					&& !service?.is_igst ? '(BAS)' : ''}`;

			const servicesToPush = {
				label: (
					<Tooltip
						content={<Content service={service} invoiceAmount={invoiceAmount} />}
						placement="bottom"
						theme="light"
					>
						<div className={styles.service_name}>
							{serviceType}
						</div>
					</Tooltip>
				),
				isTaxable : service?.tax_total > TAX_TOTAL_CUTOFF_VALUE,
				value     : id_with_igst,
				...service,
			};

			options.push(servicesToPush);
		}

		options = options?.filter((opt) => {
			const isCargoInsuranceService = opt?.service_type === 'cargo_insurance_service';
			const isCountrySupported = GLOBAL_CONSTANTS.service_supported_countries.feature_supported_service
				.cargo_insurance.countries.includes(countryCode);

			return !(isCargoInsuranceService && !isCountrySupported) && !opt?.processing;
		});
	});

	const handleChange = (newValue) => {
		const addedValue = newValue?.find((id) => !value?.includes(id));

		const addedValueObj = invoice?.services?.find(
			(objItem) => objItem?.serviceKey === addedValue,
		);

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
	}, [invoice.id, selected]);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Select service and invoice currency</div>

			<ChangeCurrency
				invoice={invoice}
				invoiceCurrency={invoiceCurrency}
				setInvoiceCurrency={setInvoiceCurrency}
			/>

			<div className={styles.checkbox_container}>
				<CheckboxGroup
					options={options}
					onChange={handleChange}
					value={value}
				/>
			</div>

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
