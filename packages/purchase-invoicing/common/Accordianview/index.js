import React from 'react';

import Accordion from '../Accordion';

import styles from './styles.module.css';

function AccordianView({
	title,
	open,
	children,
	fullwidth,
	showerror,
}) {
	const getclass = fullwidth ? styles.fullwidth : styles.accordianContainer;
	return (
		<div className={`${getclass}`}>
			<Accordion title={title} open={open} showerror={showerror}>
				{children}
			</Accordion>
		</div>
	);
}

export default AccordianView;
