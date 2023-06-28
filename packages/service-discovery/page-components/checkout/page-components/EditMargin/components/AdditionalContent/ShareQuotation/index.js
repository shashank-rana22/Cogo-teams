import { Button, CheckboxGroup } from '@cogoport/components';
// import { isEmpty, startCase } from '@cogoport/utils';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

// import getBookingTypeOptions from '../../../../../helpers/getBookingTypeOptions';
import useUpdateCheckoutMargin from '../../../../../hooks/useUpdateCheckoutMargin';
import { transformMargins } from '../../../../../utils/transformMargins';

import PocDetails from './PocDetails';
import QuotationModal from './QuotationModal';
import styles from './styles.module.css';

function ShareQuotation({
	detail,
	// organization_settings,
	// userSettings = [],
	// isOrgCP,
	// checkoutMethod,
	// excludeWhatsapp,
	// bookingConfirmationMode,
	// setBookingConfirmationMode,
	isChannelPartner,
	getCheckout = () => {},
	rateDetails = [],
	additionalRemark,
	rate = {},
	checkout_id = '',
	convenienceDetails = {},
	convenience_line_item = {},
	setShouldResetMargins,
	setCheckoutState = () => {},
}) {
	const { convenience_fee_billing_service, adjust_convenience_fee } = convenience_line_item;

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);
	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);
	const [selectedModes, setSelectedModes] = useState([]);

	const {
		updateCheckoutMargin,
		loading,
	} = useUpdateCheckoutMargin({ getCheckout, setShouldResetMargins, setCheckoutState });

	// let bookingTypeOptions = getBookingTypeOptions({
	// 	organization_settings,
	// 	userSettings,
	// 	isOrgCP,
	// });

	// if (checkoutMethod === 'controlled_checkout') {
	// 	bookingTypeOptions = bookingTypeOptions.filter((item) => !['whatsapp', 'email'].includes(item));
	// }

	// const filteredBookingTypeOptions = bookingTypeOptions
	// 	.map((item) => {
	// 		if (item === 'whatsapp' && excludeWhatsapp) return null;
	// 		return { label: startCase(item), value: item };
	// 	})
	// 	.filter((val) => val);

	const quotationOptions = [
		{
			label : 'Email',
			value : 'email',
		},
		{
			label : 'Whatsapp',
			value : 'whatsapp',
		},
		{
			label : 'Sms',
			value : 'sms',
		},
	];

	const updateQuote = async () => {
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

		updateCheckoutMargin({ finalPayload });
	};

	const getModalSize = () => {
		if (selectedModes.includes('email') && selectedModes.length > 1) {
			return 'xl';
		}

		if (selectedModes.includes('email') && selectedModes.length === 1) {
			return 'lg';
		}

		return 'md';
	};

	const BUTTON_MAPPING = [
		{
			key       : 'copy_link',
			label     : 'Copy Link',
			themeType : 'tertiary',
			style     : {},
			loading   : false,
		},
		{
			key             : 'share_quotation',
			label           : 'Share Quotation',
			themeType       : 'secondary',
			onClickFunction : () => setShowShareQuotationModal(true),
			style           : { marginLeft: '20px' },
			disabled        : isEmpty(selectedModes),
			loading         : false,
		},
		{
			key             : 'proceed_to_booking',
			label           : 'Proceed to Booking',
			themeType       : 'accent',
			style           : { marginLeft: '20px' },
			onClickFunction : updateQuote,
			loading,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.contact_details}>
				<div className={styles.yellow_bg} />

				<div className={styles.main_container}>
					<PocDetails
						detail={detail}
						bookingConfirmationMode={selectedModes}
						showWhatsappVerificationModal={showWhatsappVerificationModal}
						setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
						isChannelPartner={isChannelPartner}
						getCheckout={getCheckout}
					/>

					<CheckboxGroup
						className="primary md"
						options={quotationOptions}
						value={selectedModes || ''}
						onChange={setSelectedModes}
					/>
				</div>
			</div>

			{showShareQuotationModal ? (
				<QuotationModal
					modalSize={getModalSize()}
					selectedModes={selectedModes}
					setShowShareQuotationModal={setShowShareQuotationModal}
					showShareQuotationModal={showShareQuotationModal}
				/>
			) : null}

			<div className={styles.button_container}>
				{BUTTON_MAPPING.map((item) => {
					const { label, key, onClickFunction = () => {}, ...restProps } = item;

					return (
						<Button
							key={key}
							type="button"
							size="lg"
							onClick={onClickFunction}
							{...restProps}
						>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default ShareQuotation;
