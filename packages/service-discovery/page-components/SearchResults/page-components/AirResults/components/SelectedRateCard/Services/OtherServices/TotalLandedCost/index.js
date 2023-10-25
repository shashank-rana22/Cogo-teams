import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

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

function TotalLandedCost({
	rateCardData = {},
	detail = {},
	createCheckoutLoading = false,
	cargoModal = '',
	setCargoModal = () => {},
	handleBook = () => {},
}) {
	const { service_details = {}, service_type = '', importer_exporter } = detail;

	const { source = 'cogo_assured_rate', total_price_discounted = 0, total_price_currency = 'INR' } = rateCardData;

	const handleProceedToCheckout = () => {
		const showCargoInsurance = ifToShowCargoInsurance({
			services: service_details,
			service_type,
			importer_exporter,
		});

		if (showCargoInsurance && cargoModal === 'pending') {
			setCargoModal('progress');
		} else handleBook();
	};

	const proceedToCheckoutIsValid = ifServiceValid(rateCardData?.service_rates, source);

	return (
		<div className={styles.container}>
			<div className={styles.total_price}>
				Total landed Cost:
				<span style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
					{formatAmount({
						amount   : total_price_discounted || ZERO_VALUE,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</span>
			</div>

			<Button
				onClick={handleProceedToCheckout}
				size="lg"
				themeType="accent"
				className={styles.proceed_button}
				loading={createCheckoutLoading}
				disabled={!proceedToCheckoutIsValid}
			>
				Proceed to Adjust Margins
			</Button>
		</div>
	);
}

export default TotalLandedCost;
