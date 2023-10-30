import React from 'react';

import styles from './styles.module.css';

function DiscountRect({
	heading,
	statlabel,
	statvalue,
	width = '100%',
	headingwidth = '150px',
	marginTop = '25px',
	padding = '15px',
}) {
	return (
		<div
			className={styles.discountcontainer}
			style={{
				'--width'      : width,
				'--margin-top' : marginTop,
				'--padding'    : padding,
			}}
		>
			<div
				className={styles.label}
				style={{ '--headingwidth': headingwidth }}
			>
				{heading}
			</div>
			<div className={styles.stat}>{statvalue === null ? 'KAM : None' : statvalue}</div>
			<div className={styles.stat}>
				{statlabel === 'Revenue Desk - ' ? 'Revenue Desk : Not Available' : statlabel}
				{' '}
			</div>
		</div>
	);
}

export default DiscountRect;
