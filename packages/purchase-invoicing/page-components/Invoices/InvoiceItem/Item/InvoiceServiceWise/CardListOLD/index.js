import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import React from 'react';

import Header from './CardHeader';
import CardItem from './Carditem';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

const ONE = 1;
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
	function HandleRender() {
		if (loading) {
			const loadingStates = Array.from({ length: numberOfLoader }, (_, i) => (
				// eslint-disable-next-line react/jsx-key
				<LoadingState fields={fields} isLast={i === numberOfLoader - ONE} />
			));

			return loadingStates;
		}

		if (!data.length) {
			return <EmptyState showContent={showContent} />;
		}

		return (
			<>
				{(data || []).map((item, i) => (
					// eslint-disable-next-line react/jsx-key
					<CardItem
						item={item}
						loading={loading}
						fields={fields}
						isLast={data?.length === i + ONE && !isLclManifest}
					/>
				))}
			</>
		);
	}

	return (
		<div className={styles.container}>
			<Header
				fields={fields}
				showCode={showCode}
				sort={sort}
				setSort={setSort}
			/>

			<HandleRender />
		</div>
	);
}

export default List;
