import { Button, Toast } from '@cogoport/components';
import {
	InputController, SelectController, MobileNumberController, useForm, DatepickerController,
} from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import React, { useState } from 'react';

import BulkUpload from '../BulkUpload';

import controls from './controls';
import styles from './styles.module.css';

const CONTROLS_MAPPING = {
	text            : InputController,
	mobileNumber    : MobileNumberController,
	SingleDateRange : DatepickerController,
	select          : SelectController,
};

const PERSONAL_DETAILS_MAPPING = ['name', 'personal_email', 'mobile_number'];

const EMPLOYEE_DETAILS_MAPPING = ['employee_code', 'designation', 'date_of_joining',
	'office_location', 'cogoport_email', 'hiring_manager', 'hiring_manager_email'];

const HR_DETAILS_MAPPING = ['hr_name', 'hr_email'];

const SECTION_MAPPING = [
	{
		header         : 'Personal Details',
		containerStyle : styles.personal_details_container,
		fields         : PERSONAL_DETAILS_MAPPING,
	},

	{
		header         : 'Employment Details',
		containerStyle : styles.employement_details_container,
		fields         : EMPLOYEE_DETAILS_MAPPING,
	},

	{
		header         : 'HR Details',
		containerStyle : styles.hr_details_container,
		fields         : HR_DETAILS_MAPPING,
	},
];

function FormComponent({ setActivePage }) {
	const [bulkUploadComponent, setBulkUploadComponent] = useState(false);

	const router = useRouter();

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/create_employee_detail',
	}, { manual: true });

	const onClickBackIcon = () => {
		router.back();
	};

	const { control, handleSubmit, formState: { errors } } = useForm();

	const onClickSaveDetails = async (values) => {
		try {
			const payload = {
				...values,
				mobile_number       : values?.mobile_number?.number,
				mobile_country_code : values?.mobile_number?.country_code,

			};
			const res = await trigger({ data: payload });

			setActivePage(res?.data?.id);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
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

				{errors[name] ? (
					<div className={styles.error_message}>
						{' '}
						{errors[name]?.message}
					</div>
				) : null}
			</div>
		);
	});

	if (bulkUploadComponent) {
		return <BulkUpload setBulkUploadComponent={setBulkUploadComponent} />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				<div className={styles.back_arrow}>
					<IcMArrowBack
						width={20}
						height={20}
						style={{ cursor: 'pointer' }}
						onClick={onClickBackIcon}
					/>

					<div className={styles.header}>NEW HIRE&apos;S DETAILS</div>
				</div>

				<Button
					type="button"
					themeType="secondary"
					style={{ marginRight: 20 }}
					onClick={() => setBulkUploadComponent(true)}
				>
					Bulk Upload
				</Button>
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
					<Button
						themeType="primary"
						onClick={handleSubmit(onClickSaveDetails)}
						loading={loading}
					>
						Save Details
					</Button>
				</div>
			</div>

		</div>
	);
}

export default FormComponent;
