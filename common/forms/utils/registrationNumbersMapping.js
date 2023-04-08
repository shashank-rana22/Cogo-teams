const registrationNumbersMapping = {
	pan: {
		key     : 'pan',
		text    : 'PAN',
		pattern : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
		length  : 10,
		type    : 'registration',
	},
	gstin: {
		key     : 'gstin',
		text    : 'GST',
		pattern : /\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
		length  : 15,
		type    : 'tax',
	},
	ecn: {
		key     : 'ecn',
		text    : 'ECN',
		pattern : /^[0-3]{1}[0-9]{9}$|^[0-3]{1}[0-9]{9}-?[0-9]{3}$/,
		type    : 'ecn',
	},
	tax: {
		key     : 'tax',
		text    : 'Tax Number',
		pattern : /^[0-3]{1}[0-9]{9}$|^[0-3]{1}[0-9]{9}-?[0-9]{3}$/,
		type    : 'tax',
	},
};

export default registrationNumbersMapping;
