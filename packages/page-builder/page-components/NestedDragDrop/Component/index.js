import { cl } from '@cogoport/components';
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { COMPONENT } from '../constants';

import ComponentBuilder from './ComponentBuilder';
import RenderComponents from './RenderComponent';
import styles from './styles.module.css';

const style = {
	border          : '1px dashed black',
	padding         : '0.5rem 1rem',
	backgroundColor : 'white',
	cursor          : 'move',
};
function Component({ data, path }) {
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

	const { component } = data || {};

	const { type } = component	|| {};

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
			{type === 'container'
				? <ComponentBuilder componentType={type} widget={component} />
				: <RenderComponents componentType={type} widget={component} />}
		</div>
	);
}
export default Component;
