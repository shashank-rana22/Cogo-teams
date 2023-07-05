import Header from './Header';

function CreateAndEditObjective(props) {
	const { activeTabDetails, setActiveTabDetails } = props;

	return (
		<Header
			activeTabDetails={activeTabDetails}
			setActiveTabDetails={setActiveTabDetails}
		/>
	);
}

export default CreateAndEditObjective;
