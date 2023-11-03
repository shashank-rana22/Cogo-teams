import Header from './Header';
import List from './List';

function ListQuests({ setMode = () => {} }) {
	return (
		<div>
			<Header setMode={setMode} />

			<List />
		</div>
	);
}

export default ListQuests;
