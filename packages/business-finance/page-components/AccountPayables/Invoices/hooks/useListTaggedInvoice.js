import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useListTaggedInvoices = ({ setShowCheckInvoices = () => {}, setIsOpen = () => {} }) => {
	const {
		query = {},
		user_profile = '',
	} = useSelector(({ general, profile }) => ({ query: general.query, user_profile: profile }));

	const [params, setParams] = useState({
		pageIndex : 1,
		pageSize  : 10,
	});

	const { payrun = '' } = query || {};

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: true },
	);

	const generateInvoice = useCallback(async () => {
		try {
			trigger({
				params: {
					payrunId  : payrun,
					pageSize  : 10,
					pageIndex : 1,
				},
			});
		} catch (e) {
			Toast.error(e?.error?.message || 'Failed to Fetch Data');
		}
	}, [payrun, trigger]);

	const onAprrovalOrRejection = async (
		id = '',
		checkStatus = '',
		taggedDocument = [],
		handleDropdown = () => {},
	) => {
		try {
			const payload = {
				id,
				status          : checkStatus,
				remarks         : checkStatus.toLowerCase(),
				performedBy     : user_profile?.user?.id,
				performedByType : user_profile.session_type,
				taggedDocuments : taggedDocument,
				payRunType      : 'OVERSEAS',
			};
			const response = await trigger({
				data: payload,
			});

			if (checkStatus === 'APPROVED' && response?.data?.id) {
				setShowCheckInvoices((p) => ({
					...p,
					[response?.data?.id]: 'Tagged',
				}));
			} else if (checkStatus === 'REJECTED' && response?.data?.id) {
				setShowCheckInvoices((p) => ({
					...p,
					[response?.data?.id]: 'Reject',
				}));
			}
			if (response?.hasError) return;
			Toast.success(`${checkStatus} successfully`);
			handleDropdown(id);
			setIsOpen(null);
		} catch (error) {
			toastApiError(error);
		}
	};

	useEffect(() => {
		generateInvoice();
	}, [generateInvoice]);

	return {
		data,
		loadingList: loading,
		generateInvoice,
		onAprrovalOrRejection,
		setParams,
		params,
	};
};

export default useListTaggedInvoices;
