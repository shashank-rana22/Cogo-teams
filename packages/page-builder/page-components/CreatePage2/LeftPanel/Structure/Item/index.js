/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

function Item({ onNewItemAdding, row, handleClick }) {
	const [{ isDragging }, dragRef] = useDrag({
		type    : 'container',
		item    : { type: 'container' },
		collect : (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	useEffect(() => {
		onNewItemAdding(isDragging);
	}, [isDragging, onNewItemAdding]);

	const opacity = isDragging ? 0.4 : 1;

	return (
		<div ref={dragRef} key={uuid()} role="presentation" onClick={() => handleClick(row)} className={styles.grid_item} style={{ opacity }} data-testid="box">
			{row.map((width) => (
				<div key={uuid()} className={styles.item} style={{ width }} />
			))}
		</div>
	);
}

export default Item;
