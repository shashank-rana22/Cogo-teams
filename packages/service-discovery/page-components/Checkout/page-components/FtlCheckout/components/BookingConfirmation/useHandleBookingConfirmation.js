import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import bookingConfirmationType from '../../../../helpers/bookingConfirmationType';
import getBookingTypeOptions from '../../../../helpers/getBookingTypeOptions';

const useHandleBookingConfirmation = ({ detail = {} }) => {
	const {
		general: { query },
		userSettings,
	} = useSelector((state) => state);

	const [bookingConfirmationMode, setBookingConfirmationMode] = useState('');
	const [invoicingParties, setInvoicingParties] = useState([]);
	const [isVeryRisky, setIsVeryRisky] = useState(false);
	const [error, setError] = useState('');
	const [noRatesPresent, setNoRatesPresent] = useState(false);

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
		noRatesPresent,
		setNoRatesPresent,
	};
};

export default useHandleBookingConfirmation;
