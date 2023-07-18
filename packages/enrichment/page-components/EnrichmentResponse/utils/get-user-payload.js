import { isEmpty } from '@cogoport/utils';

const getUserPayload = ({ values = {}, getByKey }) => {
	const work_scopes = getByKey(values, 'work_scopes');

	return {
		response_type                 : 'user',
		email                         : getByKey(values, 'email'),
		name                          : getByKey(values, 'name'),
		work_scopes                   : isEmpty(work_scopes) ? undefined : work_scopes,
		mobile_country_code           : getByKey(values?.mobile_number, 'country_code'),
		mobile_number                 : getByKey(values?.mobile_number, 'number'),
		whatsapp_country_code         : getByKey(values?.whatsapp_number, 'country_code'),
		whatsapp_number               : getByKey(values?.whatsapp_number, 'number'),
		alternate_mobile_country_code : getByKey(
			values?.alternate_mobile_number,
			'country_code',
		),
		alternate_mobile_number: getByKey(
			values?.alternate_mobile_number,
			'number',
		),

	};
};

export default getUserPayload;
