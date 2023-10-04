import { FormProvider } from '@cogoport/forms';
import React from 'react';

import { ControlItem, FormProps } from '../../../common/interfaces';
import Form from '../Form';

import styles from './styles.module.css';

interface Props {
	formProps: FormProps;
	controls: ControlItem[];
}

function CreateRequest({
	formProps,
	controls = [],
}: Props) {
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
