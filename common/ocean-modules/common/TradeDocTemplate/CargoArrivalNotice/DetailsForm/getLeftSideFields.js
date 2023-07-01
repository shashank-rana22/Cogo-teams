import { cl } from '@cogoport/components';
import { TextAreaController } from '@cogoport/forms';

import LEFT_DATA_CONTROLS from './leftDataControl';
import styles from './styles.module.css';

const FULL_WIDTH_INCR_BY = 1;

const INDEX_INCR_FOR_NEXT_INDEX = 1;

const INCR_IF_NEXT_INDEX_LESS_THAN_CONTROLS_LENGTH = 2;

const getLeftSideFields = ({ service_type, control, setValue = () => {} }) => {
	const LEFT_SIDE_FIELDS = [];

	for (let i = 0; i < LEFT_DATA_CONTROLS[service_type].length;) {
		const obj = LEFT_DATA_CONTROLS[service_type][i];

		if (obj.fullWidth) {
			LEFT_SIDE_FIELDS.push(
				<div className={styles.block}>
					<div className={styles.text}>
						{obj.label}
						{' '}
						:
					</div>

					<div className={styles.text_area}>
						<TextAreaController
							control={control}
							name={`${obj.name}`}
							setValue={setValue}
							rows={3}
						/>
					</div>
				</div>,
			);
			i += FULL_WIDTH_INCR_BY;
		} else if (i + INDEX_INCR_FOR_NEXT_INDEX < LEFT_DATA_CONTROLS[service_type].length) {
			LEFT_SIDE_FIELDS.push(
				<div className={styles.container_flex}>
					<div className={cl`${styles.block} ${styles.width_50}`}>
						<div className={styles.text}>
							{obj.label}
							{' '}
							:
						</div>

						<div className={styles.width_74}>
							<TextAreaController
								control={control}
								name={`${obj.name}`}
								setValue={setValue}
								rows={3}
							/>
						</div>
					</div>

					<div className={cl`${styles.block} ${styles.width_50}`}>
						<div className={styles.text}>
							{LEFT_DATA_CONTROLS[service_type][i + INDEX_INCR_FOR_NEXT_INDEX].label}
							{' '}
							:
						</div>

						<div className={styles.text_area}>
							<TextAreaController
								control={control}
								name={`${LEFT_DATA_CONTROLS[service_type][i + INDEX_INCR_FOR_NEXT_INDEX].name}`}
								setValue={setValue}
								rows={3}
							/>
						</div>
					</div>
				</div>,
			);
			i += INCR_IF_NEXT_INDEX_LESS_THAN_CONTROLS_LENGTH;
		} else {
			LEFT_SIDE_FIELDS.push(
				<div className={styles.block}>
					<div className={styles.text}>
						{obj.label}
						{' '}
						:
					</div>

					<div className={styles.text_area}>
						<TextAreaController
							control={control}
							name={`${obj.name}`}
							setValue={setValue}
							rows={3}
						/>
					</div>
				</div>,
			);
			i += INDEX_INCR_FOR_NEXT_INDEX;
		}
	}

	return LEFT_SIDE_FIELDS;
};

export default getLeftSideFields;
