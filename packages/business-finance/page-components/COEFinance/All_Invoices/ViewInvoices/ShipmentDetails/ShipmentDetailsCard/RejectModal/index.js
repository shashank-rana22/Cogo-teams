import {
	Button,
	Modal,
	Textarea,
	CheckboxGroup,
	Checkbox,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import invoiceDetailsRejectCheckboxList from '../../../../../constants/invoice-details-checkbox-list.ts';

import styles from './styles.module.css';

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
	const [extraCheck, setExtraCheck] = useState('');
	const rejectedId = Object.keys(showRejected)?.[GLOBAL_CONSTANTS.zeroth_index];
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

	const invoiceDetailsRejectionList = invoiceDetailsRejectCheckboxList(
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
	);

	const basicOptions = {
		1 : collectionPartyRejectionList,
		2 : billingPartyRejectionList,
		3 : invoiceDetailsRejectionList,
	};

	const allOptions = (basicOptions?.[rejectedId])?.reduce((acc, curr) => {
		acc.push(curr?.value);
		return acc;
	}, []);

	const CHECKED_VALUE_MAPPING = useMemo(() => ({
		1 : 'collectionPartyRemark',
		2 : 'billingPartyRemark',
		3 : 'invoiceDetailsRemark',
	}), []);

	const onCheckboxChange = (event) => {
		setCheckedValue(
			{ ...checkedValue, [CHECKED_VALUE_MAPPING[rejectedId]]: [...event] },
		);
		if (event?.length === allOptions?.length) {
			setExtraCheck('All');
		} else {
			setExtraCheck('');
		}
	};

	useEffect(() => {
		// Resetting the textarea when textarea input is hidden
		if (isEmpty(extraCheck)) {
			setRemarksVal((prev) => ({
				...prev,
				[CHECKED_VALUE_MAPPING[rejectedId]]: [],
			}));
		}
	}, [CHECKED_VALUE_MAPPING, extraCheck, rejectedId, setRemarksVal]);

	return (
		<Modal
			size="md"
			show={showRejected[id]}
			onClose={onClose}
		>
			<Modal.Header title="Choose the details you want to reject" />
			<Modal.Body className={styles.body_section}>
				<div>
					<div className={styles.flex_center}>
						<Checkbox
							checked={extraCheck === 'All'}
							label="All"
							onChange={(e) => {
								if (e?.target?.checked) {
									setCheckedValue((p) => ({
										...p,
										[CHECKED_VALUE_MAPPING[rejectedId]]: [...allOptions],
									}));
									setExtraCheck('All');
								} else {
									setCheckedValue((p) => ({
										...p,
										[CHECKED_VALUE_MAPPING[rejectedId]]: [],
									}));
									setExtraCheck('');
								}
							}}
							className={styles.extra_checks}
						/>
						<CheckboxGroup
							options={basicOptions[rejectedId]}
							onChange={onCheckboxChange}
							value={checkedValue[CHECKED_VALUE_MAPPING[rejectedId]]}
							style={{ display: 'flex', flexDirection: 'column' }}
						/>
						<Checkbox
							checked={extraCheck === 'Other'}
							label="Other"
							onChange={(e) => {
								setCheckedValue((p) => ({
									...p,
									[CHECKED_VALUE_MAPPING[rejectedId]]: [],
								}));
								if (e?.target?.checked) {
									setExtraCheck('Other');
								} else {
									setExtraCheck('');
								}
							}}
							className={styles.extra_checks}
						/>
					</div>
					{!isEmpty(extraCheck) && (
						<Textarea
							name="remark"
							size="md"
							placeholder="Remarks Here ..."
							style={{ width: '700', height: '100px' }}
							value={remarksVal?.[CHECKED_VALUE_MAPPING[rejectedId]]?.[GLOBAL_CONSTANTS.zeroth_index]}
							onChange={(value) => setRemarksVal({
								...remarksVal,
								[CHECKED_VALUE_MAPPING[rejectedId]]: [value],
							})}
						/>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => onSubmit(id)}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default RejectModal;
