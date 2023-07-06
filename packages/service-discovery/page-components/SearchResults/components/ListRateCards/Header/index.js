import React from 'react';

import Currency from '../../../common/CurrencyFilter';
import Filters from '../../../common/Filters';

import DetentionDemurrage from './D&D';
import styles from './styles.module.css';

function Header({
	ratesData = [],
	details = {},
	filters = {},
	setFilters = () => {},
}) {
	const ratesCount = ratesData?.length || 0;

	return (
		<div className={styles.container}>
			<div className={styles.count}>{`${ratesCount} Results Found for your search`}</div>

			<div className={styles.filters_container}>
				<Currency
					filters={filters}
					setFilters={setFilters}
					filterKey="currency"
				/>

				<DetentionDemurrage />

				<Filters
					data={details}
					filters={filters}
					setFilters={setFilters}
				/>

			</div>

		</div>

	);
}

export default Header;
