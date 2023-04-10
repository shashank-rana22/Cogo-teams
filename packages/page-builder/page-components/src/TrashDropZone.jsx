import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';

import { COMPONENT, ROW, COLUMN } from './constants';
import styles from './styles.module.css';

const ACCEPTS = [ROW, COLUMN, COMPONENT];

function TrashDropZone({ data, onDrop }) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept : ACCEPTS,
		drop   : (item, monitor) => {
			onDrop(data, item);
		},
		canDrop: (item, monitor) => {
			const { layout } = data;
			const itemPath = item.path;
			const splitItemPath = itemPath.split('-');
			const itemPathRowIndex = splitItemPath[0];
			const itemRowChildrenLength = layout[itemPathRowIndex] && layout[itemPathRowIndex].children.length;

			// prevent removing a col when row has only one col
			if (
				item.type === COLUMN
        && itemRowChildrenLength
        && itemRowChildrenLength < 2
			) {
				return false;
			}

			return true;
		},
		collect: (monitor) => ({
			isOver  : monitor.isOver(),
			canDrop : monitor.canDrop(),
		}),
	});

	const isActive = isOver && canDrop;

	return (
		<div
			className={classNames(styles.trashDropZone, { active: isActive })}
			ref={drop}
		>
			TRASH
		</div>
	);
}
export default TrashDropZone;
