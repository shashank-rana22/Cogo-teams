import { Tooltip } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';
import EDIT_CONFIG_CONTROLS_MAPPING from '../../../../../../constants/edit-config-controls-mapping';

import styles from './styles.module.css';

function CardItem({ item, editMode, control}) {
	const { expertise_type = '', data = [], group_name = '' } = item;
	const isDoubleLevel = data.length > 1;

	const conditionName = data[0].condition_name;

	return (
		<div className={styles.card_item}>
			<div className={styles.name_container}>
				<div className={styles.parameter_name}>{startCase(data.length === 1 ? conditionName: group_name)}</div>
				<div className={styles.icon_container}>
					<Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit" placement="top">
						<div><IcMInfo width={14} height={14} /></div>
					</Tooltip>

				</div>
			</div>

			{data.map((childItem) => {
				const { condition_name = '', attributes: controls = [], id = '' } = childItem;


				return (
					<>
						{isDoubleLevel ? (
							<div className={styles.child_name_container}>

								<div className={styles.parameter_name}>{startCase(condition_name)}</div>

							</div>
						) : null}

						<div className={styles.controls_container}>

							{controls.map((singleField) => {
								const { name: controlName = '', score, type, label, placeholder, options = [] } = singleField;

								const controlsObject = {
									name: controlName,
									type: type,
									label: label,
									placeholder: placeholder,
									options: options || [],
								}

								// const controlsObject = EDIT_CONFIG_CONTROLS_MAPPING[`${group_name}_${condition_name}_${controlName}`];

								// const controlsObject = EDIT_CONFIG_CONTROLS_MAPPING[controlName];

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
													Current value: {startCase(score)}
												</div>
											</>

										) : (
											<>
												<div className={styles.view_label}>
													{controlsObject.label}
												</div>
												<div className={styles.current_value}>
													{startCase(score)}
												</div>
											</>

										)}

									</div>

								);
							})}
						</div>

						{isDoubleLevel ? <hr className={styles.horizontal_line} /> : null}

					</>
				);
			})}

		</div>
	);
}

export default CardItem;
