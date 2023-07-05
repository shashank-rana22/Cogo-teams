import React, { ReactNode } from 'react';

import getValue from '../../../../commons/List/ListItem/getValue';
import styles from '../styles.module.css';

interface FieldType {
	key?: string;
	label?: string | ReactNode;
	span: number;
	className?: string;
	func?: string;
	render?: Function;
}

function POCDetailsItem({ fields, item }) {
	return (
		<section className={styles.list_container}>
			<div
				className={styles.row}
			>
				{fields.map((field:FieldType) => (
					<div
						className={`${styles.col} ${field.className || ''}`}
						style={{
							'--span': (field.span || 1),
						} as React.CSSProperties}
						key={field.key}
					>
						<div className={styles.flex}>
							{getValue(
								item,
								field,
								() => {},
								'-',
							) as ReactNode }
						</div>

					</div>
				))}

			</div>
		</section>
	);
}

export default POCDetailsItem;
