import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const LEVELS_FOR_APPROVAL = ['LEVEL_1', 'LEVEL_2'];

const getFormattedPayload = ({ values = {}, shipmentData = {}, user_id = '' }) => ({
	type            : 'JOB_OPEN',
	incidentSubType : shipmentData?.shipment_type?.toUpperCase(),
	data            : {
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
	description             : values?.remark,
	toWhomToSendForApproval : LEVELS_FOR_APPROVAL,
	createdBy               : user_id,
	source                  : 'SHIPMENT',

});

const useIncidentReOpenJob = ({
	shipmentData = {},
	refetch = () => {},
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
		try {
			const payload = getFormattedPayload({ values, shipmentData, user_id });

			await trigger({
				data: payload,
			});

			Toast.success('Request Submitted!');

			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		onReOpenJob,
	};
};

export default useIncidentReOpenJob;
