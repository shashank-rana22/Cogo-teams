import { Button, Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function DistributionSettingsItem(props) {
	const {
		item = {}, useGetControls = () => {}, index = 0, inputStyle, control, errors,
		handleClick = () => {}, statsList = [], statsLoading = false,
	} = props;

	const controls = useGetControls(item);

	return (
		<div className={styles.container}>
			<div className={styles.warmth_container}>
				{
								index === 0 && (
									<div className={styles.label}>
										WARMTH
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
						<div className={styles?.[inputStyle] || styles.input}>
							{index === 0 && (
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
					index === 0 ? (
						<>
							<div className={styles.accounts}>
								<div className={styles.accounts_label}>
									NUMBER OF ACCOUNTS
								</div>

								<Button size="sm" onClick={handleClick}>Update</Button>
							</div>
							<div className={styles.account_headers}>
								{ statsLoading ? <Placeholder height={20} width="78%" />
									: (statsList?.[index]?.warmth_count || 0)}
							</div>
						</>
					)
						: (
							<div className={styles.headers}>
								{ statsLoading ? <Placeholder height={20} width="80%" />
									: (statsList?.[index]?.warmth_count || 0)}
							</div>
						)
				}
			</div>
		</div>
	);
}

export default DistributionSettingsItem;
