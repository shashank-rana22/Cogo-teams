import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getCountryCode from '../../../../../helpers/getCountryCode';

const isCargoInsuranceApplicable = ({
	importer_exporter_country_id,
	origin_country_id,
	destination_country_id,
	trade_type,
}) => {
	const importer_exporter_country_code = getCountryCode({
		country_id: importer_exporter_country_id,
	});

	const TRADE_TYPE_MAPPING = {
		export({ origin_country_code }) {
			return origin_country_code === importer_exporter_country_code;
		},
		import({ destination_country_code }) {
			return destination_country_code === importer_exporter_country_code;
		},
		domestic({ origin_country_code, destination_country_code }) {
			return (
				origin_country_code === importer_exporter_country_code
				&& destination_country_code === importer_exporter_country_code
			);
		},
	};

	let is_applicable = false;

	if (importer_exporter_country_code in GLOBAL_CONSTANTS.cargo_insurance) {
		is_applicable = !isEmpty(
			GLOBAL_CONSTANTS.cargo_insurance[importer_exporter_country_code],
		);
	}

	if (!is_applicable) {
		return {
			is_applicable : false,
			type          : 'cargo_insurance_not_available_in_this_country',
		};
	}

	const origin_country_code = getCountryCode({ country_id: origin_country_id });

	const destination_country_code = getCountryCode({
		country_id: destination_country_id,
	});

	is_applicable = TRADE_TYPE_MAPPING[trade_type]?.({
		origin_country_code,
		destination_country_code,
	});

	if (!is_applicable) {
		let type = 'own_country_location_not_selected_in_origin_or_destination';

		if (trade_type === 'domestic') {
			type = 'own_country_location_not_selected_in_origin_and_destination';
		}

		return { is_applicable: false, type };
	}

	return { is_applicable: true, type: '' };
};

export default isCargoInsuranceApplicable;
