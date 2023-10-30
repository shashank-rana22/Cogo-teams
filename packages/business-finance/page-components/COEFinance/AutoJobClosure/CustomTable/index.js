import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../commons/EmptyStateDocs/index';
import styles from '../styles.module.css';

import ColumnCard from './ColumnCard/index';
import Header from './Header/index';

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
				{ isEmpty(list) ? (
					<div className={styles.emptyStateImage}>
						<EmptyStateDocs />
					</div>
				) : (list || []).map((item) => (
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
				)) }
			</div>
		</div>
	);
}
export default CustomTable;
