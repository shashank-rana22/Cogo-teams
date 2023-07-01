import getGeoConstants from '@cogoport/globalization/constants/geo';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const geo = getGeoConstants();

const useGetBusiness = ({ gstNumber = '' }) => {
	const [{ data }, trigger] = useRequest({
		url    : '/get_business',
		method : 'get',
	});

	const getBusiness = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						identity_number : gstNumber,
						identity_type   : 'tax',
						country_code    : geo.country.code,
						provider_name   : 'cogoscore',
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, gstNumber]);

	useEffect(() => {
		getBusiness();
	}, [getBusiness]);

	return {
		data,
	};
};

export default useGetBusiness;
