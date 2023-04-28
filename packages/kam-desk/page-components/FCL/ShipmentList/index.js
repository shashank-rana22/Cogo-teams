import ListPagination from '../../../common/ListPagination';
import Card from '../Card';

import styles from './styles.module.css';

function ShipmentList({ data = {} }) {
	const { list = [] } = data;

	return (
		<div>
			{list?.length
				? (
					<div>
						<div className={styles.pagination_container}>
							<ListPagination data={data} />
						</div>

						{ list?.map((item) => <Card data={item} />) }

						<div className={styles.pagination_container}>
							<ListPagination data={data} />
						</div>

					</div>
				)
				: null}
		</div>
	);
}
export default ShipmentList;
