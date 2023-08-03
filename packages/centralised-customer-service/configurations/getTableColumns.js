const MAX_UPPER_LIMIT = 99999;

const getTableColumns = ({ slabData = [] }) => {
	const columns = slabData?.reduce(
		(acc, slab, index) => {
			const capacityColumn = {
				Header: `${slab.slab_lower_limit}${
					slab.slab_upper_limit === MAX_UPPER_LIMIT ? '+' : `-${slab.slab_upper_limit}`
				} ${slab.slab_unit}s`,
				id       : `slab_${index}_capacity`,
				accessor : `slab_${index}_capacity`,
			};

			const neqColumn = {
				Header   : '',
				id       : `slab_${index}_NEQ`,
				accessor : `slab_${index}_NEQ`,
			};

			acc.push(capacityColumn, neqColumn);
			return acc;
		},
		[
			{
				Header   : '',
				id       : 'service',
				accessor : 'service',
			},
		],
	);

	columns.push({
		Header   : 'RELEASE TRIGGER',
		id       : 'trigger',
		accessor : 'trigger',
	});

	return columns;
};

export default getTableColumns;
