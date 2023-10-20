import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetInterJvData = ({
	refetch = () => {},
	setShowICJvModal,
	interCompanyJournalVoucherRequest,
	id,
	remark,
	t,
}) => {
	const { user_id:userId } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [
		{ loading },
		trigger,
	] = useRequestBf(
		{
			url     : 'payments/icjv/update',
			method  : 'post',
			authKey : 'post_payments_journal_voucher_reject',
		},
		{ manual: true },
	);

	const useOnAction = async (status) => {
		const payload = {
			incidentId  : id,
			parentJvId  : interCompanyJournalVoucherRequest?.id,
			remark,
			performedBy : userId,
			status,
		};
		try {
			await trigger({
				data: payload,
			});

			Toast.success(t('incidentManagement:request_updated_successfully_message'));
			setShowICJvModal(false);
			refetch();
		} catch (e) {
			Toast.error(e?.response?.data?.message);
		}
	};

	return {
		useOnAction,
		loading,
	};
};

export default useGetInterJvData;
