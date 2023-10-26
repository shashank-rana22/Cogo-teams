import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const API_MAPPING = {
	fcl_freight : 'delete_fcl_freight_rate_feedback',
	air_freight : 'delete_air_freight_rate_feedback',
	ftl_freight : 'delete_ftl_freight_rate_feedback',
	lcl_freight : 'delete_lcl_freight_rate_feedback',
	ltl_freight : 'delete_ltl_freight_rate_feedback',
	fcl_customs : 'delete_fcl_customs_rate_feedback',
	lcl_customs : 'delete_lcl_customs_rate_feedback',
	air_customs : 'delete_air_customs_rate_feedback',
	haulage     : 'delete_haulage_freight_rate_feedback',
	trailer     : 'delete_trailer_freight_rate_feedback',
	fcl_cfs     : 'delete_fcl_cfs_rate_feedback',
};

const KEY_TO_SEND = {
	fcl_freight : 'fcl_freight_rate_feedback_ids',
	air_freight : 'air_freight_rate_feedback_ids',
	ftl_freight : 'ftl_freight_rate_feedback_ids',
	lcl_freight : 'lcl_freight_rate_feedback_ids',
	ltl_freight : 'ltl_freight_rate_feedback_ids',
	fcl_customs : 'fcl_customs_rate_feedback_ids',
	lcl_customs : 'lcl_customs_rate_feedback_ids',
	air_customs : 'air_customs_rate_feedback_ids',
	haulage     : 'haulage_freight_rate_feedback_ids',
	trailer     : 'trailer_freight_rate_feedback_ids',
	fcl_cfs     : 'fcl_cfs_rate_feedback_ids',
};

const useDeleteFreightRateFeedbacks = (service = 'fcl_freight') => {
	const apiName = API_MAPPING[service];

	const [{ loading }, trigger] = useRequest({ url: `/${apiName}`, method: 'post' }, { manual: true });

	const deleteFeedbackRequest = async ({ id, closing_remarks, checkboxValue, remarks }) => {
		const keyToSend = KEY_TO_SEND[service];
		try {
			const body = {
				[keyToSend]     : [id],
				closing_remarks : [checkboxValue || closing_remarks || 'Rate Created'],
				remarks         : remarks || undefined,
			};

			const resp = await trigger({
				data: body,
			});
			if (resp) { return resp?.status; }
		} catch (e) {
			Toast.error('Failed To Cancel');
		}
		return null;
	};

	return {
		loading,
		deleteFeedbackRequest,
	};
};

export default useDeleteFreightRateFeedbacks;
