import { Button } from '@cogoport/components';
import {
	CheckboxController,
	useForm,
} from '@cogoport/forms';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ServiceList() {
	const [show, setShow] = useState(false);
	const { control, formState:{ errors = {} } } = useForm();

	const SERVICE_CHECKBOX_LIST = ['Cloud Services', 'Atlassian', 'Figma', 'Github'];

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

				{SERVICE_CHECKBOX_LIST.map((val) => (
					<CheckboxController
						key={val}
						name={val}
						label={val}
						control={control}
						errors={errors}
					/>
				))}
			</div>
		</div>
	);
}

export default ServiceList;
