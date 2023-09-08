import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import changeFormat from '../utils/changeFormat';
import getConfig from '../utils/getConfig';
import getKeyByValue from '../utils/getKeyByValue';
import onClearingFilters from '../utils/onClearingFilters';
import onGoingBack from '../utils/onGoingBack';
import settingApiData from '../utils/settingApiData';

const useGetInvoiceSelection = ({ sort = {} }) => {
	const { push } = useRouter();
	const {
		query: urlQuery = {},
		performedBy = '', performedByType = '', performedByName = '',
	} = useSelector(({ general, profile }) => ({
		query           : general.query,
		performedBy     : profile.user.id,
		performedByType : profile.session_type,
		performedByName : profile.user.name,
	}));

	const [apiData, setApiData] = useState({});
	const [apiTdsData, setApiTdsData] = useState({});
	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);

	const {
		entity = '', currency: queryCurr = '', payrun = '', organizationId = '',
		services = '', payrun_type = '', partner_id = '',
	} = urlQuery || {};

	const country = getKeyByValue(GLOBAL_CONSTANTS.country_entity_ids, partner_id);
	const config = getConfig({ country, viewSelectedInvoice });

	const listInvoices = useRequestBf(
		{
			url: '/purchase/payable-bill/list', method: 'get', authKey: 'get_purchase_payable_bill_list',
		},
		{ manual: false },
	);
	const listSelectedInvoice =	useRequestBf(
		{
			url: '/purchase/payrun-bill', method: 'get', authKey: 'get_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const api = viewSelectedInvoice ? listSelectedInvoice : listInvoices;

	const [{ data, loading }, trigger] = api || [];

	const { query = '', debounceQuery } = useDebounceQuery();
	const [globalFilters, setGlobalFilters] = useState({
		pageIndex   : 1,
		pageSize    : 10,
		entity,
		currency    : queryCurr,
		invoiceView : 'coe_accepted',
	});

	const { search = '', dueDate = '', invoiceDate = '', updatedDate = '', category = '', ...rest } = globalFilters;
	const restParse = JSON.stringify(rest);
	const sortParse = JSON.stringify(sort);

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

	const refetch = useCallback(() => {
		const q = query || undefined;
		trigger({
			params: {
				payrunId           : payrun,
				entityCode         : entity,
				currency           : queryCurr,
				performedBy,
				performedByType,
				performedByName,
				organizationId,
				services,
				category           : category || undefined,
				...(JSON.parse(restParse) || {}),
				startDate          : changeFormat({ time: dueDate?.startDate }) || undefined,
				endDate            : changeFormat({ time: dueDate?.endDate }) || undefined,
				fromBillDate       : changeFormat({ time: invoiceDate?.startDate }) || undefined,
				toBillDate         : changeFormat({ time: invoiceDate?.endDate }) || undefined,
				fromUploadBillDate : changeFormat({ time: updatedDate?.startDate }) || undefined,
				toUploadBillDate   : changeFormat({ time: updatedDate?.endDate }) || undefined,
				q,
				...(JSON.parse(sortParse) || {}),
			},
		});
	}, [
		restParse,
		dueDate,
		invoiceDate,
		updatedDate,
		query,
		category,
		sortParse,
		trigger,
		entity,
		organizationId,
		payrun,
		performedBy,
		performedByName,
		performedByType,
		queryCurr,
		services,
	]);

	useEffect(() => { refetch(); }, [refetch]);

	const setEditedValue = ({ itemData = {}, value = '', key = '', checked = false }) => {
		settingApiData({ itemData, value, key, checked, setApiData });
	};
	const onClear = () => { onClearingFilters({ setGlobalFilters, entity, queryCurr }); };
	const goBack = () => { onGoingBack({ viewSelectedInvoice, setViewSelectedInvoice, push }); };

	return {
		config,
		refetch,
		invoiceData : apiData,
		tdsData     : apiTdsData,
		onClear,
		listSelectedInvoice,
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
	};
};

export default useGetInvoiceSelection;
