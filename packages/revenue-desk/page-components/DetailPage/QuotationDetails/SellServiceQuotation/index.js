import { Placeholder, Table, Popover } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { PERCENTAGE_CHECK } from '../../../constants';
import ShowLineItems from '../../ServiceWiseDetails/RatesCard/Card/ShowLineItems';

import styles from './styles.module.css';

function SellServiceQuotation({ setPriceData, data, loading, profitAmount, profitCurrency, itemData, servicesList }) {
	const columns = [
		{ Header: 'Services', accessor: 'service_type' },
		{ Header: 'Services Charge', accessor: 'total_price_discounted' },
		{ Header: 'Line Items', accessor: 'details' },
		{ Header: 'Source', accessor: 'source' },
	];
	const service_charges = data?.service_charges || [];
	const [showLineItems, setShowLineItems] = useState(false);

	const chargesData = (service_charges || [])
		.filter((item) => item.service_type)
		.map(({ service_type, total_price_discounted, source, currency, service_id, line_items }) => ({
			service_type: `${startCase(service_type)} (${(servicesList || [])
				.find((service) => service?.id === service_id)?.trade_type === 'export'
				? 'Origin' : 'Destination'})`,
			total_price_discounted: formatAmount({
				amount  : total_price_discounted,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),
			source               : source === 'cogo_assured_rate' ? 'Cogo Assured' : startCase(source),
			service_id,
			currency,
			total_price_discount : total_price_discounted,
			key                  : service_id,
			details:
	<Popover
		placement="top"
		trigger="mouseenter"
		render={(
			<ShowLineItems
				serviceType={service_type}
				lineItems={line_items}
			/>
		)}
	>
		<div
			onClick={() => setShowLineItems(!showLineItems)}
			style={{ textDecoration: 'underline' }}
			role="button"
			tabIndex={0}
		>
			view
		</div>
	</Popover>,
		}));

	const other_charges = (service_charges || [])
		.filter((item) => !item.service_type)
		.map(({ total_price_discounted, source, currency, service_id, line_items }) => ({
			service_type           : 'Miscellaneous Fees',
			total_price_discounted : formatAmount({
				amount  : total_price_discounted,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),
			source               : startCase(source),
			service_id,
			currency,
			key                  : service_id,
			total_price_discount : total_price_discounted,
			details:
	<Popover
		placement="top"
		trigger="mouseenter"
		render={(
			<ShowLineItems
				serviceType="Conv. Charges"
				lineItems={line_items}
			/>
		)}
	>
		<div
			onClick={() => setShowLineItems(!showLineItems)}
			style={{ textDecoration: 'underline' }}
			role="button"
			tabIndex={0}
		>
			view
		</div>
	</Popover>,
		}));

	const UPDATED_PRICE_DATA = {};
	useEffect(() => {
		(chargesData || []).forEach((item) => {
			UPDATED_PRICE_DATA[item.service_id] = [item?.currency, item?.total_price_discount];
		});
		if (data?.net_total_price_currency) {
			UPDATED_PRICE_DATA.sell_price = [data?.net_total_price_currency, data?.net_pre_tax_total];
			UPDATED_PRICE_DATA.exchange_rate = data?.exchange_rate;
		}
		setPriceData(UPDATED_PRICE_DATA);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data)]);

	chargesData.push(...other_charges);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.text1}>
					<div style={{ textDecoration: 'underline' }}>
						Complete Sell Quotation
					</div>
					{!loading ? (
						<div style={{ marginLeft: '5px', display: 'flex' }}>
							{formatAmount({
								amount   : data?.net_pre_tax_total,
								currency : data?.net_total_price_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
							<div style={{ color: '#221F20', margin: '0 4px' }}>|</div>
							{formatAmount({
								amount   : Number(data?.net_pre_tax_total) / Number(data?.exchange_rate),
								currency : 'USD',
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</div>
					)
						: <Placeholder height="25px" width="150px" />}
					{
						itemData?.shipment_type === 'fcl_freight' ? (
							<div className={styles.text1}>
								<div style={{ marginLeft: '5px', display: 'flex' }}>
									{loading
										? <Placeholder width="150px" height="25px" />
										: formatAmount({
											amount: Number(data?.net_pre_tax_total)
											/ Number(itemData?.containers_count),
											currency : data?.net_total_price_currency,
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}
									/Contr.
									<div style={{ color: '#221F20', margin: '0 4px' }}>|</div>
									{loading
										? <Placeholder width="150px" height="25px" />
										: formatAmount({
											amount: (Number(data?.net_pre_tax_total)
											/ Number(itemData?.containers_count))
										/ Number(data?.exchange_rate),
											currency : 'USD',
											options  : {
												style                 : 'currency',
												currencyDisplay       : 'code',
												maximumFractionDigits : 2,
											},
										})}
									/Contr.
								</div>
							</div>
						) : null
					}

				</div>
				<div className={profitAmount >= PERCENTAGE_CHECK
					? styles.postive_container : styles.negative_container}
				>
					<div style={{ textDecoration: 'underline' }}>
						Profit Amount
					</div>
					{!loading ? (
						<div style={{ marginLeft: '5px', display: 'flex' }}>
							{formatAmount({
								amount   : profitAmount,
								currency : profitCurrency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
							<div style={{ color: '#221F20', margin: '0 4px' }}>|</div>
							{formatAmount({
								amount   : Number(profitAmount) / Number(data?.exchange_rate),
								currency : 'USD',
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</div>
					)
						: <Placeholder height="25px" width="150px" />}

					{itemData?.shipment_type === 'fcl_freight' ? (
						<div style={{ marginLeft: '5px', display: 'flex' }}>
							{formatAmount({
								amount   : Number(profitAmount) / Number(itemData?.containers_count),
								currency : profitCurrency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
							/Contr.
							<div style={{ color: '#221F20', margin: '0 4px' }}>|</div>
							{formatAmount({
								amount: (Number(profitAmount) / Number(data?.exchange_rate))
								/ Number(itemData?.containers_count),
								currency : 'USD',
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
							/Contr.
						</div>
					)
						: null}
				</div>

			</div>

			<Table columns={columns} data={chargesData} loading={loading} className={styles.table_container} />
		</>
	);
}

export default SellServiceQuotation;
