import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import handleCopy from '../../helpers/handleCopyUrl';

const ONE = 1;

const useHandleShareQuotation = ({ detail = {}, updateCheckout = () => {}, noRatesPresent = false }) => {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { checkout_id, shipment_id } = query || {};

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);
	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);
	const [selectedModes, setSelectedModes] = useState(['email']);
	const [show, setShow] = useState(false);
	const [confirmation, setConfirmation] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const quotationOptions = [
		{
			label : 'Email',
			value : 'email',
		},
		{
			label    : 'Whatsapp',
			value    : 'whatsapp',
			disabled : true,
		},
		{
			label    : 'Sms',
			value    : 'sms',
			disabled : true,
		},
	];

	const handleCopyQuoteLink = () => {
		if (detail?.quotation_email_sent_at) {
			handleCopy({ detail, shipment_id, checkout_id });
			return;
		}

		updateCheckout({
			values: {
				id                      : checkout_id,
				quotation_email_sent_at : new Date(),
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

		if (detail?.is_locked) {
			handleCopyQuoteLink();
		} else {
			setShow(true);
		}
	};

	const getModalSize = () => {
		if (selectedModes.includes('email') && selectedModes.length > ONE) {
			return { size: 'xl', widths: { email: '65%', message: '35%' } };
		}

		if (selectedModes.includes('email') && selectedModes.length === ONE) {
			return { size: 'xl', widths: { email: '100%', message: '0%' } };
		}

		return { size: 'md', widths: { email: '0%', message: '100%' } };
	};

	const { size, widths } = getModalSize();

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
		size,
		widths,
		show,
		setShow,
		quotationOptions,
		showWhatsappVerificationModal,
		setShowWhatsappVerificationModal,
		showShareQuotationModal,
		setSelectedModes,
		selectedModes,
		setShowShareQuotationModal,
		confirmation,
		setConfirmation,
		handleCopyQuoteLink,
		showPopover,
		setShowPopover,
	};
};

export default useHandleShareQuotation;
