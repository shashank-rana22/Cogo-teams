import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useCreateJobClosure from '../../hook/useCreateJobClosure';
import styles from '../styles.module.css';

import DetailForm from './DetailForm';

function CreateModal({ openModal = false, setOpenModal = () => {}, refetch = () => {} }) {
	const { user_data: userData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { control, watch, handleSubmit, formState: { errors = {} }, setValue } = useForm();

	const { apiTrigger = () => {}, loading = false } = useCreateJobClosure({
		refetch: () => {
			refetch();
			setOpenModal(false);
		},
	});

	const { user: { id: userId } = {} } = userData || {};

	const onSubmit = (value) => {
		const {
			entity = '', selectionCriteriaOp = '', selectionCriteriaFin = '',
			serviceType = '', tradeType = '', level1 = '', level2 = '',
		} = value || {};
		const params = {
			entity,
			selectionCriteriaOp,
			selectionCriteriaFin,
			serviceType,
			tradeType,
			level1,
			level2,
			performedBy: userId,

		};
		apiTrigger(params);
	};

	return (
		<Modal show={openModal} onClose={() => setOpenModal(false)} placement="center" size="lg">
			<Modal.Header title="Create" />
			<Modal.Body style={{ maxHeight: '800px', minHeight: '300px' }}>
				<DetailForm
					errors={errors}
					control={control}
					watch={watch}
					setValue={setValue}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					className={styles.formButton}
					onClick={() => setOpenModal(false)}
					disabled={loading}
				>
					Cancel

				</Button>
				<Button
					size="md"
					themeType="primary"
					className={styles.formButton}
					onClick={handleSubmit(onSubmit)}
					disabled={loading}

				>
					Create

				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CreateModal;
