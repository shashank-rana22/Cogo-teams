import React from 'react';

import { renderFunction } from '../../configurations/serviceconfig';

import styles from './styles.module.css';

function SingleColumn({ lineitem, fields }) {
	return (
		<div className={styles.tablecolumn}>
			{fields.map((field) => (
				<div
					style={{
						flex  : (field.span || 1),
						width : `${((field.span || 1) * (100 / 12))}px`,
					}}
					className={styles.value}
				>
					{renderFunction[field?.key] ? renderFunction[field?.key](lineitem) : '-'}
				</div>
			))}
		</div>
	);
}

export default SingleColumn;
