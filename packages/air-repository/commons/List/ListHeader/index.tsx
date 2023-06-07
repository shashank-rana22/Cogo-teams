import React from 'react';

import { FieldType } from '../Interfaces';

import styles from './styles.module.css';

export interface Props {
	fields: FieldType[];
}

function Header({ fields }:Props) {
	return (
		<header className={styles.header}>
			<div className={styles.header_row}>
				{fields.map((field) => (
					<div
						className={`${styles.col}`}
						style={{ '--span': field.span || 1 } as React.CSSProperties}
						key={field.key}
					>
						{ field.label }
					</div>
				))}
			</div>
		</header>
	);
}

export default Header;
