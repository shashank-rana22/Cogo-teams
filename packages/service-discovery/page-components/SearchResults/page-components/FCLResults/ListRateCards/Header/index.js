import CopyUrl from '../../../../common/CopyUrl';
import DetentionDemurrage from '../../../../common/D&D';
import Filters from '../../../../common/Filters';
import RefreshRate from '../../../../common/RefreshRate';

import styles from './styles.module.css';

function Header({
	details = {},
	filters = {},
	setFilters = () => {},
	refetch = () => {},
	total_rates_count = 0,
	loading = false,
	openAccordian = '',
	setOpenAccordian = () => {},
	showFilterModal = false,
	setShowFilterModal = () => {},
	// transitTime = {},
	setScheduleLoading = () => {},
	isMobile = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.count}>
				{`${total_rates_count} Results Found for your search`}
			</div>

			<div className={styles.filters_container}>
				<DetentionDemurrage details={details} refetch={refetch} isMobile={isMobile} />

				<Filters
					showFilterModal={showFilterModal}
					setShowFilterModal={setShowFilterModal}
					data={details}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
					openAccordian={openAccordian}
					setOpenAccordian={setOpenAccordian}
					// transitTime={transitTime}
					setScheduleLoading={setScheduleLoading}
					isMobile={isMobile}
				/>

				<RefreshRate refetch={refetch} details={details} />

				<CopyUrl details={details} />
			</div>
		</div>

	);
}

export default Header;
