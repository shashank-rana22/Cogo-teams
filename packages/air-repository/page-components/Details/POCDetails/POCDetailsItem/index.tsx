import { cl } from '@cogoport/components';
import React, { ReactNode } from 'react';

import { NestedObj, FieldType, FunctionObjects } from '../../../../commons/List/Interfaces';
import getValue from '../../../../commons/List/ListItem/getValue';
import styles from '../styles.module.css';

export interface Props {
	fields: FieldType[];
	item?: NestedObj;
	functions?: FunctionObjects;
}

function POCDetailsItem({ fields = [], item = {}, functions = {} }:Props) {
	return (
		<section className={styles.list_container}>
			<div
				className={styles.row}
			>
				{fields.map((field:FieldType) => (
					<div
						className={cl`${styles.col} ${field.className || ''}`}
						style={{
							'--span': (field.span || 1),
						} as React.CSSProperties}
						key={field.key}
					>
						<div className={styles.flex}>
							{getValue(
								item,
								field,
								functions,
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
