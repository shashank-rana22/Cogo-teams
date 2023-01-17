import { Pagination } from '@cogoport/components';

import Card from './Card';
import Loader from './Loader';
import styles from './styles.module.css';

function CardList({
	data, setPage, loading, selectedCard, setSelectedCard, revertCounts,
}) {
	return (
		<div className={styles.leftpanel}>
			<div className={styles.heading}>
				{data?.total}
				{' '}
				Port Pairs
			</div>
			{!loading && (data?.data || []).map((item) => (
				<Card
					item={item}
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCard}
					revertCounts={revertCounts}
				/>
			))}
			{
				loading && [1, 2, 3, 4, 5].map(() => (<Loader />))
			}
			{!loading && (data?.total > data?.page) ? (
				<Pagination
					currentPage={data?.page}
					totalItems={data?.total}
					pageSize={10}
					onPageChange={(val) => { setPage(val); }}
				/>
			) : null}

		</div>
	);
}
export default CardList;
