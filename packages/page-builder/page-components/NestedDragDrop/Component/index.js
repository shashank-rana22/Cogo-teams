import { cl } from '@cogoport/components';
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { COMPONENT } from '../constants';

import styles from './styles.module.css';

const style = {
	border          : '1px dashed black',
	padding         : '0.5rem 1rem',
	backgroundColor : 'white',
	cursor          : 'move',
};
function Component({ data, components, path }) {
	const ref = useRef(null);

	const [{ isDragging }, drag] = useDrag({
		type    : 'component',
		item    : { type: COMPONENT, id: data.id, path },
		collect : (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(ref);

	const component = components[data.id];

	return (
		<div
			ref={ref}
			style={{ ...style, opacity }}
			className={cl`
      ${styles.component} 
      ${styles.draggable} 
      ${styles.column} 
    `}
		>
			<div>{data.id}</div>
			<div>{component.content}</div>
		</div>
	);
}
export default Component;
