import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';
import Loader from '../../../commons/Loader';
import useListLastMileDeskShipments from '../../../hooks/useListLastMileDeskShipments';

import Card from './Card';
import ListPagination from './ListPagination';
import styles from './styles.module.css';

function ShipmentList({ stateProps }) {
	const { data, loading } = useListLastMileDeskShipments({ stateProps });
	const { list = [] } = data || {};
	return (
		<div>
			{loading && <Loader />}

			{!loading && isEmpty(list) && <EmptyState />}

			{!loading && list?.length
				&& (
					<div>
						<div className={styles.pagination_container}>
							<ListPagination data={data} stateProps={stateProps} />
						</div>

						{(list || []).map((item) => <Card item={item} stateProps={stateProps} />)}

						<div className={styles.pagination_container}>
							<ListPagination data={data} stateProps={stateProps} />
						</div>
					</div>
				)}
		</div>
	);
}
export default ShipmentList;
