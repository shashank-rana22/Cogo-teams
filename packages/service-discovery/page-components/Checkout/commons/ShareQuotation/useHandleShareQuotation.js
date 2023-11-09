import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import handleCopy from '../../helpers/handleCopyUrl';

const useHandleShareQuotation = ({ detail = {}, updateCheckout = () => {}, noRatesPresent = false }) => {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { checkout_id, shipment_id } = query || {};

	const { tags = [], quotation_communication_channels = {}, importer_exporter_poc = {} } = detail;

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);
	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);
	const [confirmation, setConfirmation] = useState(false);
	const [showPopover, setShowPopover] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	const { EMAIL = false, WHATSAPP = false, SMS = false } = quotation_communication_channels;

	const {
		mobile_number = '',
		whatsapp_number = '',
		email = '',
	} = importer_exporter_poc;

	const quotationOptions = [
		{
			label      : 'Email',
			value      : 'email',
			enabled    : EMAIL,
			isEligible : !!email,
		},
		{
			label      : 'Whatsapp',
			value      : 'whatsapp',
			enabled    : WHATSAPP,
			isEligible : !!whatsapp_number,
		},
		{
			label      : 'Sms',
			value      : 'sms',
			enabled    : SMS,
			isEligible : !!mobile_number,
		},
	];

	const selectedModes = quotationOptions.reduce((acc, curr) => {
		if (curr.enabled) {
			return [...acc, curr.value];
		}

		return acc;
	}, []);

	const handleCopyQuoteLink = () => {
		if (detail?.quotation_email_sent_at) {
			handleCopy({ detail, shipment_id, checkout_id });
			return;
		}

		updateCheckout({
			values: {
				id                      : checkout_id,
				quotation_email_sent_at : new Date(),
				tags                    : [...new Set([...tags, 'added_to_cart'])],
			},
			type: 'copy_link',
		});
	};

	const handleClick = () => {
		setShowPopover(false);

		if (detail?.primary_service === 'fcl_freight') {
			setConfirmation(true);
			return;
		}

		handleCopyQuoteLink();
	};

	// const getModalSize = () => {    // USE THIS IF YOU WANT TO CONFIGURE WIDTHS
	// 	if (selectedModes.includes('email') && selectedModes.length > ONE) {
	// 		return { size: 'xl', widths: { email: '65%', message: '35%' } };
	// 	}

	// 	if (selectedModes.includes('email') && selectedModes.length === ONE) {
	// 		return { size: 'xl', widths: { email: '100%', message: '0%' } };
	// 	}

	// 	return { size: 'md', widths: { email: '0%', message: '100%' } };
	// };

	// const { size, widths } = getModalSize();

	const BUTTON_MAPPING = [
		{
			key             : 'copy_link',
			label           : 'Copy Link',
			themeType       : 'link',
			style           : {},
			onClickFunction : handleClick,
			loading         : false,
			size            : 'md',
			disabled        : noRatesPresent,
		},
		{
			key             : 'share_quotation',
			label           : 'Share Quotation',
			themeType       : 'accent',
			onClickFunction : () => {
				setShowShareQuotationModal(true);
				setShowPopover(false);
			},
			style    : { marginLeft: '20px' },
			size     : 'md',
			disabled : isEmpty(selectedModes) || noRatesPresent,
			loading  : false,
		},
	];

	return {
		BUTTON_MAPPING,
		size   : 'xl',
		widths : { email: '100%' },
		quotationOptions,
		showWhatsappVerificationModal,
		setShowWhatsappVerificationModal,
		showShareQuotationModal,
		selectedModes,
		setShowShareQuotationModal,
		confirmation,
		setConfirmation,
		handleCopyQuoteLink,
		showPopover,
		setShowPopover,
		showSuccessModal,
		setShowSuccessModal,
	};
};

export default useHandleShareQuotation;
