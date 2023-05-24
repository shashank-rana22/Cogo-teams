import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useGetPartnerRmMapping = () => {
	const {
		profile,
	} = useSelector((state) => state);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_partner_user_rm_mapping',
		method : 'get',
	}, { manual: true });

	const getPartnerMappingData = async (id) => {
		try {
			await trigger({
				params: {
					partner_id : profile.partner.id,
					user_id    : id,
				},
			});
		} catch (err) {
			console.log(err?.message);
		}
	};

	return {
		getPartnerMappingData,
		data: data || {},
		loading,
	};
};

export default useGetPartnerRmMapping;
