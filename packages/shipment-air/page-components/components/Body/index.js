import ListCard from './ListCard';

function Body({ data = {} }) {
	const { list = [] } = data;
	return (
		<div>
			{list.map((item) => {
				const { id = '' } = item;
				return (
					<ListCard key={id} item={item} />
				);
			})}
		</div>
	);
}

export default Body;
