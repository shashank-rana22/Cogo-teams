import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyStateMargins';
import DefaultMargins from '../DefaultMargins';
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
	activeService = '',
}) {
	return (
		<>
			{activeTab === 'cogoport' ? (
				<DefaultMargins
					activeService={activeService}
					filterParams={filterParams}
					marginBreakupData={marginBreakupData}
					setMarginBreakupData={setMarginBreakupData}
					activeTab={activeTab}
					refetch={refetch}
				/>
			) : null}

			{!loading && isEmpty(data?.list) ? <EmptyState emptyDataText="No Custom margins found!" /> : (
				<>
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
				</>
			)}
		</>
	);
}

export default GeneralMargins;
