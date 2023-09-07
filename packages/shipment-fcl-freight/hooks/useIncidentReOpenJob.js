import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const getFormattedPayload = ({ values = {}, shipmentData = {}, user_id = '' }) => ({
	type : 'JOB_OPEN',
	data : {
		jobOpenRequest: {
			id        : shipmentData?.id,
			jobNumber : shipmentData?.serial_id,

			remark       : values?.remark,
			documentUrls : [values?.proof_url?.finalUrl],
		},
		organization: {
			businessName: shipmentData?.importer_exporter?.business_name,
		},
	},
	toWhomToSendForApproval      : ['LEVEL_1', 'LEVEL_2'],
	incidentApprovalManagementId : 'Yg',
	createdBy                    : user_id,
	source                       : 'SHIPMENT',

});

const useIncidentReOpenJob = ({
	shipmentData = {},
	setIsSuccess = () => {},
}) => {
	const { user_id = '' } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [{ loading = false }, trigger] = useRequestBf({
		url     : '/incident-management/incident',
		method  : 'POST',
		authKey : 'post_incident_management_incident',
	}, { manual: true });

	const onReOpenJob = async (values) => {
		const payload = getFormattedPayload({ values, shipmentData, user_id });

		try {
			await trigger({
				data: payload,
			});

			setIsSuccess(true);
		} catch (error) {
			Toast.error(error?.response?.data?.message || error?.data?.message || 'Something went wrong.');
		}
	};

	return {
		loading,
		onReOpenJob,
	};
};

export default useIncidentReOpenJob;
