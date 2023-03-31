import { Pagination } from '@cogoport/components';

import CrmTable from '../../../../common/CrmTable';
// import EnrichmentRequest from '../../../../common/EnrichmentRequest';
import useFeedbackTableData from '../../../../hooks/useFeedbackTableData';

import { getFeedbackColumns } from './get-feedback-columns';
import styles from './styles.module.css';

function FeedbacksReceived({ organization_id = '', type = '' }) {
	const {
		data = {},
		loading = false,
		onChangeParams = () => {},
		paginationData = {},
		checkedRowsId = [],
		selectAll = false,
		onChangeTableHeadCheckbox = () => {},
		onChangeBodyCheckbox = () => {},
	} = useFeedbackTableData({ organizationId: organization_id, type, route: 'organization_feedbacks' });

	const { page, page_limit, total_count } = paginationData;

	const columns = getFeedbackColumns({
		selectAll,
		onChangeTableHeadCheckbox,
		checkedRowsId,
		onChangeBodyCheckbox,
	});

	return (
		<div className={styles.container}>
			{/* <EnrichmentRequest
				checkedRowsId={checkedRowsId}
				setActiveTab={setActiveTab}
			/> */}

			<div className={styles.table}>
				<CrmTable columns={columns} data={data} loading={loading} />
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => onChangeParams({ page: val })}
				/>
			</div>

		</div>
	);
}

export default FeedbacksReceived;
