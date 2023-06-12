import { Placeholder, Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import useGetBuyQuotation from '../../../../hooks/useGetBuyQuotation';

import styles from './styles.module.css';

function BuyServiceQuotation({ shipmentData = {} }) {
	const columns = [
		{ Header: 'Services', accessor: 'service_type' },
		{ Header: 'Services Charge', accessor: 'total_price_discounted' },
		{ Header: 'Source', accessor: 'source' },
	];
	const { data, loading } = useGetBuyQuotation({ shipmentData });
	const service_charges = data?.service_charges || [];
	const chargesData = (service_charges || [])
		.filter((item) => item.service_type)
		.map(
			({ service_type, total_price, source, currency }) => ({
				service_type           : startCase(service_type),
				total_price_discounted : `${currency} ${total_price}`,
				source                 : startCase(source),
			}),
		);
	return (
		<>
			<div className={styles.text2}>
				Complete Buy Quotation
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
export default BuyServiceQuotation;
