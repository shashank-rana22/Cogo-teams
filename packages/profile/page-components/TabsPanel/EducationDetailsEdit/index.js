import { Button, Modal } from '@cogoport/components';
import { DatepickerController, InputController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import useUpdateEmployee from '../../../hooks/useUpdateEmployee';

import styles from './styles.module.css';

function EducationDetailsEdit({
	data = {}, detailsToEdit = {},
	show = false,
	setShow = () => {},
}) {
	const { details } = detailsToEdit || {};
	const { employee_detail } = data || {};
	const { employee_education_details } = employee_detail || {};
	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const { updateEmployeeDetails } = useUpdateEmployee();

	console.log(employee_education_details, 'detadffgh');

	const educationDetails = details.reduce((res, detail) => {
		const { key } = detail;
		console.log(res, 'res');
		console.log(detail, 'resDetail');
		const valueKey = detail.value;

		const educationDetail = employee_education_details.find((item) => item.education_level === key);

		if (educationDetail) {
			res[detail.label] = educationDetail[valueKey];
		}

		return res;
	}, {});

	const handleClick = (payload) => {
		updateEmployeeDetails({ payload });
	};

	useEffect(() => {
		if (!isEmpty(Object.keys(educationDetails))) {
			Object.keys(educationDetails).forEach((label) => {
				let value = educationDetails[label];
				if (label === 'Graduation date') {
					value = new Date(value);
				}
				setValue(label, value);
			});
		}
	}, [educationDetails, setValue]);

	return (
		<div style={{ padding: '20px' }}>

			<Modal size="lg" show={show} onClose={handleClick} placement="center">
				<Modal.Header title="Edit Details" />
				<Modal.Body>
					<div className={styles.educational_details}>
						{Object.keys(educationDetails).map((label) => (
							<div className={styles.input_container} key={label}>
								<div className={styles.title}>{`${label}*`}</div>
								{label === 'Graduation date' ? (
									<DatepickerController
										control={control}
										name={label}
										placeholder={`Enter your ${label}`}
										rules={{ required: 'required' }}
									/>
								) : (
									<InputController
										control={control}
										name={label}
										type="text"
										placeholder={`Enter your ${label}`}
										rules={{ required: 'required' }}
									/>
								)}
								{errors?.label ? <div className={styles.error}>*required</div> : null}
							</div>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button themeType="secondary" onClick={() => setShow(!show)} style={{ marginRight: '4px' }}>
						Cancel
					</Button>
					<Button themeType="accent" onClick={handleSubmit(handleClick)}>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>

	);
}

export default EducationDetailsEdit;
