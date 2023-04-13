import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Props {
	status?:string,
	inputValues?:{ remarks?:string },
}

const useSezApproveReject = ({
	refetch,
	setShowModal,
	id,
	sezRequest,
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

	const useOnAction = async ({ inputValues, status }:Props) => {
		const { remarks } = inputValues || {};
		try {
			const apiResponse = await trigger({
				data: {
					status,
					remark : remarks,
					data   : {
						sezRequest,
					},
					updatedBy: userId,
				},
			});
			const {
				data: { message },
			} = apiResponse;
			if (message === 'Updated Successfully') {
				Toast.success('Request Updated Sucessfully');
				setShowModal(false);
				refetch();
			} else {
				Toast.error(message);
			}
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		useOnAction,
		loading,
	};
};

export default useSezApproveReject;
