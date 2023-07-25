import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationServiceExpertises({ show }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_service_expertises',
	}, { manual: true });

	const getOrganizationServiceExpertises = async () => {
		try {
			const payload = {
				filters: {

					origin_location_id      : show?.origin_location_id,
					destination_location_id : show?.destination_location_id,
					service_type            : show?.service_type,
					status                  : 'active',
					neglect_organization_id : show?.organization_id,
				},
				location_details_required : true,
				service_type_required     : true,
				teus_data_required        : true,
			};
			await trigger({
				params: {
					...payload,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if ((show?.origin_location_id && show?.destination_location_id)
		|| show?.location_id) { getOrganizationServiceExpertises(); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show]);
	return {
		data       : data?.list,
		loading,
		totalCount : data?.total_count,
	};
}
export default useGetOrganizationServiceExpertises;
