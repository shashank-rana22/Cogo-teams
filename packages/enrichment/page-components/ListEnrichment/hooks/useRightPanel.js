import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useState, useEffect } from 'react';

const geo = getGeoConstants();

function useRightPanel({ activeTab, columns, setParams, setApiName }) {
	const [secondaryTab, setSecondaryTab] = useState('submitted_requests');

	let filteredColumns = [];

	const allowedColumnsMapping = geo.navigations.enrichment.request_sent;

	const allowedColumns = allowedColumnsMapping?.[secondaryTab]?.columns;

	if (activeTab === 'requests_sent') {
		// eslint-disable-next-line max-len
		filteredColumns = columns.filter((listItem) => allowedColumns?.includes(listItem.id));
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
