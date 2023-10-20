import { Modal, Button } from '@cogoport/components';
import { InputController, useForm, SelectController } from '@cogoport/forms';
import { useEffect } from 'react';

import styles from './styles.module.css';

function GetController(item, control) {
	console.log('whatshappening');
	if (item?.type === 'input') {
		return (
			<InputController
				control={control}
				name={item?.value}
				placeholder="Enter"
				// defaultValue={modalUpdateData[item?.value]}
			/>
		);
	}
	return (
		<SelectController
			control={control}
			name={item?.value}
			placeholder="Enter"
			options={item?.options}
			// defaultValue={modalUpdateData?.[item?.value]}
		/>
	);
}

function EditModal({ show, handleModal, modalData, modalUpdateData }) {
	const { control, setValue } = useForm();

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
								{GetController(item, control, modalUpdateData)}
							</div>
						))
					}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleModal}>OK</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default EditModal;
