import { Loader } from '@cogoport/components';
import { useState } from 'react';

import useGetPromotionRule from '../../../../hooks/useGetPromotionRule';
import useUpdatePromotionRule from '../../../../hooks/useUpdatePromotionRule';
import CustomConfig from '../CustomConfig';
import GlobalConfig from '../GlobalConfig';
import getOrganizationUpdateRuleData from '../GlobalConfig/helpers/getOrganizationUpdateRuleData';
import getShipmentUpdateRuleData from '../GlobalConfig/helpers/getShipmentUpdateRuleData';

import styles from './styles.module.css';

function EditRuleForm({
	activeService = '',
	activeList = '',
	setShowAddRuleForm = () => {},
	viewAndEditRuleId = {},
	setViewAndEditRuleId = () => {},
}) {
	const [showActivateModal, setShowActivateModal] = useState(false);
	const { data = {}, loading = {}, refetchList = () => {} } = useGetPromotionRule({
		defaultParams: {
			promotion_rule_id         : viewAndEditRuleId,
			status                    : activeList,
			agent_rules_data_required : true,
		},
	});
	const { loading: updatePromotionRuleLoading = {}, onUpdateAgentRule = () => {} } = useUpdatePromotionRule({
		refetch: () => {
			setShowAddRuleForm(false);
			setViewAndEditRuleId(null);
			setShowActivateModal(false);
		},
	});

	const apiTrigger = ({ values = {}, status = '' }) => {
		if (values?.scope === 'organization') {
			const dataMap = getOrganizationUpdateRuleData({ values });
			onUpdateAgentRule({
				data: {
					...dataMap,
					primary_service: activeService,
					...(status ? { status } : {}),
				},
			});
		} else {
			const dataMap = getShipmentUpdateRuleData({ values });
			onUpdateAgentRule({
				data: {
					...dataMap,
					primary_service: activeService,
					...(status ? { status } : {}),
				},
			});
		}
	};

	const handleSubmitForm = (values) => {
		if (activeList !== 'active') {
			setShowActivateModal(true);
			return;
		}
		apiTrigger({ values });
	};

	const handleActivateRule = (values) => {
		apiTrigger({ values, status: 'active' });
	};

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
				loading={updatePromotionRuleLoading}
				activeList={activeList}
				activeService={activeService}
				setShowAddRuleForm={setShowAddRuleForm}
				data={data}
				setViewAndEditRuleId={setViewAndEditRuleId}
				handleSubmitForm={handleSubmitForm}
				handleActivateRule={handleActivateRule}
				showActivateModal={showActivateModal}
				setShowActivateModal={setShowActivateModal}
			/>
			<CustomConfig data={data} refetchList={refetchList} />
		</div>
	);
}

export default EditRuleForm;
