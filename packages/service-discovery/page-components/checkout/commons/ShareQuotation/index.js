import { Button, CheckboxGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../context';
import useUpdateCheckoutMargin from '../../hooks/useUpdateCheckoutMargin';
import { transformMargins } from '../../utils/transformMargins';

import LockMarginModal from './LockMarginModal';
import PocDetails from './PocDetails';
import QuotationModal from './QuotationModal';
import styles from './styles.module.css';

const ONE = 1;

function ShareQuotation({
	rateDetails = [],
	additionalRemark = '',
	convenienceDetails = {},
	convenience_line_item = {},
	setShouldResetMargins = () => {},
}) {
	const {
		rate,
		detail,
		isChannelPartner,
		getCheckout,
		checkout_id,
		setCheckoutState,
		invoice,
		orgData,
		updateCheckout,
		updateLoading,
	} = useContext(CheckoutContext);

	const { convenience_fee_billing_service, adjust_convenience_fee } = convenience_line_item;

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);
	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);
	const [selectedModes, setSelectedModes] = useState([]);
	const [showLockMarginModal, setShowLockMarginModal] = useState(false);

	const {
		updateCheckoutMargin,
		loading,
	} = useUpdateCheckoutMargin({ getCheckout, setShouldResetMargins, setCheckoutState });

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

	const { quotation_email_sent_at = '' } = detail || {};

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

		setShowLockMarginModal(false);
		setShowShareQuotationModal(true);
	};

	const updateState = () => {
		updateCheckout({
			values        : { state: 'locked', id: checkout_id },
			closeFunction : setCheckoutState,
			stateValue    : 'preview_booking',
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
			onClickFunction : () => setShowLockMarginModal(true),
			style           : { marginLeft: '20px' },
			disabled        : isEmpty(selectedModes),
			loading         : false,
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
						updateCheckout={updateCheckout}
						updateLoading={updateLoading}
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
					modalSize={size}
					selectedModes={selectedModes}
					setShowShareQuotationModal={setShowShareQuotationModal}
					showShareQuotationModal={showShareQuotationModal}
					invoice={invoice}
					rate={rate}
					detail={detail}
					organization={orgData}
					widths={widths}
					updateCheckout={updateCheckout}
					updateLoading={updateLoading}
				/>
			) : null}

			{showLockMarginModal ? (
				<LockMarginModal
					updateQuotation={updateQuotation}
					showLockMarginModal={showLockMarginModal}
					setShowLockMarginModal={setShowLockMarginModal}
					loading={loading}
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
