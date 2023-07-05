const updateFormValueOfCreditNote = ({ formValues }) => {
	const updatedObj = {};
	Object.entries(formValues).forEach(([key, value]) => {
		switch (key) {
			case 'remarks':
			case 'uploadDocument':
				updatedObj[key] = value;
				break;
			default:
				updatedObj[key] = value.map((_item) => ({
					..._item,
					total: _item.price_discounted * _item.quantity,
				}));
				break;
		}
	});
	return updatedObj;
};

export default updateFormValueOfCreditNote;
