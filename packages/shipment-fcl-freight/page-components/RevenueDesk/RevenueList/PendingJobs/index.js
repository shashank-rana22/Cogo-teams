import { Pagination, Loader } from '@cogoport/components';

import Card from '../../../../commons/revenueDeskCommons/Card';

import styles from './styles.module.css';

function PendingJobs({
	data = [],
	total,
	hookSetters = () => {},
	page = 1,
	filters = {},
	setShowBookingOption = () => {},
	activeTab = '',
	setClickedCard = () => {},
	clickedCard,
	shipment_type,
}) {
	const handleCardClick = (data_item) => {
		setShowBookingOption(true);
		setClickedCard(data_item);
	};

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
		<div>
			{data.length ? (
				<div className={styles.card_container}>
					{(data || []).map((item) => (
						<Card
							data={item}
							handleCardClick={handleCardClick}
							activeTab={activeTab}
							clickedCard={clickedCard}
							shipment_type={shipment_type}
						/>
					))}
				</div>
			) : (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			)}
			{total > 10 ? (
				<div className={styles.pagination_wrapper}>
					{renderPagination('table')}
				</div>
			) : null}
		</div>
	);
}
export default PendingJobs;
