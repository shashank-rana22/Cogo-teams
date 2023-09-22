import { useRequest } from '@cogoport/request';

const getSubmitCsatPayload = ({ feedback = {}, serviceName = '', csatInfo = {}, details = {} }) => {
	const { selectedOptions = [], reason = '', rating } = feedback || {};

	return {
		achieved_rating : rating,
		service_name    : serviceName,
		reference_id    : details?.id,
		csat_score_id   : csatInfo?.csat_score_id,
		remarks         : selectedOptions,
		description     : reason,
	};
};

const useSubmitCsat = (props) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_csat_score',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const submitCsat = () => {
		const payload = getSubmitCsatPayload(props);
		try {
			trigger({
				data: payload,
			});
		} catch (e) {
			console.error(e);
		}
	};

	return ({ submitCsat, loading, data });
};

export default useSubmitCsat;
