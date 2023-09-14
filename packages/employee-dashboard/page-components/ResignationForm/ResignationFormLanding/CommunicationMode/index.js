import { InputController } from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function CommunicationMode({ control = {}, errors = {} }) {
	const [show, setShow] = useState(true);

	const controlItem = {
		name        : 'Personal_Email',
		label       : 'Personal_Email',
		showAstrick : true,
		placeholder : 'Enter Status',
		rules       : { required: 'This is required' },
	};
	const controlItem2 = {
		name        : 'Mobile_Number',
		label       : 'Mobile_Number',
		showAstrick : true,
		placeholder : 'Enter Status',
		rules       : { required: 'This is required' },
	};

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
						<InputController control={control} placeholder={controlItem.placeholder} {...controlItem} />
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
						<InputController
							control={control}
							placeholder={controlItem2.placeholder}
							{...controlItem2}
						/>
						{errors[controlItem2.name] && (
							<div className={styles.error_msg}>
								*This is Required
							</div>
						)}
					</div>
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
