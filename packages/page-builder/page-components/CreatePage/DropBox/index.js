import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';

import RightPanel from '../RightPanel';

import styles from './styles.module.css';

const ItemTypes = {
	BOX: 'box',
};

function DropBox({ components, setComponents }) {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept  : ItemTypes.BOX,
		drop    : () => ({ name: 'Dustbin' }),
		collect : (monitor) => ({
			isOver  : monitor.isOver(),
			canDrop : monitor.canDrop(),
		}),

	}));

	const moveListItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = components[dragIndex];
			const hoverItem = components[hoverIndex];
			// Swap places of dragItem and hoverItem in the pets array
			setComponents((pets) => {
				const updatedPets = [...pets];
				updatedPets[dragIndex] = hoverItem;
				updatedPets[hoverIndex] = dragItem;
				return updatedPets;
			});
		},
		[components],
	);

	const isActive = canDrop && isOver;

	let backgroundColor = '#222';

	if (isActive) {
		backgroundColor = 'darkgreen';
	} else if (canDrop) {
		backgroundColor = 'darkkhaki';
	}
	return (
		<div ref={drop} className={styles.container} style={{ backgroundColor }} data-testid="dustbin">
			{isActive ? 'Release to drop' : 'Drag a box here'}

			{components?.map((widget, index) => (
				<div
					key={widget.i}
				>

					<RightPanel
						widget={widget}
						components={components}
						setComponents={setComponents}
						index={index}
						moveListItem={moveListItem}
						id={widget.id}
					/>
				</div>
			))}
		</div>
	);
}

export default DropBox;
