import DefaultForm from './DefaultForm';

function Form({ companyType = 'trade_partner', ...rest }) {
	const mapping = {
		trade_partner : DefaultForm,
		self          : DefaultForm,
	};

	let SelectedForm = null;

	if (Object.keys(mapping).includes(companyType)) {
		SelectedForm = mapping[companyType];
	} else {
		SelectedForm = DefaultForm;
	}

	return <SelectedForm {...rest} companyType={companyType} />;
}

export default Form;
