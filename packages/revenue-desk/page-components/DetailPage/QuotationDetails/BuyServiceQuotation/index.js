import { Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import useGetBuyQuotation from '../../../../hooks/useGetBuyQuotation';

import styles from './styles.module.css';

function BuyServiceQuotation({ shipmentData = {} }) {
	const columns = [
		{ Header: 'Services', accessor: 'service_type' },
		{ Header: 'Services Charge', accessor: 'total_price_discounted' },
		{ Header: 'Source', accessor: 'source' },
	];
	const { service_charges, loading } = useGetBuyQuotation({ shipmentData });
	const data = (service_charges || [])
		.filter((item) => item.service_type)
		.map(
			({ service_type, total_price, source, currency }) => ({
				service_type           : startCase(service_type),
				total_price_discounted : `${currency} ${total_price}`,
				source                 : startCase(source),
			}),
		);
	return (
		<Table columns={columns} data={data} loading={loading} className={styles.table_container} />
	);
}
export default BuyServiceQuotation;
