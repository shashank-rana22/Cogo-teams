import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError.ts';

const useApprovalRejectionDoc = ({ setShowCheckInvoices = () => {}, setIsOpen = () => {} }) => {
	const {
		user_profile = '',
	} = useSelector(({ profile }) => ({ user_profile: profile }));

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'put',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: true },
	);

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

	return {
		data,
		loadingList: loading,
		onAprrovalOrRejection,
	};
};

export default useApprovalRejectionDoc;
