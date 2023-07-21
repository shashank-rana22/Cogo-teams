import { Placeholder, Table, Popover } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { DECIMAL_PLACES, PERCENTAGE_CHECK, TOTAL_PERCENT } from '../../../constants';
import ShowLineItems from '../../ServiceWiseDetails/RatesCard/Card/ShowLineItems';

import styles from './styles.module.css';

function BuyServiceQuotation({ data, loading, profitPercentage, priceData, itemData, servicesList }) {
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
		.map(
			({ service_type, total_price, source, currency, service_id, line_items }) => ({
				service_type: `${startCase(service_type)} (${(servicesList || [])
					.find((service) => service?.id === service_id)?.trade_type === 'export'
					? 'Origin' : 'Destination'})`,
				total_price_discounted: formatAmount({
					amount  : total_price,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				}),
				source: startCase(source),
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
			view more
		</div>
	</Popover>,
			}),
		);
	return (
		<>
			<div className={styles.container}>
				<div className={profitPercentage >= PERCENTAGE_CHECK
					? styles.postive_container : styles.negative_container}
				>
					Profit:
					{!loading
						? (
							<div style={{ padding: '10px' }}>
								{Number(Number(profitPercentage) * TOTAL_PERCENT).toFixed(DECIMAL_PLACES)}
								%
							</div>
						) : <Placeholder height="25px" width="100px" />}

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
									/Contr.
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
