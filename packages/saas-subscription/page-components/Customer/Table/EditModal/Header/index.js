import { Button, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { getHeaderConfig } from '../../../../../configuration/editModalConfig';
import getValues from '../../../../../utils/getValues';
import itemFunction from '../../ItemFunctions';

import styles from './styles.module.css';

function Header({ info = {}, editModalChangeHandler, closeModalHandler, ...rest }) {
	const { id = '', plan = {}, product_family = {}, saas_subscription_customer_id = '' } = rest || {};

	const { is_free_plan } = plan || {};
	const { organization = {} } = info || {};
	const { id:product_family_id } = product_family || {};

	const { t } = useTranslation(['saasSubscription']);
	const headerConfig = getHeaderConfig({ t });

	const functions = itemFunction({ t });

	return (
		<>
			<div className={styles.flex_box}>
				<h2 className={styles.title}>{t('saasSubscription:config_sub')}</h2>
				<ButtonIcon
					size="md"
					icon={<IcMCross />}
					onClick={closeModalHandler}
				/>
			</div>

			<div className={styles.flex_box}>

				<div>
					{headerConfig.map((config) => (
						<div key={config.key}>
							<span className={styles.header_title}>
								{config.label}
								:
							</span>
							<span className={styles.header_value}>
								{getValues({ itemData: organization, config, itemFunction: functions })}
							</span>
						</div>
					))}
				</div>

				<div className={styles.flex_box}>
					<Button
						type="button"
						onClick={() => editModalChangeHandler(
							'editPlan',
							{ id, saas_product_family_id: product_family_id, saas_subscription_customer_id },
						)}
					>
						{t('saasSubscription:change_plan')}
					</Button>

					<Button
						className={styles.cancel_btn}
						themeType="secondary"
						onClick={() => editModalChangeHandler('editCancelSub', id)}
						type="button"
					>
						{is_free_plan ? t('saasSubscription:reset_plan') : t('saasSubscription:cancel_sub')}
					</Button>
				</div>
			</div>
		</>
	);
}

export default Header;
