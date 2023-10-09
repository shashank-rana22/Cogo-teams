import React, { forwardRef } from 'react';

import Form from '../Form';

import styles from './styles.module.css';

function CreateRequest({
	controls = [],
	setLevel = () => {},
	editData = () => {},
}, ref) {
	return (
		<section className={styles.section} id="create_form">
			<Form
				controls={controls}
				setLevel={setLevel}
				ref={ref}
				editData={editData}
			/>
		</section>
	);
}

export default forwardRef(CreateRequest);
