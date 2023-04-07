/* eslint-disable no-underscore-dangle */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
import isEqual from 'lodash.isequal';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useDrop } from 'react-dnd';

// import { ITEM_TYPES } from './constants';

import RightPanel from '../RightPanel';

import styles from './styles.module.css';

const ItemTypes = {
	BOX: 'box',
};

function DropBox({
	components,
	setComponents,
	addNewItem,
	isNewItemAdding,
	setSelectedItem,
	selectedItem,
}) {
	// const [components, setComponents] = useState(components);

	const [newAddingItemProps, setNewAddingItemProps] = useState({
	  hoveredIndex   : 0,
	  shouldAddBelow : false,
	});

	const { hoveredIndex, shouldAddBelow } = newAddingItemProps;

	//! Portal :: we are already use this hooks some other purposes
	//! Portal :: We should update the newAddingItemProps & updatedProps states with together to avoid any flicking!
	const handleNewAddingItemPropsChange = useCallback(
	  (updatedProps) => {
			setNewAddingItemProps({
		  ...newAddingItemProps,
		  ...updatedProps,
			});
	  },
	  [setNewAddingItemProps],
	);

	//! Portal :: mimic behavior of portal stage
	useEffect(() => {
	  if (!isEqual(components, components)) {
			setComponents(components);
	  }
	}, [components]);

	//! Portal :: "update" method mutate the array, we might use alternative to this Eg. arrayMove
	const moveItem = useCallback(
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

	const memoItems = useMemo(() => components?.map((item, index) => {
		const { id, type } = item;
		return (
			<div
				key={item.id}
			>
				<RightPanel
					widget={item}
					components={components}
					setComponents={setComponents}
					index={index}
					id={id}
					key={`id_${index}`}
					type={type}
					moveItem={moveItem}
					isNewItemAdding={isNewItemAdding}
					onNewAddingItemProps={handleNewAddingItemPropsChange}
					onClick={() => setSelectedItem({ id, index })}
					isSelected={!!id && id === selectedItem?.id}
				/>
			</div>
		);
	  }), [
	  components,
	  moveItem,
	  selectedItem,
	  isNewItemAdding,
	  handleNewAddingItemPropsChange,
	]);

	//! Portal :: useDrop for stage process
	const [{ canDrop, isOver, draggingItemType }, dropRef] = useDrop({
	  accept : ItemTypes.BOX,
	  drop   : (droppedItem) => {
			const { type, id } = droppedItem;
			if (!id) {
		  // a new item added
		  addNewItem(type, hoveredIndex, shouldAddBelow);
			} else {
		  // the result of sorting is applying the mock data
		  setComponents(components);
			}
	  },
	  collect: (monitor) => ({
			isOver           : monitor.isOver(),
			draggingItemType : monitor.getItemType(),
			canDrop          : monitor.canDrop(),
	  }),
	});

	// const [{ canDrop, isOver }, drop] = useDrop(() => ({
	// 	accept  : ItemTypes.BOX,
	// 	drop    : () => ({ name: 'Dustbin' }),
	// 	collect : (monitor) => ({
	// 		isOver  : monitor.isOver(),
	// 		canDrop : monitor.canDrop(),
	// 	}),

	// }));
	//! Portal :: placeholder item while new item adding
	useEffect(() => {
	  if (isNewItemAdding) {
			const _stageItems = components.filter(({ id }) => !!id);
			if (isOver && isNewItemAdding) {
		  const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;

		  setComponents([
					..._stageItems.slice(0, startIndex),
					{
			  type: draggingItemType,
					},
					..._stageItems.slice(startIndex),
		  ]);
			} else {
		  setComponents(_stageItems);
			}
	  }
	}, [isOver, draggingItemType, isNewItemAdding, shouldAddBelow, hoveredIndex]);

	const isActive = canDrop && isOver;

	let backgroundColor = '#fff';

	if (isActive) {
		backgroundColor = 'darkgreen';
	} else if (canDrop) {
		backgroundColor = 'darkkhaki';
	}

	return (
		<div
			ref={dropRef}
			className={styles.container}
			style={{ backgroundColor }}
			data-testid="dustbin"
		>
			{isActive ? 'Release to drop' : 'Drag a box here'}
			{memoItems}
		</div>
	);
}

export default DropBox;
