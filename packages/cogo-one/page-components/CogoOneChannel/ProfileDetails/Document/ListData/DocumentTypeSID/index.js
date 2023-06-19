import { Button } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import useDocumentTag from '../../../../../../hooks/useDocumentTag';
import useDocumentTypeControls from '../../../../../../hooks/useDocumentTypeControls';

import styles from './styles.module.css';

const CONTROLLER_MAPPING = {
	select: SelectController,
};

function DocumentTypeSID({
	orgId = '',
	id = '',
	formattedMessageData = {},
	openModal = '',
	setOpenModal = () => {},
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
			document_id   : id,
			document_type : watchListShipmentPendingTasks,
			shipment_id   : watchListShipment,
			document_link : openModal,
		};
		postDocumentTag({ payload, setOpenModal });
	};

	return (
		openModal && (
			<div className={styles.main_container}>
				<div className={styles.title}>
					<div>Document Tag</div>
					<IcMCross className={styles.cross} onClick={() => setOpenModal('')} />
				</div>
				<div key={watchListShipment}>
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
				<div className={styles.button_styles}>
					<Button size="sm" themeType="primary" onClick={handleSubmit(createDocumentTag)}>
						OK
					</Button>
				</div>
			</div>
		)
	);
}

export default DocumentTypeSID;
