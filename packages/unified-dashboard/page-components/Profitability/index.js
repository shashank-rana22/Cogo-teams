import React, { useEffect, useState, useRef } from 'react';

import useGetProfitability from '../../hooks/useGetProfitability';
import useIsInViewport from '../../hooks/useIntersection';

import Header from './Header';
import ProfitabilityTable from './ProfitabilityTable';
import styles from './styles.module.css';

function Profitability({ headerFilters }) {
	const { currency: selectedCurrency, entity_code = [] } = headerFilters;
	const currency = selectedCurrency ? 'INR' : 'USD';
	// const [isInViewport, setisInViewport] = useState(false);
	const ref = useRef(null);
	// const inViewport = useIsInViewport(ref, '-200px');
	const { loading, data, setFilters, range, setRange, filters } = useGetProfitability();

	// useEffect(() => {
	// 	if (!isInViewport) {
	// 		setisInViewport(inViewport);
	// 	}
	// }, [inViewport]);

	// useEffect(() => {
	// 	setFilters((prevFilters) => ({
	// 		...prevFilters,
	// 		to_currency : currency,
	// 		entity_code : entity_code.length > 0 ? entity_code : undefined,
	// 	}));
	// }, [JSON.stringify(headerFilters)]);

	console.log('filtersfilters', loading);

	return (
		<div className={styles.container} ref={ref}>
			<Header
				setFilters={setFilters}
				range={range}
				setRange={setRange}
				filters={filters}
			/>
			<ProfitabilityTable
				loading={loading}
				data={data}
				setFilters={setFilters}
			/>
		</div>
	);
}

export default Profitability;
