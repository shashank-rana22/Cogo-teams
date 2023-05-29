import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';

import Card from './Card';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

function ShipmentList({ loading, data = {} }) {
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
					<>
						<Pagination />

						{(list || [])?.map((item) => <Card item={item} />)}

						<Pagination />
					</>
				)}
		</div>
	);
}
export default ShipmentList;
