import { cl } from '@cogoport/components';
import React from 'react';

import getValue from '../../../../commons/List/ListItem/getValue';
import styles from '../styles.module.css';

const DEFAULT_SPAN = 1;

function POCDetailsItem({ fields = [], item = {}, functions = {} }) {
	return (
		<section className={styles.list_container}>
			<div
				className={styles.row}
			>
				{fields.map((field) => (
					<div
						className={cl`${styles.col} ${field.className || ''}`}
						style={{
							'--span': (field.span || DEFAULT_SPAN),
						}}
						key={field.key}
					>
						<div className={styles.flex}>
							{getValue(
								item,
								field,
								functions,
								'-',
							) }
						</div>

					</div>
				))}

			</div>
		</section>
	);
}

export default POCDetailsItem;
