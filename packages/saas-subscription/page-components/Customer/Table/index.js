import { Pagination, Placeholder, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getConfig from '../../../configuration/listConfig';
import getValues from '../../../utils/getValues';

import EditFeatureModal from './EditFeatureModal';
import EditModal from './EditModal';
import itemFunction from './ItemFunctions';
import styles from './styles.module.css';

const LOADER_COUNT = 5;

function Table({ userList = {}, loading = false, setGlobalFilters }) {
	const { t } = useTranslation(['saasSubscription']);

	const { list = [], page = 0, page_limit = 0, total_count = 0 } = userList || {};
	const [editModal, setEditModal] = useState({
		openEditModal        : false,
		openEditFeatureModal : false,
		editAddon            : false,
		editPlan             : false,
	});
	const listConfig = getConfig({ t });

	const functions = itemFunction({ setEditModal, t });

	const newList = loading ? [...Array(LOADER_COUNT).keys()] : list;

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
				<div key={`${item?.id || item}`} className={cl`${styles.row} ${styles.item_row}`}>
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
