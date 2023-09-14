import { ButtonIcon, Modal, cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import CancelSub from './CancelSub';
import Plan from './Plan';
import Quota from './Quota';
import styles from './styles.module.css';

const cancelObj = {
	openEditFeatureModal : false,
	editAddon            : false,
	editPlan             : false,
	editCancelSub        : false,
	featureInfo          : {},
};

function RenderTitle({ editAddon, product_name = '' }) {
	const { t } = useTranslation(['saasSubscription']);
	if (editAddon) {
		return (
			<span>{startCase(product_name)}</span>
		);
	}
	return <span>{t('saasSubscription:edit_feature_title')}</span>;
}

function EditFeatureModal({ editModal, setEditModal }) {
	const {
		openEditFeatureModal = false,
		editAddon = false,
		editPlan = false, editCancelSub = false, featureInfo = {},
	} = editModal;
	const { product = {} } = featureInfo || {};
	const { product_name = '' } = product || {};

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
			{!editCancelSub ? (
				<div>
					<div className={cl`${styles.flex_box} ${styles.title_container}`}>
						<h3 className={styles.title}>
							<RenderTitle editAddon={editAddon} product_name={product_name} />
						</h3>
						<ButtonIcon
							size="md"
							icon={<IcMCross />}
							themeType="primary"
							onClick={() => modalChangeHandler(false)}
						/>
					</div>
					{editAddon && (
						<Quota
							quotaInfo={featureInfo}
							modalChangeHandler={modalChangeHandler}
						/>
					)}
					{editPlan && (
						<Plan
							modalChangeHandler={modalChangeHandler}
							subscriptionId={featureInfo}
						/>
					)}
				</div>
			) : (
				<CancelSub
					modalChangeHandler={modalChangeHandler}
					subscriptionId={featureInfo}
				/>
			)}
		</Modal>
	);
}

export default EditFeatureModal;
