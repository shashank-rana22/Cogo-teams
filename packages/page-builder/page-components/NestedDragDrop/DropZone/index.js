import React from 'react';
import { useDrop } from 'react-dnd';

import { COMPONENT, SIDEBAR_ITEM, ROW, COLUMN } from '../constants';
// import styles from './styles.module.css';

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, ROW, COLUMN];

function DropZone({
	data,
	onDrop,
	// isLast,
	// className,
}) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept : ACCEPTS,
		drop   : (item) => {
			onDrop(data, item);
		},
		canDrop: (item) => {
			const dropZonePath = data.path;
			const splitDropZonePath = dropZonePath.split('-');
			const itemPath = item.path;

			// sidebar items can always be dropped anywhere
			if (!itemPath) {
				// if (data.childrenCount >= 3) {
				//  return false;
				// }
				return true;
			}

			const splitItemPath = itemPath.split('-');

			// limit columns when dragging from one row to another row
			const dropZonePathRowIndex = splitDropZonePath[0];
			const itemPathRowIndex = splitItemPath[0];
			const diffRow = dropZonePathRowIndex !== itemPathRowIndex;
			if (
				diffRow
        && splitDropZonePath.length === 2
        && data.childrenCount >= 3
			) {
				return false;
			}

			// Invalid (Can't drop a parent element (row) into a child (column))
			const parentDropInChild = splitItemPath.length < splitDropZonePath.length;
			if (parentDropInChild) return false;

			// Current item can't possible move to it's own location
			if (itemPath === dropZonePath) return false;

			// Current area
			if (splitItemPath.length === splitDropZonePath.length) {
				const pathToItem = splitItemPath.slice(0, -1).join('-');
				const currentItemIndex = Number(splitItemPath.slice(-1)[0]);

				const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');
				const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0]);

				if (pathToItem === pathToDropZone) {
					const nextDropZoneIndex = currentItemIndex + 1;
					if (nextDropZoneIndex === currentDropZoneIndex) return false;
				}
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
			style={{
				background : isActive ? '#00a2ff' : 'none',
				transition : '100ms all',
				flex       : '0 0 auto',
				height     : '40px',
			}}
			ref={drop}
		/>
	);
}
export default DropZone;
