import React from 'react';

import styles from './styles.module.css';

function CardHeader({ fields }) {
	// const stylesCol = {
	// 	display    : 'flex',
	// 	alignItems : 'center',
	// 	padding    : '0px 2px 0px 18px',
	// };

	// const stylesRow = {
	// 	marginBottom  : 10,
	// 	paddingBottom : 0,
	// 	borderBottom  : 'none',
	// };
	return (
		<div>
			<div className={styles.grid}>
				{fields.map((field) => (
					<div className={styles.column}>
						{/* {field.span}
						{field.span}
						{field.span}
						{field.span} */}

						<div className={styles.cardtitle}>{field.label}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default CardHeader;
