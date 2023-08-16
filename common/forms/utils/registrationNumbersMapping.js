import GLOBAL_CONSTANTS_CN from '@cogoport/globalization/constants/geo/CN';
import GLOBAL_CONSTANTS_ID from '@cogoport/globalization/constants/geo/ID';
import GLOBAL_CONSTANTS_IN from '@cogoport/globalization/constants/geo/IN';
import GLOBAL_CONSTANTS_SG from '@cogoport/globalization/constants/geo/SG';
import GLOBAL_CONSTANTS_TH from '@cogoport/globalization/constants/geo/TH';
import GLOBAL_CONSTANTS_VN from '@cogoport/globalization/constants/geo/VN';

const registrationNumbersMapping = {
	pan: {
		key     : 'pan',
		text    : 'PAN',
		pattern : GLOBAL_CONSTANTS_IN.regex.TAX,
		length  : 10,
		type    : 'registration',
	},
	gstin: {
		key     : 'gstin',
		text    : 'GST',
		pattern : GLOBAL_CONSTANTS_IN.others.registration_number.pattern,
		length  : 15,
		type    : 'tax',
	},
	ecn: {
		key     : 'ecn',
		text    : 'ECN',
		pattern : GLOBAL_CONSTANTS_VN.regex.ECN,
		length  : 15,
		type    : 'ecn',
	},
	vat: {
		key     : 'vat',
		text    : 'VAT Number',
		pattern : GLOBAL_CONSTANTS_VN.others.registration_number.pattern,
		type    : 'vat',
	},
	uen: {
		key     : 'uen',
		text    : 'UEN Number',
		pattern : GLOBAL_CONSTANTS_SG.others.registration_number.pattern,
		type    : 'uen',
	},
	tin: {
		key     : 'tin',
		text    : 'TIN Number',
		pattern : GLOBAL_CONSTANTS_TH.others.registration_number.pattern,
		type    : 'tin',
	},
	npwp: {
		key     : 'npwp',
		text    : 'NPWP Number',
		pattern : GLOBAL_CONSTANTS_ID.others.registration_number.pattern,
		type    : 'npwp',
	},
	uscc: {
		key     : 'uscc',
		text    : 'USCC Number',
		pattern : GLOBAL_CONSTANTS_CN.others.registration_number.pattern,
		type    : 'uscc',
	},
};

export default registrationNumbersMapping;
