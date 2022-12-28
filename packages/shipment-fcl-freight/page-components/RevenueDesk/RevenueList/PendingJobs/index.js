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
		setClickedCard(data_item);
	};

	const handlePageChange = (pageNumber) => {
		hookSetters.setFilters({ ...filters, page: pageNumber });
	};

	return (
		<div className={styles.container}>
			<div>
				{total > 10 ? (
					<div className={styles.paginationWrapper}>
						<Pagination
							type="table"
							totalItems={total}
							pageSize={10}
							currentPage={page}
							handlePageChange={handlePageChange}
						/>
					</div>
				) : null}
			</div>
			{data.length

				? (
					<div className={styles.cardContainer}>
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
				)
				: (
					<div className={styles.loaderContainer}>
						<Loader />
					</div>
				)}

			<div>
				{total > 10 ? (
					<div className={styles.paginationWrapper}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total}
							pageSize={10}
							handlePageChange={handlePageChange}
						/>
					</div>
				) : null}
			</div>

		</div>
	);
}
export default PendingJobs;
