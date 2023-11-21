import { Modal, Button } from '@cogoport/components';
import { InputController, useForm, SelectController } from '@cogoport/forms';
import { useEffect } from 'react';

import useUpdateBankDetails from '../../../../hooks/useUpdateBankAccountDetails';

import styles from './styles.module.css';

function GetController({ item, control }) {
	if (item?.type === 'input') {
		return (
			<InputController
				control={control}
				name={item?.value}
				placeholder="Enter"
			/>
		);
	}
	return (
		<SelectController
			control={control}
			name={item?.value}
			placeholder="Enter"
			options={item?.options}
		/>
	);
}

function EditModal({ show, handleModal, modalData, modalUpdateData, getEmployeePaymentDetails }) {
	const { control, setValue, handleSubmit } = useForm();

	const { updateBankDetails } = useUpdateBankDetails({ handleModal, getEmployeePaymentDetails });

	const onSubmit = (values) => {
		const PAYLOAD = {
			is_active   : true,
			verified_at : new Date(),
			employee_id : modalUpdateData?.employee_id,
		};

		modalData.forEach((item) => {
			PAYLOAD[item?.value] = values[item?.value];
		});
		updateBankDetails({ payload: PAYLOAD });
	};

	useEffect(() => {
		if (modalData) {
			modalData.map((item) => (
				setValue(item.value, modalUpdateData?.[item.value])
			));
		}
	}, [modalData, modalUpdateData, setValue]);
	return (
		<Modal size="lg" show={show} onClose={handleModal} placement="center">
			<Modal.Header title="Edit Personal Details" />
			<Modal.Body>
				<div className={styles.modal_form}>
					{
						modalData?.map((item) => (
							<div className={styles.form_data} key={item.label}>
								<div className={styles.modal_heading}>{item.label}</div>
								<GetController item={item} control={control} modalUpdateData />
							</div>
						))
					}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => handleSubmit(onSubmit)()}>OK</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default EditModal;
