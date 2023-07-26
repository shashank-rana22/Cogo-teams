import React from 'react';

import NoRatesFound from './NoRatesFound';
import RequestRate from './RequestRate';
import styles from './styles.module.css';

const REQUEST_RATE_ALLOWED_SERVICES = [
	'fcl_freight',
	'lcl_freight',
	'air_freight',
	'ftl_freight',
	'ltl_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'haulage_freight',
	'fcl_freight_local',
	'rail_domestic_freight',
	'trailer_freight',
];

function EmptyState({ details = {}, filters = {}, setFilters = () => {}, service_key = 'search_type' }) {
	const service_type = details[service_key];

	return (
		<div className={styles.container}>
			<NoRatesFound
				details={details}
				filters={filters}
				setFilters={setFilters}
			/>

			{REQUEST_RATE_ALLOWED_SERVICES.includes(service_type) ? (
				<div className={styles.request_rate_container}>
					<RequestRate details={details} />
				</div>
			) : null}
		</div>
	);
}

export default EmptyState;
