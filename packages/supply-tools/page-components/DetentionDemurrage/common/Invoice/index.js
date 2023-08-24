import { Loader } from '@cogoport/components';

import useListShipmentInvoiceCombinations from '../../../../hooks/useListShipmentInvoiceCombinations';

import Card from './Card';
import styles from './styles.module.css';

function Invoice({ listFilters = {}, shipment_type = '' }) {
	const { data, loading } = useListShipmentInvoiceCombinations({ defaultFilters: listFilters });

	const { list = [] } = data || {};

	if (loading) {
		return <div className={styles.loader}><Loader /></div>;
	}

	return (
		<div className={styles.container}>
			{list?.map((invoice) => (
				<Card
					key={invoice?.id}
					invoice={invoice}
					shipment_type={shipment_type}
				/>
			))}
		</div>
	);
}

export default Invoice;
