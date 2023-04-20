import { cl } from '@cogoport/components';
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import Column from '../Column';
import { ROW } from '../constants';
import DropZone from '../DropZone';

import styles from './styles.module.css';

const style = {};
function Row({ data, handleDrop, path }) {
	const ref = useRef(null);

	console.log('sdjskjd', data);

	const [{ isDragging }, drag] = useDrag({
		type : 'row',
		item : {
			type     : ROW,
			id       : data.id,
			children : data.children,
			path,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(ref);

	const renderColumn = (column, currentPath) => (
		<Column
			key={column.id}
			data={column}
			// components={components}
			handleDrop={handleDrop}
			path={currentPath}
		/>
	);

	return (
		<div
			ref={ref}
			style={{ ...style, opacity }}
			className={cl`
    ${styles.base} 
    ${styles.draggable} 
    ${styles.row} 
  `}
		>
			{/* {data.id} */}
			<div className={styles.columns}>
				{data.children.map((column, index) => {
        	const currentPath = `${path}-${index}`;

        	return (
	<div style={{ width: '100%' }} key={column.id}>
		<DropZone
			data={{
				path          : currentPath,
				childrenCount : data.children.length,
			}}
			onDrop={handleDrop}
			className={styles.horizontalDrag}
		/>
		{renderColumn(column, currentPath)}
	</div>
        	);
				})}
				<DropZone
					data={{
          	path          : `${path}-${data.children.length}`,
          	childrenCount : data.children.length,
					}}
					onDrop={handleDrop}
					className={styles.horizontalDrag}
					isLast
				/>
			</div>
		</div>
	);
}
export default Row;
