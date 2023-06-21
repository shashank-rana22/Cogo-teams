import { Placeholder, Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function BuyServiceQuotation({ data, loading, profitPercentage, priceData, itemData }) {
	const columns = [
		{ Header: 'Services', accessor: 'service_type' },
		{ Header: 'Services Charge', accessor: 'total_price_discounted' },
		{ Header: 'Source', accessor: 'source' },
	];
	const service_charges = data?.service_charges || [];
	const chargesData = (service_charges || [])
		.filter((item) => item.service_type)
		.map(
			({ service_type, total_price, source, currency }) => ({
				service_type           : startCase(service_type),
				total_price_discounted : formatAmount({
					amount  : total_price,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				}),
				source: startCase(source),
			}),
		);
	return (
		<>
			<div className={styles.container}>
				<div className={profitPercentage >= 0 ? styles.postive_container : styles.negative_container}>
					Profit
					{' '}
					:
					{' '}
					{Number(Number(profitPercentage) * 100).toFixed(2)}
					%
				</div>
				<div className={styles.text2}>
					<div style={{ textDecoration: 'underline' }}>
						Complete Buy Quotation
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
								amount   : Number(data?.net_pre_tax_total) / Number(priceData?.exchange_rate),
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
										/ Number(priceData?.exchange_rate),
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
			</div>

			<Table columns={columns} data={chargesData} loading={loading} className={styles.table_container} />
		</>

	);
}
export default BuyServiceQuotation;
