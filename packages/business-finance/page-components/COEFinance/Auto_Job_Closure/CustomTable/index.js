import React from 'react';

import styles from '../styles.module.css';

import ColumnCard from './ColumnCard';
import Header from './Header';

function CustomTable({
	itemData = {},
	config = {},
	openConfig = [],
	setOpenConfig = () => {},
	refetch = () => {},
	setSaveObj = () => {},
	loading = false,

}) {
	const { list = [] } = itemData || {};

	return (
		<div className={styles.table}>
			<Header config={config} />
			<div>
				{list.map((item) => (
					<div className={styles.columnCard} key={item.id}>
						<ColumnCard
							className={styles.columnCard}
							key={item.id}
							config={config}
							item={item}
							openConfig={openConfig}
							setOpenConfig={setOpenConfig}
							refetch={refetch}
							loading={loading}
							setSaveObj={setSaveObj}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
export default CustomTable;
