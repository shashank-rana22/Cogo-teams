import React, { useEffect, useState, useRef, useMemo } from 'react';

import useGetProfitability from '../../hooks/useGetProfitability';
import useIsInViewport from '../../hooks/useIntersection';

import Header from './Header';
import ProfitabilityTable from './ProfitabilityTable';
import styles from './styles.module.css';

function Profitability({ headerFilters }) {
	const { currency: selectedCurrency, entity_code } = headerFilters;
	const currency = selectedCurrency ? 'INR' : 'USD';
	const [isInViewport, setIsInViewport] = useState(false);
	const ref = useRef(null);
	const inViewport = useIsInViewport(ref, '-200px');

	const { loading, data, setFilters, range, setRange, filters, debounceQuery } = useGetProfitability(isInViewport);

	useEffect(() => {
		if (!isInViewport && inViewport) {
			setIsInViewport(true);
		}
	}, [inViewport, isInViewport]);

	const memoizedHeaderFilters = useMemo(() => ({ currency, entity_code }), [currency, entity_code]);

	useEffect(() => {
		setFilters((prevFilters) => ({
			...prevFilters,
			to_currency : memoizedHeaderFilters.currency,
			entity_code : memoizedHeaderFilters.entity_code?.length > 0 ? memoizedHeaderFilters.entity_code : undefined,
		}));
	}, [memoizedHeaderFilters, setFilters]);

	return (
		<div className={styles.container} ref={ref}>
			<Header
				setFilters={setFilters}
				range={range}
				setRange={setRange}
				filters={filters}
				debounceQuery={debounceQuery}
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
