import { useRef, useState } from 'react';

import Card from './Card';
import styles from './styles.module.css';

function ListData({
	handleClick,
	setEditedValue,
	handleCrossClick,
	setEditeAble,
	setAllocationValue,
	setChangeData,
	changeData,
	setCheckedIdData,
	setEditedNostro,
	type,
	nostroButton,
	isEditable,
}) {
	const dragItem = useRef();
	const dragOverItem = useRef();
	const [list, setList] = useState(changeData);
	const [restEdit, setRestEdit] = useState(false);

	console.log(setChangeData, 'setChangeData');

	const dragStart = (e, position) => {
		dragItem.current = position;
	};

	const dragEnter = (e, position) => {
		dragOverItem.current = position;
	};

	const drop = (e) => {
		const copyListItems = [...list];
		const dragItemContent = copyListItems[dragItem.current];
		copyListItems.splice(dragItem.current, 1);
		copyListItems.splice(dragOverItem.current, 0, dragItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		setList(copyListItems);
	};
	return (
		list.map((item, index) => (
			<div
				className={styles.container}
				onDragStart={(e) => dragStart(e, index)}
				onDragEnter={(e) => dragEnter(e, index)}
				onDragOver={(e) => e.preventDefault()}
				onDragEnd={drop}
				key={item.id}
				draggable
			>
				<Card
					item={item}
					setEditedValue={setEditedValue}
					setEditeAble={setEditeAble}
					handleCrossClick={handleCrossClick}
					setAllocationValue={setAllocationValue}
					type={type}
					setRestEdit={setRestEdit}
					restEdit={restEdit}
					setEditedNostro={setEditedNostro}
					nostroButton={nostroButton}
					isEditable={isEditable}
				/>
			</div>
		))
	);
}

export default ListData;
