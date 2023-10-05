import { Placeholder } from '@cogoport/components';
import React from 'react';

import getValue from '../../../commons/List/ListItem/getValue';
import styles from '../styles.module.css';

function HawbListItem({ fields, item, loading, functions }) {
	return (
		<section className={styles.list_container}>
			<div
				className={styles.row}
			>
				{fields.map((field) => {
					const itemStyle = field.styles || {};
					return (
						<div
							className={`${styles.col} ${field.className || ''}`}
							style={{
								'--span': (field.span || 1),
								...itemStyle,
							}}
						>
							{loading ? <Placeholder /> : (
								<div className={styles.flex}>
									{field.render ? field.render(item) : getValue(
										item,
										field,
										functions,
										'-',
									)}
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
