import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetOfferLetter = () => {
	const { query } = useSelector((state) => state.general);
	const { profile_id } = query || {};

	const params = {
		employee_details_required : true,
		filters                   : {
			employee_detail_id: profile_id,
		},
	};

	const [{ data, loading }] = useHarbourRequest({
		method : 'get',
		url    : '/list_employee_offer_letters',
		params,
	}, { manual: false });

	const offerLetter = data?.list?.[0] || {};

	return {
		offerLetter,
		loading,
	};
};

export default useGetOfferLetter;
