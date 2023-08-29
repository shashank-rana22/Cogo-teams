import { DateRangePickerController, InputController } from '@cogoport/forms';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function AccountTransactionFunnel(props) {
	const { t } = useTranslation(['allocation']);

	const { lifecycleStage, control, disabled } = props;

	return (
		<div className={styles.container}>
			<h4>{t('allocation:account_transaction_funnel')}</h4>

			<div className={styles.form_container}>
				<div className={styles.form_element}>
					<p>{t('allocation:select_date_range')}</p>

					<DateRangePickerController
						name="date_range"
						control={control}
						maxDate={new Date()}
						isPreviousDaysAllowed
						disabled={disabled}
					/>
				</div>

				<div className={styles.input_fields}>
					{lifecycleStage === 'transacting' && (
						<div className={styles.form_element}>
							<p>{t('allocation:shipment_count_label')}</p>

							<InputController
								name="shipment_count"
								control={control}
								placeholder={t('allocation:shipment_count_placeholder')}
								disabled={disabled}
							/>
						</div>
					)}

					<div className={styles.form_element}>
						<p>{t('allocation:quotation_count_label')}</p>

						<InputController
							name="quotation_count"
							control={control}
							placeholder={t('allocation:quotation_count_placeholder')}
							disabled={disabled}
						/>
					</div>

					<div className={styles.form_element}>
						<p>{t('allocation:search_count_label')}</p>

						<InputController
							name="search_count"
							control={control}
							placeholder={t('allocation:search_count_placeholder')}
							disabled={disabled}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountTransactionFunnel;
