import CheckConfigurationPublishablity from
	'../components/AllocationConfigurations/Actions/CheckConfigurationPublishability';
import CreateConfiguration from
	'../components/AllocationConfigurations/Actions/CreateConfiguration';
import DeleteConfiguration from
	'../components/AllocationConfigurations/Actions/DeleteConfiguration';
import Instances from
	'../components/AllocationConfigurations/Actions/Instances';
import PublishConfiguration from
	'../components/AllocationConfigurations/Actions/PublishConfiguration';
import UpdatePreferences from
	'../components/AllocationConfigurations/Actions/UpdatePreferences';

const CONFIGURATIONS_WORKFLOW_MAPPING = {
	edit: {
		size   : 'md',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<CreateConfiguration
				viewType="edit"
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	delete: {
		size   : 'sm',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<DeleteConfiguration
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	check: {
		size   : 'sm',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<CheckConfigurationPublishablity
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	publish: {
		size   : 'md',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<PublishConfiguration
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	view: {
		size   : 'lg',
		render : ({ item, listRefetch, setWorkflowName }) => (
			<UpdatePreferences
				item={item}
				listRefetch={listRefetch}
				setShow={setWorkflowName}
			/>
		),
	},
	instances: {
		size   : 'lg',
		render : ({ item }) => <Instances item={item} />,
	},
};

export default CONFIGURATIONS_WORKFLOW_MAPPING;
