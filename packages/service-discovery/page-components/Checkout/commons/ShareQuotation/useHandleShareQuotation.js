import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import formatDateToString from '../../../ServiceDiscovery/SpotSearch/utils/formatDateToString';
import handleCopy from '../../helpers/handleCopyUrl';

const ONE = 1;

const useHandleShareQuotation = ({ detail = {}, updateCheckout = () => {} }) => {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { checkout_id, shipment_id } = query || {};

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);
	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);
	const [selectedModes, setSelectedModes] = useState(['email']);

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
				quotation_email_sent_at : formatDateToString(new Date()),
			},
			type: 'copy_link',
		});
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
			onClickFunction : () => handleCopyQuoteLink(),
			loading         : false,
		},
		{
			key             : 'share_quotation',
			label           : 'Share Quotation',
			themeType       : 'primary',
			onClickFunction : () => setShowShareQuotationModal(true),
			style           : { marginLeft: '20px' },
			disabled        : isEmpty(selectedModes),
			loading         : false,
		},
	];

	return {
		BUTTON_MAPPING,
		size,
		widths,
		quotationOptions,
		showWhatsappVerificationModal,
		setShowWhatsappVerificationModal,
		showShareQuotationModal,
		setSelectedModes,
		selectedModes,
		setShowShareQuotationModal,
	};
};

export default useHandleShareQuotation;
