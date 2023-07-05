const UPDATED_OBJ = {};

const updateFormValueOfCreditNote = ({ formValues }) => {
	Object.entries(formValues).forEach(([key, value]) => {
		switch (key) {
			case 'remarks':
			case 'uploadDocument':
				UPDATED_OBJ[key] = value;
				break;
			default:
				UPDATED_OBJ[key] = value.map((_item) => ({
					..._item,
					total: _item.price_discounted * _item.quantity,
				}));
				break;
		}
	});
	return UPDATED_OBJ;
};

export default updateFormValueOfCreditNote;
