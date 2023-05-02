import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';

import Card from './Card';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

function ShipmentList({ loading, data = {} }) {
	const { list = [] } = data || {};

	return (
		<div>
			{!loading && isEmpty(list)
				? <EmptyState />
				: (
					<div>
						<div className={styles.pagination_container}>
							<ListPagination data={data} />
						</div>

						{(list || [])?.map((item) => <Card item={item} />)}

						<div className={styles.pagination_container}>
							<ListPagination data={data} />
						</div>
					</div>
				)}
		</div>
	);
}
export default ShipmentList;
