import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFtick, IcMCrossInCircle, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useState } from 'react';

import { getDetailValueColor } from '../../../../../utils/getDetailValueColor';

import FTLFreightInvoiceDetails from './FTLFreightInvoiceDetails';
import styles from './styles.module.css';

const CARD_ID = 3;

function InvoiceDetailsCard({
	id = '',
	label = '',
	showValue = [],
	isInvoiceApproved = false,
	rejected = [],
	handleClickUndo = () => {},
	handleClickReject = () => {},
	handleClick = () => {},
	isDisabled = () => {},
	invoiceType = '',
	organizationName = '',
	remarks = [],
	bill = {},
	billAdditionalObject = {},
	advancedPaymentObj = {},
	setShowHighAdvancedModal = (prop) => prop,
	docContent = '',
	setCheckItem = (prop) => (prop),
}) {
	const [showDetails, setShowDetails] = useState(false);

	const {
		billNumber = '',
		billDate,
		status = '',
		billType = '',
		grandTotal = 0,
	} = bill || {};

	const {
		shipmentType = '',
		reasonForCN = '',
		outstandingDocument = '',
		paymentType = '',
		isIncidental = '',
		advancedAmount = '0',
		advancedAmountCurrency = '',
		urgencyTag = '',
	} = billAdditionalObject || {};

	const tag = urgencyTag || 'No Urgency Tag';

	const viewDocument = (document) => {
		window.open(document);
	};
	let labelClassName = styles.label;

	if (showValue.includes(CARD_ID) || isInvoiceApproved) {
		labelClassName = styles.label_approved;
	} else if (rejected.includes(CARD_ID)) {
		labelClassName = styles.label_rejected;
	}

	let iconComponent = null;

	if (showValue.includes(CARD_ID) || isInvoiceApproved) {
		iconComponent = <IcCFtick height="17px" width="17px" />;
	} else if (rejected.includes(CARD_ID)) {
		iconComponent = <IcMCrossInCircle height="17px" width="17px" />;
	}

	const remarksValue = remarks?.[GLOBAL_CONSTANTS.zeroth_index]?.remarks;

	const onClickResponse = (response = true) => {
		if (response) {
			handleClick(id);
		} else {
			handleClickReject(id);
		}
		setCheckItem(
			(prev) => ({ ...prev, invoiceDetailsCheck: true }),
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div
					className={labelClassName}
				>
					{label}
					{' '}
					<div
						style={{ justifyContent: 'center', display: 'flex' }}
					>
						{iconComponent}
					</div>
				</div>
				{}
				{showDetails ? (!isInvoiceApproved && (
					<div>
						{showValue.includes(CARD_ID) || rejected.includes(CARD_ID) ? (
							<div
								className={styles.button_container}
								onClick={() => {
									handleClickUndo(id);
								}}
								role="presentation"
							>
								<Button
									onClick={() => {
										setCheckItem(
											(prev) => ({ ...prev, invoiceDetailsCheck: false }),
										);
									}}
									size="md"
									themeType="secondary"
								>
									Undo
								</Button>
							</div>
						) : (
							<div className={styles.button_container}>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									onClick={() => { onClickResponse(true); }}
								>
									Approve
								</Button>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									style={{ border: '1px solid #ed3726' }}
									onClick={() => { onClickResponse(false); }}
								>
									Reject
								</Button>
							</div>
						)}
					</div>
				)) : (
					<div
						className={styles.caret}
						onClick={() => {
							setShowDetails(true);
						}}
						role="presentation"
					>
						<IcMArrowRotateDown height="17px" width="17px" />
					</div>
				)}
			</div>

			{showDetails ? (
				<div>
					<div className={styles.hr} />
					<div className={styles.billing_party_container}>
						<div className={styles.margin_bottom}>
							Invoice Number -
							{' '}
							<span
								style={{ color: getDetailValueColor({ value: billNumber, docContent }) }}
							>
								{billNumber}
							</span>
						</div>
						<div className={styles.margin_bottom}>
							Invoice Type -
							{' '}
							<span
								style={{ color: getDetailValueColor({ value: invoiceType, docContent }) }}
							>
								{invoiceType}

							</span>
						</div>
						<div className={styles.margin_bottom}>
							Supplier name -
							{' '}
							<span
								style={{ color: getDetailValueColor({ value: organizationName, docContent }) }}
							>
								{organizationName}

							</span>
						</div>
						<div className={styles.margin_bottom}>
							Urgency Tag -
							{' '}
							<span
								style={{ color: getDetailValueColor({ value: tag, docContent }) }}
							>
								{tag}
							</span>
						</div>
						<div className={styles.margin_bottom}>
							Remarks -
							{' '}
							<span
								style={{ color: getDetailValueColor({ value: remarksValue, docContent }) }}
							>
								{remarksValue || 'No Remarks'}

							</span>
						</div>
						<div className={styles.margin_bottom}>
							Invoice Date -
							{' '}
							<span>
								{formatDate({
									date       : billDate,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
									formatType : 'date',
								})}
							</span>
						</div>
						<div className={styles.margin_bottom}>
							Payment Due date -
							{' '}
							<span>DD MM YYYY</span>
						</div>

						{shipmentType === 'ftl_freight'
							&& (
								<FTLFreightInvoiceDetails
									billType={billType}
									advancedPaymentObj={advancedPaymentObj}
									isIncidental={isIncidental}
									paymentType={paymentType}
									advancedAmountCurrency={advancedAmountCurrency}
									advancedAmount={advancedAmount}
									grandTotal={grandTotal}
									setShowHighAdvancedModal={setShowHighAdvancedModal}
									outstandingDocument={outstandingDocument}
									viewDocument={viewDocument}
									reasonForCN={reasonForCN}
								/>
							)}
					</div>
				</div>
			) : undefined}
		</div>
	);
}

export default InvoiceDetailsCard;
