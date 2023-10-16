import React from 'react';

import styles from '../styles.module.css';
function Header({
	fields,
}) {
	return (
		<header className={styles.header}>
			{fields.map((field) => (
				<div
					className={`${styles.col} ${field.className || ''}`}
					style={{ '--span': field.span || 1 }}
				>
					{ field.label }
				</div>
			))}
		</header>
	);
}

export default Header;
