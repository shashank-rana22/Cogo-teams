import React from 'react';

import styles from './styles.module.css';

function FormItem({ label, children, ...props }) {
	return (
		<div className={styles.form_item_styled} {...props}>
			{label ? <p className="label">{label}</p> : null}
			{children}
		</div>
	);
}

export default FormItem;
