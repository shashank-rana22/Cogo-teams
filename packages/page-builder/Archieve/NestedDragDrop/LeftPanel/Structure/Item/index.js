/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

function Item({ onNewItemAdding, row, handleClick, parentComponent, childrenComponents }) {
	const [{ isDragging, opacity }, dragRef] = useDrag({
		type    : 'container',
		item    : { ...parentComponent, children: childrenComponents },
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
			key={uuid()}
			role="presentation"
			onClick={() => handleClick(row)}
			className={styles.grid_item}
			style={{ opacity }}
			data-testid="box"
		>
			{row.map((width) => (
				<div key={uuid()} className={styles.item} style={{ width }} />
			))}
		</div>
	);
}

export default Item;
