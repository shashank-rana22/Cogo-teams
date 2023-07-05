import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const URL = '/create_spot_search_rate_feedback';

const useLikeFeedback = ({ rate, detail, setLikeState = () => {}, likeState = {} }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { spot_search_id = '' } = query;

	const [{ loading = false }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const handleLikeRateCard = async () => {
		try {
			const params = {
				id                  : spot_search_id,
				is_liked            : true,
				selected_card       : rate.card,
				performed_by_org_id : detail.importer_exporter.id,
			};

			await trigger({ data: params });

			setLikeState({
				is_liked    : true,
				likes_count : (likeState.likes_count || 0) + 1,
				is_disliked : false,
			});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	};

	return {
		handleLikeRateCard,
		loading,
	};
};

export default useLikeFeedback;
