import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function DistributionSettingsItem(props) {
	const { t } = useTranslation(['allocation']);

	const {
		item = {}, useGetControls = () => {}, index = 0, inputStyle, control, errors,
		handleClick = () => {}, statsList = [], statsLoading = false,
	} = props;

	const controls = useGetControls(item, t);

	return (
		<div className={styles.container}>
			<div className={styles.warmth_container}>
				{
								index === GLOBAL_CONSTANTS.zeroth_index && (
									<div className={styles.label}>
										{t('allocation:average_warmth')}
									</div>
								)
							}

				<div className={styles.headers}>
					{startCase(item.warmth) || ''}
				</div>
			</div>

			<div className={styles.input_row}>
				{controls.map((element) => {
					const Element = getFieldController(element.type);

					return (
						<div key={element.name} className={styles?.[inputStyle] || styles.input}>
							{index === GLOBAL_CONSTANTS.zeroth_index && (
								<div className={styles.label}>
									{element.label}
								</div>
							)}

							<Element
								{...element}
								key={element.name}
								control={control}
							/>

							<div className={styles.error_message}>
								{errors?.[element.name]?.message}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.accounts_container}>
				{
					index === GLOBAL_CONSTANTS.zeroth_index ? (
						<>
							<div className={styles.accounts}>
								<div className={styles.accounts_label}>
									{t('allocation:number_of_accounts')}
								</div>

								<Button size="sm" onClick={handleClick}>{t('allocation:update_button')}</Button>
							</div>
							<div className={styles.account_headers}>
								{ statsLoading ? <Placeholder height={20} width="78%" />
									: (statsList?.[index]?.warmth_count || GLOBAL_CONSTANTS.zeroth_index)}
							</div>
						</>
					)
						: (
							<div className={styles.headers}>
								{ statsLoading ? <Placeholder height={20} width="80%" />
									: (statsList?.[index]?.warmth_count || GLOBAL_CONSTANTS.zeroth_index)}
							</div>
						)
				}
			</div>
		</div>
	);
}

export default DistributionSettingsItem;
