import { Pagination } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import CrmTable from '../../../../common/CrmTable';
import EnrichmentRequest from '../../../../common/EnrichmentRequest';
import useFeedbackTableData from '../../../../hooks/useFeedbackTableData';
import Filters from '../../commons/Filters';
import Statistics from '../../commons/Statistics';

import Actions from './Actions';
import { getFeedbackColumns } from './get-feedback-columns';
import styles from './styles.module.css';

function FeedbacksReceived({ activeTab = '', setActiveTab = () => {} }) {
	const { t } = useTranslation(['allocation']);

	const {
		data = {},
		loading = false,
		filters = {},
		onChangeFilters = () => {},
		onChangeParams = () => {},
		paginationData = {},
		checkedRowsId = [],
		selectAll = false,
		onChangeTableHeadCheckbox = () => {},
		onChangeBodyCheckbox = () => {},
		refetch = () => {},
	} = useFeedbackTableData({});

	const { page, page_limit, total_count } = paginationData;

	const columns = getFeedbackColumns({
		selectAll,
		onChangeTableHeadCheckbox,
		checkedRowsId,
		onChangeBodyCheckbox,
		t,
	});

	return (
		<div className={styles.container}>
			<Filters pageFilters={filters} onChangeFilters={onChangeFilters} activeTab={activeTab} />

			<Statistics activeTab={activeTab} filters={filters} />
			<Actions
				checkedRowsId={checkedRowsId}
				setActiveTab={setActiveTab}
				refetchFeedbackTable={refetch}
			/>
			<EnrichmentRequest
				checkedRowsId={checkedRowsId}
				setActiveTab={setActiveTab}
			/>

			<CrmTable columns={columns} data={data} loading={loading} />

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
