import { Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

function ShipmentSlabsTable({ slabsDetailData = {}, loading = '' }) {
	const columns = [
		{
			Header   : 'Slab Unit',
			accessor : (item) => startCase(item?.slab_unit) || '--',
		},
		{
			Header   : 'Slab Unit Currency',
			accessor : (item) => item?.slab_unit_currency || '--',
		},
		{
			Header   : 'Slab From',
			accessor : (item) => item?.slab_lower_limit || '--',
		},
		{
			Header   : 'Slab To',
			accessor : (item) => item?.slab_upper_limit || '--',
		},
		{
			Header   : 'Discount Limit Unit',
			accessor : (item) => item?.discount_limit_unit || '--',
		},
		{
			Header   : 'Discount Limit Currency',
			accessor : (item) => item?.discount_limit_currency || '--',
		},
		{
			Header   : 'Discount Limit Value',
			accessor : (item) => item?.discount_limit_value || '--',
		},
		{
			Header   : 'Max Allowed Discount Limit Currency',
			accessor : (item) => (item?.discount_limit_unit === 'flat'
				? '--'
				: item?.max_allowed_discount_currency),
		},
		{
			Header   : 'Max Allowed Discount Limit Value',
			accessor : (item) => item?.max_allowed_discount_value || '--',
		},
	];

	return (
		<Table
			columns={columns}
			data={slabsDetailData}
			style={{ marginTop: '12px' }}
			disabled={loading}
		/>
	);
}

export default ShipmentSlabsTable;
