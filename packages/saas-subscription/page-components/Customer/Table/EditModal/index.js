import { ButtonIcon, cl, Button, Modal } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useGetSubscriptionInfo from '../../../../hooks/useGetSubscriptionInfo';
import iconUrl from '../../../../utils/iconUrl.json';

import FuturePlanDetails from './FuturePlanDetails';
import QuotaDetails from './QuotaDetails';
import styles from './styles.module.css';

const DETAILS_MAPPING = [
	{
		name  : 'plan_details',
		key   : 'name',
		label : 'Plan Details',
	},
	{
		name  : 'account_type',
		key   : 'organization_type',
		label : 'Family',
	},
];
const HEADER_MAPPING = {
	serial_id     : 'Serial Id',
	business_name : 'Business Name',
};

function EditModal({ editModal, setEditModal }) {
	const { open = false, info = {} } = editModal;
	const { organization = {} } = info || {};

	const {
		loading = false, subInfo = {}, editModalChangeHandler,
		closeModalHandler,
	} = useGetSubscriptionInfo({ setEditModal, editModal });

	const { active = {}, quotas = [], future = {} } = subInfo || {};
	const { id = '', plan = {}, pricing = {} } = active || {};

	const getDetailValue = (name) => {
		if (name === 'plan_details') return startCase(pricing?.name);
		return startCase(plan?.organization_type);
	};

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
					<h2 className={styles.title}>Configure Subscription</h2>
					<ButtonIcon size="md" icon={<IcMCross />} themeType="primary" onClick={closeModalHandler} />
				</div>

				<div className={styles.flex_box}>
					<div>
						{Object.keys(HEADER_MAPPING).map((ele) => (
							<div key={ele}>
								<span className={styles.header_title}>
									{HEADER_MAPPING?.[ele]}
									:
								</span>
								<span className={styles.header_value}>{organization?.[ele]}</span>
							</div>
						))}
					</div>
					<div className={styles.flex_box}>
						<Button
							onClick={() => editModalChangeHandler('editPlan', id)}
						>
							Change Plan
						</Button>

						<Button
							className={styles.cancel_btn}
							themeType="secondary"
							disabled={plan?.plan_name === 'starter-pack'}
							onClick={() => editModalChangeHandler('editCancelSub', id)}
						>
							Cancel Subscription
						</Button>
					</div>
				</div>

				<div className={cl`${styles.flex_box} ${styles.details_container}`}>
					{DETAILS_MAPPING.map((detail) => (
						<div key={detail} className={styles.details}>
							<div className={styles.detail_title}>{detail.label}</div>
							<div className={styles.detail_content}>{getDetailValue(detail?.name)}</div>
						</div>
					))}
				</div>

				<div className={cl`${styles.flex_box} ${styles.feature_container}`}>
					<div className={styles.quota_container}>
						<QuotaDetails editModalChangeHandler={editModalChangeHandler} quotas={quotas} />
					</div>
					<div className={styles.validity_container}>
						<FuturePlanDetails future={future} />
					</div>
				</div>
			</div>

		</Modal>
	);
}

export default EditModal;
