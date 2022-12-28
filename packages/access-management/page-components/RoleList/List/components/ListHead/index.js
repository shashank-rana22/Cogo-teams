import React from 'react';

import styles from './styles.module.css';

function ListHead({ columns = [] }) {
	return (
		<section className={styles.container}>
			{columns.map((column) => (
				<div
					className={styles.header}
					key={column.key || column.label}
					style={{ flex: column.flex }}
				>
					<span>{column?.label}</span>
				</div>
			))}
		</section>
	);
}

export default ListHead;
