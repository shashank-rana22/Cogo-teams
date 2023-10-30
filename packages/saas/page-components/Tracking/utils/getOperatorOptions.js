import { startCase } from '@cogoport/utils';

const getOperatorOptions = ({ operatorHash = {} }) => {
	const operatorList = Object.keys(operatorHash).map((operatorId) => ({
		label : operatorHash[operatorId]?.short_name,
		value : operatorId,
		...operatorHash[operatorId],
	}));

	return operatorList;
};

const getOptions = (list = []) => {
	const options = list.map((ele) => ({
		label : startCase(ele?.name),
		value : ele?.saas_shipment_poc_id,
	}));

	return options;
};

export { getOptions, getOperatorOptions };
