import React from 'react';

import { renderFunction } from '../../page-components/RenderFunctions/renderServiceFunction';
import { renderServiceMappings } from '../../page-components/RenderFunctions/renderServiceMappings';

import styles from './styles.module.css';

function SingleColumn({
	lineitem,
	fields,
	ismappings,
	renderCheck,
	mappingtable = false,
}) {
	const renderMethod = ismappings ? renderServiceMappings(renderCheck) : renderFunction;
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
