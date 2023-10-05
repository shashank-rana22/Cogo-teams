import { startCase, isEmpty } from '@cogoport/utils';

const MAX_UPPER_LIMIT = 99999;

const getTableColumns = ({ slabData = [] }) => {
	const columns = slabData?.reduce(
		(acc, slab, index) => {
			const capacityColumn = {
				Header: `${slab.slab_lower_limit}${
					slab.slab_upper_limit === MAX_UPPER_LIMIT ? '+' : `-${slab.slab_upper_limit}`
				} ${slab.slab_unit}s`,
				id: `slab_${index}_capacity`,

				accessor: ({ [`slab_${index}_capacity`]: capacity = '' }) => (
					<div>{capacity !== '' ? capacity : '-'}</div>
				),
			};

			const neqColumn = {
				Header : '',
				id     : `slab_${index}_NEQ`,

				accessor: ({ [`slab_${index}_NEQ`]: NEQ = '' }) => (
					<div>{NEQ !== '' ? NEQ : '-'}</div>
				),
			};

			acc.push(capacityColumn, neqColumn);
			return acc;
		},
		[
			{
				Header : '',
				id     : 'service',

				accessor: ({ service = '' }) => <div>{service || '-'}</div>,
			},
		],
	);

	columns.push({
		Header   : 'RELEASE TRIGGERS',
		id       : 'release_triggers',
		accessor : ({ release_triggers = [] }) => {
			if (isEmpty(release_triggers)) {
				return <div>Mark Shipment As Complete</div>;
			}
			return release_triggers?.map((trigger) => (
				<div key={trigger}>
					{startCase(trigger)}
				</div>
			));
		},
	});

	return columns;
};

export default getTableColumns;
