import Header from './Header';

function CreateAndEditObjective(props) {
	const { activeMode, setActiveMode } = props;

	return (
		<Header activeMode={activeMode} setActiveMode={setActiveMode} />
	);
}

export default CreateAndEditObjective;
