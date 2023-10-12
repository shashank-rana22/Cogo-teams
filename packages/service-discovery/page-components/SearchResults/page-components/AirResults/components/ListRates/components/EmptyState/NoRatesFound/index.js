import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import Reset from '../../../../../../../common/Reset';
import Filters from '../../../../../common/Filters';
import AppliedFilters from '../../AppliedFilters';

import styles from './styles.module.css';

function NoRatesFound({
	details = {},
	filters = {},
	setFilters = () => {},
	filtersRef = {},
	setOpenAccordian = () => {},
	setShowFilterModal = () => {},
	openAccordian = '',
	showFilterModal = false,
	airlines = [],
}) {
	return (
		<div className={styles.container}>
			<div className={styles.top_section}>
				<div className={styles.applied_filters}>
					<AppliedFilters
						filtersRef={filtersRef}
						filters={filters}
						setFilters={setFilters}
						setShowFilterModal={setShowFilterModal}
						setOpenAccordian={setOpenAccordian}
					/>
				</div>

				<div className={styles.buttons_container}>
					<Filters
						showFilterModal={showFilterModal}
						setShowFilterModal={setShowFilterModal}
						data={details}
						filters={filters}
						setFilters={setFilters}
						openAccordian={openAccordian}
						setOpenAccordian={setOpenAccordian}
						airlines={airlines}
					/>

					<Reset setFilters={setFilters} />
				</div>
			</div>

			<div className={styles.text_section}>
				<img
					src={GLOBAL_CONSTANTS.image_url.no_rates_found_emoji}
					alt="no-rates-found"
					height={72}
					className={styles.icon}
				/>

				<div className={styles.text_container}>
					<p className={styles.big_text}>Sorry! No rates found</p>

					<p className={styles.small_text}>
						Oops, this is unusual and we are working on finding rates for this route.
						Meanwhile, please try the alternate routes.
					</p>
				</div>
			</div>
		</div>
	);
}

export default NoRatesFound;
