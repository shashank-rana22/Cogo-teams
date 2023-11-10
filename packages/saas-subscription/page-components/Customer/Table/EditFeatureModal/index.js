import { ButtonIcon, Modal, cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import CancelSub from './CancelSub';
import Plan from './Plan';
import PlanValidity from './PlanValidity';
import Quota from './Quota';
import styles from './styles.module.css';

const cancelObj = {
	openEditFeatureModal : false,
	activeComp           : '',
	extraInfo            : {},
};

const getComponentMapping = ({ t, product_name }) => ({
	edit_plan: {
		component : Plan,
		title     : t('saasSubscription:edit_feature_title'),
	},
	edit_addon: {
		component : Quota,
		title     : startCase(product_name),
	},
	cancel_subscription: {
		component : CancelSub,
		title     : '',
	},
	plan_validity: {
		component : PlanValidity,
		title     : 'Change Plan Validity',
	},
});

function EditFeatureModal({ editModal = {}, setEditModal }) {
	const { activeComp = '', extraInfo = {}, openEditFeatureModal = false } = editModal;

	const { product = {} } = extraInfo || {};
	const { product_name = '' } = product || {};

	const { t } = useTranslation(['saasSubscription']);

	const COMPONENT_MAPPING = getComponentMapping({ t, product_name });

	const { title = '', component:Component = () => {} } = COMPONENT_MAPPING[activeComp] || {};

	const modalChangeHandler = (value = false) => {
		setEditModal((prev) => ({
			...prev,
			...cancelObj,
			apiCall: value,
		}));
	};

	return (
		<Modal
			show={openEditFeatureModal}
			closeOnOuterClick={modalChangeHandler}
			onClose={modalChangeHandler}
		>
			{title ? (
				<div className={cl`${styles.flex_box} ${styles.title_container}`}>
					<h3 className={styles.title}>
						<span>{title}</span>
					</h3>

					<ButtonIcon
						size="md"
						icon={<IcMCross />}
						themeType="primary"
						onClick={() => modalChangeHandler(false)}
					/>
				</div>
			) : null}

			<Component
				extraInfo={extraInfo}
				modalChangeHandler={modalChangeHandler}
			/>
		</Modal>
	);
}

export default EditFeatureModal;
