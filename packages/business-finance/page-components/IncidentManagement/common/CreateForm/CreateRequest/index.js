import React, { forwardRef } from 'react';

import Form from '../Form';

import styles from './styles.module.css';

function CreateRequest({
	controls = [],
}, ref) {
	return (
		<section className={styles.section} id="create_form">
			<Form
				controls={controls}
				ref={ref}
			/>
		</section>
	);
}

export default forwardRef(CreateRequest);
