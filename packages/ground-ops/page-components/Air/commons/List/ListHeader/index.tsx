import React from 'react';

import { FieldType } from '../Interfaces/index';
import styles from '../styles.module.css';

export interface Props {
	fields: FieldType[];
}

function Header({
	fields,
}:Props) {
	return (
		<header className={styles.header}>
			{fields.map((field) => (
				<div
					className={`${styles.col} ${field.className || ''}`}
					style={{ '--span': field.span || 1 } as React.CSSProperties}
				>
					{ field.label }
				</div>
			))}
		</header>
	);
}

export default Header;
