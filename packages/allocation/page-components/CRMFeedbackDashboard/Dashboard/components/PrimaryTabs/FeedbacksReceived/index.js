import { Pagination } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';

import CrmTable from '../../../../common/CrmTable';
import EnrichmentRequest from '../../../../common/EnrichmentRequest';
import GetLeadFeedbacks from '../../../../common/GetLeadFeedbacks';
import useFeedbackTableData from '../../../../hooks/useFeedbackTableData';
import Filters from '../../commons/Filters';
import Statistics from '../../commons/Statistics';

import { getFeedbackColumns } from './get-feedback-columns';
import styles from './styles.module.css';

const geo = getGeoConstants();

function FeedbacksReceived({ activeTab = '', setActiveTab = () => {} }) {
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

	const { profile } = useSelector((state) => state);

	const userid = profile?.id;
	const partnerId = profile?.partner_id;

	const third_party_enrichment_allowed_role_ids = geo.uuid.third_party_enrichment_agencies_role_ids;

	const isAllowedToGetMoreLeads = partnerId === GLOBAL_CONSTANTS.country_entity_ids.VN
	&& third_party_enrichment_allowed_role_ids.includes(userid);

	const { page, page_limit, total_count } = paginationData;

	const columns = getFeedbackColumns({
		selectAll,
		onChangeTableHeadCheckbox,
		checkedRowsId,
		onChangeBodyCheckbox,
	});

	return (
		<div className={styles.container}>
			<Filters pageFilters={filters} onChangeFilters={onChangeFilters} activeTab={activeTab} />

			<Statistics activeTab={activeTab} filters={filters} />
			<div className={styles.header}>
				{isAllowedToGetMoreLeads && <GetLeadFeedbacks refetch={refetch} />}

				<EnrichmentRequest
					checkedRowsId={checkedRowsId}
					setActiveTab={setActiveTab}
				/>
			</div>
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
