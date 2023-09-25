import { Button, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { HEADER_MAPPING } from '../../../../../constant/editModalConstant';

import styles from './styles.module.css';

function Header({ info = {}, editModalChangeHandler, closeModalHandler, ...rest }) {
	const { id = '', plan = {}, product_family = {}, saas_subscription_customer_id = '' } = rest || {};

	const { organization = {} } = info || {};
	const { id:product_family_id } = product_family || {};

	const { t } = useTranslation(['saasSubscription']);

	return (
		<>
			<div className={styles.flex_box}>
				<h2 className={styles.title}>{t('saasSubscription:config_sub')}</h2>
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
						onClick={() => editModalChangeHandler(
							'editPlan',
							{ id, product_family_id, saas_subscription_customer_id },
						)}
						type="button"
					>
						{t('saasSubscription:change_plan')}
					</Button>

					<Button
						className={styles.cancel_btn}
						themeType="secondary"
						disabled={plan?.plan_name === 'starter-pack'}
						onClick={() => editModalChangeHandler('editCancelSub', id)}
						type="button"
					>
						{t('saasSubscription:cancel_sub')}
					</Button>
				</div>
			</div>
		</>
	);
}

export default Header;
