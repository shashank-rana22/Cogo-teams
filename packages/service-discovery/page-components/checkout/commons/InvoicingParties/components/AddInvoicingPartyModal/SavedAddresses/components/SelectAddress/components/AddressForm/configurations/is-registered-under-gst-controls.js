import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const getAddressRegisteredUnderGst = ({ organizationCountryId }) => [
	{
		type    : 'checkbox_group',
		name    : 'isAddressRegisteredUnderGst',
		options : [
			{
				value : 'true',
				label : (
					<>
						Not Registered Under
						{' '}
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="registration_number"
							accessor="label"
						/>
						{' '}
						Law
					</>
				),
			},
		],
		span: 12,
	},
];

export default getAddressRegisteredUnderGst;
