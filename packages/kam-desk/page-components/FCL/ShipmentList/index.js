import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import ListPagination from '../../../common/ListPagination';
import Card from '../Card';

import styles from './styles.module.css';

function ShipmentList({ data = {}, loading }) {
	const { list = [] } = data;

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

						{ list?.map((item) => <Card data={item} />) }

						<Pagination />
					</>
				)}
		</div>
	);
}
export default ShipmentList;
