import { Button, Modal } from '@cogoport/components';
import { InputController, UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import useCancelInvoice from '../../../../../../../../../hooks/useCancelInvoice';

import controls from './controls';
import styles from './styles.module.css';

function CancelEInvoice({
	bfInvoice = {},
	show = false,
	onClose = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const { control, handleSubmit } = useForm();

	const { loading, submit } = useCancelInvoice();

	const getElement = (type) => {
		const ELEMENT_MAPPING = {
			textarea : InputController,
			file     : UploadController,
		};
		return ELEMENT_MAPPING[type];
	};

	const getDocumentUrl = (values) => (values?.documentUrls?.finalUrl
		? [values?.documentUrls?.finalUrl]
		: undefined);

	const handleCancel = (values) => {
		submit({
			cancelReason         : values?.cancelReason,
			proformaNumber       : bfInvoice?.proformaNumber,
			closeModal           : onClose,
			invoiceCombinationId : invoice?.id,
			invoiceId            : bfInvoice?.id,
			refetch,
			documentUrls         : getDocumentUrl(values),
		});
	};

	return (
		<Modal
			show={show}
			onClose={onClose}
			className="secondary sm"
			onOuterClick={onClose}
		>
			<Modal.Header
				title="Cancel E-Invoice"
				className={styles.heading}
			/>
			<Modal.Body>
				{controls?.map((c) => {
					const Element = getElement(c?.type);
					return (Element
						? (
							<div className={styles.controls}>
								<div className={styles.label}>
									{' '}
									{c?.label}
								</div>
								<Element
									{...c}
									control={control}
									key={c?.name}
								/>
							</div>
						)
						: null);
				})}
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary md"
					style={{ marginRight: '10px' }}
					onClick={onClose}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
					onClick={handleSubmit(handleCancel)}
				>
					{loading ? 'Submit' : 'Submiting'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CancelEInvoice;
