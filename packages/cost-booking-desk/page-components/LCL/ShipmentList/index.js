import EmptyState from '../../../common/EmptyState';

import Card from './Card';
import ShipmentPagination from './ShipmentPagination';
import styles from './styles.module.css';

function ShipmentList({ data = {} }) {
	const { list = [] } = data || {};

	function Pagination() {
		return (
			<div className={styles.pagination}>
				<ShipmentPagination data={data} />
			</div>
		);
	}

	return list.length === 0
		? <EmptyState /> : (
			<div>
				<Pagination />

				{list?.map((item) => <Card item={item} />)}

				<Pagination />
			</div>
		);
}

export default ShipmentList;
