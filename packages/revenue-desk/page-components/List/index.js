import EmptyState from '../../EmptyState';

import Card from './Card';
import styles from './styles.module.css';

function List({ shipmentList, loading, setShowDetailPage }) {
	const loadingArray = [1, 2, 3, 4];
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
