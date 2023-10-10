import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';
import Loader from '../../../commons/Loader';
import useListLastMileDeskShipments from '../../../hooks/useListLastMileDeskShipments';

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

function ShipmentList() {
	const { data = {}, loading } = useListLastMileDeskShipments();

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

			{(list || []).map((item) => <Card item={item} key={item?.id} />)}

			<Pagination data={data} />
		</>
	);
}
export default ShipmentList;
