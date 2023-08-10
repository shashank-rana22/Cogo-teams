import { useTicketsRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListDefaultTypes = ({ shipmentData = {} }) => {
	const { category = '', sub_category = '' } = shipmentData || {};

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
		} catch (error) {
			console.error(error);
		}
	}, [category, sub_category, trigger]);

	useEffect(() => {
		getDefaultTypes();
	}, [getDefaultTypes]);

	return {
		getDefaultTypes,
		typesLoading          : loading,
		ticketDefaultTypeData : data?.items || {},
	};
};
export default useListDefaultTypes;
