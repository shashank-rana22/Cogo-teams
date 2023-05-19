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
	featureInfo          : '',
};

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
			...cancelObj,
			apiCall: false,
		}));
	};
	const successHandler = () => {
		setEditModal((prev) => ({
			...prev,
			...cancelObj,
			apiCall: true,
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
					{editAddon && (
						<Quota
							quotaInfo={featureInfo}
							cancelHandler={cancelHandler}
							successHandler={successHandler}
						/>
					)}
					{editPlan && (
						<Plan
							cancelHandler={cancelHandler}
							subscriptionId={featureInfo}
							successHandler={successHandler}
						/>
					)}
				</div>
			) : (
				<CancelSub
					cancelHandler={cancelHandler}
					subscriptionId={featureInfo}
					successHandler={successHandler}
				/>
			)}
		</Modal>
	);
}

export default EditFeatureModal;
