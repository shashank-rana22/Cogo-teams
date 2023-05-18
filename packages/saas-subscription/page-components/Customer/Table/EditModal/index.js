import { ButtonIcon, cl, Button, Modal } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetSubscriptionInfo from '../../../../hooks/useGetSubscriptionInfo';
import iconUrl from '../../../../utils/iconUrl.json';

import QuotaDetails from './QuotaDetails';
import styles from './styles.module.css';

const DETAILS = {
	plan_details : 'Plan Details',
	status       : 'Status',
};

const STATUS = {
	active: iconUrl.active,
};

const DATA = {
	plan_details : 'Standard Plan',
	status       : 'active',
};

function EditModal({ editModal, setEditModal }) {
	const { loading = false, subInfo = {}, refetchSubscriptionInfo } = useGetSubscriptionInfo();
	const { open = false, info = {} } = editModal;
	const { active_subscription = {} } = info || {};

	console.log(subInfo, 'subInfo');

	const { active = {}, quotas = [] } = subInfo || {};
	const { id = '', plan = {} } = active || {};

	const getData = (key) => {
		if (key === 'plan_details') return plan?.display_name;
		return (
			<span>
				<img src={STATUS.active} alt="active" className={styles.status_icon} />
				{startCase(DATA?.[key])}
			</span>
		);
	};
	const closeModalHandler = () => {
		setEditModal({ open: false });
	};

	useEffect(() => {
		if (!isEmpty(info)) {
			const customerSubId = active_subscription?.saas_subscription_customer_id || '';
			refetchSubscriptionInfo(customerSubId);
		}
	}, [info]);

	return (
		<Modal show={open} onClose={closeModalHandler} closeOnOuterClick={closeModalHandler} size="lg">
			<div className={styles.container}>
				{loading && (
					<div className={styles.loader}>
						<div className={styles.overlay} />
						<img className={styles.cogoloader} src={iconUrl.loading} alt="loading" />
					</div>
				)}

				<div className={styles.flex_box}>
					<h2 className={styles.title}>Configure Plan</h2>
					<ButtonIcon size="md" icon={<IcMCross />} themeType="primary" onClick={closeModalHandler} />
				</div>
				<div className={styles.flex_box}>
					<div>
						<div>
							Subscription ID:
							{' '}
							{id}
						</div>
					</div>
					<div className={styles.flex_box}>
						<Button
							size="sm"
							onClick={() => setEditModal((prev) => ({
								...prev,
								openEditFeatureModal : true,
								editPlan             : true,
								editAddon            : false,
								featureInfo          : id,
							}))}
						>
							Change Plan
						</Button>

						<Button
							className={styles.cancel_btn}
							size="sm"
							themeType="secondary"
							onClick={() => setEditModal((prev) => ({
								...prev,
								openEditFeatureModal : true,
								editPlan             : false,
								editAddon            : false,
								editCancelSub        : true,
								featureInfo          : id,
							}))}
						>
							Cancel Subscription

						</Button>
					</div>
				</div>
				<div className={cl`${styles.flex_box} ${styles.details_container}`}>
					{Object.keys(DETAILS).map((detail) => (
						<div key={detail} className={styles.details}>
							<div className={styles.detail_title}>{DETAILS?.[detail]}</div>
							<div className={styles.detail_content}>{getData(detail)}</div>
						</div>
					))}
				</div>
				<div className={styles.flex_box}>
					<div className={styles.quota_container}>
						<QuotaDetails setEditModal={setEditModal} quotas={quotas} />
					</div>
					<div className={styles.validity_container} />
				</div>
			</div>

		</Modal>
	);
}

export default EditModal;
