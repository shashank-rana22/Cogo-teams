import { Placeholder } from '@cogoport/components';
import React, { ReactNode } from 'react';

import { FieldType } from '../../../commons/List/Interfaces/index';
import getValue from '../../../commons/List/ListItem/getValue';
import styles from '../styles.module.css';

function HawbListItem({ fields, item, loading, functions }) {
	return (
		<section className={styles.list_container}>
			<div
				className={styles.row}
			>
				{fields.map((field:FieldType) => {
					const itemStyle = field.styles || {};
					return (
						<div
							className={`${styles.col} ${field.className || ''}`}
							style={{
								'--span': (field.span || 1),
								...itemStyle,
							} as React.CSSProperties}
						>
							{loading ? <Placeholder /> : (
								<div className={styles.flex}>
									{field.render ? field.render(item) : getValue(
										item,
										field,
										functions,
										'-',
									) as ReactNode }
								</div>
							)}
						</div>
					);
				})}

			</div>
		</section>
	);
}

export default HawbListItem;
