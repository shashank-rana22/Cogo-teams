import { Loader } from '@cogoport/components';
import { InputController, MobileNumberController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';

function CommunicationMode({ dataItems = {}, control = {}, errors = {}, loading = false, setValue = () => {} }) {
	const [show, setShow] = useState(true);
	const { application_exist } = dataItems || {};
	const controlItem = {
		name        : 'personal_email',
		label       : 'Personal_Email',
		showAstrick : true,
		placeholder : 'Enter Status',
		rules       : { required: 'This is required' },

	};
	const controlItem2 = {
		name        : 'mobile_number',
		label       : 'Mobile_Number',
		showAstrick : true,
		placeholder : 'Enter Status',
		rules       : {
			required : true,
			validate : (value) => (value.country_code && value.number
				? undefined
				: ' Mobile Number is Required'),
		},
	};
	useEffect(() => {
		if (!isEmpty(dataItems)) {
			setValue('personal_email', dataItems?.personal_email);
			setValue('mobile_number', {
				country_code : dataItems?.mobile_country_code,
				number       : dataItems?.mobile_number,
			});
		}
	}, [dataItems, setValue]);

	if (loading) {
		return <Loader themeType="secondary" />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Mode Of Communication</span>
				<IcMArrowDown
					width={16}
					height={16}
					className={show ? styles.caret_active : styles.caret_arrow}
				/>
			</div>
			<div className={show ? styles.item_container : styles.item_container_closed}>

				<div className={styles.detail}>
					<div className={styles.label}>
						{startCase(controlItem.label)}
					</div>

					<div className={styles.employee_detail}>
						<InputController
							control={control}
							placeholder={controlItem.placeholder}
							{...controlItem}
							disabled={application_exist}
							rules={{
								pattern: {
									value   : GLOBAL_CONSTANTS.regex_patterns.email,
									message : 'Enter valid email',
								},
							}}
						/>
						{errors[controlItem.name] && (
							<div className={styles.error_msg}>
								*This is Required
							</div>
						)}
					</div>

				</div>
				<div className={styles.detail}>
					<div className={styles.label}>
						{startCase(controlItem2.label)}
					</div>

					<div className={styles.employee_detail}>
						<MobileNumberController
							control={control}
							placeholder={controlItem2.placeholder}
							{...controlItem2}
							disabled={application_exist}
							rules={{
								pattern: {
									value   : GLOBAL_CONSTANTS.regex_patterns.number,
									message : 'Enter valid email',
								},
							}}
						/>
					</div>
					{errors[controlItem2.name] && (
						<div className={styles.error_msg}>
							*This is Required
						</div>
					)}
				</div>
				<div className={styles.alert_text}>
					<span>
						Ensure that you have access to this email at all times
						as this email will be used for all further communication
						post your exit from this organization.

					</span>
				</div>
			</div>
		</div>
	);
}

export default CommunicationMode;
