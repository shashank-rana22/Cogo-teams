import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

const getOrganizationData = ({ lead_organization = {}, organization = {} }) => {
	if (isEmpty(lead_organization)) {
		return organization;
	}
	return lead_organization;
};

const getResponseHeaderValues = ({ data }) => {
	const {
		organization = {},
		lead_organization = {},
		created_at = '',
		request_type = '',
		serial_id: request_id,
	} = data;

	const sourceOrganization = getOrganizationData({ lead_organization, organization });

	const { serial_id, business_name } = sourceOrganization || {};

	return {
		request_id: {
			label : 'Request ID',
			value : (
				<Pill size="md" color="#efefef">
					#
					{request_id || '__'}
				</Pill>

			),
		},

		request_type: {
			label : 'Request Type',
			value : <div>{startCase(request_type) || '__'}</div>,
		},

		serial_id: {
			label : 'Serial ID',
			value : (
				<Pill size="md" color="#efefef">
					#
					{serial_id || '__'}
				</Pill>
			),
		},

		business_name: {
			label : 'Business Name',
			value : <div>{startCase(business_name) || '__'}</div>,
		},

		created_on: {
			label : 'Created on',
			value : formatDate({
				date       : created_at,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}),

		},

	};
};

export default getResponseHeaderValues;
