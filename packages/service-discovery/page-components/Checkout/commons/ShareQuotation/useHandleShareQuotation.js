import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import formatDateToString from '../../../ServiceDiscovery/SpotSearch/utils/formatDateToString';
import handleCopy from '../../helpers/handleCopyUrl';
import useUpdateCheckoutMargin from '../../hooks/useUpdateCheckoutMargin';
import { transformMargins } from '../../utils/transformMargins';

const ONE = 1;

const useHandleShareQuotation = ({
	rateDetails = [],
	additionalRemark = '',
	convenienceDetails = {},
	convenience_line_item = {},
	noRatesPresent = false,
	getCheckout = () => {},
	detail = {},
	rate = {},
	updateLoading = false,
	updateCheckout = () => {},
}) => {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { checkout_id, shipment_id } = query || {};

	const { convenience_fee_billing_service, adjust_convenience_fee } = convenience_line_item;

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);
	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);
	const [selectedModes, setSelectedModes] = useState([]);
	const [lockMarginModalData, setLockMarginModalData] = useState('');

	const {
		updateCheckoutMargin,
		loading,
	} = useUpdateCheckoutMargin({ getCheckout });

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

	const { quotation_email_sent_at = '' } = detail || {};

	const handleCopyQuoteLink = () => {
		if (detail?.is_locked) {
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

	const updateQuotation = async () => {
		const marginValues = rateDetails.reduce((acc, curr) => {
			const { id = '', line_items = [] } = curr;

			const serviceFilteredMargins = line_items.map((lineItem) => {
				const { filteredMargins = {} } = lineItem || {};

				return filteredMargins;
			});

			return {
				...acc,
				[id]: serviceFilteredMargins,
			};
		}, {});

		const updatedMargins = transformMargins({
			values   : marginValues,
			services : rate?.services,
			detail,
		});

		const FINAL_MARGINS = {};

		Object.keys(updatedMargins).forEach((service) => {
			if (rate?.services?.[service]) {
				FINAL_MARGINS[service] = updatedMargins[service];
			}
		});

		const finalPayload = {
			convenience_rate: {
				...convenienceDetails.convenience_rate,
				convenience_fee_billing_service,
				adjust_convenience_fee,
			},
			checkout_id,
			margins                                 : FINAL_MARGINS,
			is_applicable_for_approval_confirmation : false,
			margin_approval_request_remarks         : additionalRemark ? [additionalRemark] : undefined,
		};

		await updateCheckoutMargin({ finalPayload });

		if (lockMarginModalData === 'copy_link') {
			handleCopyQuoteLink();
		} else {
			setShowShareQuotationModal(true);
		}

		setLockMarginModalData('');
	};

	const updateState = () => {
		updateCheckout({
			values     : { state: 'locked', id: checkout_id, is_locked: true },
			stateValue : 'preview_booking',
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
			disabled        : noRatesPresent,
			style           : {},
			onClickFunction : () => {
				if (quotation_email_sent_at) {
					handleCopyQuoteLink();
				} else {
					setLockMarginModalData('copy_link');
				}
			},
			loading: false,
		},
		{
			key             : 'share_quotation',
			label           : 'Share Quotation',
			themeType       : 'secondary',
			onClickFunction : () => {
				if (quotation_email_sent_at) {
					setShowShareQuotationModal(true);
				} else {
					setLockMarginModalData('share_quotation');
				}
			},
			style    : { marginLeft: '20px' },
			disabled : isEmpty(selectedModes) || noRatesPresent,
			loading  : false,
		},
		{
			key             : 'proceed_to_booking',
			label           : 'Proceed to Booking',
			themeType       : 'accent',
			style           : { marginLeft: '20px' },
			disabled        : !quotation_email_sent_at,
			onClickFunction : updateState,
			loading         : updateLoading,
		},
	];

	return {
		BUTTON_MAPPING,
		size,
		widths,
		updateQuotation,
		quotationOptions,
		showWhatsappVerificationModal,
		setShowWhatsappVerificationModal,
		showShareQuotationModal,
		setSelectedModes,
		loading,
		selectedModes,
		setShowShareQuotationModal,
		lockMarginModalData,
		setLockMarginModalData,
	};
};

export default useHandleShareQuotation;
