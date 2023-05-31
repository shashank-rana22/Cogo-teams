import React from 'react';

import Accordion from '../Accordion';

import styles from './styles.module.css';

function AccordianView({
	title,
	open,
	children = null,
	fullwidth,
	showerror,
}) {
	return (
		<div className={`${fullwidth ? styles.fullwidth : styles.accordianContainer}`}>
			<Accordion title={title} open={open} showerror={showerror}>
				{children}
			</Accordion>
		</div>
	);
}

export default AccordianView;
