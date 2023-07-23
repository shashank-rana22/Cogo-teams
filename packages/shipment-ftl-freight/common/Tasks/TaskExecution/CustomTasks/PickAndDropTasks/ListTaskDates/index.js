import React, {
	useRef,
	createRef,
	forwardRef,
	useImperativeHandle,
} from 'react';

import SingleDeliveryDate from '../SingleDeliveryDate';
import SinglePickupDate from '../SinglePickupDate';

const COMPONENT_MAPPING = {
	mark_completed     : SingleDeliveryDate,
	cargo_picked_up_at : SinglePickupDate,
};

function ListTaskDates(props, ref) {
	const { finalServices = [], task = {} } = props || {};
	const taskDateRefs = useRef([]);
	taskDateRefs.current = finalServices.map(
		(_, index) => taskDateRefs.current[index] || createRef(),
	);

	useImperativeHandle(ref, () => ({
		taskDates: taskDateRefs.current,
	}));

	const Component = COMPONENT_MAPPING[task.task];

	return (
		<div>
			{Component ? (
				<div>
					{finalServices.map((item, index) => (
						<Component
							{...props}
							key={item?.id}
							item={item}
							index={index}
							ref={taskDateRefs.current[index]}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}

export default forwardRef(ListTaskDates);
