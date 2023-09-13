import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

function useGetListSupplier({ setViewSelectedInvoice = () => {}, setSavePayrunModal = () => {}, type = '' }) {
	const { push } = useRouter();

	const { query: urlQuery = {} } = useSelector(({ general }) => ({
		query: general.query,
	}));
	const {
		payrun = '',
	} = urlQuery || {};
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { search = '' } = filters || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/list-supplier',
			method  : 'get',
			authKey : 'get_purchase_payrun_list_supplier',
		},
		{ manual: true },
	);

	const { query = '', debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		try {
			trigger({ params: { payrunId: payrun, searchType: query || undefined } });
		} catch (e) {
			toastApiError(e);
		}
	}, [payrun, trigger, query]);

	const handleClick = () => {
		setViewSelectedInvoice(false);

		if (payrun && type === 'audit') {
			push(
				'/business-finance/account-payables/audit/[payrun_id]',
				`/business-finance/account-payables/audit/${payrun}`,
			);
		} else {
			push(
				'/business-finance/account-payables/[active_tab]',
				'/business-finance/account-payables/payruns',
			);
		}
		setSavePayrunModal(false);
		Toast.success('Please wait while Payrun Saves...');
	};

	useEffect(() => {
		setApiData(data);
	}, [data]);

	return {
		loading,
		setFilters,
		suppliers: apiData,
		trigger,
		setApiData,
		handleClick,
	};
}

export default useGetListSupplier;
