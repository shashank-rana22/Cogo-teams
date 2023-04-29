import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

import styles from './styles.module.css';

function PremadeItem({ itemType, onClick, onNewItemAdding, content }) {
	const [{ isDragging }, dragRef] = useDrag({
		type    : itemType,
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
		<div
			role="presentation"
			ref={dragRef}
			className={styles.grid_item}
			style={{ opacity }}
			data-testid="box"
			onClick={onClick}
		>
			<div>{content.icon}</div>
			<div>{startCase(content.type)}</div>
		</div>
	);
}

export default PremadeItem;
