import React from 'react';

import styles from './styles.module.css';

import { FieldType } from '../Interfaces/index';

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
					key={field.key}
				>
					{ field.label }
				</div>
			))}
		</header>
	);
}

export default Header;
