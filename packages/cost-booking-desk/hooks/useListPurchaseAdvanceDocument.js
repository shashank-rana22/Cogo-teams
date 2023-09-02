// import { Toast } from '@cogoport/components';
// // import { useDebounceQuery } from '@cogoport/forms';
// import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
// import { isEmpty } from '@cogoport/utils';
// import { useEffect, useCallback, useState, useContext } from 'react';

// import CostBookingDeskContext from '../context/CostBookingDeskContext';

// const INIT_PAGE = 1;

function useListPurchaseAdvanceDocument(searchValue) {
	console.log('searchValue:', searchValue);
	// const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};

	// const contextValues = useContext(CostBookingDeskContext);

	// const { shipmentType, stepperTab, activeTab, paymentType } = contextValues || {};

	// const [apiData, setApiData] = useState('');
	// const [pagination, setPagination] = useState(INIT_PAGE);
	// const { query = '', debounceQuery } = useDebounceQuery();

	// const [{ loading }, trigger] = useRequest({
	// 	url    : '/purchase/advance-document/list/v2',
	// 	method : 'GET',
	// 	params : {
	// 		filters: {
	// 			q: query,
	// 		},
	// 		page       : pagination,
	// 		page_limit : 10,
	// 	},
	// }, { manual: true });

	// const apiTrigger = useCallback(async () => {
	// 	try {
	// 		const res = await trigger();
	// 		if (isEmpty(res?.data?.list) && pagination > INIT_PAGE) {
	// 			setPagination(INIT_PAGE);
	// 		}
	// 		setApiData(res?.data);
	// 	} catch (err) {
	// 		Toast.error(err?.response?.data?.message || err?.message || 'Something went wrong !!');
	// 	}
	// }, [trigger, pagination]);

	// useEffect(() => {
	// 	const [, scope, view_type] = (authParams || '').split(':');

	// 	if (!scope) { return; }

	// 	const newScopeFilters = { scope, view_type, selected_agent_id };
	// 	apiTrigger();

	// 	localStorage.setItem('cost_booking_desk_values', JSON.stringify({
	// 		activeTab,
	// 		scopeFilters: newScopeFilters,
	// 		stepperTab,
	// 		shipmentType,
	// 		paymentType,
	// 	}));
	// }, [activeTab, apiTrigger, authParams, paymentType, selected_agent_id, shipmentType, stepperTab]);

	// useEffect(() => {
	// 	debounceQuery(searchValue);
	// }, [debounceQuery, searchValue]);

	// return {
	// 	loading,
	// 	apiTrigger,
	// 	data: apiData,
	// };
}
export default useListPurchaseAdvanceDocument;
