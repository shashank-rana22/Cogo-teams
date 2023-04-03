import { startCase } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function Card({ list = [], editMode = false, control, errors = {} }) {
	return (
		<div>
			{list.map((item, index) => {
				const { expertise_type, value } = item;

				const isLastItem = index === list.length - 1;

				return (
					<>
						<div className={styles.row_level}>
							{startCase(expertise_type)}
						</div>

						<div className={styles.controls_container}>
							{value?.map((childItem) => {
								const { threshold_score_type, threshold_score = '', id, rules = {} } = childItem;

								const controlsObject = {
									name        : id,
									type        : 'text',
									label       : startCase(threshold_score_type),
									placeholder : 'Enter Score',
									rules,
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
													key={`${controlsObject.name}_value`}
												/>

												<div className={styles.lower_current_value}>
													{threshold_score ? `Current value: ${threshold_score}` : null}
												</div>

												<div className={styles.error_message}>
													{errors?.[controlsObject.name]?.message}
												</div>
											</>

										) : (
											<>
												<div className={styles.view_label}>
													{controlsObject.label}
												</div>
												<div className={styles.current_value}>
													{threshold_score}
												</div>
											</>
										)}

									</div>
								);
							})}
						</div>

						{ !isLastItem ? <hr className={styles.horizontal_line} /> : null}
					</>
				);
			})}
		</div>
	);
}

export default Card;
