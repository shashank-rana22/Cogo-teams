import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useHandleAdditionalContent = ({
	formProps = {},
	updateCheckout = () => {},
	cargoDetails = {},
	detail = {},
	rate = {},
}) => {
	const [noRatesPresent, setNoRatesPresent] = useState(false);

	const { handleSubmit = () => {}, getValues = () => {} } = formProps;

	const { services: rateServices = {}, source: rateSource = '' } = rate || {};

	const {
		id = '',
		primary_service = '',
		services = {},
	} = detail;

	const [{ loading :updateCheckoutServiceLoading }, triggerUpdateCheckoutService] = useRequest(
		{
			method : 'post',
			url    : '/update_checkout_service',
		},
		{ manual: true },
	);

	const handleNextButton = async () => {
		const primaryServicesArray = Object.values(services).filter(
			(item) => item.service_type === primary_service,
		);

		const {
			cargo_readiness_date = '',
			cargo_value = '',
			cargo_value_currency = '',
			commodity_category = '',
		} = cargoDetails || {};

		const {
			sailing_range = {},
			max_price,
			min_price,
			agreed_for_partial_shipment = false,
			...restValues
		} = getValues();

		const { startDate = '', endDate = '' } = sailing_range;

		if ((startDate && !endDate) || (!startDate && endDate)) {
			Toast.error('Select sailing range correctly');
			return;
		}

		if (Number(min_price) > Number(max_price)) {
			Toast.error('Min price cannot be greater than max price');
			return;
		}

		if (!cargo_readiness_date || !cargo_value || !cargo_value_currency || !commodity_category) {
			Toast.error('Please select cargo details');
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			return;
		}

		try {
			await triggerUpdateCheckoutService({
				data: {
					id,
					update_rates                    : false,
					service                         : primary_service,
					fcl_freight_services_attributes : primaryServicesArray.map(
						({ id: service_id }) => ({
							id                   : service_id,
							cargo_readiness_date : cargo_readiness_date || undefined,
							cargo_value          : Number(cargo_value) || undefined,
							cargo_value_currency : cargo_value_currency || undefined,
							commodity_category   : commodity_category || commodity_category,
							shipping_preferences : {
								sailing_start_date          : startDate || undefined,
								sailing_end_date            : endDate || undefined,
								min_price                   : Number(min_price) || undefined,
								max_price                   : Number(max_price) || undefined,
								agreed_for_partial_shipment : agreed_for_partial_shipment === 'yes',
								...restValues,
							},
						}),
					),
				},
			});

			updateCheckout({
				values: {
					id,
					state: 'booking_confirmation',
				},
				scrollToTop: true,
			});
		} catch (error) {
			const { config = {} } = error.response;

			const { url = '' } = config;
			Toast.error(`${getApiErrorString(error.response?.data)} in ${url}`);
		}
	};

	const onError = () => {
		Toast.error('Please select shipping preferences');

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	const onClickNextButton = () => {
		handleSubmit(handleNextButton, onError)();
	};

	useEffect(() => {
		setNoRatesPresent(false);

		Object.values(rateServices).forEach((item) => {
			const fclLocalEmpty = !item?.line_items?.length
				&& [
					'fcl_freight_local_service',
					'fcl_freight_local',
					'air_freight_local',
				].includes(item?.service_type);

			const noRatesFound = !item?.total_price_discounted
			&& !(fclLocalEmpty && rateSource !== 'cogo_assured_rate')
			&& item?.service_type !== primary_service;

			if (noRatesFound) {
				setNoRatesPresent(true);
			}
		});
	}, [primary_service, rateServices, rateSource]);

	return {
		updateCheckoutServiceLoading,
		onClickNextButton,
		noRatesPresent,
	};
};

export default useHandleAdditionalContent;
