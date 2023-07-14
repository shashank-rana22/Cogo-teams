import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase, isNumber } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function CardItem({ item, editMode, control }) {
	const { data = [], group_name = '', description = '' } = item;
	const isDoubleLevel = data.length > 1;

	const conditionName = data?.[0]?.condition_name || '';

	return (
		<div className={styles.card_item}>
			<div className={styles.name_container}>
				<div className={styles.parent_parameter_name}>
					{startCase(data.length === 1 ? conditionName : group_name)}
				</div>

				<div className={styles.icon_container}>
					<Tooltip content={description} placement="top">
						<IcMInfo width={14} height={14} />
					</Tooltip>
				</div>
			</div>

			{data.map((childItem, index) => {
				const { condition_name = '', attributes: controls = [] } = childItem;
				const isLastItem = index === data.length - 1;

				return (
					<>
						{isDoubleLevel ? (
							<div className={styles.child_name_container}>
								{startCase(condition_name)}
							</div>
						) : null}

						<div className={styles.controls_container}>
							{controls.map((singleField) => {
								const {
									name: controlName = '', score, type,
									label, placeholder, options = [],
								} = singleField;

								const controlsObject = {
									name    : controlName,
									type,
									label,
									placeholder,
									options : options || [],
								};

								const Element = getFieldController(controlsObject.type) || null;

								return (
									<div className={styles.field_container}>
										{editMode ? (
											<>
												<div className={styles.label}>
													{controlsObject.label}
												</div>

												<Element
													{...controlsObject}
													control={control}
													key={controlName}
													id={`${group_name}_${condition_name}_${controlsObject.name}`}
												/>

												<div className={styles.lower_current_value}>
													Current value:
													{' '}
													{isNumber(score)
														? score
														: startCase(score)}
												</div>
											</>
										) : (
											<>
												<div className={styles.view_label}>
													{controlsObject.label || '___'}
												</div>

												<div className={styles.current_value}>
													{isNumber(score)
														? score || 0
														: startCase(score) || 0}
												</div>
											</>
										)}
									</div>

								);
							})}
						</div>

						{isDoubleLevel && !isLastItem ? <hr className={styles.horizontal_line} /> : null}
					</>
				);
			})}

		</div>
	);
}

export default CardItem;
