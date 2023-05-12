import React from 'react';

import { renderMappingsFunction } from '../../configurations/mappingslineItems';
import { renderFunction } from '../../configurations/serviceconfig';

import styles from './styles.module.css';

function SingleColumn({
	lineitem,
	fields,
	ismappings,
	renderCheck,
	mappingtable = false,
}) {
	const renderMethod = ismappings ? renderMappingsFunction(renderCheck) : renderFunction;
	return (
		<div className={styles.tablecolumn}>
			{fields?.map((field) => (
				<div
					style={{
						flex  : (field.span || 1),
						width : `${((field.span || 1) * (100 / 12))}px`,
					}}
					className={`${styles.value} ${!mappingtable ? styles.paddingtotal : ''}`}
					key={fields?.key || fields?.label}
				>
					{renderMethod[field?.key] ? renderMethod[field?.key](lineitem) : '-'}
				</div>
			))}
		</div>
	);
}

export default SingleColumn;
