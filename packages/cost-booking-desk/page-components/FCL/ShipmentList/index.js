import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import Loader from '../../../common/Loader';
import useListCostBookingDeskShipments from '../../../hooks/useListCostBookingDeskShipments';

import Card from './Card';
import ShipmentPagination from './ShipmentPagination';
import styles from './styles.module.css';

function ShipmentList() {
	const { loading = false, data = {} } = useListCostBookingDeskShipments();

	const { list = [] } = data || {};

	function Pagination() {
		return (
			<div className={styles.pagination}>
				<ShipmentPagination data={data} />
			</div>
		);
	}

	if (isEmpty(list)) {
		return <EmptyState />;
	}

	return (loading ? <Loader /> : (
		<div>
			<Pagination />

			{(list || [])?.map((item) => (
				<Card
					item={item}
					key={item?.id}
				/>
			))}

			<Pagination />
		</div>
	)
	);
}

export default ShipmentList;
