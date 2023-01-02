import { Pagination } from '@cogoport/components';

import Card from '../../../../commons/revenueDeskCommons/Card';

import styles from './styles.module.css';

function CompletedJobs({
	data = [],
	total = '',
	hookSetters = () => {},
	page = 1,
	filters = {},
	activeTab = '',
	setClickedCard = () => {},
	setShowBookingOption = () => {},
	clickedCard,
	shipment_type,
}) {
	const handleCardClick = (data_item) => {
		setClickedCard(data_item);
		setShowBookingOption(true);
	};

	return (
		<div>
			<div>
				{total > 10 ? (
					<div className={styles.pagination_wrapper}>
						<Pagination
							type="table"
							totalItems={total}
							pageSize={10}
							currentPage={page}
							handlePageChange={(val) => hookSetters.setFilters({
								...filters,
								page: val,
							})}
						/>
					</div>
				) : null}
			</div>

			<div>
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

			<div>
				{total > 10 ? (
					<div className={styles.pagination_wrapper}>
						<Pagination
							type="table"
							totalItems={total}
							pageSize={10}
							currentPage={page}
							handlePageChange={(val) => hookSetters.setFilters({
								...filters,
								page: val,
							})}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}
export default CompletedJobs;
