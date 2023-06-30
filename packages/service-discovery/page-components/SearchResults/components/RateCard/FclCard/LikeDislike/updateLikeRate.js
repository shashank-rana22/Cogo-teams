import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const URL = '/create_spot_search_rate_feedback';

const useUpdateLikeRate = ({ rateCardData, detail }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { search_id = '' } = query;

	const [loading, setLoading] = useState(false);

	const [{ loading : apiLaoding }, trigger] = useRequest({
		url    : URL,
		method : 'POST',
	}, { manual: true });

	const handleLikeRateCard = async () => {
		if (rateCardData.is_liked || loading) {
			return;
		}

		try {
			setLoading(true);

			const params = {
				id                  : search_id,
				is_liked            : true,
				selected_card       : rateCardData.card,
				performed_by_org_id : detail.importer_exporter.id,
			};

			await trigger({
				data: params,
			});
		} catch (err) {
			console.log(err);
		}

		setLoading(false);
	};

	return {
		handleLikeRateCard,
		loading,
	};
};

export default useUpdateLikeRate;
