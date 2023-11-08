import CopyUrl from '../../../../../../common/CopyUrl';
import Filters from '../../../../../../common/Filters';
import RefreshRate from '../../../../../../common/RefreshRate';

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
	airlines = [],
	setScheduleLoading = () => {},
	isMobile = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.count}>
				{`${total_rates_count} Results Found for your search`}
			</div>

			<div className={styles.filters_container}>
				<Filters
					showFilterModal={showFilterModal}
					setShowFilterModal={setShowFilterModal}
					data={details}
					filters={filters}
					setFilters={setFilters}
					loading={loading}
					openAccordian={openAccordian}
					setOpenAccordian={setOpenAccordian}
					airlines={airlines}
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
