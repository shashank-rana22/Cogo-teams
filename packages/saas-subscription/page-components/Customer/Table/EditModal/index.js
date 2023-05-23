import { ButtonIcon, cl, Button, Modal } from '@cogoport/components';
import globals from '@cogoport/globalization/constants/globals.json';
import { IcMCross } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import { DETAILS_MAPPING, HEADER_MAPPING } from '../../../../constant/editModalConstant';
import useGetSubscriptionInfo from '../../../../hooks/useGetSubscriptionInfo';

import FuturePlanDetails from './FuturePlanDetails';
import QuotaDetails from './QuotaDetails';
import styles from './styles.module.css';

const GetDetailValue = ({ name, pricing = {}, product_family = {} }) => {
	if (name === 'plan_details') return startCase(pricing?.name);
	return startCase(product_family?.product_family_name);
};
const { iconUrl } = globals;

function EditModal({ editModal, setEditModal }) {
	const { open = false, info = {} } = editModal;
	const { organization = {} } = info || {};

	const {
		loading = false, subInfo = {}, editModalChangeHandler,
		closeModalHandler,
	} = useGetSubscriptionInfo({ setEditModal, editModal });

	const { active = {}, quotas = [], future = {} } = subInfo || {};
	const { id = '', plan = {}, pricing = {}, product_family = {} } = active || {};

	return (
		<Modal show={open} onClose={closeModalHandler} closeOnOuterClick={closeModalHandler} size="lg">
			<div className={styles.container}>
				{loading && (
					<div className={styles.loader}>
						<div className={styles.overlay} />
						<Image
							width={100}
							height={100}
							className={styles.cogoloader}
							src={iconUrl.loading}
							alt="loading"
						/>
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
							type="submit"
						>
							Change Plan
						</Button>

						<Button
							className={styles.cancel_btn}
							themeType="secondary"
							disabled={plan?.plan_name === 'starter-pack'}
							onClick={() => editModalChangeHandler('editCancelSub', id)}
							type="submit"
						>
							Cancel Subscription
						</Button>
					</div>
				</div>

				<div className={cl`${styles.flex_box} ${styles.details_container}`}>
					{Object.keys(DETAILS_MAPPING).map((detail) => (
						<div key={detail} className={styles.details}>
							<div className={styles.detail_title}>{DETAILS_MAPPING[detail]}</div>

							<div className={styles.detail_content}>
								<GetDetailValue name={detail} pricing={pricing} product_family={product_family} />
							</div>
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
