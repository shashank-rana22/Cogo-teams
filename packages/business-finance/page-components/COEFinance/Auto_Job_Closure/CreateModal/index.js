import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useCreateJobClosure from '../../hook/useCreateJobClosure';
import styles from '../styles.module.css';

import DetailForm from './DetailForm';

function CreateModal({ openModal = false, setOpenModal = () => {}, refetch = () => {} }) {
	const { control, watch, handleSubmit, formState: { errors = {} } } = useForm();

	const { apiTrigger } = useCreateJobClosure({ refetch, setOpenModal });
	const { user_data: UserData } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user } = UserData;
	const { id:userId } = user;

	const onSubmit = (value) => {
		const params = {
			entity               : value.entity,
			selectionCriteriaOp  : value.selectionCriteriaOp,
			selectionCriteriaFin : value.selectionCriteriaFin,
			serviceType          : value.serviceType,
			tradeType            : value.tradeType,
			level1               : value.level1,
			level2               : value.level2,
			performedBy          : userId,

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
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					className={styles.formButton}
					onClick={() => setOpenModal(false)}
				>
					Cancel

				</Button>
				<Button
					size="md"
					themeType="primary"
					className={styles.formButton}
					onClick={handleSubmit(onSubmit)}

				>
					Create

				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default CreateModal;
