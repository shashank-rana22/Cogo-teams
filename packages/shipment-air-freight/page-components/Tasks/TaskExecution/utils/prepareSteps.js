import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { subtractDays } from '@cogoport/utils';

const INDEX_VALUE = 1;
const dataExtractionFunc = ({
	obj = {},
	index,
	arr = [],
	fieldTypeMapping = {},
	fieldName = '',
}) => {
	if (index === ((arr || []).length) - INDEX_VALUE) {
		if (obj === undefined) {
			return undefined;
		}
		if (fieldTypeMapping[fieldName] === 'datepicker') {
			return obj?.[arr?.[index]] ? new Date(obj?.[arr?.[index]]) : undefined;
		}
		return obj?.[arr?.[index]];
	}

	if (obj?.[arr?.[index]] === undefined) {
		return undefined;
	}

	return dataExtractionFunc({
		obj   : obj?.[arr?.[index]],
		index : index + INDEX_VALUE,
		arr,
		fieldTypeMapping,
		fieldName,
	});
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

const splitAndGet = ({
	value_to_insert = '',
	data = {},
	fieldTypeMapping = {},
	fieldName = '',
}) => {
	const splitArr = value_to_insert.split('.').map((element, index) => {
		if (index === GLOBAL_CONSTANTS.zeroth_index) {
			return data;
		}
		return element;
	});
	const finalVal = dataExtractionFunc({
		obj   : splitArr[GLOBAL_CONSTANTS.zeroth_index],
		index : INDEX_VALUE,
		arr   : splitArr,
		fieldTypeMapping,
		fieldName,
	});

	return finalVal;
};

const evaluateVal = ({
	value_to_insert = '',
	data = {},
	fieldTypeMapping = {},
	fieldName = '',
}) => {
	if (
		typeof value_to_insert === 'string'
    && value_to_insert?.includes('data')
	) {
		return splitAndGet({ value_to_insert, data, fieldTypeMapping, fieldName });
	}
	if (Array.isArray(value_to_insert)) {
		const NEW_VALUE_TO_INSERT = [];

		(value_to_insert || []).forEach((valObj) => {
			const NEW_OBJ = {};
			Object.keys(valObj || {}).forEach((key) => {
				NEW_OBJ[key] = typeof valObj[key] === 'string' && valObj[key]?.includes('data')
					? splitAndGet({ value_to_insert: valObj[key], data, fieldTypeMapping, fieldName: key })
					: valObj[key];
			});
			NEW_VALUE_TO_INSERT.push(NEW_OBJ);
		});

		return NEW_VALUE_TO_INSERT;
	}

	return value_to_insert;
};

const getConditionalParams = ({
	condition = {},
	shipment_data = {},
	obj = {},
	fieldTypeMapping = {},
	fieldName = '',
}) => {
	const leftHandSide = evaluateVal({
		value_to_insert : condition?.leftValue,
		data            : shipment_data,
		fieldTypeMapping,
		fieldName,
	});
	const rightHandSide = evaluateVal({
		value_to_insert : condition?.rightValue,
		data            : shipment_data,
		fieldTypeMapping,
		fieldName,
	});

	const value = evaluateVal({
		value_to_insert : obj.value,
		data            : shipment_data,
		fieldTypeMapping,
		fieldName,
	});

	const elseValue = evaluateVal({
		value_to_insert : obj.elseValue,
		data            : shipment_data,
		fieldTypeMapping,
		fieldName,
	});

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

const evaluateObject = ({ control = {}, task = {}, shipment_data = {}, fieldTypeMapping = {}, fieldName = '' }) => {
	const finalControl = control;

	if (control.conditions) {
		(control.conditions || []).forEach((obj) => {
			const { condition, value: value_to_insert } = obj || {};

			if (!condition) {
				finalControl[obj.key_to_add] = evaluateVal({
					value_to_insert,
					shipment_data,
					fieldTypeMapping,
					fieldName,
				});
			} else {
				const {
					leftHandSide, rightHandSide,
					value, elseValue,
				} = getConditionalParams({ condition, shipment_data, obj, fieldTypeMapping, fieldName });
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
			.map((ctrl) => evaluateObject({
				control   : ctrl,
				task,
				shipment_data,
				fieldTypeMapping,
				fieldName : ctrl.name,
			}));
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

const injectDataIntoValues = ({ step = {}, task = {}, shipment_data = {}, fieldTypeMapping = {} }) => {
	const updatedFieldTypeMapping = { ...fieldTypeMapping };
	(step?.controls || []).forEach((ctrl) => {
		if (ctrl.type === 'fieldArray') {
			(ctrl?.controls || []).forEach((item) => {
				updatedFieldTypeMapping[item.name] = item.type;
			});
		} else {
			updatedFieldTypeMapping[ctrl.name] = ctrl.type;
		}
	});
	const newStep = {
		...step,
		controls: (step?.controls || []).map((ctrl) => ({
			...evaluateObject({
				control   : ctrl,
				task,
				shipment_data,
				updatedFieldTypeMapping,
				fieldName : ctrl.name,
			}),
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
		?.map((step) => injectDataIntoValues({
			step,
			task,
			shipment_data    : primary_service,
			fieldTypeMapping : FIELD_TYPE_MAPPING,
		}));
	return dataRichUi;
};

export default prepareSteps;
