// import { useForm } from '@cogoport/forms';

import React, { useState } from 'react';

import { personalInfo } from '../../../utils/info';
import { otherPersonalInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import EditModal from './EditModal';
// import FamilyDetailModal from './FamilyDetailModal';
// import PersonalDetailModal from './PersonalDetailModal';
import styles from './styles.module.css';

function PersonalDetails({ data = {}, loading = false, getEmployeeDetails }) {
	const [show, setShow] = useState(false);
	const [datatoedit, setDataToEdit] = useState({});

	// const { employee_detail, modified_employee_detail, processed_employee_detail, personal_details } = data || {};
	// const { family_details } = personal_details || {};
	// console.log('🚀 ~ file: index.js:26 ~ PersonalDetails ~ family_details:', family_details);
	// const { control } = useForm();
	const info = personalInfo;
	console.log('🚀 ~ file: index.js:23 ~ PersonalDetails ~ info:', info);
	const otherInfo = otherPersonalInfo;

	const handleModal = () => {
		setShow(!show);
	};

	const handleClickDetails = (details) => {
		setDataToEdit(details);
		setShow(!show);
	};
	return (
		<>
			<div className={styles.tab_content}>
				<div className={styles.main_container}>
					<div className={styles.flex}>
						<div className={styles.heading}>
							<span className={styles.personal}>PERSONAL DETAILS</span>
							<span className={styles.detail}>View and manage employee details</span>
						</div>
					</div>
					<div className={styles.info_container}>
						{info.map(({ heading, details, key }) => (
							<div key={heading}>
								<DetailsCard
									heading={heading}
									details={details}
									data={data}
									loading={loading}
									key={heading}
									keyMapping={key}
									handleClickDetails={handleClickDetails}
								/>
							</div>
						))}
					</div>
				</div>
				<RightGlance otherInfo={otherInfo} data={data} loading={loading} />
			</div>

			{/* <Modal size="md" show={show} onClose={handleModal} placement="center">
				<Modal.Header title="Edit Personal Details" />
				<Modal.Body>
					<div className={styles.modal_form}>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter First Name</div>
							<InputController
								control={control}
								name="first_name"
								type="text"
								placeholder="Enter first name"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Last Name</div>
							<InputController
								control={control}
								name="last_name"
								type="text"
								placeholder="Enter Last name"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Email</div>
							<InputController
								control={control}
								name="email"
								type="email"
								placeholder="Enter Email"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Number</div>
							<InputController
								control={control}
								name="number"
								type="number"
								placeholder="Enter Number"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Personal Email</div>
							<InputController
								control={control}
								name="personal_email"
								type="email"
								placeholder="Enter Personal Email"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Alternate Number</div>
							<InputController
								control={control}
								name="alternate_number"
								type="number"
								placeholder="Enter Alternate Number"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Select Gender</div>
							<SelectController
								control={control}
								name="gender"
								options={options}
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter D.O.B.</div>
							<DatepickerController
								control={control}
								name="date_of_birth"
								options={options}
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Select Marital Status</div>
							<SelectController
								control={control}
								name="marital_status"
								options={marry_options}
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Disability if any</div>
							<InputController
								control={control}
								name="disability"
								type="text"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Allergies if any</div>
							<InputController
								control={control}
								name="allergies"
								type="text"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Blood Group</div>
							<InputController
								control={control}
								name="blood_group"
								type="text"
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModal}>OK</Button>
				</Modal.Footer>
			</Modal> */}
			{show && (
				<EditModal
					show={show}
					handleModal={handleModal}
					data={data}
					mappingKey={datatoedit}
					getEmployeeDetails={getEmployeeDetails}
				/>
			)}
			{/* // <FamilyDetailModal
			// 	control={control}
			// 	handleModal={handleModal}
			// 	show={show}
			// 	family_details={family_details}
			// /> */}
		</>
	);
}

export default PersonalDetails;
