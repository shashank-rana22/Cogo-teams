import { Loader, Pagination } from '@cogoport/components';

import Card from '../../../commons/bookingsDeskcommon/Card';
import EmptyState from '../../../commons/EmptyState';

import styles from './styles.module.css';

function Body({
	loading, data = {}, total, page, hookSetters = {}, filters,
}) {
	const renderPagination = (type) => (
		<Pagination
			type={type}
			totalItems={total}
			currentPage={page}
			pageSize={10}
			handlePageChange={(val) => {
				hookSetters.setFilters({ ...filters, page: val });
			}}
		/>
	);

	return (
		<>
			{total > 10 ? (
				<div className={styles.pagination_wrapper}>
					{renderPagination('table')}
				</div>
			) : null}
			{loading ? (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			) : null }

			{(!loading && data.length === 0) ? (
				<EmptyState />) : null }

			{(!loading && data.length >= 0) ? (

				<div className={styles.cards_container}>
					{(data || []).map((details) => (
						<Card data={details} />
					))}
				</div>
			) : null }

			{total > 10 ? (
				<div className={styles.pagination_wrapper}>
					{renderPagination('number')}
					;
				</div>
			) : null}
		</>
	);
}
export default Body;
