import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import PaginationBar from '../../../common/PaginationBar';
import Card from '../Card';

import styles from './styles.module.css';

function ShipmentList({ data = {}, loading }) {
	const { list = [] } = data || {};

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>
				<PaginationBar data={data} />

				<ul className={styles.list}>
					{list?.map((item) => <li key={item?.id}><Card data={item} /></li>)}
				</ul>

				<PaginationBar data={data} />

			</>
		);
}
export default ShipmentList;
