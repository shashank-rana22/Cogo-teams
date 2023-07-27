import { useForm } from '@cogoport/forms';
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

	const { services = {}, checkout_approvals = [] } = detail;

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

	const formProps = useForm();

	const { importer_exporter = {} } = detail;

	const { organization_settings = [], tags = [] } = importer_exporter;

	const { rfq_id, checkoutType } = query || {};

	const excludeWhatsapp = checkoutType === 'rfq' || rfq_id;

	const isOrgCP = tags.includes('partner');

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
		formProps,
		controlledBookingServices,
		bookingConfirmationMode,
		setBookingConfirmationMode,
		invoicingParties,
		setInvoicingParties,
		isVeryRisky,
		setIsVeryRisky,
	};
};

export default useHandleBookingConfirmation;
