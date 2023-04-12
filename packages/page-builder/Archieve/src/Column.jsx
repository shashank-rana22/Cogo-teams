import { cl } from '@cogoport/components';
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import Component from './Component';
import { COLUMN } from './constants';
import DropZone from './DropZone';
import styles from './styles.module.css';

const style = {};
function Column({ data, components, handleDrop, path }) {
	const ref = useRef(null);

	const [{ isDragging }, drag] = useDrag({
		type : 'column',
		item : {
			type     : COLUMN,
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

	const renderComponent = (component, currentPath) => (
		<Component
			key={component.id}
			data={component}
			components={components}
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
      ${styles.column} 
    `}

		>
			{data.id}
			{data.children.map((component, index) => {
      	const currentPath = `${path}-${index}`;

      	return (
	<React.Fragment key={component.id}>
		<DropZone
			data={{
              	path          : currentPath,
              	childrenCount : data.children.length,
			}}
			onDrop={handleDrop}
		/>
		{renderComponent(component, currentPath)}
	</React.Fragment>
      	);
			})}
			<DropZone
				data={{
        	path          : `${path}-${data.children.length}`,
        	childrenCount : data.children.length,
				}}
				onDrop={handleDrop}
				isLast
			/>
		</div>
	);
}
export default Column;
