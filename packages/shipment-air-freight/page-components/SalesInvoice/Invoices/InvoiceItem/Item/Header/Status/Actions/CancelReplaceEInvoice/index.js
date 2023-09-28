import { Button, Modal } from '@cogoport/components';
import { InputController, UploadController, useForm } from '@cogoport/forms';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useCancelReplaceInvoice from '../../../../../../../../../hooks/useCancelReplaceInvoice';

import controls from './controls';
import styles from './styles.module.css';

function CancelReplaceEInvoice({
	showCancelModal = {},
	setShowCancelModal = () => {},
	bfInvoice = {},
	invoice = {},
	refetch = () => {},
	company_name = '',
}) {
	const { control, handleSubmit } = useForm();

	const { loading, onRevoke } = useCancelReplaceInvoice();

	const modalType = ([
		{ type: 'CANCEL_INVOICE', criteria: showCancelModal?.showCancel },
		{ type: 'REPLACE_INVOICE', criteria: showCancelModal?.showReplace },
	].filter((item) => (item.criteria === true)) || [])[GLOBAL_CONSTANTS.zeroth_index]?.type;

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

	const handleClose = () => {
		setShowCancelModal({ showCancel: false, showReplace: false });
	};

	const getIncidenceEntity = () => {
		const entityCode = Object.keys(ENTITY_MAPPING).filter(
			(item) => ENTITY_MAPPING[item].currency === bfInvoice?.ledgerCurrency,
		)[GLOBAL_CONSTANTS.zeroth_index];
		return ENTITY_MAPPING[entityCode].id;
	};

	const handleRevoke = (values) => {
		onRevoke({
			cancelReason         : values?.cancelReason,
			proformaNumber       : bfInvoice?.einvoiceNumber,
			closeModal           : handleClose,
			invoiceCombinationId : invoice?.id,
			invoiceId            : bfInvoice?.id,
			refetch,
			documentUrls         : getDocumentUrl(values),
			incidentSubType      : modalType,
			entityId             : getIncidenceEntity(),
			company_name,
		});
	};

	return (
		<Modal
			show={showCancelModal?.showCancel || showCancelModal?.showReplace}
			onClose={handleClose}
			className="secondary sm"
			onOuterClick={handleClose}
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
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
					onClick={handleSubmit(handleRevoke)}
				>
					{loading ? 'Submit' : 'Submiting'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CancelReplaceEInvoice;
