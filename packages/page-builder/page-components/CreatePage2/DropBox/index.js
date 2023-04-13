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
	text        : 'text',
	button      : 'button',
	image       : 'image',
	container   : 'container',
	rootElement : 'rootElement',

};

function Stage({
	component,
	setComponent,
	addNewItem,
	isNewItemAdding,
	setSelectedItem,
	selectedItem,
	parentComponentId,
}) {
	const [stageItems, setStageItems] = useState(component);

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

	console.log('aaaa', stageItems);

	//! Portal :: mimic behavior of portal stage
	useEffect(() => {
		if (!isEqual(stageItems, component)) {
			setStageItems(component);
		}
	}, [component]);

	//! Portal :: "update" method mutate the array, we might use alternative to this Eg. arrayMove
	const moveItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = stageItems.layouts[dragIndex];
			const hoverItem = stageItems.layouts[hoverIndex];
			// Swap places of dragItem and hoverItem in the pets array
			setStageItems((pets) => {
				const updatedPets = pets;
				updatedPets.layouts[dragIndex] = hoverItem;
				updatedPets.layouts[hoverIndex] = dragItem;
				return updatedPets;
			});
		},
		[stageItems, setStageItems],
	);

	const memoItems = useMemo(() => (stageItems.layouts || [])?.map((item, index) => {
		const { id, type } = item;

		return (
			<div
				style={{ position: 'relative' }}
				key={item.id}
			>
				<RightPanel
					widget={item}
					components={stageItems}
					setComponents={setComponent}
					index={index}
					id={id}
					key={id}
					type={type}
					moveItem={moveItem}
					isNewItemAdding={isNewItemAdding}
					onNewAddingItemProps={handleNewAddingItemPropsChange}
					onClick={() => setSelectedItem({ ...item, id, index })}
					isSelected={!!id && id === selectedItem?.id}
					selectedItem={selectedItem}
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
			const { id } = droppedItem;
			if (!id) {
		  // a new item added
		  		addNewItem(droppedItem, hoveredIndex, shouldAddBelow, parentComponentId, null);
			} else {
		  // the result of sorting is applying the mock data
		  		setComponent(stageItems);
			}
	  },
	  collect: (monitor) => ({
			isOver           : monitor.isOver(),
			draggingItemType : monitor.getItemType(),
			canDrop          : monitor.canDrop(),
		}),
	});

	//! Portal :: placeholder item while new item adding
	useEffect(() => {
		const _stageItems = (stageItems.layouts || []).filter(({ id }) => !!id);
		if (isNewItemAdding) {
			if (isOver && isNewItemAdding) {
				const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;
				setStageItems((prev) => ({
					...prev,
					layouts: [
						..._stageItems.slice(0, startIndex),
						{
							type: draggingItemType,
						},
						..._stageItems.slice(startIndex),
					],
				}));
			}
		} else {
			setStageItems((prev) => ({ ...prev, layouts: _stageItems }));
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
			style={{
				...component.style,
				backgroundColor,
			}}
			data-testid="dustbin"
		>
			{isActive ? 'Release to drop' : 'Drag a box here'}
			{memoItems}
		</div>
	);
}

export default Stage;
