import AdditionalTabs from '../AdditionalTabs';

import NoRatesFound from './NoRatesFound';
import styles from './styles.module.css';

function EmptyState({
	details = {},
	filters = {},
	setFilters = () => {},
	refetch = () => {},
	openAccordian = '',
	setOpenAccordian = () => {},
	showFilterModal = false,
	setShowFilterModal = () => {},
	setScreen = () => {},
	rates = [],
	airlines = [],
	isMobile = false,
}) {
	return (
		<div className={styles.container}>
			<NoRatesFound
				details={details}
				filters={filters}
				setFilters={setFilters}
				refetch={refetch}
				openAccordian={openAccordian}
				setOpenAccordian={setOpenAccordian}
				showFilterModal={showFilterModal}
				setShowFilterModal={setShowFilterModal}
				airlines={airlines}
				isMobile={isMobile}
			/>

			<div className={styles.request_rate_container}>
				<AdditionalTabs detail={details} setScreen={setScreen} rates={rates} isMobile={isMobile} />
			</div>
		</div>
	);
}

export default EmptyState;
