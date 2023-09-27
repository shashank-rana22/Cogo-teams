import GlobalConfig from '../GlobalConfig';

function AddRuleForm({
	activeService = '',
	setShowAddRuleForm = () => {},
	setViewAndEditRuleId = () => {},
}) {
	return (
		<GlobalConfig
			activeList="active"
			activeService={activeService}
			setShowAddRuleForm={setShowAddRuleForm}
			data={null}
			setViewAndEditRuleId={setViewAndEditRuleId}
		/>
	);
}

export default AddRuleForm;
