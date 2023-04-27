// import { subtractDays } from '@cogoport/front/date';

const dataExtractionFunc = (obj, index, arr) => {
	if (index === arr.length - 1) {
		if (obj === undefined) {
			return undefined;
		}
		return obj?.[arr?.[index]];
	}

	if (obj?.[arr?.[index]] === undefined) {
		return undefined;
	}

	return dataExtractionFunc(obj?.[arr?.[index]], index + 1, arr);
};

const evalAdhocConditions = (requiredCondition) => {
	const comingKeyMap = {
		// day_before: (comingKey) => subtractDays(new Date(), comingKey),
		day_before: () => new Date(),
	};

	let key_to_eval = '';
	Object.keys(requiredCondition || {}).forEach((key) => {
		key_to_eval = key;
	});
	return comingKeyMap[key_to_eval](requiredCondition[key_to_eval]);
};

const splitAndGet = (value_to_insert, data) => {
	const splitArr = value_to_insert.split('.').map((element, index) => {
		if (index === 0) {
			return data;
		}
		return element;
	});
	const finalVal = dataExtractionFunc(splitArr[0], 1, splitArr);

	return finalVal;
};

const evaluateVal = (value_to_insert, data) => {
	if (
		typeof value_to_insert === 'string'
		&& value_to_insert?.includes('data')
	) {
		return splitAndGet(value_to_insert, data);
	}
	if (Array.isArray(value_to_insert)) {
		const new_value_to_insert = [];

		(value_to_insert || []).forEach((valObj) => {
			const newObj = {};
			Object.keys(valObj || {}).forEach((key) => {
				newObj[key] =					typeof valObj[key] === 'string' && valObj[key]?.includes('data')
					? splitAndGet(valObj[key], data)
					: valObj[key];
			});
			new_value_to_insert.push(newObj);
		});

		return new_value_to_insert;
	}

	return value_to_insert;
};

const getConditionalParams = (condition, shipment_data, obj) => {
	const leftHandSide = evaluateVal(condition?.leftValue, shipment_data);
	const rightHandSide = evaluateVal(condition?.rightValue, shipment_data);

	const value = evaluateVal(obj.value, shipment_data);

	const elseValue = evaluateVal(obj.elseValue, shipment_data);

	return {
		leftHandSide,
		rightHandSide,
		value,
		elseValue,
	};
};

const evaluateExpression = (operator, lhs, rhs) => {
	if (operator === '!==') {
		return lhs !== rhs;
	}
	if (operator === '===') {
		return lhs === rhs;
	}
	if (operator === '>') {
		return lhs > rhs;
	}
	if (operator === 'in') {
		return lhs in rhs;
	}
	if (operator === 'includes') {
		return (lhs || '').includes(rhs);
	}
	return true;
};

const evaluateObject = (control, task, shipment_data) => {
	const finalControl = control;

	if (control.conditions) {
		(control.conditions || []).forEach((obj) => {
			const { condition, value: value_to_insert } = obj || {};

			if (!condition) {
				finalControl[obj.key_to_add] = evaluateVal(
					value_to_insert,
					shipment_data,
				);
			} else {
				const {
					leftHandSide, rightHandSide, value, elseValue,
				} = getConditionalParams(condition, shipment_data, obj);

				const addConditionsValue = evaluateExpression(
					condition?.operator,
					leftHandSide,
					rightHandSide,
				);

				if (addConditionsValue) {
					finalControl[obj.key_to_add] = value;
				} else if (elseValue !== 'undefined') {
					finalControl[obj.key_to_add] = elseValue;
				}
				if (condition?.operator === 'date') {
					if (obj.adhoc_conditions) {
						finalControl[obj.key_to_add] = evalAdhocConditions(
							obj.adhoc_conditions,
						);
					} else {
						finalControl[obj.key_to_add] = new Date();
					}
				}
			}
		});
	}
	if (control?.type === 'fieldArray') {
		finalControl.controls = (control.controls || []).map((ctrl) => evaluateObject(ctrl, task, shipment_data));
	}

	return finalControl;
};

/**
 * Evaluates Each step and checks weather to add this step into ui or not
 */
const evaluateCondition = () => {
	const showStep = true;

	return showStep;
};

const conditionalAddition = (step, shipment_data) => {
	const keyFuncMapping = (requiredVal) => ({
		data_from_api: (requiredVal || []).map((val) => {
			if (val.key_from_api === 'custom:service_ids') {
				return {
					key_from_api: [
						shipment_data?.id,
						...Object.keys(shipment_data?.similar_type_services || {}),
					],
					key_to_send: 'ids',
				};
			}
			return val;
		}),
	});

	let setObj = null;
	Object.keys(step || {}).forEach((key) => {
		if (key === 'data_from_api') {
			setObj = { data_from_api: keyFuncMapping(step[key]).data_from_api };
		}
	});

	if (!setObj) {
		return step;
	}

	const modifiedStep = {
		...step,
		...setObj,
	};

	return modifiedStep;
};

/**
 * Injects default data into controls
 * @param {*} step
 * @param {*} task
 * @param {*} shipment_data
 * @returns
 */

const injectDataIntoValues = (step, task, shipment_data) => {
	const newStep = {
		...step,
		controls: (step.controls || []).map((ctrl) => ({
			...evaluateObject(ctrl, task, shipment_data),
		})),
	};

	return newStep;
};

/**
 * Prepare final steps to be deployed in Ui
 * @param {*} steps
 * @param {*} task
 * @param {*} shipment_data
 * @returns steps
 */

const prepareSteps = (steps, task, primary_service = {}) => {
	const filteredSteps = steps
		?.filter((step) => evaluateCondition(step, primary_service, task))
		?.map((step) => conditionalAddition(step, primary_service));

	const dataRichUi = filteredSteps?.map((step) => injectDataIntoValues(step, task, primary_service));

	return dataRichUi;
};

export default prepareSteps;
