import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import { AUDIT_CONFIG } from '../columns/auditConfig';

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 10;

const useGetAudit = () => {
	const [{ data, loading }, trigger] = useRequestBf({
		url     : '/purchase/audit',
		method  : 'get',
		authKey : 'get_purchase_audit',
	}, { manual: true, autoCancel: false });

	const [{ loading: updateLoading }, updateTrigger] = useRequestBf({
		url     : '/purchase/payrun-bill',
		method  : 'put',
		authKey : 'put_purchase_payrun_bill',
	}, { manual: true, autoCancel: false });

	const { query, debounceQuery } = useDebounceQuery();

	const { payrun_id, performedBy, performedByType } = useSelector(
		({ general, profile }) => ({
			payrun_id       : general.query?.payrun_id,
			performedBy     : profile.user?.id,
			performedByType : profile.session_type,
		}),
	);

	const [globalFilters, setGlobalFilters] = useState({
		pageIndex : DEFAULT_PAGE_INDEX,
		pageSize  : DEFAULT_PAGE_SIZE,
	});

	const { search, pageIndex, pageSize } = globalFilters;

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const refetch = useCallback((q) => {
		if (payrun_id) {
			trigger({
				params: {
					payrunId : payrun_id,
					pageSize,
					query    : q || undefined,
					pageIndex,
				},
			});
		}
	}, [trigger, payrun_id, pageIndex, pageSize]);

	const updateInvoice = async ({ type, payload, invoice_id }) => {
		try {
			await updateTrigger({
				data: {
					status  : type,
					remarks : payload,
					id      : invoice_id,
					performedBy,
					performedByType,
				},
			});
			refetch();
			Toast.success('Successfully updated');
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	};

	useEffect(() => {
		refetch(query);
	}, [query, refetch]);

	const { stats = {} } = data || {};

	return {
		loading,
		globalFilters,
		setGlobalFilters,
		auditData  : data,
		auditStats : stats,
		config     : AUDIT_CONFIG,
		refetch,
		updateInvoice,
		updateLoading,
	};
};

export default useGetAudit;
