import { Button } from '@cogoport/components';
import {
	CheckboxGroupController,
} from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ServiceList({ control, errors }) {
	const [show, setShow] = useState(false);

	const SERVICE_CHECKBOX_LIST = [
		{ label: 'Atlassian', value: 'atlassian' },
		{ label: 'GitHub', value: 'github' },
		{ label: 'CloudServices', value: 'cloudservices' },
		{ label: 'asdfgh', value: 'werty' },
	];

	return (
		<div className={styles.container}>

			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>
					Service List
				</span>
				<div className={styles.button_add_service_container}>
					<Button className={styles.add_service_button} size="md" themeType="secondary">+ Add Service</Button>
					<IcMArrowDown
						width={16}
						height={16}
						className={show ? styles.caret_active : styles.caret_arrow}
					/>
				</div>
			</div>
			<div className={show ? styles.item_container : styles.item_container_closed}>

				<CheckboxGroupController
					control={control}
					errors={errors}
					options={SERVICE_CHECKBOX_LIST}
					className={styles.check_box_controller}
					name="service_list"
				/>
			</div>
		</div>
	);
}

export default ServiceList;
