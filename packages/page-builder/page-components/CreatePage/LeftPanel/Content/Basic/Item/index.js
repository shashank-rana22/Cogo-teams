/* eslint-disable jsx-a11y/no-static-element-interactions */
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

import styles from './styles.module.css';

const ItemTypes = {
	BOX: 'box',
};

function Item({ itemType, onClick, onNewItemAdding, content }) {
	const [{ isDragging }, dragRef] = useDrag({
		type    : ItemTypes.BOX,
		item    : content,
		collect : (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		onNewItemAdding(isDragging);
	}, [isDragging, onNewItemAdding]);

	const opacity = isDragging ? 0.4 : 1;

	return (
		<div ref={dragRef} className={styles.grid_item} style={{ opacity }} data-testid="box" onClick={onClick}>
			<div>{content.icon}</div>
			<div>{startCase(content.type)}</div>
		</div>
	);
}

export default Item;
