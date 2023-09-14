import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function Card({ list = [], editMode = false, control, errors = {} }) {
	const { t } = useTranslation(['allocation']);

	return (
		<div>
			{list.map((item, index) => {
				const { expertise_type, value } = item;

				const isLastItem = index === list.length - FIRST_INDEX;

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
									placeholder : t('allocation:enter_score_placeholder'),
									rules,
								};

								const Element = getFieldController(controlsObject.type) || null;

								return (
									<div key={controlsObject?.label} className={styles.field_container}>
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
													{threshold_score
														? `${t('allocation:current_value_label')} ${threshold_score}`
														: null}
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
