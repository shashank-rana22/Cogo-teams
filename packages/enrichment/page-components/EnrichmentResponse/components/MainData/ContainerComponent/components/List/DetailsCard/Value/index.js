import {
	COUNTRY_CODE_TO_NUMBER_MAPPING,
	MOBILE_CONTROLS,
} from '../../../../../../../configurations/response-keys-mapping';

import Workscopes from './Workscopes';

function Value(props) {
	const { response, labelKey } = props;

	if (labelKey === 'work_scopes' && response?.[labelKey]) {
		return <Workscopes work_scopes={response?.[labelKey]} />;
	}

	if (MOBILE_CONTROLS.includes(labelKey)
    && response?.[labelKey] && response?.[COUNTRY_CODE_TO_NUMBER_MAPPING[labelKey]]) {
		return `${response?.[COUNTRY_CODE_TO_NUMBER_MAPPING[labelKey]]} ${response?.[labelKey]}`;
	}

	return 	response?.[labelKey] || '__';
}
export default Value;
