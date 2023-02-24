import React from 'react';

import { ControlItem, FormProps } from '../../../common/interfaces';
import Form from '../Form';

import styles from './styles.module.css';

interface Props {
	formProps: FormProps;
	controls: ControlItem[];
}

function CreateRole({
	formProps,
	controls = [],
}: Props) {
	return (
		<section className={styles.section} id="rnp_role_list_create_role_container">
			<Form
				controls={controls}
				formProps={formProps}
			/>
		</section>
	);
}

export default CreateRole;
