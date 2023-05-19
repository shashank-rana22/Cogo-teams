import { Button } from '@cogoport/components';
import {
	InputController, SelectController, MobileNumberController, useForm, SingleDateRangeController,
} from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import controls from './controls';
import styles from './styles.module.css';

const CONTROLS_MAPPING = {
	text            : InputController,
	mobileNumber    : MobileNumberController,
	SingleDateRange : SingleDateRangeController,
	select          : SelectController,
};

const PERSONAL_DETAILS_MAPPING = ['name', 'email', 'mobile_number'];

const EMPLOYEE_DETAILS_MAPPING = ['employee_id', 'role', 'date_of_joining', 'location', 'reporting_manager'];

const HR_DETAILS_MAPPING = ['hr_name', 'hr_email'];

const SECTION_MAPPING = [
	{
		header         : 'Personal Details',
		containerStyle : styles.personal_details_container,
		fields         : PERSONAL_DETAILS_MAPPING,
	},

	{
		header         : 'Employment Details',
		containerStyle : styles.personal_details_container,
		fields         : EMPLOYEE_DETAILS_MAPPING,
	},

	{
		header         : 'HR Details',
		containerStyle : styles.hr_details_container,
		fields         : HR_DETAILS_MAPPING,
	},
];

function FormComponent({ setActivePage }) {
	const router = useRouter();

	const onClickBackIcon = () => {
		router.back();
	};

	const { control, handleSubmit, formState: { errors } } = useForm();

	const onClickSaveDetails = (values) => {
		setActivePage('success');
	};

	const renderFields = ({ show }) => (Object.keys(controls) || []).map((controlItem) => {
		const { name = '', label = '', type = '' } = controls[controlItem] || {};
		if (!show.includes(name)) {
			return null;
		}
		const DynamicController = CONTROLS_MAPPING[type];

		return (
			<div key={name} className={styles.single_field}>
				<div className={styles.label}>
					{label}
				</div>
				<div className={styles.controller_wrapper}>
					<DynamicController
						{...controls[controlItem]}
						control={control}
						name={name}
					/>
				</div>

				{errors[name]
						&& (
							<div className={styles.error_message}>
								{' '}
								{errors[name]?.message}
							</div>
						)}

			</div>
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.back_arrow} role="presentation" onClick={onClickBackIcon}>
					<IcMArrowBack width={20} height={20} />
				</div>

				<div className={styles.header}>NEW JOINEE&apos;S DETAILS</div>
			</div>

			<div className={styles.form}>
				{SECTION_MAPPING.map((section) => (
					<div className={styles.seperator} key={section}>
						<div className={styles.form_header}>{section.header}</div>
						<div className={section.containerStyle}>
							{renderFields({ show: section.fields })}
						</div>
					</div>
				))}

				<div className={styles.button_container}>
					<div className={styles.cancel}>
						<Button
							themeType="secondary"
							// onClick={onClose}
							// disabled={loading}
						>
							Cancel
						</Button>

					</div>
					<div>
						<Button
							themeType="primary"
							onClick={handleSubmit(onClickSaveDetails)}
							// disabled={loading}
						>
							Save Details
						</Button>

					</div>
				</div>
			</div>

		</div>
	);
}

export default FormComponent;
