import { isEmpty } from '@cogoport/utils';

const removeObjEmptyValue = (obj) => {
	const RES_OBJ = {};
	Object.keys(obj).forEach((key) => {
		if (!isEmpty(obj[key])) { RES_OBJ[key] = obj[key]; }
	});

	return RES_OBJ;
};

export default removeObjEmptyValue;
