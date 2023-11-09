import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import AppliedFilters from '../../AppliedFilters';
import DetentionDemurrage from '../../D&D';
import Filters from '../../Filters';
import Reset from '../../Reset';

import styles from './styles.module.css';

const SERVICES_TO_SHOW_DND = ['fcl_freight'];

function NoRatesFound({
	details = {},
	filters = {},
	setFilters = () => {},
	setOpenAccordian = () => {},
	setShowFilterModal = () => {},
	refetch = () => {},
	openAccordian = '',
	showFilterModal = false,
	airlines = [],
	isMobile = false,
}) {
	const { service_type } = details || {};

	return (
		<div className={styles.container}>
			<div className={styles.top_section}>
				<AppliedFilters
					filters={filters}
					setFilters={setFilters}
					setShowFilterModal={setShowFilterModal}
					setOpenAccordian={setOpenAccordian}
					service_type={service_type}
				/>

				<div className={styles.buttons_container}>
					{SERVICES_TO_SHOW_DND.includes(service_type) ? (
						<DetentionDemurrage
							details={details}
							refetch={refetch}
							isMobile={isMobile}
						/>
					) : null}

					<Filters
						showFilterModal={showFilterModal}
						setShowFilterModal={setShowFilterModal}
						data={details}
						filters={filters}
						setFilters={setFilters}
						openAccordian={openAccordian}
						setOpenAccordian={setOpenAccordian}
						airlines={airlines}
						isMobile={isMobile}
					/>

					<Reset setFilters={setFilters} isMobile={isMobile} />
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
