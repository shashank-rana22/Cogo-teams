import { useState, useEffect } from 'react';

import { LIST_SECONDARY_COLUMNS_MAPPING } from '../../../constants/table-columns-mapping';

function useRightPanel({ activeTab, columns, setParams, setApiName }) {
	const [secondaryTab, setSecondaryTab] = useState('submitted_requests');

	let filteredColumns = [];

	if (activeTab === 'requests_sent') {
		// eslint-disable-next-line max-len
		filteredColumns = columns.filter((listItem) => LIST_SECONDARY_COLUMNS_MAPPING[secondaryTab]?.includes(listItem.id));
	}

	useEffect(() => {
		const apiName = secondaryTab === 'uploaded_files'
			? 'feedback_response_sheets'
			: 'feedback_requests';

		setApiName(apiName);

		setParams((prev) => ({

			...prev,

			filters: {
				...prev.filters,
				status: secondaryTab === 'submitted_requests' ? 'responded' : undefined,

			},
		}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [secondaryTab]);

	return {
		secondaryTab,
		setSecondaryTab,
		filteredColumns,
	};
}
export default useRightPanel;
