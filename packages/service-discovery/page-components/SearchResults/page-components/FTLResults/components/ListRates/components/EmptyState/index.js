import React from 'react';

import RequestRate from '../../../../../../common/RequestRate';

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
			/>

			<div className={styles.request_rate_container}>
				<RequestRate details={details} />
			</div>
		</div>
	);
}

export default EmptyState;
