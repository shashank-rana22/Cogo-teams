import { Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

function DiscountSlabsTable({ slabsDetailData = {}, loading = '' }) {
	const columns = [
		{
			Header   : 'Discount Limit Unit',
			accessor : (item) => startCase(item?.discount_limit_unit) || '--',
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
			Header   : 'Frequency',
			accessor : (item) => startCase(item?.frequency) || '--',
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

export default DiscountSlabsTable;
