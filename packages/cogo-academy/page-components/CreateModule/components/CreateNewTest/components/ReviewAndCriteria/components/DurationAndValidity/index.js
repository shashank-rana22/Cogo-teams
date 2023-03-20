import getElementController from '../../../../../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function DurationAndValidity({ control, errors }) {
	const controls = getControls();

	return (
		<div className={styles.container}>
			{controls?.map((controlItem) => {
				const { type, label, name } = controlItem || {};
				const Element = getElementController(type);

				return (
					<div className={styles.control_container_two}>
						<div className={styles.label}>
							{label}
							<sup style={{ color: 'red' }}>*</sup>
						</div>

						<div className={styles.control}>
							<Element control={control} {...controlItem} className={styles[`element_${name}`]} />
							{errors[name] && <div className={styles.error_msg}>{errors[name]?.message}</div>}
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default DurationAndValidity;
