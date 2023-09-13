import {
	Button,
	Modal,
	Textarea,
	CheckboxGroup,
} from '@cogoport/components';

import invoiceDetailsRejectCheckboxList from '../../../../../constants/invoice-details-checkbox-list.ts';

import styles from './styles.module.css';

const CHECK_REMARK_LENGTH = 1;

function RejectModal({
	showRejected = {},
	onClose = () => {},
	collectionPartyRejectionList = [],
	billingPartyRejectionList = [],
	id = '',
	checkedValue = {},
	setCheckedValue = (p) => p,
	remarksVal = {},
	setRemarksVal = () => {},
	billNumber = '',
	invoiceType = '',
	organizationName = '',
	remarks = {},
	urgencyTag = '',
	billDate = new Date(),
	status = '',
	placeOfSupply = '',
	onSubmit = () => {},
}) {
	return (
		<Modal
			size="lg"
			show={showRejected[id]}
			onClose={onClose}
		>
			<Modal.Header title="CHOOSE THE DETAILS YOU WANT TO REJECT" />
			<Modal.Body>
				{Object.keys(showRejected).includes('1') && (
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

				{Object.keys(showRejected).includes('2') && (
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
				{Object.keys(showRejected).includes('3') && (
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
