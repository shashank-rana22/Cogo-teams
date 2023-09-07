import { startCase } from '@cogoport/utils';

const tagsMapping = [
	{
		key      : 'booking_source',
		getValue : (data) => startCase(data?.booking_source),
	},
	{
		key      : 'rate_source',
		getValue : (data) => startCase(data?.rate_source),
	},
	{
		key      : 'cogo_entity_name',
		getValue : (data) => data?.cogo_entity_name,
	},
	{
		key      : 'organization_type',
		getValue : (data) => startCase(data?.organization_type),
	},
	{
		key      : 'organization_sub_type',
		getValue : (data) => startCase(data?.organization_sub_type),
	},
	{
		key      : 'performed_by',
		getValue : (data) => startCase(data?.performed_by),
	},
];

export default tagsMapping;
