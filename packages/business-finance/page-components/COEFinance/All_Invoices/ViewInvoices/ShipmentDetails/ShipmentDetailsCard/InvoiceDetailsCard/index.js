import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCFtick, IcMCrossInCircle, IcMArrowRotateDown } from '@cogoport/icons-react';

import { getDetailValueColor } from '../../../../../utils/getDetailValueColor';
import isDisabled from '../../../../../utils/isDisabled.ts';

import AdditionalInvoiceDetails from './AdditionalInvoiceDetails';
import styles from './styles.module.css';

const CARD_ID = 3;
const PRESENT_TAB = 'invoiceDetailsTab';
const TAB_TO_OPEN = 'lineItemsTab';
const TIMELINE_ITEM = 'invoiceDetailsCheck';
const LABEL = 'Invoice Details';

function InvoiceDetailsCard({
	showValue = [],
	isInvoiceApproved = false,
	rejected = [],
	handleClickUndo = () => {},
	handleClickReject = () => {},
	handleClick = () => {},
	invoiceType = '',
	organizationName = '',
	remarks = [],
	bill = {},
	billAdditionalObject = {},
	advancedPaymentObj = {},
	setShowHighAdvancedModal = (prop) => prop,
	docContent = '',
	setCheckItem = (prop) => (prop),
	onAccept = () => {},
	onTabClick = () => {},
	showTab = false,
}) {
	const {
		billNumber = '',
		billDate = '',
		status = '',
		billType = '',
		grandTotal = 1,
	} = bill || {};

	const {
		urgencyTag = '',
		paymentDueDate = '',
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

	const onClickResponse = ({ response }) => {
		if (response) {
			handleClick(CARD_ID);
		} else {
			handleClickReject(CARD_ID);
		}
		onAccept({ tabName: PRESENT_TAB, tabToOpen: TAB_TO_OPEN, timelineItem: TIMELINE_ITEM });
	};
	const handleUndo = () => {
		handleClickUndo(CARD_ID);
		setCheckItem(
			(prev) => ({ ...prev, invoiceDetailsCheck: false }),
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div
					className={labelClassName}
				>
					{LABEL}
					{' '}
					<div
						style={{ justifyContent: 'center', display: 'flex' }}
					>
						{iconComponent}
					</div>
				</div>
				{showTab ? (!isInvoiceApproved && (
					<div>
						{showValue.includes(CARD_ID) || rejected.includes(CARD_ID) ? (
							<div
								className={styles.button_container}
								onClick={() => {
									handleClickUndo(CARD_ID);
								}}
								role="presentation"
							>
								<Button
									onClick={() => {
										handleUndo();
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
									onClick={() => onClickResponse({
										response: true,
									})}
								>
									Approve
								</Button>
								<Button
									disabled={!isDisabled(status)}
									size="md"
									themeType="secondary"
									style={{ border: '1px solid #ed3726' }}
									onClick={() => onClickResponse({
										response: false,
									})}
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
							onTabClick({ tabName: PRESENT_TAB });
						}}
						role="presentation"
					>
						<IcMArrowRotateDown height="17px" width="17px" />
					</div>
				)}
			</div>

			{showTab ? (
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
							<span className={styles.span_left}>
								{formatDate({
									date       : billDate,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
									formatType : 'date',
								})}
							</span>
						</div>
						<div className={styles.margin_bottom}>
							Payment Due Date -
							<span className={styles.span_left}>
								{formatDate({
									date       : paymentDueDate,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
									formatType : 'date',
								})}
							</span>
						</div>

						<AdditionalInvoiceDetails
							billType={billType}
							advancedPaymentObj={advancedPaymentObj}
							grandTotal={grandTotal}
							setShowHighAdvancedModal={setShowHighAdvancedModal}
							viewDocument={viewDocument}
							billAdditionalObject={billAdditionalObject}
						/>
					</div>
				</div>
			) : undefined}
		</div>
	);
}

export default InvoiceDetailsCard;
