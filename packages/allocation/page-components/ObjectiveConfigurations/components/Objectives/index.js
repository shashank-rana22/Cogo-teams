import CreateAndEditObjective from './CreateAndEditObjective';
import ListObjectives from './ListObjectives';

function Objectives(props) {
	const { activeTabDetails, setActiveTabDetails } = props;

	return activeTabDetails.mode === 'list' ? (
		<ListObjectives
			setActiveTabDetails={setActiveTabDetails}
		/>
	)
		: (
			<CreateAndEditObjective
				activeTabDetails={activeTabDetails}
				setActiveTabDetails={setActiveTabDetails}
			/>
		);
}

export default Objectives;
