import isEqual from 'lodash.isequal';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useDrop } from 'react-dnd';

import RightPanel from '../RightPanel';

import styles from './styles.module.css';

const ITEM_TYPES = {
	text      : 'text',
	button    : 'button',
	image     : 'image',
	container : 'container',
};

function Stage({
	components,
	setComponents,
	addNewItem,
	isNewItemAdding,
	setSelectedItem,
	selectedItem,
	parentComponentId,
}) {
	const [stageItems, setStageItems] = useState(components);

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
	  if (!isEqual(stageItems, components)) {
			setStageItems(components);
	  }
	}, [components]);

	//! Portal :: "update" method mutate the array, we might use alternative to this Eg. arrayMove
	const moveItem = useCallback(
	  (dragIndex, hoverIndex) => {
			const dragItem = stageItems[dragIndex];
			const hoverItem = stageItems[hoverIndex];
			// Swap places of dragItem and hoverItem in the pets array
			setStageItems((pets) => {
				const updatedPets = [...pets];
				updatedPets[dragIndex] = hoverItem;
				updatedPets[hoverIndex] = dragItem;
				return updatedPets;
			});
	  },
	  [stageItems, setStageItems],
	);

	const memoItems = useMemo(() => stageItems?.map((item, index) => {
		const { id, type } = item;
		return (
			<div
				key={item.id}
			>
				<RightPanel
					widget={item}
					components={stageItems}
					setComponents={setStageItems}
					index={index}
					id={id}
					key={id}
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
	  stageItems,
	  moveItem,
	  selectedItem,
	  isNewItemAdding,
	  handleNewAddingItemPropsChange,
	]);

	//! Portal :: useDrop for stage process
	const [{ canDrop, isOver, draggingItemType }, dropRef] = useDrop({
	  accept : Object.keys(ITEM_TYPES),
	  drop   : (droppedItem) => {
			const { type, id } = droppedItem;
			if (!id) {
		  // a new item added
		  addNewItem(droppedItem, hoveredIndex, shouldAddBelow, parentComponentId, type);
			} else {
		  // the result of sorting is applying the mock data
		  setComponents(stageItems);
			}
			console.log(
		  'droppedItem: ',
		  type,
		  'order: ',
		  hoveredIndex,
		  isNewItemAdding ? 'new item added!' : '',
			);
	  },
	  collect: (monitor) => ({
			isOver           : monitor.isOver(),
			draggingItemType : monitor.getItemType(),
			canDrop          : monitor.canDrop(),
	  }),
	});

	//! Portal :: placeholder item while new item adding
	useEffect(() => {
	  if (isNewItemAdding) {
			const _stageItems = stageItems.filter(({ id }) => !!id);
			if (isOver && isNewItemAdding) {
				const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;
				setStageItems([
					..._stageItems.slice(0, startIndex),
					{
						type: draggingItemType,
					},
					..._stageItems.slice(startIndex),
		  ]);
			} else {
				  setStageItems(_stageItems);
			}
	  }
	}, [isOver, draggingItemType, isNewItemAdding, shouldAddBelow, hoveredIndex]);
	const isActive = canDrop && isOver;

	let backgroundColor = '#fff';

	if (isActive) {
		backgroundColor = 'grey';
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

export default Stage;
