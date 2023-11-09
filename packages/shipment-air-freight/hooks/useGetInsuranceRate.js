import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useDebounceQuery, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const getPayload = ({ primary_service = [], getValues, userId }) => {
	const { destination_country_id	= '', origin_country_id = '' } = primary_service || {};
	const { cargo_value, cargo_value_currency, cargo_insurance_commodity } = getValues();

	return {
		performedBy          : userId,
		invoiceValue         : cargo_value,
		invoiceCurrency      : cargo_value_currency,
		originCountryId      : origin_country_id,
		destinationCountryId : destination_country_id,
		policyCommodityId    : cargo_insurance_commodity,
	};
};

const useGetInsuranceRate = ({ primary_service = {}, commodity = {} }) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const { query = '', debounceQuery } = useDebounceQuery();

	const formhook = useForm();
	const { getValues, watch, setValue } = formhook;

	const { cargo_value } = watch();

	const [{ loading, data }, trigger] = useRequestBf({
		authKey : 'get_saas_insurance_v2_rate',
		url     : 'saas/insurance/v2/rate',
		method  : 'GET',
	}, { manual: true });

	const getRate = async () => {
		const payload = getPayload({ getValues, primary_service, userId });

		try {
			await trigger({
				params: payload,
			});
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		if (cargo_value) {
			debounceQuery(cargo_value);
		}
	}, [cargo_value, debounceQuery]);

	useEffect(() => {
		if ((query !== undefined || query !== null) && cargo_value) {
			getRate();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	useEffect(() => {
		if (!isEmpty(commodity)) {
			setValue(
				'cargo_insurance_commodity_description',
				commodity?.cargoDescription,
			);
		}
	}, [commodity, setValue]);

	return {
		premiumLoading : loading,
		premiumData    : data?.list[GLOBAL_CONSTANTS.zeroth_index],
		formhook,

	};
};
export default useGetInsuranceRate;
