import { Placeholder, Table } from '@cogoport/components';
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
			total_price_discounted : `${currency} ${total_price_discounted}`,
			source                 : startCase(source),
		}));

	const updatedPriceData = {
		sell_price: `${data?.net_total_price_currency} ${data?.net_pre_tax_total}`,
	};
	useEffect(() => {
		(chargesData || []).forEach((item) => {
			updatedPriceData[item.service_type] = item.total_price_discounted;
		});
		setPriceData(updatedPriceData);
	}, [service_charges]);

	return (
		<>
			<div className={styles.text1}>
				Complete Sell Quotation
				{' '}
				:
				{!loading ? (
					<div style={{ marginLeft: '5px' }}>
						{data?.net_total_price_currency}
						{' '}
						{data?.net_pre_tax_total}
					</div>
				)
					: <Placeholder height="25px" width="150px" />}

			</div>
			<Table columns={columns} data={chargesData} loading={loading} className={styles.table_container} />
		</>
	);
}

export default SellServiceQuotation;
