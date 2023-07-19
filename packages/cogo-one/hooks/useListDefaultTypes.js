import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListDefaultTypes = ({ raiseTicketModal = {} }) => {
	const { source = '', data:{ formattedData = {} } } = raiseTicketModal || {};
	const { category = '', sub_category = '' } = formattedData || {};

	const [{ loading, data }, trigger] = useTicketsRequest({
		url     : '/default_types',
		method  : 'get',
		authkey : 'get_ticket_default_types',
	}, { manual: true });

	const getDefaultTypes = useCallback(() => {
		try {
			trigger({
				params: {
					Category    : category,
					Subcategory : sub_category,
				},
			});
		} catch (e) {
			console.error(e?.response?.data || 'something went wrong');
		}
	}, [category, sub_category, trigger]);

	useEffect(() => {
		if (source === 'transactional_activity') {
			getDefaultTypes();
		}
	}, [getDefaultTypes, source]);

	return {
		getDefaultTypes,
		typesLoading : loading,
		data         : data?.items || {},
	};
};
export default useListDefaultTypes;
