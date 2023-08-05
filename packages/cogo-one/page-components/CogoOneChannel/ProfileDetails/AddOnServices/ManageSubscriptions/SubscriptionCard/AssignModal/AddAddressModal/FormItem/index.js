import React from 'react';

import styles from './styles.module.css';

function FormItem({ label = '', children = {}, ...props }) {
	return (
		<div className={styles.form_item_styled} {...props}>
			{label ? <div>{label}</div> : null}
			{children}
		</div>
	);
}

export default FormItem;
