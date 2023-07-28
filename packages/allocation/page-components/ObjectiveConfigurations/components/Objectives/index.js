import CreateAndEditObjective from '../CreateAndEditObjective';

import ListObjectives from './ListObjectives';

const COMPONENT_MAPPING = {
	list   : ListObjectives,
	create : CreateAndEditObjective,
	edit   : CreateAndEditObjective,
};

function Objectives(props) {
	const { activeTabDetails, ...rest } = props;

	const Component = COMPONENT_MAPPING[activeTabDetails.mode];

	if (!Component) return null;

	return <Component key={activeTabDetails.mode} activeTabDetails={activeTabDetails} {...rest} />;
}

export default Objectives;
