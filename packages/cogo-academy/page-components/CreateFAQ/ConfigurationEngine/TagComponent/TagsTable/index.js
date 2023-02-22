import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import StyledTable from '../../../../../commons/StyledTable';
import EmptyState from '../../commons/EmptyState';
import LoadingState from '../../commons/LoadingState';

import styles from './styles.module.css';

function TagTable({ columns = [], data = [], tagsLoading = true, tagCurrentPage, setTagCurrentPage = () => {} }) {
	const { list:listTagsData = [], total_count } = data || {};

	if (tagsLoading) {
		return (
			<div>
				<LoadingState />
			</div>
		);
	}

	if (!tagsLoading && isEmpty(listTagsData)) {
		return (
			<div>
				<EmptyState />
			</div>
		);
	}

	return (
		<div>
			<div>
				<div className={styles.table}>
					<StyledTable columns={columns} data={listTagsData} />
				</div>

			</div>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={tagCurrentPage}
					totalItems={total_count}
					pageSize={5}
					onPageChange={setTagCurrentPage}
				/>
			</div>
		</div>

	);
}

export default TagTable;
