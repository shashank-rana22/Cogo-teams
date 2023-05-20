import { Pagination, Placeholder, cl } from '@cogoport/components';
import { useState } from 'react';

import listConfig from '../../../configuration/listConfig';
import getValues from '../../../utils/getValues';

import EditFeatureModal from './EditFeatureModal';
import EditModal from './EditModal';
import itemFunction from './ItemFunctions';
import styles from './styles.module.css';

function Table({ userList = {}, loading = false, setGlobalFilters }) {
	const { list, page, page_limit, total_count } = userList || {};
	const [editModal, setEditModal] = useState({
		openEditModal        : false,
		openEditFeatureModal : false,
		editAddon            : false,
		editPlan             : false,
	});

	const functions = itemFunction({ setEditModal });

	const newList = loading ? [1, 2, 3, 4, 5] : list;

	const pageChangeHandler = (v) => {
		setGlobalFilters((prev) => ({ ...prev, page: v }));
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.row} ${styles.card_header}`}>
				{listConfig.map((config) => (
					<div key={config.key} className={styles.col} style={{ width: config?.width }}>
						{config.title}
					</div>
				))}
			</div>
			{(newList || []).map((item) => (
				<div key={`${item?.id}`} className={cl`${styles.row} ${styles.item_row}`}>
					{listConfig.map((config) => (
						<div
							key={`${config.key}_${item?.id}`}
							className={styles.col}
							style={{ width: config?.width }}
						>
							{loading ? <Placeholder height="30px" />
								: getValues({ itemData: item, config, itemFunction: functions })}

						</div>
					))}
				</div>
			))}

			{!loading && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={pageChangeHandler}
					/>
				</div>
			)}

			<EditModal editModal={editModal} setEditModal={setEditModal} />
			<EditFeatureModal editModal={editModal} setEditModal={setEditModal} />
		</div>
	);
}

export default Table;
