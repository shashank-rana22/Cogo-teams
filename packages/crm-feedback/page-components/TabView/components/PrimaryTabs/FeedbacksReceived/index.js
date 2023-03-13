import Pagination from '@cogoport/components';

import useFeedbackTableData from '../../../hooks/useFeedbackTableData';
import CrmTable from '../../CrmTable';
import EnrichmentRequest from '../../EnrichmentRequest';
import Filters from '../../Filters';
import Statistics from '../../Statistics';

function FeedbacksReceived() {
	const {
		columns = [],
		data = {},
		loading = false,
		filters = {},
		onChangeFilters = () => {},
		onResetFilters = () => {},
		onChangeParams = () => {},
		paginationData = {},

	} = useFeedbackTableData();

	const { page, page_limit, total_count } = paginationData;
	return (

		<div style={{ marginTop: 30 }}>
			<Filters filters={filters} onChangeFilters={onChangeFilters} />
			<Statistics />
			<EnrichmentRequest />
			<CrmTable columns={columns} data={data} loading={loading} />

			<div>
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
