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
import useCreateServiceLane from '../hooks/useCreateServiceLane';

import controls from './controls';
import styles from './styles.module.css';

function CreateModal({ showModal, setShowModal, makeRequest }) {
	const handleClose = () => {
		setShowModal(false);
	};
	const { handleSubmit, control, formState: { errors }, watch } = useForm();
	const formValues = watch();
	const no_of_ports = watch('port_number');
	const fields = controls(no_of_ports);

	const createRefetch = () => {
		makeRequest();
	};
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type: 'shipping_line' } } },
	));
	const locationOptions = useGetAsyncOptions(merge(
		asyncFieldsLocations(),
		{ params: { filters: { type: 'seaport' } } },
	));
	const newFieldBasic = fields.basic.map((field) => {
		const { name } = field;
		let newControl = { ...field };
		if (name === 'shipping_line_id') {
			newControl = { ...newControl, ...shippingLineOptions };
		} else if (['origin_port_id', 'destination_port_id'].includes(name)) {
			newControl = { ...newControl, ...locationOptions };
		}
		return { ...newControl };
	});
	const newFieldPorts = fields.ports.map((field) => {
		const { name } = field;
		let newControl = { ...field };
		if (name === 'location_id') {
			newControl = { ...newControl, ...locationOptions };
		}
		return { ...newControl };
	});

	const { createServiceLane } = useCreateServiceLane({ refetch: createRefetch });
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
						<div className={styles.heading_container}>Create Service Lane</div>
                    }
				/>
			</div>

			<Modal.Body>
				<div className={styles.inputGroup}>
					<Layout fields={newFieldBasic} control={control} errors={errors} />
				</div>
				<div className={styles.inputGroup}>

					<Layout fields={fields.port} control={control} errors={errors} />
					<Layout fields={newFieldPorts} control={control} errors={errors} />
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
							handleSubmit(createServiceLane(formValues));
							handleClose();
						}}
					>
						Create Service Lane
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateModal;
