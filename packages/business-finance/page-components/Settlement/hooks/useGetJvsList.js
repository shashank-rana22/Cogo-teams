import { Toast } from '@cogoport/components';
// import { useDebounceQuery } from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
// import { useState } from 'react';
// import { useSelector } from '@cogoport/store';
// import React, {  } from 'react';

const useGetJVList = ({ filters }) => {
	const [{ data:JvListData, loading: JvListLoading }, JvListTrigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/list',
			authKey : 'get_payments_parent_jv_list',
			method  : 'get',
		},
		{ manual: true },
	);
	const { page = '', pageLimit = '' } = filters || {};
	// const { query = '', debounceQuery } = useDebounceQuery();
	// useEffect(() => {
	// 	debounceQuery(filters?.query);
	// }, [debounceQuery, filters?.query]);
	const jvListRefetch = async () => {
		try {
			// if (filters.tradeParty && filters.entityCode) {
			// const { ...res } = filters || {};

			await JvListTrigger({
				params: {
					page,
					pageLimit,
				},
			});
			// }
		} catch (error) {
			// setApiData({});
			Toast.error(error?.error?.message);
		}
	};

	return {
		JvListData,
		JvListLoading,
		jvListRefetch,
	};
};
export default useGetJVList;
