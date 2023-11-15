import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

// eslint-disable-next-line max-len
import isCargoInsuranceApplicable from '../../../../../../../../../common/OtherServices/CargoInsurance/CargoInsuranceModal/helpers/isCargoInsuranceApplicable';
import getCountryCode from '../../../../../../../../../helpers/getCountryCode';

import styles from './styles.module.css';

const ZERO_VALUE = 0;

const ifToShowCargoInsurance = ({ services = {}, service_type = '', importer_exporter = {} }) => {
	const isAlreadyPresent = Object.values(services || {}).find(
		(item) => item.service_type === 'cargo_insurance',
	);

	const importer_exporter_country_code = getCountryCode({
		country_id: importer_exporter?.country_id || importer_exporter?.country?.id,
	});

	const isCountrySupported = (GLOBAL_CONSTANTS.cargo_insurance[importer_exporter_country_code] || [])
		.includes(service_type);

	return !isAlreadyPresent && isCountrySupported;
};

const ifServiceValid = (rates = {}, source = '') => {
	if (source !== 'cogo_assured_rate') return true;

	let isValid = true;

	Object.values(rates || {}).forEach((rate) => {
		const { total_price_discounted, service_type } = rate;
		if (service_type === 'fcl_freight_local') {
			if (!total_price_discounted) isValid = false;
		}
	});

	return isValid;
};

function ProceedToCheckout({
	rateCardData = {},
	detail = {},
	createCheckoutLoading = false,
	cargoModal = '',
	setCargoModal = () => {},
	handleBook = () => {},
}) {
	const { service_details = {}, service_type = '', importer_exporter, trade_type = '' } = detail;

	const { source = 'cogo_assured_rate', total_price_discounted = 0, total_price_currency = 'INR' } = rateCardData;

	const handleProceedToCheckout = () => {
		const showCargoInsurance = ifToShowCargoInsurance({
			services: service_details,
			service_type,
			importer_exporter,
		});

		const importer_exporter_country_id = importer_exporter?.country_id || importer_exporter?.country?.id;

		const primaryServiceDetails = Object.values(service_details || {}).find(
			(item) => item.service_type === service_type,
		);

		const { destination_country_id = '', origin_country_id = '' } = primaryServiceDetails || {};

		const { is_applicable = true } = isCargoInsuranceApplicable({
			importer_exporter_country_id,
			origin_country_id,
			destination_country_id,
			trade_type,
		});

		if (showCargoInsurance && cargoModal === 'pending' && is_applicable) {
			setCargoModal('progress');
		} else handleBook();
	};

	const proceedToCheckoutIsValid = ifServiceValid(rateCardData?.service_rates, source);

	return (
		<div className={styles.container}>
			<div className={styles.total_price}>
				Total landed Cost:
				<span style={{ fontWeight: 600, marginLeft: 8 }}>
					{formatAmount({
						amount   : total_price_discounted || ZERO_VALUE,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 2,
						},
					})}
				</span>
			</div>

			<Button
				onClick={handleProceedToCheckout}
				size="lg"
				themeType="accent"
				style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 16, paddingBottom: 16 }}
				className={styles.proceed_button}
				loading={createCheckoutLoading}
				disabled={!proceedToCheckoutIsValid}
			>
				Proceed to Adjust Margins
			</Button>
		</div>
	);
}

export default ProceedToCheckout;
