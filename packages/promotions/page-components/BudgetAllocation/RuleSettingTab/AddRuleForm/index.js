import useCreatePromotionRule from '../../../../hooks/useCreatePromotionRule';
import GlobalConfig from '../GlobalConfig';
import getOrganizationCreateRuleData from '../GlobalConfig/helpers/getOrganizationCreateRuleData';
import getShipmentCreateRuleData from '../GlobalConfig/helpers/getShipmentCreateRuleData';

function AddRuleForm({
	activeService = '',
	setShowAddRuleForm = () => {},
	setViewAndEditRuleId = () => {},
}) {
	const { loading = {}, onSubmit = () => {} } = useCreatePromotionRule({
		refetch: () => {
			setShowAddRuleForm(false);
			setViewAndEditRuleId(null);
		},
	});
	const handleSubmitForm = (values) => {
		if (values?.scope === 'organization') {
			const dataMap = getOrganizationCreateRuleData({ values });
			onSubmit({
				data: {
					...dataMap,
					primary_service: activeService,
				},
			});
		} else {
			const dataMap = getShipmentCreateRuleData({ values });
			onSubmit({
				data: {
					...dataMap,
					primary_service: activeService,
				},
			});
		}
	};

	return (
		<GlobalConfig
			loading={loading}
			activeList="active"
			activeService={activeService}
			setShowAddRuleForm={setShowAddRuleForm}
			data={null}
			setViewAndEditRuleId={setViewAndEditRuleId}
			handleSubmitForm={handleSubmitForm}
		/>
	);
}

export default AddRuleForm;
