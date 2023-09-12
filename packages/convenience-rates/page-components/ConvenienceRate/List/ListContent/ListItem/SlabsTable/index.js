import { Table } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

function SlabsTable({ slabsDetailData = {}, loading = '' }) {
	const columns = [
		{ Header: 'Fees Slab Unit', accessor: (item) => startCase(item?.slab_unit) || '--' },
		{ Header: 'Slab From', accessor: (item) => item?.slab_lower_limit || '--' },
		{ Header: 'Slab To', accessor: (item) => item?.slab_upper_limit || '--' },
		{
			Header   : 'Fee Type',
			accessor : (item) => (item?.fee_unit ? startCase(item.fee_unit) : '--'),
		},
		{
			Header   : 'Default Fees',
			accessor : (item) => (item?.fee_value ? `${item?.fee_currency} ${item?.fee_value}` : '--'),
		},
		{
			Header   : 'Minimum Fees',
			accessor : (item) => (item?.minimum_fee_value ? `${item?.fee_currency} ${item?.minimum_fee_value}` : '--'),
		},
		{
			Header   : 'Maximum Fees',
			accessor : (item) => (item?.maximum_fee_value ? `${item?.fee_currency} ${item?.maximum_fee_value}` : '--'),
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

export default SlabsTable;
