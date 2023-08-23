import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetDocument = ({ setShowCheckInvoices, setIsOpen = () => {} }) => {
	const { user_profile } = useSelector(({ profile }) => ({
		user_profile: profile,
	}));
	// const DocumentData = useRequest('get', false, 'business_finance', {
	// 	authkey: 'get_purchase_payable_bill_shipment_documents',
	// })('/purchase/payable-bill/shipment-documents');
	// const ApproveReject = useRequest('put', false, 'business_finance', {
	// 	authkey: 'get_purchase_payrun_bill',
	// })('/purchase/payrun-bill');

	const [{ data: DocumentData, loading: billsLoading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/shipment-documents',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_shipment_documents',
		},
		{ manual: true },
	);
	const [{ data: ApproveReject, loading: ApproveRejectLoading },
	] = useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'put',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: true },
	);

	const onGetDocument = async (id, services) => {
		try {
			const payload = {
				id,
				service_type: services.toUpperCase(),
			};
			await trigger({
				params: payload,
			});
		} catch (error) {
			Toast.error(error?.error);
		}
	};
	const onApproveReject = async (
		id,
		checkStatus,
		taggedDocument,
		handleDropdown = () => {},
	) => {
		try {
			const payload = {
				id,
				status          : checkStatus,
				remarks         : checkStatus.toLowerCase(),
				performedBy     : user_profile?.id,
				performedByType : user_profile.session_type,
				taggedDocuments : taggedDocument,
				payRunType      : 'OVERSEAS',
			};
			const response = await ApproveReject?.trigger({
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
			Toast.error(error?.error);
		}
	};
	return {
		onGetDocument,
		onApproveReject,
		DocumentData,
		ApproveReject,
		billsLoading,
		ApproveRejectLoading,
	};
};
export default useGetDocument;
