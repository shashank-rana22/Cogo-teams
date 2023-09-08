import { Button, Tooltip, ButtonIcon } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const MIN_AMOUNT = 0;
const VALID_ADVANCE_ATH_RANGE = 80;
const PERCENTAGE_FACTOR = 100;
const MAX_DECIMAL_PLACES = 2;
const DEFAULT_GRAND_TOTAL = 1;

function FTLFreightInvoiceDetails({
	billType = '',
	advancedPaymentObj = {},
	isIncidental = false,
	paymentType = '',
	advancedAmountCurrency = '',
	advancedAmount = '',
	grandTotal = 1,
	setShowHighAdvancedModal = () => {},
	outstandingDocument = false,
	viewDocument = () => {},
	reasonForCN = '',
}) {
	const advancedATHAmountPercentage = +((+advancedAmount / (+grandTotal || DEFAULT_GRAND_TOTAL)) * PERCENTAGE_FACTOR)
		.toFixed(MAX_DECIMAL_PLACES);
	const isAdvancedATHAmountGreaterThan80Percent = !Number.isNaN(advancedATHAmountPercentage)
                                                    && advancedATHAmountPercentage > VALID_ADVANCE_ATH_RANGE;

	let button = null;

	if (!Number.isNaN(advancedATHAmountPercentage) && isAdvancedATHAmountGreaterThan80Percent) {
		if (!advancedPaymentObj?.remarks?.includes('accepted', 'rejected')) {
			button = (
				<Tooltip
					placement="top"
					trigger="mouseenter"
					interactive
					content={<div>ATH document was rejected</div>}
				>
					<Button
						className={styles.button}
						onClick={() => setShowHighAdvancedModal(true)}
						disabled={advancedPaymentObj?.remarks?.includes('rejected')}
					>
						View
					</Button>
				</Tooltip>
			);
		} else {
			button = (
				<ButtonIcon
					size="sm"
					icon={<IcMDownload />}
					onClick={() => viewDocument(advancedPaymentObj?.document_url)}
					themeType="primary"
				/>
			);
		}
	}

	return (
		<div>
			{billType === 'BILL' && isIncidental && (
				<div className={styles.margin_bottom}>
					Is Incidental -
					{' '}
					<span>{startCase(isIncidental)}</span>
				</div>
			)}

			{ billType === 'BILL' && paymentType && (
				<div className={styles.margin_bottom}>
					Payment Type -
					{' '}
					<span>{startCase(paymentType)}</span>
				</div>
			)}

			<div className={styles.document}>
				Advance amount -
				{' '}
				{advancedATHAmountPercentage}
				%
				{' '}
				{advancedAmountCurrency}
				{' '}
				(
				{advancedAmount}
				/
				{grandTotal}
				)
				{button}
			</div>

			{advancedPaymentObj?.data && (
				<div className={styles.margin_bottom}>
					Updated Advanced Amount -
					{' '}
					{advancedAmountCurrency}
					{' '}
					<span>
						{JSON.parse(advancedPaymentObj?.data)?.updated_advanced_amount
                        || MIN_AMOUNT}
					</span>
				</div>
			)}

			{outstandingDocument && (
				<div className={styles.margin_bottom}>
					Outstanding Proforma Approval-
					{' '}
					<ButtonIcon
						size="sm"
						icon={<IcMDownload />}
						onClick={() => {
							viewDocument(outstandingDocument);
						}}
						themeType="primary"
					/>
				</div>
			)}

			{billType === 'CREDIT_NOTE' && reasonForCN && (
				<div className={styles.margin_bottom}>
					Reason For CN -
					{' '}
					<span>{startCase(reasonForCN)}</span>
				</div>
			)}
		</div>
	);
}

export default FTLFreightInvoiceDetails;
