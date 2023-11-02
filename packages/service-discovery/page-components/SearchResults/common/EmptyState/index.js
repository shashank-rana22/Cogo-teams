import React from 'react';

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
				<AdditionalTabs detail={details} setScreen={setScreen} />
			</div>
		</div>
	);
}

export default EmptyState;
