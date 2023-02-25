import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import StyledTable from '../../../../../commons/StyledTable';
import EmptyState from '../../commons/EmptyState';
import LoadingState from '../../commons/LoadingState';

import styles from './styles.module.css';

function TagTable({
	columns = [],
	data = [],
	audianceLoading = true,
	audienceCurrentPage,
	setAudienceCurrentPage = () => {},
}) {
	const { list:listTagsData = [], total_count } = data || {};

	if (audianceLoading) {
		return <LoadingState />;
	}

	if (isEmpty(listTagsData)) {
		return <EmptyState />;
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
					currentPage={audienceCurrentPage}
					totalItems={total_count}
					pageSize={5}
					onPageChange={setAudienceCurrentPage}
				/>
			</div>
		</div>

	);
}

export default TagTable;
