import { Pagination, Checkbox, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext, useMemo } from 'react';

import EmptyState from '../../../common/EmptyState';
import Card from '../Card';
import { ReopenTasksContext } from '../context';

import styles from './styles.module.css';

export default function ShipmentList({
	data = {}, loading = false, activeTab = '', setFilters = () => {},
	setShowModal = () => {},
}) {
	const { list = [], page, total_count, page_limit } = data || {};
	const { selectedTasks, setSelectedTasks } = useContext(ReopenTasksContext);

	const renderPagination = (
		<div className={styles.pagination_container}>
			<Pagination
				type="table"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={(val) => setFilters((prev) => ({ ...prev, page: val }))}
			/>
		</div>
	);

	const listToRender = useMemo(() => list.filter((task) => task?.status === 'completed'), [list]);

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>

				<div className={styles.list_header}>
					<div className={styles.action_wrapper}>
						<Checkbox
							label="Select All"
							checked={!isEmpty(listToRender) && selectedTasks?.size === listToRender?.length}
							onChange={(e) => {
								if (e?.target?.checked) {
									setSelectedTasks(new Map(list?.map((item) => [item?.id, item])));
								} else setSelectedTasks(new Map());
							}}
						/>
						<Button
							disabled={!selectedTasks?.size}
							style={{ marginLeft: '1rem' }}
							onClick={() => {
								setShowModal(true);
							}}
						>
							Reopen tasks

						</Button>
					</div>
					{renderPagination}
				</div>

				{listToRender?.map((item) => <Card data={item} key={item?.id} activeTab={activeTab} isSelectable />)}
				{renderPagination}
			</>
		);
}
