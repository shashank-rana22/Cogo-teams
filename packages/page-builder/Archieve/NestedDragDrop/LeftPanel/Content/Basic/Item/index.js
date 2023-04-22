/* eslint-disable jsx-a11y/no-static-element-interactions */
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

import styles from './styles.module.css';

function Item({
	itemType,
	//  onClick,
	 onNewItemAdding,
	  content,
}) {
	const { component } = content || {};
	const { type } = component || {};
	const [{ isDragging, opacity }, dragRef] = useDrag({
		type    : itemType,
		item    : content,
		collect : (monitor) => ({
			isDragging : monitor.isDragging(),
			opacity    : monitor.isDragging() ? 0.4 : 1,
		}),
	});

	useEffect(() => {
		onNewItemAdding(isDragging);
	}, [isDragging, onNewItemAdding]);

	return (
		<div
			ref={dragRef}
			className={styles.grid_item}
			style={{ opacity }}
			data-testid="box"
			// onClick={onClick}
		>
			<div>{content.icon}</div>
			<div>{startCase(type)}</div>
		</div>
	);
}

export default Item;
