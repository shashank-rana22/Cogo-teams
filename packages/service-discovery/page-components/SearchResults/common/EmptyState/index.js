import React from 'react';

import useGetIsMobile from '../../../../helpers/useGetIsMobile';
import RequestRate from '../RequestRate';

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
	airlines = [],
}) {
	const isMobile = useGetIsMobile();

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
				<RequestRate details={details} isMobile={isMobile} />
			</div>
		</div>
	);
}

export default EmptyState;
