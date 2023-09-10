function SlabContent({ item = {} }) {
	return (
		<div style={{ display: 'flex' }}>
			{item?.slabs?.map((slab) => (
				<div key={item?.id}>
					<div style={{ fontSize: '12px', marginRight: '5px' }}>
						{slab?.lower_limit}
						{' '}
						-
						{slab?.upper_limit}
						{' '}
						Days
					</div>
					<div
						style={{
							color      : '#5936F0',
							fontSize   : '12px',
							fontWeight : '500',
						}}
					>
						{slab?.currency}
						{' '}
						{slab?.price}
					</div>
				</div>
			))}
		</div>
	);
}
export default SlabContent;
