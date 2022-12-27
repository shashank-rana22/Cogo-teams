import Header from './Header';
import List from './List';

function CardList({ fields, data, loading }) {
	return (
		<div>
			<Header columns={fields} />
			{data.map((item) => (<List fields={fields} item={item} loading={loading} />))}
		</div>
	);
}
export default CardList;
