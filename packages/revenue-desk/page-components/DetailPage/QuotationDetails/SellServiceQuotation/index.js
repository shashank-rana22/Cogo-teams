import { Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import useGetShipmentQuotation from '../../../../hooks/useGetShipmentQuotation';

import styles from './styles.module.css';

function SellServiceQuotation({ shipmentData = {} }) {
	const columns = [
		{ Header: 'Services', accessor: 'service_type' },
		{ Header: 'Services Charge', accessor: 'total_price_discounted' },
		{ Header: 'Source', accessor: 'source' },
	];
	const { service_charges, loading } = useGetShipmentQuotation({ shipmentData });
	const data = (service_charges || [])
		.filter((item) => item.service_type)
		.map(
			({ service_type, total_price_discounted, source, tax_total_price_currency }) => ({
				service_type           : startCase(service_type),
				total_price_discounted : `${tax_total_price_currency} ${total_price_discounted}`,
				source                 : startCase(source),
			}),
		);

	return (
		<Table columns={columns} data={data} loading={loading} className={styles.table_container} />
	);
}

export default SellServiceQuotation;
