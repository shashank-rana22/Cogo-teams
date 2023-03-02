/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useRef } from 'react';

import useGetProfitability from '../../hooks/useGetProfitability';
import useIsInViewport from '../../hooks/useIntersection';

import DateFilter from './DateFilter';
import styles from './styles.module.css';

function Filter({ setFilters = () => {}, range = '', setRange = () => {} }) {
	// const { currency: selectedCurrency, entity_code = [] } = headerFilters;
	// const currency = selectedCurrency ? 'INR' : 'USD';
	// const [isInViewport, setisInViewport] = useState(false);
	// const ref = useRef(null);
	// const inViewport = useIsInViewport(ref, '-200px');

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

	return (
		<div className={styles.container}>
			<DateFilter
				setFilters={setFilters}
				range={range}
				setRange={setRange}
			/>
		</div>
	);
}

export default Filter;
