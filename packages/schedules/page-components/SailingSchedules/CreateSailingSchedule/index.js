import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import {
	asyncFieldsOperators, asyncFieldsLocations,
}
	from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import React from 'react';

import Layout from '../../common/Layout/index.tsx';
import useCreateSailingSchedule from '../hooks/useCreateSailingSchedule';

import controls from './controls';
import styles from './styles.module.css';

function CreateModal({ showModal, setShowModal, refetch }) {
	const handleClose = () => {
		setShowModal(false);
	};
	const { handleSubmit, control, formState: { errors }, watch } = useForm();
	const formValues = watch();
	const fields = controls;

	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));
	const locationOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport' } } },
	));
	const terminalOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport_terminal' } } },
	));
	const newField = fields.map((field) => {
		const { name } = field;
		let newControl = { ...field };
		if (name === 'shipping_line_id') {
			newControl = { ...newControl, ...shippingLineOptions };
		} else if (['origin_port_id', 'destination_port_id'].includes(name)) {
			newControl = { ...newControl, ...locationOptions };
		} else if (['origin_terminal_name', 'destination_terminal_name'].includes(name)) {
			newControl = { ...newControl, ...terminalOptions };
		}
		return { ...newControl };
	});
	const { createSchedule } = useCreateSailingSchedule({ refetch });
	return (
		<Modal
			size="lg"
			show={showModal}
			onClose={() => {
				handleClose();
			}}
			closeOnOuterClick
			scroll
		>
			<div className={styles.shadow}>
				<Modal.Header
					title={
						<div className={styles.heading_container}>Create Vessel Schedule</div>
                    }
				/>
			</div>

			<Modal.Body>
				<div className={styles.inputGroup}>
					<Layout fields={newField} control={control} errors={errors} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.clear}>
					<Button
						themeType="secondary"
						onClick={() => {
							handleClose();
						}}
					>
						Cancel
					</Button>
				</div>
				<div>
					<Button
						onClick={() => {
							handleSubmit(createSchedule(formValues));
							handleClose();
						}}
					>
						Create Sailing Schedule
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateModal;
