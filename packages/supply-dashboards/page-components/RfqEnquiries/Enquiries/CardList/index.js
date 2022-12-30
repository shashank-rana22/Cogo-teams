import { Pagination } from '@cogoport/components';

import Card from './Card';
import Loader from './Loader';
import styles from './styles.module.css';

function CardList({
	data, setPage, loading, rfq, selectedCard, setSelectedCard,
}) {
	return (
		<div className={styles.leftpanel}>
			<div className={styles.heading}>
				{rfq?.total_port_pair}
				{' '}
				Port Pairs
			</div>
			{!loading && (data?.data || []).map((item) => (
				<Card
					item={item}
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCard}
				/>
			))}
			{
				loading && [1, 2, 3, 4, 5].map(() => (<Loader />))
			}
			{(data?.data || []).length > 0 && !loading && (data?.data || []).length > 10 ? (
				<Pagination
					currentPage={data?.page}
					totalItems={data?.total}
					pageSize={10}
					handlePageChange={(val) => { setPage(val); }}
				/>
			) : null}

		</div>
	);
}
export default CardList;
