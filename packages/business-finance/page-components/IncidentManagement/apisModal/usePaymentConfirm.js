import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const usePaymentConfirm = ({
	refetch,
	setShowModal,
	id,
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
			url     : `/incident-management/incident/${id}`,
			method  : 'patch',
			authKey : 'patch_incident_management_incident_by_id',
		},
		{ manual: true },
	);

	const successToast = () => {
		Toast.success(t('incidentManagement:request_updated_successfully_message'));
		setShowModal(false);
		refetch();
	};

	const onAction = async ({ inputValues, status }) => {
		const { remarks = '' } = inputValues || {};
		try {
			const apiResponse = await trigger({
				data: {
					status,
					remark    : remarks,
					updatedBy : userId,
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				successToast();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			Toast.error(e?.response?.data?.message || t('incidentManagement:something_went_wrong_message'));
		}
	};

	return {
		onAction,
		loading,
	};
};

export default usePaymentConfirm;
