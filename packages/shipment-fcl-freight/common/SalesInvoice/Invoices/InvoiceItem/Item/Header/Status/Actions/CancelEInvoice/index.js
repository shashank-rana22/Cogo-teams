import { Button, Modal } from '@cogoport/components';
import { InputController, UploadController, useForm } from '@cogoport/forms';
import React from 'react';

import useCancelInvoice from '../../../../../../../../../hooks/useCancelInvoice';

import controls from './controls';

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
	const handleCancel = (values) => {
		submit({
			values,
			proformaNumber       : bfInvoice?.proformaNumber,
			closeModal           : onClose,
			invoiceCombinationId : invoice?.id,
			invoiceId            : bfInvoice?.id,
			refetch,
		});
	};

	return (
		<Modal
			show={show}
			onClose={onClose}
			className="secondary sm"
			onOuterClick={onClose}
		>
			<Modal.Header>Cancel E-Invoice</Modal.Header>
			<Modal.Body>
				{controls?.map((c) => {
					const Element = getElement(c?.type);
					return (Element
						? (
							<Element
								{...c}
								control={control}
								key={c?.name}
							/>
						)
						: null);
				})}
			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button
						className="secondary md"
						style={{ marginRight: '10px' }}
						onClick={onClose}
					>
						Cancel
					</Button>
				</div>
				<div>
					<Button className="primary md" onClick={handleSubmit(handleCancel)} disabled={!loading}>
						{
                            loading ? 'Submit' : 'Submiting'
                        }
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CancelEInvoice;
