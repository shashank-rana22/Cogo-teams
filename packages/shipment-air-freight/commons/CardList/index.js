import EmptyState from '@cogoport/air-modules/common/EmptyState';
import React, { useMemo } from 'react';

import Header from './CardHeader';
import CardItem from './Carditem';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

const INCREMENT_BY_ONE = 1;
const CHECK_LAST_ARRAY = 1;

function List({
	fields = [],
	data = [],
	loading = false,
	showCode = false,
	showContent = { heading: 'No Results found!' },
	sort = {},
	setSort = () => {},
	isAirManifest = false,
	numberOfLoader = 10,
}) {
	const keys = useMemo(() => Array(fields?.length).fill(null).map(() => Math.random()), [fields?.length]);
	const cardKeys = useMemo(() => Array(data?.length).fill(null).map(() => Math.random()), [data?.length]);

	const handleRender = () => {
		if (loading) {
			const loadingStates = Array.from({ length: numberOfLoader }, (_, i) => (
				<LoadingState fields={fields} isLast={i === numberOfLoader - CHECK_LAST_ARRAY} key={keys[i]} />
			));

			return loadingStates;
		}

		if (!data.length) {
			return <EmptyState showContent={showContent} />;
		}

		return (
			<>
				{(data || []).map((item, i) => (
					<CardItem
						item={item}
						loading={loading}
						fields={fields}
						isLast={data?.length === i + INCREMENT_BY_ONE && !isAirManifest}
						key={cardKeys[i]}
					/>
				))}
			</>
		);
	};

	return (
		<div className={styles.container}>
			<Header
				fields={fields}
				showCode={showCode}
				sort={sort}
				setSort={setSort}
			/>
			{handleRender()}
		</div>
	);
}

export default List;
