import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import calculateParameter from '../utils/calculateParameter';

const DEPENDENT_SERVICES = [
	'air_freight_local_service',
	'air_customs_service',
	'air_freight_service',
];
const VOLUMETRIC_WEIGHT = 166.67;
const DECIMAL_PLACE = 2;
const DEFAULT_PACKAGES_COUNT = 0;

const getServicesData = ({ values, services }) => {
	const PAYLOAD_SERVICES = [];
	let canUpdate = false;

	const BOOKING_PARAMS = {};

	const UPDATED_PARAMS = {};

	const filteredServices = services.filter((service) => DEPENDENT_SERVICES.includes(service?.service_type));

	(filteredServices || []).forEach((detail) => {
		Object.keys(values)?.forEach((key) => {
			if (values[key]) {
				BOOKING_PARAMS[key] = Number(values[key]);
			}
			if (key === 'packages') {
				const FORMATTED_PACKAGES = [];
				values[key].forEach((pack) => {
					const {
						length,
						width,
						height,
						packages_count,
						total_packages_weight,
					} = pack;
					const formatPack = {
						...pack,
						length                : +length || null,
						width                 : +width || null,
						height                : +height || null,
						packages_count        : +packages_count || DEFAULT_PACKAGES_COUNT,
						total_packages_weight : +total_packages_weight || null,
					};
					FORMATTED_PACKAGES.push(formatPack);
				});
				BOOKING_PARAMS[key] = FORMATTED_PACKAGES;
				if (detail[key] && JSON.stringify(values[key]) === JSON.stringify(detail[key])) {
					UPDATED_PARAMS[key] = values[key];
				}
			} else if (
				values[key]
				&& detail[key]
				&& Number(values[key]) !== Number(detail[key])
			) {
				UPDATED_PARAMS[key] = Number(values[key]);
			}
		});
		if (Object.keys(UPDATED_PARAMS)?.length) {
			canUpdate = true;
		}

		PAYLOAD_SERVICES.push({
			service_id     : detail?.id,
			service_type   : detail?.service_type,
			booking_params : BOOKING_PARAMS,
		});
	});
	return {
		payloadServices: PAYLOAD_SERVICES,
		canUpdate,
	};
};

const checkParameter = (values) => {
	const { weight, volume, packages_count } = calculateParameter(
		values.packages,
	);

	if (volume && volume !== Number(values.volume)) {
		Toast.error('Total Volume does not match with sum of individual volume');
		return true;
	}
	if (weight && weight !== Number(values.weight)) {
		Toast.error(
			'Total Weight does not match with sum of individual total weight',
		);
		return true;
	}
	if (
		packages_count
		&& Number(packages_count) !== Number(values.packages_count)
	) {
		Toast.error(
			'Total Package Count does not match with sum of individual package count',
		);
		return true;
	}
	if (
		Number(Number(values.chargeable_weight).toFixed(DECIMAL_PLACE))
		< Number(
			Math.max(Number(values.weight), Number(values.volume) * VOLUMETRIC_WEIGHT).toFixed(
				DECIMAL_PLACE,
			),
		)
	) {
		Toast.error(
			'Chargeable weight can not be less than total weight or total volumetric weight',
		);
		return true;
	}
	return false;
};

function useUpdateInternationalAirShipmentBookingParameter({
	services,
	shipment_data,
	setShowEditParamsModal,
	task,
}) {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_international_air_shipment_booking_parameter',
		method : 'POST',
	}, { manual: true });

	const updateBookingParameter = async (values) => {
		const { payloadServices, canUpdate } = getServicesData({
			values,
			services,
		});

		if (checkParameter(values)) {
			return;
		}

		if (!canUpdate) {
			Toast.info('No parameters changed!');
			setShowEditParamsModal(false);
			return;
		}
		const payload = {
			shipment_id            : shipment_data?.shipment_id,
			services               : payloadServices,
			rate_fetching_required : task !== 'confirm_booking',
		};

		try {
			await trigger({ data: payload });

			Toast.success(
				'Booking params have been changed. Please check the quotation.',
			);
			setShowEditParamsModal(false);
		} catch (error) {
			toastApiError(error || 'Something went wrong please try again');
		}
	};

	return {
		loading,
		updateBookingParameter,
	};
}

export default useUpdateInternationalAirShipmentBookingParameter;
