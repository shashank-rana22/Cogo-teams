import useDebounceQuery from '@cogoport/forms/hooks/useDebounceQuery';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';
import CREATE_PAYRUN_CONFIG from '../CreatePayrun/Configurations/createPayrunConfig.json';
import CREATE_PAYRUN_CONFIG_VN from '../CreatePayrun/Configurations/createPayrunConfigVN.json';
import changeFormat from '../utils/changeFormat';
import getKeyByValue from '../utils/getKeyByValue';

const useGetPayrunInvoices = ({ apiData = {}, setApiData = () => {} }) => {
	const { query: urlQuery = {} } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const geo = getGeoConstants();

	const {
		entity = '', currency = geo.country.currency.code,
		payrun = '', payrun_type = '', partner_id = '',
	} = urlQuery || {};
	const country = getKeyByValue(GLOBAL_CONSTANTS.country_entity_ids, partner_id);
	const [orderBy, setOrderBy] = useState({});
	const [filters, setFilters] = useState(
		{
			invoiceView : 'coe_accepted',
			pageSize    : 10,
			pageIndex   : 1,
			currency,
			entity,
			invoiceType : payrun_type === 'OVERHEADS' ? 'expense' : undefined,
		},
	);

	const CREATE_PAYRUN_CONFIG_MAPPING = { IN: CREATE_PAYRUN_CONFIG, VN: CREATE_PAYRUN_CONFIG_VN };

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ manual: true },
	);

	const {
		search = '', pageSize = 10, pageIndex = 1, invoiceView = '', category = '', invoiceType = '',
		urgencyTag = '', currency: filterCurrency = '', entity: filterEntity = '',
		services = '', invoiceDate = '', dueDate = '', updatedDate = '',
	} = filters || {};

	const { dueDateSortType = '' } = orderBy || {};
	const { startDate = '', endDate = '' } = invoiceDate || {};
	const { startDate: fromBillDate = '', endDate: toBillDate = '' } = dueDate || {};
	const { startDate: fromUploadBillDate = '', endDate: toUploadBillDate = '' } = updatedDate || {};
	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => { debounceQuery(search); }, [debounceQuery, search]);

	useEffect(() => {
		const newData = { ...data };
		const { list = [] } = newData || {};
		if (newData.list) {
			newData.list = (list || []).map((item) => {
				const {
					payableAmount = '',
					tdsAmount = '',
					bankDetail = {},
				} = item || {};
				return {
					...item,
					payableValue : payableAmount,
					tdsValue     : tdsAmount,
					bankValue    : bankDetail,
					inputAmount  : item?.payableAmount,
				};
			});
		}
		setApiData(newData);
	}, [data, setApiData]);

	const getPayrunInvoices = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						q                  : query || undefined,
						pageIndex          : pageIndex || undefined,
						pageSize           : pageSize || undefined,
						category           : category || undefined,
						invoiceView        : invoiceView || undefined,
						currency           : filterCurrency || undefined,
						invoiceType        : invoiceType || undefined,
						entity             : filterEntity || undefined,
						urgencyTag         : urgencyTag || undefined,
						services           : services || undefined,
						dueDateSortType    : dueDateSortType || undefined,
						startDate          : startDate ? changeFormat({ time: startDate }) : undefined,
						endDate            : endDate ? changeFormat({ time: endDate }) : undefined,
						fromBillDate       : fromBillDate ? changeFormat({ time: fromBillDate }) : undefined,
						toBillDate         : toBillDate ? changeFormat({ time: toBillDate }) : undefined,
						fromUploadBillDate : fromUploadBillDate
							? changeFormat({ time: fromUploadBillDate }) : undefined,
						toUploadBillDate : toUploadBillDate ? changeFormat({ time: toUploadBillDate }) : undefined,
						payrunId         : payrun,
					},
				});
			} catch (e) {
				setApiData({});
				toastApiError(e);
			}
		},
		[pageIndex, pageSize,
			query, filterCurrency, urgencyTag, filterEntity, invoiceType,
			invoiceView, category, dueDateSortType, services, startDate,
			endDate, fromBillDate, setApiData,
			toBillDate, fromUploadBillDate,
			toUploadBillDate, trigger, payrun],
	);

	useEffect(() => { if (payrun) { getPayrunInvoices(); } }, [getPayrunInvoices, payrun]);

	return {
		billsLoading : loading,
		filters,
		setFilters,
		entity,
		apiData,
		currency,
		setOrderBy,
		orderBy,
		getPayrunInvoices,
		config       : CREATE_PAYRUN_CONFIG_MAPPING[country],
		data,
		loading,
	};
};

export default useGetPayrunInvoices;
