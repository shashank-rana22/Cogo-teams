import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const URL = '/create_spot_search_rate_feedback';

const useUpdateLikeRate = ({ rate, detail, setLikeState = () => {} }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { spot_search_id = '' } = query;

	const [loading, setLoading] = useState(false);

	const [{ loading : apiLoading }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const handleLikeRateCard = async () => {
		if (rate.is_liked || loading) {
			return;
		}

		try {
			setLoading(true);

			const params = {
				id                  : spot_search_id,
				is_liked            : true,
				selected_card       : rate.card,
				performed_by_org_id : detail.importer_exporter.id,
			};

			await trigger({
				data: params,
			});

			setLikeState({
				is_liked    : true,
				likes_count : (rate.likes_count || 0) + 1,
				is_disliked : false,
			});
		} catch (error) {
			if (error.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}

		setLoading(false);
	};

	return {
		handleLikeRateCard,
		loading,
		apiLoading,
	};
};

export default useUpdateLikeRate;
