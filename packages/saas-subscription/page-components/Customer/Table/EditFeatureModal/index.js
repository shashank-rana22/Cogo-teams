import { ButtonIcon, Modal } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import CancelSub from './CancelSub';
import Plan from './Plan';
import Quota from './Quota';
import styles from './styles.module.css';

function EditFeatureModal({ editModal, setEditModal }) {
	const {
		openEditFeatureModal = false,
		editAddon = false,
		editPlan = false, editCancelSub = false, featureInfo = {},
	} = editModal;
	const { product = {} } = featureInfo || {};

	const cancelHandler = () => {
		setEditModal((prev) => ({
			...prev,
			editAddon            : false,
			openEditFeatureModal : false,
			editPlan             : false,
			editCancelSub        : false,
			featureInfo          : '',
		}));
	};

	const renderTitle = () => {
		if (editAddon) return startCase(product?.product_name);
		return 'Change Plan';
	};
	return (
		<Modal
			show={openEditFeatureModal}
			closeOnOuterClick={cancelHandler}
			onClose={cancelHandler}
		>
			{!editCancelSub ? (
				<div>
					<div className={`${styles.flex_box} ${styles.title_container}`}>
						<h3 className={styles.title}>{renderTitle()}</h3>
						<ButtonIcon size="md" icon={<IcMCross />} themeType="primary" onClick={cancelHandler} />
					</div>
					{editAddon && <Quota quotaInfo={featureInfo} cancelHandler={cancelHandler} />}
					{editPlan && <Plan cancelHandler={cancelHandler} subscriptionId={featureInfo} />}
				</div>
			) : <CancelSub cancelHandler={cancelHandler} subscriptionId={featureInfo} />}
		</Modal>
	);
}

export default EditFeatureModal;
