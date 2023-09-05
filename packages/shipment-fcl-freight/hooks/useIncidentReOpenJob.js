import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useIncidentReOpenJob = ({
	shipmentData = {},
	setIsSuccess = () => {},
}) => {
	const { user_id } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [{ loading }, trigger] = useRequestBf({
		url     : '/incident-management/incident',
		method  : 'POST',
		authKey : '',
	}, { manual: true });

	const onReOpenJob = async (values) => {
		const payload = {
			type : 'JOB_OPEN',
			data : {
				jobOpenRequest: {
					id        : shipmentData?.id,
					jobNumber : shipmentData?.serial_id,

					remark       : values?.remark,
					documentUrls : [values?.proof_url?.finalUrl],
				},
			},
			toWhomToSendForApproval      : ['LEVEL_1', 'LEVEL_2'],
			incidentApprovalManagementId : 'Yg',
			createdBy                    : user_id,
		};

		try {
			await trigger({
				data: payload,
			});

			setIsSuccess(true);
		} catch (error) {
			Toast.error(error?.response?.data?.message || error?.message);
		}
	};

	return {
		loading,
		onReOpenJob,
	};
};

export default useIncidentReOpenJob;
