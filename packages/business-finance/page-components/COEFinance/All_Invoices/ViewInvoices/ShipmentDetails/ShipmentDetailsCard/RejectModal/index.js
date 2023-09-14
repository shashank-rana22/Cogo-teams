import {
	Button,
	Modal,
	Textarea,
	CheckboxGroup,
} from '@cogoport/components';

import invoiceDetailsRejectCheckboxList from '../../../../../constants/invoice-details-checkbox-list.ts';

import styles from './styles.module.css';

const CHECK_REMARK_LENGTH = 1;
const COLLECTION_PARTY_INDEX = '1';
const BILLING_PARTY_INDEX = '2';
const INVOICE_DETAILS_INDEX = '3';

function RejectModal({
	id = '',
	showRejected = {},
	onClose = () => {},
	collectionPartyRejectionList = [],
	billingPartyRejectionList = [],
	checkedValue = {},
	setCheckedValue = (p) => p,
	remarksVal = {},
	setRemarksVal = () => {},
	invoiceType = '',
	organizationName = '',
	remarks = {},
	onSubmit = (prop) => (prop),
	billAdditionalObject = {},
	bill = {},
}) {
	const {

		paymentType = '',
		isIncidental = '',
		advancedAmount = '0',
		advancedAmountCurrency = '',
		urgencyTag = '',
		paymentDueDate = '',
	} = billAdditionalObject || {};

	const {
		billNumber = '',
		billDate = new Date(),
		status = '',
		placeOfSupply = '',
	} = bill || {};

	return (
		<Modal
			size="md"
			show={showRejected[id]}
			onClose={onClose}
		>
			<Modal.Header title="Choose the details you want to reject" />
			<Modal.Body>
				{Object.keys(showRejected).includes(COLLECTION_PARTY_INDEX) && (
					<div>
						<div className={styles.flex_center}>
							<CheckboxGroup
								options={collectionPartyRejectionList}
								onChange={(val) => {
									setCheckedValue(
										{ ...checkedValue, collectionPartyRemark: val },
									);
								}}
								value={checkedValue.collectionPartyRemark}
								style={{ display: 'flex', flexDirection: 'column' }}
							/>
						</div>
						<Textarea
							name="remark"
							size="md"
							placeholder="Remarks Here ..."
							style={{ width: '700', height: '100px' }}
							value={remarksVal?.collectionPartyRemark?.[remarksVal
								.collectionPartyRemark.length - CHECK_REMARK_LENGTH]}
							onChange={(value) => setRemarksVal({
								...remarksVal,
								collectionPartyRemark: [
									...checkedValue.collectionPartyRemark, value],
							})}
						/>
					</div>
				)}

				{Object.keys(showRejected).includes(BILLING_PARTY_INDEX) && (
					<div>
						<div className={styles.flex_center}>
							<CheckboxGroup
								options={billingPartyRejectionList}
								onChange={(val) => {
									setCheckedValue(
										{ ...checkedValue, billingPartyRemark: val },
									);
								}}
								value={checkedValue.billingPartyRemark}
								style={{ display: 'flex', flexDirection: 'column' }}
							/>
						</div>
						<Textarea
							name="remark"
							size="md"
							placeholder="Remarks Here ..."
							value={remarksVal?.billingPartyRemark?.[remarksVal
								.billingPartyRemark.length - CHECK_REMARK_LENGTH]}
							onChange={(value) => setRemarksVal({
								...remarksVal,
								billingPartyRemark: [
									...checkedValue.billingPartyRemark, value],
							})}
							style={{ width: '700', height: '100px' }}
						/>
					</div>
				)}
				{Object.keys(showRejected).includes(INVOICE_DETAILS_INDEX) && (
					<div>
						<div className={styles.flex_center}>
							<CheckboxGroup
								options={invoiceDetailsRejectCheckboxList(
									{
										billNumber,
										billDate,
										status,
										placeOfSupply,
										invoiceType,
										organizationName,
										remarks,
										urgencyTag,
										paymentType,
										isIncidental,
										advancedAmount,
										advancedAmountCurrency,
										paymentDueDate,
									},
								)}
								onChange={(val) => {
									setCheckedValue(
										{ ...checkedValue, invoiceDetailsRemark: val },
									);
								}}
								value={checkedValue.invoiceDetailsRemark}
								style={{ display: 'flex', flexDirection: 'column' }}
							/>
						</div>

						<Textarea
							name="remark"
							size="md"
							placeholder="Remarks Here ..."
							value={remarksVal?.invoiceDetailsRemark?.[remarksVal
								.invoiceDetailsRemark.length - CHECK_REMARK_LENGTH]}
							onChange={(value) => setRemarksVal({
								...remarksVal,
								invoiceDetailsRemark: [
									...checkedValue.invoiceDetailsRemark, value],
							})}
							style={{ width: '700', height: '100px' }}
						/>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => onSubmit(id)}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RejectModal;
