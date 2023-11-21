import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyStateMargins';
import useGetDefaultMargins from '../../../hooks/useGetDefaultMargins';
import Details from '../Details';

function DefaultMargins({
	activeService = '',
	filterParams = {},
	marginBreakupData = {},
	setMarginBreakupData = () => { },
	activeTab = '',
	refetch = () => { },
}) {
	const { data = {} } = useGetDefaultMargins({
		activeService,
		filterParams,
	});

	if (isEmpty(data?.list)) {
		return (
			<EmptyState />
		);
	}

	return (
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
		</div>
	);
}

export default DefaultMargins;
