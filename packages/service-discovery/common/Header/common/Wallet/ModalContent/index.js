import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMCross } from '@cogoport/icons-react';

import getControls from './controls';
import Form from './Form';
import styles from './styles.module.css';

const DEFAULT_PROMOTION_VALUE = 0;

function ModalContent({
	data = {},
	organization_id = '',
	service = '',
	onClose = () => {},
	formProps = {},
}) {
	const { control, formState:{ errors }, watch, handleSubmit, setValue } = formProps;

	const controls = getControls({ service, organization_id });

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<div className={styles.amount_item}>
					<span className={styles.amount_label}>Balance</span>

					<span className={styles.amount_value}>
						{formatAmount({
							amount   : data?.alloted_amount_left,
							currency : data?.alloted_budget_currency,
							options  : {
								style                 : 'currency',
								notation              : 'compact',
								compactDisplay        : 'short',
								minimumFractionDigits : 2,
							},
						})}
					</span>
				</div>

				<div className={styles.amount_item}>
					<span className={styles.amount_label}>Created</span>

					<div className={styles.amount_inner_wrapper}>
						<span className={styles.amount_value}>{data?.promocodes_count}</span>

						<span className={styles.mid_label}>Codes worth</span>

						<span className={styles.amount_value}>
							{formatAmount({
								amount   : data?.promocodes_worth || DEFAULT_PROMOTION_VALUE,
								currency : data?.alloted_budget_currency,
								options  : {
									style                 : 'currency',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</span>
					</div>
				</div>

				<div className={styles.amount_item}>
					<span className={styles.amount_label}>Used</span>

					<div className={styles.amount_inner_wrapper}>
						<span className={styles.amount_value}>{data?.promocodes_used_count}</span>

						<span className={styles.mid_label}>Codes worth</span>

						<span className={styles.amount_value}>
							{formatAmount({
								amount   : data?.promocode_usage_worth || DEFAULT_PROMOTION_VALUE,
								currency : data?.alloted_budget_currency,
								options  : {
									style                 : 'currency',
									notation              : 'compact',
									compactDisplay        : 'short',
									minimumFractionDigits : 2,
								},
							})}
						</span>
					</div>
				</div>
			</div>

			<div className={styles.right_section}>
				<div className={styles.header}>
					<div className={styles.heading}>Generate Promocode</div>

					<IcMCross
						className={styles.cross}
						width={20}
						height={20}
						onClick={onClose}
					/>
				</div>

				<Form
					controls={controls}
					control={control}
					handleSubmit={handleSubmit}
					watch={watch}
					errors={errors}
					setValue={setValue}
				/>
			</div>
		</div>
	);
}

export default ModalContent;
