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
	} = useContext(CheckoutContext);

	const { primary_service = '' } = detail;

	const [bookingConfirmationMode, setBookingConfirmationMode] = useState('');
	const [invoicingParties, setInvoicingParties] = useState([]);
	const [isVeryRisky, setIsVeryRisky] = useState(false);
	const [error, setError] = useState('');
	const [noRatesPresent, setNoRatesPresent] = useState(false);

	const { importer_exporter = {} } = detail;

	const { organization_settings = [], tags = [], is_agent_allowed_to_book = false } = importer_exporter;

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
		&& !is_agent_allowed_to_book;

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

	const bookingTypeOptions = getBookingTypeOptions({
		organization_settings,
		userSettings,
		isOrgCP,
	});

	const radioOption = bookingTypeOptions
		.map((item) => {
			if (item === 'whatsapp' && excludeWhatsapp) return null;
			return { label: startCase(item), value: item, name: item };
		})
		.filter((val) => val);

	return {
		radioOption,
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
