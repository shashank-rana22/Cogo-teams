import { startCase } from '@cogoport/utils';

const tagsMapping = [
	{
		key      : 'cogo_entity_name',
		getValue : (data) => startCase(data?.cogo_entity_name),
	},
	{
		key      : 'scope',
		getValue : (data) => startCase(data?.scope),
	},
	{
		key      : 'trade_type',
		getValue : (data) => startCase(data?.trade_type),
	},
	{
		key      : 'rate_source',
		getValue : (data) => startCase(data?.rate_source),
	},
	{
		key      : 'organization_name',
		getValue : (data) => startCase(data?.organization_name),
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
