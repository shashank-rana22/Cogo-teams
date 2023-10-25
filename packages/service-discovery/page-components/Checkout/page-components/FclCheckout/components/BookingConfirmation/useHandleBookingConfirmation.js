import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useContext } from 'react';

import { CheckoutContext } from '../../../../context';
import bookingConfirmationType from '../../../../helpers/bookingConfirmationType';
import getBookingTypeOptions from '../../../../helpers/getBookingTypeOptions';

const useHandleBookingConfirmation = () => {
	const {
		general: { query },
		userSettings,
	} = useSelector((state) => state);

	const {
		detail = {},
		checkoutMethod,
	} = useContext(CheckoutContext);

	const { services = {}, checkout_approvals = [], primary_service = '' } = detail;

	const controlledBookingServices = Object.values(services).filter(
		(service) => (
			service.service_type === 'fcl_freight'
				&& service.container_type === 'refer'
		),
	);
	const iscommercialInvoicePresent = !isEmpty(
		controlledBookingServices?.[GLOBAL_CONSTANTS.zeroth_index]
			?.commercial_invoice_url || '',
	);

	const [bookingConfirmationMode, setBookingConfirmationMode] = useState('');
	const [isControlBookingDetailsFilled, setIsControlBookingDetailsFilled] = useState(iscommercialInvoicePresent);
	const [invoicingParties, setInvoicingParties] = useState([]);
	const [isVeryRisky, setIsVeryRisky] = useState(false);
	const [error, setError] = useState('');
	const [noRatesPresent, setNoRatesPresent] = useState(false);

	const { importer_exporter = {} } = detail;

	const { organization_settings = [], tags = [], is_agent_allowed_to_book = true } = importer_exporter;

	const { rfq_id, checkoutType } = query || {};

	const excludeWhatsapp = checkoutType === 'rfq' || rfq_id;

	const isOrgCP = tags.includes('partner');

	const checkout_settings = organization_settings.filter(
		(setting) => setting.setting_type === 'checkout',
	)?.[GLOBAL_CONSTANTS.zeroth_index];

	const { setting_config: { assisted_booking_services = [] } = {} } = checkout_settings || {};

	const isAssistedBookingNotAllowed =	!isEmpty(assisted_booking_services)
	&& (assisted_booking_services.includes('none')
		|| !assisted_booking_services.includes(primary_service))
		&& !is_agent_allowed_to_book && checkoutMethod !== 'controlled_checkout';

	useEffect(() => {
		if (bookingConfirmationMode) {
			return;
		}

		setBookingConfirmationMode(() => {
			const mode = bookingConfirmationType({
				organization_settings,
				userSettings,
			});

			if (mode) {
				if (mode === 'whatsapp' && excludeWhatsapp) { return isOrgCP ? 'mobile_otp' : 'booking_proof'; }

				return mode;
			}
			return isOrgCP ? 'mobile_otp' : 'booking_proof';
		});
	}, [bookingConfirmationMode, excludeWhatsapp, isOrgCP, organization_settings, userSettings]);

	let bookingTypeOptions = getBookingTypeOptions({
		organization_settings,
		userSettings,
		isOrgCP,
	});

	if (checkoutMethod === 'controlled_checkout') {
		bookingTypeOptions = bookingTypeOptions.filter((item) => !['whatsapp', 'email'].includes(item));
	}

	const radioOption = bookingTypeOptions
		.map((item) => {
			if (item === 'whatsapp' && excludeWhatsapp) return null;
			return { label: startCase(item), value: item, name: item };
		})
		.filter((val) => val);

	return {
		radioOption,
		checkout_approvals,
		isControlBookingDetailsFilled,
		setIsControlBookingDetailsFilled,
		controlledBookingServices,
		bookingConfirmationMode,
		setBookingConfirmationMode,
		invoicingParties,
		setInvoicingParties,
		isVeryRisky,
		setIsVeryRisky,
		error,
		setError,
		isAssistedBookingNotAllowed,
		noRatesPresent,
		setNoRatesPresent,
	};
};

export default useHandleBookingConfirmation;
