import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import React from 'react';

import Header from './CardHeader';
import CardItem from './Carditem';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function List({
	fields = [],
	data = [],
	loading = false,
	showCode = false,
	showContent = { heading: 'No Results found!' },
	sort = {},
	setSort = () => {},
	isLclManifest = false,
	numberOfLoader = 10,
}) {
	const handleRender = () => {
		if (loading) {
			const loadingStates = Array.from({ length: numberOfLoader }, (_, i) => (
				<LoadingState fields={fields} isLast={i === numberOfLoader - 1} />
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
						isLast={data?.length === i + 1 && !isLclManifest}
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
