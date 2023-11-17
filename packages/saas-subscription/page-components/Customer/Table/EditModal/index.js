import { cl, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import { getDetailsConfig } from '../../../../configuration/editModalConfig';
import useGetSubscriptionInfo from '../../../../hooks/useGetSubscriptionInfo';
import getValues from '../../../../utils/getValues';
import itemFunction from '../ItemFunctions';

import Header from './Header';
import styles from './styles.module.css';
import TabSection from './TabSection';

function EditModal({ editModal, setEditModal }) {
	const { open = false, info = {} } = editModal;

	const { t } = useTranslation(['saasSubscription']);

	const detailsConfig = getDetailsConfig({ t });
	const functions = itemFunction({ t });

	const {
		subInfo = {},
		loading = false,
		closeModalHandler,
		editModalChangeHandler,
	} = useGetSubscriptionInfo({ setEditModal, editModal });

	const { active = {} } = subInfo || {};

	return (
		<Modal
			show={open}
			onClose={closeModalHandler}
			closeOnOuterClick={closeModalHandler}
			size="lg"
		>
			<div key={info?.id} className={styles.container}>

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
					info={info}
					editModalChangeHandler={editModalChangeHandler}
					closeModalHandler={closeModalHandler}
					{...active}
				/>

				<div className={cl`${styles.flex_box} ${styles.details_container}`}>
					{detailsConfig.map((config) => (
						<div key={config.key} className={styles.details}>

							<div className={styles.detail_title}>
								<span>{config?.label}</span>

								{config.key === 'validity'
									? (
										<span
											className={styles.edit_icon}
											role="presentation"
											onClick={() => {
												editModalChangeHandler({
													activeComp : 'plan_validity',
													extraInfo  : active,
												});
											}}
										>
											<IcMEdit width={12} height={12} />
										</span>
									)
									: null}
							</div>

							<div className={styles.detail_content}>
								{getValues({
									config,
									itemData     : subInfo,
									itemFunction : functions,
								})}
							</div>
						</div>
					))}
				</div>

				<div className={styles.tab_section}>
					<TabSection
						info={info}
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
