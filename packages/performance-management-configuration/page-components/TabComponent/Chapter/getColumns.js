const getColumns = () => (
	[
		{
			Header   : 'NAME',
			accessor : (item) => (
				<div role="presentation">
					<div>{item?.name || 'Name'}</div>
				</div>
			),
		},
		{
			Header   : 'Squad',
			accessor : (item) => (
				<div role="presentation">
					<div>{item?.name || 'Name'}</div>
				</div>
			),
		},
		{
			Header   : 'Tribe',
			accessor : (item) => (
				<div role="presentation">
					<div>{item?.name || 'Name'}</div>
				</div>
			),
		},
		{
			Header   : 'Chapter',
			accessor : (item) => (
				<div role="presentation">
					<div>{item?.name || 'Name'}</div>
				</div>
			),
		},
	]
);

export default getColumns;
