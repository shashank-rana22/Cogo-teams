import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const CATEGORY_MAPPING = {
	fcl_freight : 'FCL',
	air_freight : 'Air',
};

const SUB_CATEGORY_MAPPING = {
	import : 'IMPORTS',
	export : 'EXPORTS',
};

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
					Category    : CATEGORY_MAPPING[category] || category,
					Subcategory : SUB_CATEGORY_MAPPING[sub_category] || sub_category,
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
