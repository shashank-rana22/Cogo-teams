import React from 'react';

import EmptyState from '../EmptyState';

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
	total_data_item = {},
	isLclManifest = false,
}) {
	const handleRender = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => <LoadingState fields={fields} isLast={item === 10} />);
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

				{/* {isLclManifest ? (
					<CardItem
						isTotalRow
						item={total_data_item}
						loading={loading}
						fields={fields}
						isLast={isLclManifest}
					/>
				) : null} */}
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
