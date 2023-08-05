import { Button, Modal } from '@cogoport/components';
import { InputNumberController, TextAreaController, useForm } from '@cogoport/forms';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React, { useState } from 'react';

import useFundAllocationRequest from '../../../../../hooks/useFundAllocation';

import styles from './styles.module.css';

function RequestAmount({ itemData = {}, selectedPayrun = null, checkedRow = null }) {
	const { currency, totalValue } = checkedRow || selectedPayrun || {};
	const { balance } = itemData || {};
	const [showRequestModal, setShowRequestModal] = useState(false);
	const { onRequest, loading } = useFundAllocationRequest({
		itemData,
		setShowRequestModal,
	});
	const { handleSubmit, formState: { errors }, control } = useForm();

	return (
		<div>
			{balance < totalValue ? (
				<Button
					type="button"
					size="sm"
					className="secondary"
					onClick={() => setShowRequestModal(true)}
				>
					Request
				</Button>
			) : null}
			{showRequestModal && (
				<Modal
					show={showRequestModal}
					onClose={() => setShowRequestModal(false)}
					size="sm"
				>
					<Modal.Header title={`Payrun Amount: ${formatAmount({
						amount  : totalValue,
						currency,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}`}
					/>
					<Modal.Body>
						<div className={styles.input_container}>
							<div>Amount</div>
							<InputNumberController
								control={control}
								name="amount"
								size="sm"
								placeholder="Enter Amount"
								rules={{
									min: 1,
								}}
							/>
							{errors?.amount ? (
								<div className={styles.errors}>
									Amount is Required
								</div>
							) : null}
						</div>
						<div>
							<div>Remark</div>
							<TextAreaController
								control={control}
								rules={{ required: true }}
								name="remark"
								placeholder="Enter Remark"
							/>
							{errors?.remark ? (
								<div className={styles.errors}>
									Remark is Required
								</div>
							) : null}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							type="reset"
							themeType="secondary"
							className={styles.button}
							onClick={() => setShowRequestModal(false)}
						>
							Cancel

						</Button>
						<Button disabled={loading} onClick={handleSubmit(onRequest)}>
							Send Request
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}

export default RequestAmount;
