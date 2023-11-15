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

function ProceedToCheckout({
	rateCardData = {},
	detail = {},
	createCheckoutLoading = false,
	cargoModal = '',
	setCargoModal = () => {},
	handleBook = () => {},
}) {
	const { service_details = {}, service_type = '', importer_exporter } = detail;

	const { total_price_discounted = 0, total_price_currency = 'INR' } = rateCardData;

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
				className={styles.proceed_button}
				loading={createCheckoutLoading}
			>
				Proceed to Adjust Margins
			</Button>
		</div>
	);
}

export default ProceedToCheckout;
