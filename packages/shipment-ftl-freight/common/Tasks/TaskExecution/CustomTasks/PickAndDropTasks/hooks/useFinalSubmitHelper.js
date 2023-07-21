import { isEmpty } from '@cogoport/utils';

import deliveryControls from '../configs/deliveryControls';
import pickupControls from '../configs/pickupControls';

const CONTROLS_MAPPING = {
	mark_completed     : deliveryControls(),
	cargo_picked_up_at : pickupControls(),
};

const useFinalSubmitHelper = ({
	taskRefData = {},
	bulkUpdate = () => {},
	updatePendingTask = () => {},
	task = {},
}) => {
	const finalControls = CONTROLS_MAPPING[task.task] || [];

	const finalCalculations = (finalObject, errorExist) => {
		if (!isEmpty(errorExist)) {
			return;
		}
		const FINAL_PAYLOAD = {
			service: 'ftl_freight',
		};

		const { bulkVal, taskVal } = Object.values(
			finalObject?.taskDateValues,
		).reduce(
			(acc, item) => {
				const DATA = {};
				const DOC_DATA = {};
				finalControls.forEach((control) => {
					if (control.type !== 'file') {
						DATA[control.name] = item[control.name] || undefined;
					}
					DOC_DATA[control.name] = item[control.name] || undefined;
				});
				acc.bulkVal.push({ service_id: item?.service_id, data: DATA });
				acc.taskVal.push({ service_id: item?.service_id, data: DOC_DATA });
				return acc;
			},
			{ bulkVal: [], taskVal: [] },
		);

		FINAL_PAYLOAD.service_data = bulkVal;

		bulkUpdate({
			finalData : FINAL_PAYLOAD,
			callback  : () => {
				FINAL_PAYLOAD.service_data = taskVal;
				updatePendingTask(FINAL_PAYLOAD);
			},
		});
	};

	const finalSubmit = () => {
		const FINAL_OBJECT = {};
		const TASK_DATE_VALUES = {};
		const ERROR_EXIST = {};
		if (taskRefData.current.taskDates) {
			taskRefData.current.taskDates.forEach((item, index) => {
				item.current.handleSubmit(
					(val) => {
						TASK_DATE_VALUES[index] = {
							...val,
							service_id: item?.current?.singleService?.id,
						};
					},
					(error) => {
						ERROR_EXIST[index] = error;
					},
				)();
			});
		}
		FINAL_OBJECT.taskDateValues = TASK_DATE_VALUES;

		setTimeout(() => finalCalculations(FINAL_OBJECT, ERROR_EXIST));
	};

	return { finalSubmit };
};

export default useFinalSubmitHelper;
