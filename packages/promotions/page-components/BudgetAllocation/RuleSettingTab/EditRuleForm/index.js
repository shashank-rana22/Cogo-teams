import { Loader } from '@cogoport/components';

import useGetPromotionRule from '../../../../hooks/useGetPromotionRule';
import CustomConfig from '../CustomConfig';
import GlobalConfig from '../GlobalConfig';

import styles from './styles.module.css';

function EditRuleForm({
	activeService = '',
	activeList = '',
	setShowAddRuleForm = () => {},
	viewAndEditRuleId = {},
	setViewAndEditRuleId = () => {},
}) {
	const { data = {}, loading = {}, refetchList = () => {} } = useGetPromotionRule({
		viewAndEditId : viewAndEditRuleId,
		activeList,
		defaultParams : {
			agent_rules_data_required: true,
		},
	});

	if (loading) {
		return (
			<div className={styles.loader}>
				<Loader themeType="primary" />
			</div>
		);
	}
	return (
		<div>
			<GlobalConfig
				activeList={activeList}
				activeService={activeService}
				setShowAddRuleForm={setShowAddRuleForm}
				data={data}
				setViewAndEditRuleId={setViewAndEditRuleId}
			/>
			<CustomConfig data={data} refetchList={refetchList} />
		</div>
	);
}

export default EditRuleForm;
