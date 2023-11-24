import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyStateMargins';
import Details from '../Details';
import ListPagination from '../ListPagination';

function ApprovalPendingMargins({
	loading = false,
	data = {},
	marginBreakupData = {},
	setMarginBreakupData = () => { },
	activeTab = '',
	refetch = () => { },
	filterParams = {},
	setFilterParams = () => { },
}) {
	return (
		<div>
			{!loading && isEmpty(data?.list) ? <EmptyState /> : (
				<div>
					{(data?.list || []).map((service) => (
						<Details
							marginBreakupData={marginBreakupData}
							setMarginBreakupData={setMarginBreakupData}
							key={service?.id}
							data={service}
							activeTab={activeTab}
							refetch={refetch}
						/>
					))}
					<ListPagination
						paginationProps={{
							data,
							filterParams,
							setFilterParams,
						}}
					/>
				</div>
			)}
		</div>
	);
}

export default ApprovalPendingMargins;
