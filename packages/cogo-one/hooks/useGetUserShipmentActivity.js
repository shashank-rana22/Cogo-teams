import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const API_MAPPING = {
	quotation : 'list_checkouts',
	shipment  : 'list_shipments',
};

const getParam = ({ orgId, searchValue }) => ({
	tasks_messages_count_required : false,
	filters                       : {
		importer_exporter_id : orgId,
		serial_id            : searchValue || undefined,
	},
});

const useGetUserShipmentActivity = ({
	organizationId = '',
	activeTab = '',
}) => {
	const [query, setQuery] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const { query: searchValue, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : `/${API_MAPPING[activeTab]}`,
		method : 'get',
	}, { manual: true });

	const fetchActivityLogs = useCallback(async ({ orgId }) => {
		try {
			await trigger({
				params: getParam({ orgId, searchValue: searchQuery }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, searchQuery]);

	useEffect(() => {
		debounceQuery(query?.trim());
	}, [debounceQuery, query]);

	useEffect(() => {
		setSearchQuery(searchValue);
	}, [searchValue]);

	useEffect(() => {
		if (organizationId) {
			fetchActivityLogs({ orgId: organizationId });
		}
	}, [fetchActivityLogs, organizationId]);

	return {
		activityData    : data,
		activityLoading : loading,
		fetchActivityLogs,
		query,
		setQuery,
		setSearchQuery,
	};
};

export default useGetUserShipmentActivity;
