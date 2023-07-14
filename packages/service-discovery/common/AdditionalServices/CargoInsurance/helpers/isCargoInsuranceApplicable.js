import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';
import { isEmpty } from '@cogoport/utils';

const getCountryCode = ({ country_id }) => {
	const countryDetails = getCountryDetails({ country_id });

	return countryDetails.country_code || null;
};

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
			type          : 'CARGO_INSURANCE_NOT_AVIALABLE_IN_YOUR_COUNTRY',
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
		let type = 'OWN_COUNTRY_LOCATION_NOT_SELECTED_IN_ORIGIN_OR_DESTINATION';

		if (trade_type === 'domestic') {
			type = 'OWN_COUNTRY_LOCATION_NOT_SELECTED_IN_ORIGIN_AND_DESTINATION';
		}

		return { is_applicable: false, type };
	}

	return { is_applicable: true, type: '' };
};

export default isCargoInsuranceApplicable;
