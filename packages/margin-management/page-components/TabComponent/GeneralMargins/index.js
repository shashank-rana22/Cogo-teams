import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyStateMargins';
import Details from '../Details';
import ListPagination from '../ListPagination';

function GeneralMargins({
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
					{(data?.list || []).map((item) => (
						<Details
							showContainerDetails
							marginBreakupData={marginBreakupData}
							setMarginBreakupData={setMarginBreakupData}
							key={item?.id}
							data={item}
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

export default GeneralMargins;
