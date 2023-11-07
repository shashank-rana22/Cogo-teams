import { Button, Modal } from '@cogoport/components';
import { DatepickerController, InputController, SelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useMemo } from 'react';

import useUpdateEmployee from '../../../hooks/useUpdateEmployee';

import styles from './styles.module.css';

const SCORE_TYPE = [
	{
		label : 'percentage',
		value : 'percentage',
	},
	{
		label : 'cgpa',
		value : 'cgpa',
	},
];

const controlTypes = {
	'Score type'      : SelectController,
	'Graduation date' : DatepickerController,
	default           : InputController,
};

function EducationDetailsEdit({
	data = {},
	detailsToEdit = {},
	show = false,
	setShow = () => {},
	getEmployeeDetails = () => {},
}) {
	const { details } = detailsToEdit || {};
	const { employee_detail, user_role } = data || {};
	console.log(user_role, 'check-role');
	const { employee_education_details } = employee_detail || {};
	const { handleSubmit, control, setValue } = useForm();

	const handleModal = () => {
		setShow(false);
	};
	const { updateEmployeeDetails } = useUpdateEmployee({ handleModal, getEmployeeDetails });

	const commonKey = !isEmpty(details) ? details[GLOBAL_CONSTANTS.zeroth_index].key : null;

	const educationDetails = details.reduce((res, detail) => {
		const { key } = detail;
		const valueKey = detail.value;

		const educationDetail = (employee_education_details || []).find((item) => item.education_level === key);

		if (educationDetail) {
			res[detail.label] = educationDetail[valueKey];
		}
		console.log(res, '12345657');
		return res;
	}, {});

	const handleClick = async (payload) => {
		const arr = data?.employee_detail?.employee_education_details;
		const filteredArr = arr?.filter((val) => val.education_level !== commonKey);

		const values = {
			score           : payload.Score,
			degree          : payload.Degree,
			specialization  : payload['Field of study'],
			ended_at        : payload['Graduation date'],
			score_type      : payload['Score type'],
			school_name     : payload.College,
			education_level : commonKey,
		};

		const education_details = { education_details: [...filteredArr, values] };

		await updateEmployeeDetails(education_details);
	};

	// useEffect(() => {
	// 	if (!isEmpty(Object.keys(educationDetails))) {
	// 		Object.keys(educationDetails).forEach((label) => {
	// 			let value = educationDetails[label];
	// 			if (label === 'Graduation date') {
	// 				value = new Date(value);
	// 			}
	// 			setValue(label, value);
	// 		});
	// 	}
	// }, [educationDetails]);

	const educationDetailsArray = useMemo(() => Object.keys(educationDetails).map((label) => ({
		label,
		value: educationDetails[label],
	})), [educationDetails]);

	useEffect(() => {
		if (!isEmpty(educationDetailsArray)) {
			educationDetailsArray.forEach((item) => {
				let val = item.value;
				if (item.label === 'Graduation date') {
					val = new Date(item.value);
				}
				setValue(item.label, val);
			});
		}
	}, [educationDetailsArray, setValue]);

	return (
		<div style={{ padding: '20px' }}>
			<Modal size="lg" show={show} onClose={() => setShow(!show)} placement="center">
				<Modal.Header title="Edit Details" />
				<Modal.Body>
					<div className={styles.educational_details}>
						{(educationDetailsArray || []).map((detail) => {
							const ControlComponent = controlTypes[detail?.label];
							return (
								<div className={styles.input_container} key={detail?.label}>
									<div className={styles.title}>{`${detail?.label}*`}</div>
									{ControlComponent ? (
										<ControlComponent
											control={control}
											name={detail?.label}
											placeholder={`Enter your ${detail?.label}`}
											// rules={{ required: 'required' }}
											disabled={user_role === 'hrbp' ? false : !isEmpty(detail?.value)}
											options={detail?.label === 'Score type' ? SCORE_TYPE : undefined}
										/>
									) : (
										<InputController
											control={control}
											name={detail?.label}
											placeholder={`Enter your ${detail?.label}`}
											// rules={{ required: 'required' }}
											disabled={user_role === 'hrbp' ? false : !isEmpty(detail?.value)}
										/>
									)}

								</div>
							);
						})}
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
