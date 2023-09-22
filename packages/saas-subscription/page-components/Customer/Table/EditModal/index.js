import { cl, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { DETAILS_MAPPING } from '../../../../constant/editModalConstant';
import useGetSubscriptionInfo from '../../../../hooks/useGetSubscriptionInfo';

import Header from './Header';
import styles from './styles.module.css';
import TabSection from './TabSection';

const getDetailValue = ({ name, pricing = {}, product_family = {} }) => {
	if (name === 'plan_details') return startCase(pricing?.name);
	return startCase(product_family?.product_family_name);
};

function EditModal({ editModal, setEditModal }) {
	const { open = false, info = {} } = editModal;

	const { t } = useTranslation(['saasSubscription']);

	const {
		loading = false, subInfo = {}, editModalChangeHandler,
		closeModalHandler,
	} = useGetSubscriptionInfo({ setEditModal, editModal });

	const { active = {} } = subInfo || {};
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
							src={GLOBAL_CONSTANTS.image_url.saas_subscription_loading}
							alt={t('saasSubscription:loading')}
						/>
					</div>
				)}

				<Header
					id={id}
					plan={plan}
					info={info}
					editModalChangeHandler={editModalChangeHandler}
					closeModalHandler={closeModalHandler}
				/>

				<div className={cl`${styles.flex_box} ${styles.details_container}`}>
					{Object.keys(DETAILS_MAPPING).map((detail) => (
						<div key={detail} className={styles.details}>
							<div className={styles.detail_title}>{DETAILS_MAPPING[detail]}</div>

							<div className={styles.detail_content}>
								{getDetailValue({ name: detail, pricing, product_family })}
							</div>
						</div>
					))}
				</div>

				<div className={styles.tab_section}>
					<TabSection
						subInfo={subInfo}
						editModalChangeHandler={editModalChangeHandler}
						setEditModal={setEditModal}
					/>
				</div>
			</div>

		</Modal>
	);
}

export default EditModal;
