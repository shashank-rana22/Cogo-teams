/* eslint-disable jsx-a11y/no-static-element-interactions */
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import styles from './styles.module.css';

function Item({ itemType, onClick, onNewItemAdding, content }) {
	// const [{ isDragging }, dragRef] = useDrag({
	// 	type    : itemType,
	// 	item    : content,
	// 	collect : (monitor) => ({
	// 		isDragging: monitor.isDragging(),
	// 	}),
	// });

	// useEffect(() => {
	// 	onNewItemAdding(isDragging);
	// }, [isDragging, onNewItemAdding]);

	// const opacity = isDragging ? 0.4 : 1;

	return (
		<div className={styles.grid_item} data-testid="box" onClick={onClick}>
			<div>{content.icon}</div>
			<div>{startCase(content.type)}</div>
		</div>
	);
}

export default Item;
