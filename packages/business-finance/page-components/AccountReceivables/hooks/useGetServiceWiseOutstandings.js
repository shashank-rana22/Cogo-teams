import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

import { AGEING_BUCKET_MAPPING } from '../constants/account-type';

const COGO_ENTITY_LENGTH = 1;
const { zeroth_index } = GLOBAL_CONSTANTS || {};
const useGetServiceWiseOutstandings = ({
	registration_number,
	ageingArr,
	cogo_entity_number,
}) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_service_wise_outstanding_stats',
		method : 'GET',
	}, { manual: true });

	useEffect(() => {
		const getAgeingBucket = () => {
			if (Array.isArray(ageingArr)) {
				return ageingArr.map((val) => AGEING_BUCKET_MAPPING[val.value]);
			}

			return [AGEING_BUCKET_MAPPING[ageingArr]];
		};

		trigger({
			params: {
				registration_number,
				ageing_bucket: getAgeingBucket(),
				cogo_entity_number:
					Array.isArray(cogo_entity_number) && cogo_entity_number.length === COGO_ENTITY_LENGTH
						? cogo_entity_number[zeroth_index]
						: undefined,
			},
		});
	}, [registration_number, trigger, cogo_entity_number, ageingArr]);

	return {
		serviceWiseLoading : loading,
		serviceWiseStats   : data || [],
	};
};

export default useGetServiceWiseOutstandings;
