import { Placeholder, Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import styles from './styles.module.css';

function SellServiceQuotation({ setPriceData, data, loading, profitAmount, profitCurrency, itemData }) {
	const columns = [
		{ Header: 'Services', accessor: 'service_type' },
		{ Header: 'Services Charge', accessor: 'total_price_discounted' },
		{ Header: 'Source', accessor: 'source' },
	];
	const service_charges = data?.service_charges || [];
	const chargesData = (service_charges || [])
		.filter((item) => item.service_type)
		.map(({ service_type, total_price_discounted, source, currency, service_id }) => ({
			service_type           : startCase(service_type),
			total_price_discounted : formatAmount({
				amount  : total_price_discounted,
				currency,
				options : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),
			source: startCase(source),
			service_id,
		}));
	const updatedPriceData = {};
	useEffect(() => {
		(chargesData || []).forEach((item) => {
			updatedPriceData[item.service_id] = item.total_price_discounted;
		});
		if (data?.net_total_price_currency) {
			updatedPriceData.sell_price = `${data?.net_total_price_currency} ${data?.net_pre_tax_total}`;
			updatedPriceData.exchange_rate = data?.exchange_rate;
		}
		setPriceData(updatedPriceData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data)]);
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
									{!data?.net_pre_tax_total
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
									<div style={{ color: '#221F20', margin: '0 4px' }}>|</div>
									{!data?.net_pre_tax_total
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
				<div className={profitAmount >= 0 ? styles.postive_container : styles.negative_container}>
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
