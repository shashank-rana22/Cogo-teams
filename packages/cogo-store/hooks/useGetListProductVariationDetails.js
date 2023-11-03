import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

const useGetListProductVariationDetails = () => {
	const router = useRouter();
	const { query } = router || {};
	const { product_id = '', colorId } = query || {};
	const [filtersVariation, setFiltersVariation] = useState({
		size: '',
	});
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_product_variation_details',
	}, { manual: true });

	const getListProductVariationDetails = useCallback(
		async () => {
			try {
				const { color_id, size } = filtersVariation;
				if (!isEmpty(product_id)) {
					await trigger({
						params: {
							filters: {
								color_id: colorId || color_id,
								size,
							},
							id: product_id,
						},
					});
				}
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[filtersVariation, trigger, colorId, product_id],
	);

	useEffect(() => {
		getListProductVariationDetails();
	}, [getListProductVariationDetails]);

	return { loading, data, getListProductVariationDetails, filtersVariation, setFiltersVariation };
};

export default useGetListProductVariationDetails;
