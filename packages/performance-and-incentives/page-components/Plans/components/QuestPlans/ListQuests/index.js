import Header from './Header';

function ListQuests({ setMode = () => {} }) {
	return (
		<div>
			<Header setMode={setMode} />
		</div>
	);
}

export default ListQuests;
