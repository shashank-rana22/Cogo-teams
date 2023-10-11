import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import createPayload from '../utils/createPayload';
import getConfig from '../utils/getConfig';
import getKeyByValue from '../utils/getKeyByValue';
import onClearingFilters from '../utils/onClearingFilters';
import onGoingBack from '../utils/onGoingBack';
import setApiListData from '../utils/setApiListData';

const useGetInvoiceSelection = ({ sort = {} }) => {
	const { push } = useRouter();
	const {
		query: urlQuery = {},
		performedBy = '', performedByType = '', performedByName = '',
	} = useSelector(({ general, profile }) => ({
		query           : general?.query,
		performedBy     : profile?.user?.id,
		performedByType : profile?.session_type,
		performedByName : profile?.user?.name,
	}));

	const [apiData, setApiData] = useState({});
	const [apiTdsData, setApiTdsData] = useState({});
	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);

	const {
		entity = '', currency: queryCurr = '', payrun_type = '', partner_id = '',
	} = urlQuery || {};

	const country = getKeyByValue(GLOBAL_CONSTANTS.country_entity_ids, partner_id);
	const config = getConfig({ country, viewSelectedInvoice });

	const { query = '', debounceQuery } = useDebounceQuery();
	const [globalFilters, setGlobalFilters] = useState({
		pageIndex   : 1,
		pageSize    : 20,
		entity,
		currency    : queryCurr,
		invoiceView : 'coe_accepted',
	});

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url: '/purchase/payable-bill/list', method: 'get', authKey: 'get_purchase_payable_bill_list',
		},
		{ manual: true },
	);

	const { search = '' } = globalFilters;

	useEffect(() => {
		const newData = { ...data };
		if (newData.list) {
			newData.list = newData?.list?.map((item) => ({
				...item,
				payableValue       : item?.payableAmount,
				tdsValue           : item?.tdsAmount,
				inputAmount        : item?.payableAmount,
				constPayableAmount : item?.invoiceAmount,
			}));
		}
		setApiData(newData);
		setApiTdsData(newData);
	}, [data]);

	useEffect(() => { debounceQuery(search); }, [search, debounceQuery]);

	const payload = createPayload({
		query,
		globalFilters,
		sort,
		performedBy,
		performedByName,
		performedByType,
		urlQuery,
	});

	const parserdData = JSON.stringify(payload);

	const refetch = useCallback(() => {
		trigger({
			params: {
				...(JSON.parse(parserdData) || {}),
			},
		});
	}, [parserdData, trigger]);

	useEffect(() => {
		if (!viewSelectedInvoice) { refetch(); }
	}, [refetch, viewSelectedInvoice]);

	const setEditedValue = ({ itemData = {}, value = '', key = '', checked = false }) => {
		setApiListData({ itemData, value, key, checked, setApiData });
	};
	const onClear = () => { onClearingFilters({ setGlobalFilters, entity, queryCurr }); };
	const goBack = () => { onGoingBack({ viewSelectedInvoice, setViewSelectedInvoice, push }); };

	return {
		config,
		refetch,
		invoiceData : apiData,
		tdsData     : apiTdsData,
		onClear,
		globalFilters,
		setGlobalFilters,
		viewSelectedInvoice,
		setViewSelectedInvoice,
		goBack,
		setEditedValue,
		loading,
		payrun_type,
		currency    : urlQuery?.currency,
		apiData,
		data,
		setApiData,
		payload,
	};
};

export default useGetInvoiceSelection;
