import { useEffect, useState } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

import Card from './Card';
import styles from './styles.module.css';

const LAYOUT_PROPS = {
	rowHeight : 60,
	cols      : {
		lg  : 12,
		md  : 12,
		sm  : 12,
		xs  : 12,
		xxs : 12,
	},
	compactType        : 'vertical',
	useCSSTransforms   : true,
	verticalCompact    : true,
	measureBeforeMount : false,
	autoSize           : true,
};

const til = {
	w      : 12,
	h      : 1,
	x      : 0,
	y      : 0,
	static : false,
};

function ListData({
	setEditedValue,
	handleCrossClick,
	setEditeAble,
	setAllocationValue,
	setChangeData,
	changeData,
	setEditedNostro,
	type,
	nostroButton,
	isEditable,
}) {
	const ResponsiveGridLayout = WidthProvider(Responsive);
	const [restEdit, setRestEdit] = useState(false);

	const [layouts, setLayout] = useState({
		lg: [],
	});

	const onChangeValues = (currentLayout, changeCo) => {
		setChangeData((previousChangeData) => {
			const changedLayoutIndex = currentLayout.findIndex((layout) => `${layout.i}` === `${changeCo.i}`);

			const newIndex = currentLayout[changedLayoutIndex].y;
			const previousIndex = previousChangeData.findIndex((item) => `${item.id}` === `${changeCo.i}`);

			const newChangeData = [...previousChangeData];
			newChangeData[newIndex] = {
				...previousChangeData[previousIndex],
			};
			newChangeData[previousIndex] = {
				...previousChangeData[newIndex],
			};

			return newChangeData;
		});
	};

	useEffect(() => {
		setLayout({
			lg: changeData.map((tile) => ({
				...til,
				i    : tile?.id.toString(),
				item : tile,
				id   : tile.id,
			})),
		});
	}, [changeData, restEdit]);

	return (
		<div className={styles.main}>
			<ResponsiveGridLayout
				className="layout"
				layouts={layouts}
				{...LAYOUT_PROPS}
				isBounded
				isDraggable={isEditable}
				onDragStop={onChangeValues}
			>
				{changeData.map((item) => (
					<div
						className={styles.container}
						key={item.id}
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
				))}
			</ResponsiveGridLayout>
		</div>
	);
}

export default ListData;
