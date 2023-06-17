import { Button, Modal } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import React from 'react';

import useDocumentTag from '../../../../../../hooks/useDocumentTag';
import useDocumentTypeControls from '../../../../../../hooks/useDocumentTypeControls';

import styles from './styles.module.css';

const CONTROLLER_MAPPING = {
	select: SelectController,
};

function DocumentTypeSID({
	orgId,
	formattedMessageData,
	openModal = false,
	setOpenModal = () => {},
	document_url = '',
}) {
	const {
		postDocumentTag,
	} = useDocumentTag();

	const { account_type = '' } = formattedMessageData || {};
	const { control, formState:{ errors = {} }, watch, handleSubmit, resetField } = useForm();
	const watchListShipment = watch('list_shipments');
	const watchListShipmentPendingTasks = watch('list_shipment_pending_tasks');

	const controls = useDocumentTypeControls({
		orgId,
		account_type,
		watchListShipment,
		watchListShipmentPendingTasks,
		resetField,
	});

	const createDocumentTag = () => {
		const payload = {
			document_type : watchListShipmentPendingTasks,
			shipment_id   : watchListShipment,
			document_link : document_url,
		};
		postDocumentTag({ payload, setOpenModal });
	};

	return (
		<Modal
			size="md"
			show={openModal}
			className={styles.modal_styled}
			onClose={() => setOpenModal(false)}
			placement="center"
		>
			<Modal.Header title="Document Tag" />
			<Modal.Body>
				<div
					className={styles.header}
					key={watchListShipment}
				>
					{controls.map((eachControl = {}) => {
						const { label = '', controlType = '', name = '' } = eachControl || {};
						const Element = CONTROLLER_MAPPING[controlType] || null;

						return (Element && (
							<div className={styles.styled_element} key={name}>
								<div className={styles.label}>{label}</div>
								<Element control={control} {...eachControl} />
								<div className={styles.error_text}>
									{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
								</div>
							</div>
						));
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_styles}>
					<Button size="md" themeType="primary" onClick={handleSubmit(createDocumentTag)}>
						OK
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default DocumentTypeSID;
