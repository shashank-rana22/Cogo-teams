import Card from './Card';
import ShipmentPagination from './ShipmentPagination';
import styles from './styles.module.css';

function ShipmentList({ data = {} }) {
	function Pagination() {
		return (
			<div className={styles.pagination}>
				<ShipmentPagination data={data} />
			</div>
		);
	}
	return (
		<div>
			<Pagination />

			{data?.list?.map((item) => <Card item={item} />)}

			<Pagination />
		</div>
	);
}

export default ShipmentList;
