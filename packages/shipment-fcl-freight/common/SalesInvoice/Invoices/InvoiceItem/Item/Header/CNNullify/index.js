import { Button, Modal } from '@cogoport/components';
import { TextAreaController, UploadController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreditNoteNullify from '../../../../../../../hooks/useCreditNoteNullify';
import RequestCN from '../RequestCN';

function CNNullify({
	askNullify,
	setAskNullify = () => {},
	invoice,
	refetchCN = () => {},
	invoiceData,
	bfInvoiceRefetch = () => {},
}) {
	const [isRequestCN, setIsRequestCN] = useState(false);

	const refetchAfterApiCall = () => {
		setAskNullify(false);
		bfInvoiceRefetch();
		refetchCN();
	};
	const {
		onCreate = () => {},
		loading,
	} = useCreditNoteNullify({
		invoiceId : invoice?.id,
		refetch   : refetchAfterApiCall,
	});

	const { handleSubmit, control, reset, watch } = useForm();
	const formValues = watch();

	const handleNo = () => {
		setIsRequestCN(true);
		setAskNullify(false);
	};

	const handleOnClose = () => {
		reset();
		setAskNullify(false);
	};

	return (
		<>
			<Modal
				className="primary md"
				show={askNullify}
				onClose={handleOnClose}
			>
				<Modal.Header title="Do you want to revoke this invoice ?" />
				<Modal.Body>
					<label>Details (Mandatory)</label>
					<TextAreaController
						id="remarks"
						name="remarks"
						control={control}
						placeholder="Enter Details Here"
					/>
					<label>Upload File</label>
					<UploadController
						name="file"
						control={control}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						onClick={handleNo}
						style={{
							marginRight: '10px',
						}}
					>
						Create Partial CN
					</Button>
					<Button
						onClick={handleSubmit(onCreate)}
						disabled={loading || isEmpty(formValues.remarks) || isEmpty(formValues.file)}
						size="md"
					>
						Revoke Invoice
					</Button>
				</Modal.Footer>
			</Modal>

			{isRequestCN ? (
				<RequestCN
					invoice={invoice}
					show={isRequestCN}
					setShow={setIsRequestCN}
					refetchCN={refetchCN}
					invoiceData={invoiceData}
				/>
			) : null}
		</>
	);
}

export default CNNullify;
