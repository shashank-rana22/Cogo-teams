import EmptyState from '../../EmptyState';
import { VALUE_FOUR, VALUE_ONE, VALUE_THREE, VALUE_TWO } from '../constants';

import Card from './Card';
import styles from './styles.module.css';

const loadingArray = [VALUE_ONE, VALUE_TWO, VALUE_THREE, VALUE_FOUR];

function List({ shipmentList, loading, setShowDetailPage }) {
	return (
		<div className={styles.container}>
			{loading && (loadingArray).map((item) => (
				<Card loading={loading} key={item} item={item} />
			))}
			{!loading && !shipmentList?.length ? <EmptyState /> : null}
			{!loading && (shipmentList || []).length ? (shipmentList || []).map((item) => (
				<Card
					item={item}
					key={item?.id}
					loading={loading}
					setShowDetailPage={setShowDetailPage}
				/>
			)) : null}
		</div>
	);
}

export default List;
