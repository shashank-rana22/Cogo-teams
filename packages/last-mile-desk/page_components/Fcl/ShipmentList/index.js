import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';

import Card from './Card';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

function ShipmentList({ loading = false, data = {} }) {
	const { list = [] } = data || {};

	function Pagination() {
		return (
			<div className={styles.pagination_container}>
				<ListPagination data={data} />
			</div>
		);
	}

	return (
		<div>
			{!loading && isEmpty(list)
				? <EmptyState />
				: (
					<div className={styles.container}>
						<Pagination />

						{(list || []).map((item) => <Card item={item} key={item?.id} />)}

						<Pagination />
					</div>
				)}
		</div>
	);
}
export default ShipmentList;
