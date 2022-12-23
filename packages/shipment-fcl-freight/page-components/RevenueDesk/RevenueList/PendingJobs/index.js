import Card from "../../../../commons/revenueDeskCommons/Card";
import styles from './styles.module.css';
import {Pagination}  from '@cogoport/components'

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
	const handlePageChange=()=>{
		hookSetters.setFilters({
			...filters,
			page: val,
		})
	}

	return (
		<div className={styles.container}>
			<div>
					{total > 10 ? (
					<div className={styles.paginationWrapper}>
						<Pagination
							type="compact"
							totalItems={total}
							PageSize={10}
							currentPage={page}
							handlePageChange={handlePageChange}
						/>
					</div>
				) : null}
			</div>


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
			
			<div>
					{total > 10 ? (
					<div className={styles.paginationWrapper}>
						<Pagination
							type="number"
							totalItems={total}
							PageSize={10}
							currentPage={page}
							handlePageChange={(val) =>
								hookSetters.setFilters({
									...filters,
									page: val,
								})
							}
						/>
					</div>
				) : null}
			</div>

		</div>
	);
}
export default PendingJobs;