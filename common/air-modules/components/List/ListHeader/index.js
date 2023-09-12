import React from 'react';

import styles from './styles.module.css';

const DEFAULT_SPAN = 1;

function Header({ fields = [] }) {
	return (
		<header className={styles.header}>
			<div className={styles.header_row}>
				{fields.map((field) => (
					<div
						className={styles.col}
						style={{ '--span': field.span || DEFAULT_SPAN }}
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
