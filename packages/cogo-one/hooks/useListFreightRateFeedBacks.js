import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const API_MAPPING = {
	air_freight : 'list_air_freight_rate_feedbacks',
	fcl_freight : 'list_fcl_freight_rate_feedbacks',
	fcl_customs : 'list_fcl_customs_rate_feedbacks',
	haulage     : 'list_haulage_freight_rate_feedbacks',
	lcl_freight : 'list_lcl_freight_rate_feedbacks',
	lcl_customs : 'list_lcl_customs_rate_feedbacks',
	air_customs : 'list_air_customs_rate_feedbacks',
	trailer     : 'list_trailer_freight_rate_feedbacks',
	ltl_freight : 'list_ltl_freight_rate_feedbacks',
	ftl_freight : 'list_ftl_freight_rate_feedbacks',
};

const getParams = ({ sourceId }) => ({
	filters                  : { id: sourceId },
	booking_details_required : true,
});

const useListFreightRateFeedBacks = ({
	params = {},
	sourceId = '',
}) => {
	const apiName = API_MAPPING[params?.service];

	const [{ loading, data }, trigger] = useRequest({
		url    : apiName,
		method : 'GET',
	}, { manual: true });

	const getFreightRateFeedback = useCallback(
		async () => {
			if (!apiName) {
				return;
			}

			try {
				await trigger(
					{
						params: getParams({ sourceId }),
					},
				);
			} catch (err) {
				console.error(err);
			}
		},
		[apiName, sourceId, trigger],
	);

	return {
		feedbackLoading : loading,
		feedbackData    : data,
		getFreightRateFeedback,
	};
};

export default useListFreightRateFeedBacks;
