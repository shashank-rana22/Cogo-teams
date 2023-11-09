import { cl, Button, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import getEditQuotaControl from '../../../../../configuration/editQuotaControl';
import useUpdateQuota from '../../../../../hooks/useUpdateQuota';
import { getFieldController } from '../../../../../utils/getFieldController';
import styles from '../styles.module.css';

function TooltipContent({ pricings = [] }) {
	return (
		<div>
			{pricings.map((ele) => {
				const { id, buy_price, currency } = ele || {};
				return (
					<div key={id}>
						{'1 quota = '}
						{formatAmount({
							amount  : buy_price,
							currency,
							options : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})}
					</div>
				);
			})}
		</div>
	);
}

function Quota({ extraInfo = {}, modalChangeHandler }) {
	const { id = '', product = {} } = extraInfo || {};
	const { pricings = [] } = product || {};

	const { t } = useTranslation(['saasSubscription']);

	const editQuotaControl = getEditQuotaControl({ t });

	const { formHook = {}, submitHandler, loading } = useUpdateQuota({ id, modalChangeHandler });

	const { control, formState:{ errors }, handleSubmit } = formHook || {};

	return (
		<>
			<div className={styles.form_container}>
				{editQuotaControl.map((element) => {
					const { name, label, type } = element;
					const Element = getFieldController(type);
					return (
						<div key={name} className={styles.col}>
							<div className={styles.label_container}>
								<p className={cl`${styles.label} ${styles.row}`}>
									{label}
									{name === 'quantity'
										? (
											<Tooltip content={<TooltipContent pricings={pricings} />}>
												<div className={styles.info}><IcMInfo /></div>
											</Tooltip>
										)
										: null}
								</p>
								{errors?.[name] && (
									<p className={styles.error}>
										{errors?.[name]?.message || errors?.[name]?.type}
									</p>
								)}
							</div>
							<Element control={control} {...element} />
						</div>
					);
				})}
			</div>

			<div className={cl`${styles.flex_box} ${styles.footer}`}>
				<Button
					themeType="secondary"
					type="button"
					onClick={() => modalChangeHandler(false)}
					loading={loading}
				>
					{t('saasSubscription:cancel')}
				</Button>
				<Button
					themeType="accent"
					type="button"
					className={styles.save_btn}
					onClick={handleSubmit(submitHandler)}
					loading={loading}
				>
					{t('saasSubscription:save')}
				</Button>
			</div>
		</>

	);
}
export default Quota;
