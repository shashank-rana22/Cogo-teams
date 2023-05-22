import { ButtonIcon, Modal } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

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

const RenderTitle = ({ editAddon, product_name = '' }) => {
	if (editAddon) return startCase(product_name);
	return 'Change Plan';
};

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
					<div className={`${styles.flex_box} ${styles.title_container}`}>
						<h3 className={styles.title}>
							<RenderTitle editAddon={editAddon} product_name={product_name} />
						</h3>
						<ButtonIcon size="md" icon={<IcMCross />} themeType="primary" onClick={modalChangeHandler} />
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
