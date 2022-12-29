import { Pagination } from '@cogoport/components';

import Card from './Card';
import Loader from './Loader';
import styles from './styles.module.css';

function CardList({
	data, refetch, total, hookSetters, filters, page, loading, rfq, selectedCard, setSelectedCard,
}) {
	console.log(data, 'values');
	return (
		<div className={styles.leftpanel}>
			<div className={styles.heading}>
				{rfq?.total_port_pair}
				{' '}
				Port Pairs
			</div>
			{!loading && (data || []).map((item) => (
				<Card
					item={item}
					refetch={refetch}
					selectedCard={selectedCard}
					setSelectedCard={setSelectedCard}
				/>
			))}
			{
				loading && [1, 2, 3, 4, 5].map(() => (<Loader />))
			}
			{data?.length > 0 && !loading && total > 10 ? (
				<Pagination
					currentPage={page}
					totalItems={total}
					pageSize={10}
					handlePageChange={(val) => { hookSetters.setFilters({ ...filters, page: val }); }}
				/>
			) : null}

		</div>
	);
}
export default CardList;
