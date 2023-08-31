import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';
import { VIEW_SELECTED_CONFIG } from '../CreatePayrun/Configurations/viewSelectedConfig';
import { VIEW_SELECTED_CONFIG_VN } from '../CreatePayrun/Configurations/viewSelectedConfigVN';
import getKeyByValue from '../utils/getKeyByValue';

const useGetSelectedInvoices = ({ apiData, setApiData }) => {
	const { query: urlQuery } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const {
		entity = '',
		currency,
		payrun,
		partner_id,
	} = urlQuery || {};

	const country = getKeyByValue(
		GLOBAL_CONSTANTS.country_entity_ids,
		partner_id,
	);

	const VIEW_SELECTED_CONFIG_MAPPING = {
		IN : VIEW_SELECTED_CONFIG,
		VN : VIEW_SELECTED_CONFIG_VN,
	};

	const [filters, setFIlters] = useState({ pageIndex: 1, pageSize: 10 });
	const { pageIndex, pageSize } = filters;
	const [
		{
			data: selectedInvoices,
			loading: selectedInvoiceLoading,
		},
		selectedInvoiceTrigger,
	] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: false },
	);
	const getInvoices = useCallback(
		async () => {
			try {
				await selectedInvoiceTrigger({
					params: {
						pageIndex  : pageIndex || undefined,
						pageSize   : pageSize || undefined,
						currency   : currency || undefined,
						entityCode : entity || undefined,
						payrunId   : payrun,
					},
				});
			} catch (e) {
				setApiData({});
				toastApiError(e);
			}
		},
		[pageIndex, pageSize, payrun, entity, currency, selectedInvoiceTrigger, setApiData],
	);

	useEffect(() => {
		setApiData(selectedInvoices);
	}, [selectedInvoices, setApiData]);

	useEffect(() => {
		if (payrun) {
			getInvoices();
		}
	}, [getInvoices, payrun]);

	return ({
		apiData,
		setFIlters,
		filters,
		selectedInvoiceLoading,
		getInvoices,
		config: VIEW_SELECTED_CONFIG_MAPPING[country],
	});
};

export default useGetSelectedInvoices;
