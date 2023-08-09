const updateFormValueOfCreditNote = ({ formValues }) => {
	const UPDATED_VALUES = {};
	Object.entries(formValues).forEach(([key, value]) => {
		switch (key) {
			case 'remarks':
			case 'uploadDocument':
				UPDATED_VALUES[key] = value;
				break;
			default:
				UPDATED_VALUES[key] = (value || []).map((_item) => ({
					..._item,
					total: _item.price_discounted * _item.quantity,
				}));
				break;
		}
	});
	return UPDATED_VALUES;
};

export default updateFormValueOfCreditNote;
