import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { subtractDays } from '@cogoport/utils';

const INDEX_VALUE = 1;
const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
const dataExtractionFunc = (obj, index, arr, fieldTypeMapping) => {
	if (index === (arr?.length || DEFAULT_VALUE_FOR_NULL_HANDLING) - INDEX_VALUE) {
		if (obj === undefined) {
			return undefined;
		}
		let returnValue = obj?.[arr?.[index]];
		if (returnValue && fieldTypeMapping[arr?.[index]] === 'datepicker') {
			returnValue = new Date(obj?.[arr?.[index]]);
		}
		return new Date(obj?.[arr?.[index]]);
	}

	if (obj?.[arr?.[index]] === undefined) {
		return undefined;
	}

	return dataExtractionFunc(obj?.[arr?.[index]], index + INDEX_VALUE, arr, fieldTypeMapping);
};

const evalAdhocConditions = (requiredCondition) => {
	const comingKeyMap = {
		day_before: (comingKey) => subtractDays(new Date(), comingKey),
	};

	let key_to_eval = '';
	Object.keys(requiredCondition || {}).forEach((key) => {
		key_to_eval = key;
	});
	return comingKeyMap[key_to_eval](requiredCondition[key_to_eval]);
};

const splitAndGet = (value_to_insert, data, fieldTypeMapping) => {
	const splitArr = value_to_insert.split('.').map((element, index) => {
		if (index === GLOBAL_CONSTANTS.zeroth_index) {
			return data;
		}
		return element;
	});
	const finalVal = dataExtractionFunc(
		splitArr[GLOBAL_CONSTANTS.zeroth_index],
		INDEX_VALUE,
		splitArr,
		fieldTypeMapping,
	);

	return finalVal;
};

const evaluateVal = (value_to_insert, data, fieldTypeMapping) => {
	if (
		typeof value_to_insert === 'string'
    && value_to_insert?.includes('data')
	) {
		return splitAndGet(value_to_insert, data, fieldTypeMapping);
	}
	if (Array.isArray(value_to_insert)) {
		const NEW_VALUE_TO_INSERT = [];

		(value_to_insert || []).forEach((valObj) => {
			const NEW_OBJ = {};
			Object.keys(valObj || {}).forEach((key) => {
				NEW_OBJ[key] = typeof valObj[key] === 'string' && valObj[key]?.includes('data')
					? splitAndGet(valObj[key], data, fieldTypeMapping)
					: valObj[key];
			});
			NEW_VALUE_TO_INSERT.push(NEW_OBJ);
		});

		return NEW_VALUE_TO_INSERT;
	}

	return value_to_insert;
};

const getConditionalParams = (condition, shipment_data, obj, fieldTypeMapping) => {
	const leftHandSide = evaluateVal(condition?.leftValue, shipment_data, fieldTypeMapping);
	const rightHandSide = evaluateVal(condition?.rightValue, shipment_data, fieldTypeMapping);

	const value = evaluateVal(obj.value, shipment_data, fieldTypeMapping);

	const elseValue = evaluateVal(obj.elseValue, shipment_data, fieldTypeMapping);

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
		return lhs.includes(rhs);
	}
	return true;
};

const evaluateObject = (control, task, shipment_data, fieldTypeMapping) => {
	const finalControl = control;

	if (control.conditions) {
		(control.conditions || []).forEach((obj) => {
			const { condition, value: value_to_insert } = obj || {};

			if (!condition) {
				finalControl[obj.key_to_add] = evaluateVal(
					value_to_insert,
					shipment_data,
					fieldTypeMapping,
				);
			} else {
				const {
					leftHandSide, rightHandSide,
					value, elseValue,
				} = getConditionalParams(condition, shipment_data, obj, fieldTypeMapping);
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
		finalControl.controls = (control.controls || [])
			.map((ctrl) => evaluateObject(ctrl, task, shipment_data, fieldTypeMapping));
	}

	return finalControl;
};

const evaluateCondition = (step, data, task) => {
	let showStep = true;

	if (task.task === 'upload_draft_airway_bill') {
		const bl_category = data?.bl_category?.toLowerCase() || 'hawb';

		if (
			bl_category === 'mawb'
      && step.name === 'draft_house_airway_bill'
      && data?.trade_type === 'export'
		) {
			showStep = false;
		}
	}
	if (task.task === 'upload_airway_bill') {
		const bl_category = data?.bl_category?.toLowerCase() || 'hawb';
		if (bl_category === 'mawb' && step.name === 'house_airway_bill') {
			showStep = false;
		}
	}

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

const injectDataIntoValues = (step, task, shipment_data, fieldTypeMapping) => {
	const updatedFieldTypeMapping = { ...fieldTypeMapping };
	(step?.controls || []).forEach((ctrl) => {
		updatedFieldTypeMapping[ctrl.name] = ctrl.type;
	});
	const newStep = {
		...step,
		controls: (step?.controls || []).map((ctrl) => ({
			...evaluateObject(ctrl, task, shipment_data, updatedFieldTypeMapping),
		})),
	};

	return newStep;
};

const prepareSteps = (steps, task, primary_service = {}) => {
	const FIELD_TYPE_MAPPING = {};
	const filteredSteps = steps
		?.filter((step) => evaluateCondition(step, primary_service, task))
		?.map((step) => conditionalAddition(step, primary_service));

	const dataRichUi = filteredSteps
		?.map((step) => injectDataIntoValues(step, task, primary_service, FIELD_TYPE_MAPPING));
	return dataRichUi;
};

export default prepareSteps;
