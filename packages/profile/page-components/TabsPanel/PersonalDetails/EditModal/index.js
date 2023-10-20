import { Button, Modal } from '@cogoport/components';
import {
	InputController, SelectController, DatepickerController,
	useForm, MobileNumberController,
} from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

// const options = [
// 	{ label: 'Male', value: 'male' },
// 	{ label: 'Female', value: 'female' },
// 	{ label: 'Others', value: 'others' },
// ];

// const marry_options = [
// 	{ label: 'Married', value: 'married' },
// 	{ label: 'Single', value: 'single' },
// ];

// const controlmap = {
// 	input  : <InputController />,
// 	select : <SelectController />,
// 	date   : <DatepickerController />,
// 	mobile : <MobileNumberController />,
// };

function GetController(item, options, control) {
	if (item?.inputtype === 'input') {
		return <InputController name={item?.value} placeholder={`Enter ${item?.label}`} control={control} />;
	}
	if (item?.inputtype === 'select') {
		return (
			<SelectController
				name={item?.value}
				placeholder={`Enter ${item?.label}`}
				control={control}
				options={item?.options}
			/>
		);
	}
	if (item?.inputtype === 'date') {
		return <DatepickerController name={item?.value} placeholder={`Enter ${item?.label}`} control={control} />;
	}
	if (item?.inputtype === 'mobile') {
		return <MobileNumberController name={item?.value} placeholder={`Enter ${item?.label}`} control={control} />;
	}
}
function EditModal({ show = false, handleModal = () => {}, data }) {
	const { control } = useForm();

	return (
		<div>
			{' '}
			<Modal size="md" show={show} onClose={handleModal} placement="center">
				<Modal.Header title="Edit Personal Details" />
				<Modal.Body>
					<div className={styles.modal_form}>

						{
                        data.map((item) => (
	<div className={styles.form_data} key={item.label}>
		{' '}
		<div className={styles.modal_heading}>Enter First Name</div>
		{GetController(item, control)}
	</div>
                        ))
                            }

					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModal}>OK</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default EditModal;
