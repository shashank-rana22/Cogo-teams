import ListPagination from '../../../common/ListPagination';
import Card from '../Card';

function ShipmentList({ data = {} }) {
	const { list = [] } = data;

	return (
		<div>
			<div>
				<ListPagination data={data} />
				{list?.length ? list?.map((item) => <Card data={item} />) : null}
			</div>
		</div>
	);
}
export default ShipmentList;
