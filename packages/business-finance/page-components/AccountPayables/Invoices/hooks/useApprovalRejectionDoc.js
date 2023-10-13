import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError';

const STATUS_LABEL = {
	APPROVED : 'Tagged',
	REJECTED : 'Reject',
};

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
				performedByType : user_profile?.session_type,
				taggedDocuments : taggedDocument,
				payRunType      : 'OVERSEAS',
			};
			const response = await trigger({
				data: payload,
			});

			if (['APPROVED', 'REJECTED'].includes(checkStatus) && response?.data?.id) {
				const label = STATUS_LABEL[checkStatus];

				setShowCheckInvoices((prevState) => ({
					...prevState,
					[response.data.id]: label,
				}));
			}

			if (response?.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}
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
