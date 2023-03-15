import Zone from './Zone';

function SalesZone({ data = [], currency, filters }) {
	return (
		<div>
			{data?.map((val) => (
				<Zone val={val} currency={currency} filters={filters} />
			))}
		</div>
	);
}

export default SalesZone;
