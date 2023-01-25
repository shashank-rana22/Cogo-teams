import React, { CSSProperties } from 'react';

import styles from './styles.module.css';

interface Props {
	heading?: string | JSX.Element;
	statlabel?: string | JSX.Element;
	statvalue?: string | JSX.Element;
	width?: string | number;
	headingwidth?: string;
	marginTop?: string;
	padding?: string;
}

function DiscountRect({
	heading,
	statlabel,
	statvalue,
	width = '100%',
	headingwidth = '150px',
	marginTop = '25px',
	padding = '15px',
}: Props) {
	return (
		<div
			className={styles.discountcontainer}
			style={
        {
        	'--width'     : width,
        	'--marginTop' : marginTop,
        	'--padding'   : padding,
        } as CSSProperties
      }
		>
			<div
				className={styles.label}
				style={{ '--headingwidth': headingwidth } as CSSProperties}
			>
				{heading}
			</div>
			<div className={styles.stat}>{statvalue}</div>
			<div className={styles.stat}>{statlabel}</div>
		</div>
	);
}

export default DiscountRect;
