import { FormProvider } from '@cogoport/forms';
import React from 'react';

import Form from '../Form';

import styles from './styles.module.css';

function CreateRequest({
	formProps = {},
	controls = [],
}) {
	return (
		<section className={styles.section} id="create_form">
			<FormProvider {...formProps}>
				<Form
					controls={controls}
				/>
			</FormProvider>
		</section>
	);
}

export default CreateRequest;
