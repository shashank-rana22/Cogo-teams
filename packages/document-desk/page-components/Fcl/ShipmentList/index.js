import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import Loader from '../../../common/Loader';

import Card from './Card';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

function Pagination({ data = {} }) {
	return (
		<div className={styles.pagination_container}>
			<ListPagination data={data} />
		</div>
	);
}

function ShipmentList({ loading = false, data = {} }) {
	const { list = [] } = data || {};

	if (loading) {
		return <Loader />;
	}

	if (!loading && isEmpty(list)) {
		return <EmptyState />;
	}

	return (
		<>
			<Pagination data={data} />

			{(list || [])?.map((item) => <Card key={item?.id} item={item} />)}

			<Pagination data={data} />
		</>
	);
}
export default ShipmentList;
