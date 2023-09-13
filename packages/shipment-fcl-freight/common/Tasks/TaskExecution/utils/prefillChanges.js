import isEqual from '@cogoport/ocean-modules/utils/isEqual';
import { isEmpty } from '@cogoport/utils';

const prefillChanges = ({ config = {}, formValues = {} }) => {
	if (isEmpty(config?.approval_modal)) return null;

	const DIFFERENCES = {};

	(config?.approval_modal || []).forEach((key) => {
		const formValue = formValues[key];

		const control = (config?.controls || []).find((item) => item?.name === key);

		if (!isEmpty(formValue) && !isEmpty(control) && !isEqual(formValue, control?.value)) {
			DIFFERENCES[key] = {
				new   : formValue,
				old   : control?.value,
				label : control?.label,
				type  : control?.type,
			};
		}
	});

	return DIFFERENCES;
};

export default prefillChanges;
