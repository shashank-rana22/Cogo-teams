import { isEmpty } from '@cogoport/utils';

const mutatedFields = ({ fields = [], setValue = () => {}, watch }) => {
	const newFields = fields;

	const updatedControls = newFields.map((controlObj) => {
		if (controlObj.name === 'policyCommodityId') {
			return {
				...controlObj,
				onChange: (_, obj) => {
					setValue('cargoDescription', obj?.cargoDescription);
					setValue('packaging', obj?.packaging);
				},
			};
		}

		const disabledCheckForControl = [watch('policyCountryId'), watch('policyCommodityId'), watch('cargoDescription')];

		if (disabledCheckForControl.some((value) => isEmpty(value))) {
			if (controlObj.name === 'policyCurrency' || controlObj.name === 'cargoAmount') {
				return {
					...controlObj,
					disabled: true,
				};
			}
		}

		return controlObj;
	});

	return updatedControls;
};

export default mutatedFields;
