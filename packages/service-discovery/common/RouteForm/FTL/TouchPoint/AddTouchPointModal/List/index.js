import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete, IcMDrag } from '@cogoport/icons-react';
import { useRef } from 'react';

import styles from './styles.module.css';

const INCREMENT_VALUE_BY_ONE = 1;

function List({
	onDeleteTouchPoint = () => {},
	touchPoints = [],
	setTouchPoints = () => {},
}) {
	const dragItem = useRef();
	const dragOverItem = useRef();

	const handleSort = () => {
		const newTouchPoints = [...touchPoints];

		const draggedItemContent = newTouchPoints.splice(dragItem.current, INCREMENT_VALUE_BY_ONE)
			?.[GLOBAL_CONSTANTS.zeroth_index];

		newTouchPoints.splice(dragOverItem.current, GLOBAL_CONSTANTS.zeroth_index, draggedItemContent);

		dragItem.current = null;
		dragOverItem.current = null;

		setTouchPoints(newTouchPoints);
	};

	return (
		<div className={styles.container}>
			{(touchPoints || []).map((touchPoint, index) => (
				<div
					className={styles.list_item_wrapper}
					key={touchPoint.id}
					draggable="true"
					onDragStart={() => {
						dragItem.current = index;
					}}
					onDragEnter={() => {
						dragOverItem.current = index;
					}}
					onDragEnd={handleSort}
					onDragOver={(e) => e.preventDefault()}
				>
					<div className={styles.count}>
						{' '}
						Touch Point
						{' '}
						{index + INCREMENT_VALUE_BY_ONE}
					</div>

					<div className={styles.list_item}>
						<IcMDrag height={20} width={20} />

						<span>{touchPoint?.display_name}</span>

						<IcMDelete
							className={styles.delete_icon}
							onClick={() => onDeleteTouchPoint(index)}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default List;
