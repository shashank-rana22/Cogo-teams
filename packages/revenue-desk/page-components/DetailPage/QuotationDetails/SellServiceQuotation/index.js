import { Placeholder, Table } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetShipmentQuotation from '../../../../hooks/useGetShipmentQuotation';

import styles from './styles.module.css';

function SellServiceQuotation({ shipmentData = {}, setPriceData, priceData }) {
	const columns = [
		{ Header: 'Services', accessor: 'service_type' },
		{ Header: 'Services Charge', accessor: 'total_price_discounted' },
		{ Header: 'Source', accessor: 'source' },
	];
	const { data, loading } = useGetShipmentQuotation({ shipmentData, priceData });
	const service_charges = data?.service_charges || [];
	const chargesData = (service_charges || [])
		.filter((item) => item.service_type)
		.map(({ service_type, total_price_discounted, source, currency }) => ({
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
		}));
	const updatedPriceData = {};
	useEffect(() => {
		(chargesData || []).forEach((item) => {
			updatedPriceData[item.service_type] = item.total_price_discounted;
		});
		if (data?.net_total_price_currency) {
			updatedPriceData.sell_price = `${data?.net_total_price_currency} ${data?.net_pre_tax_total}`;
		}
		setPriceData(updatedPriceData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data)]);
	return (
		<>
			<div className={styles.text1}>
				Complete Sell Quotation
				{' '}
				:
				{!loading ? (
					<div style={{ marginLeft: '5px' }}>
						{formatAmount({
							amount   : data?.net_pre_tax_total,
							currency : data?.net_total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				)
					: <Placeholder height="25px" width="150px" />}

			</div>
			<Table columns={columns} data={chargesData} loading={loading} className={styles.table_container} />
		</>
	);
}

export default SellServiceQuotation;
