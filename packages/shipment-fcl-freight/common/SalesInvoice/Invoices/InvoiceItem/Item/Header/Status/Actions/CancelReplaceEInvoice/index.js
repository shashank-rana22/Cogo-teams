import { Button, Modal } from '@cogoport/components';
import { InputController, UploadController, useForm } from '@cogoport/forms';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useCancelReplaceInvoice from '../../../../../../../../../hooks/useCancelReplaceInvoice';

import controls from './controls';
import styles from './styles.module.css';

const MODAL_INCIDENT_MAP = {
	cancel_e_invoice  : 'CANCEL_INVOICE',
	replace_e_invoice : 'REPLACE_INVOICE',
};

function CancelReplaceEInvoice({
	bfInvoice = {},
	show = false,
	onClose = () => {},
	invoice = {},
	refetch = () => {},
	modalType = 'cancel_e_invoice',
}) {
	const { control, handleSubmit } = useForm();

	const { loading, submit } = useCancelReplaceInvoice();

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

	const getIncidenceEntity = () => {
		const entityCode = Object.keys(ENTITY_MAPPING).filter(
			(item) => ENTITY_MAPPING[item].currency === bfInvoice?.ledgerCurrency,
		)[GLOBAL_CONSTANTS.zeroth_index];
		return ENTITY_MAPPING[entityCode].id;
	};

	const handleCancel = (values) => {
		submit({
			cancelReason         : values?.cancelReason,
			proformaNumber       : bfInvoice?.einvoiceNumber,
			closeModal           : onClose,
			invoiceCombinationId : invoice?.id,
			invoiceId            : bfInvoice?.id,
			refetch,
			documentUrls         : getDocumentUrl(values),
			incidentSubType      : MODAL_INCIDENT_MAP[modalType],
			entityId             : getIncidenceEntity(),
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
				title={startCase(modalType)}
				className={styles.heading}
			/>
			<Modal.Body>
				{controls({ type: modalType })?.map((c) => {
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

export default CancelReplaceEInvoice;
