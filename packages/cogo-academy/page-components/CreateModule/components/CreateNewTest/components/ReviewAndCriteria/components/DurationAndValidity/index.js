import { format } from '@cogoport/utils';

import getElementController from '../../../../../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function DurationAndValidity({ setValue, data, control, errors }) {
	const controls = getControls();
	// eslint-disable-next-line no-param-reassign

	// const formatDate = (date) => format(date, 'dd MMM yyyy');
	// data = {
	// 	...data,

	// };

	// const test_validity = {
	// 	startDate : formatDate(new Date()),
	// 	endDate   : formatDate(new Date()),
	// };

	// console.log(test_validity, 'test_validity');

	return (
		<div className={styles.container}>
			{controls?.map((controlItem) => {
				const { type, label, name: controlName } = controlItem || {};
				const Element = getElementController(type);

				// console.log(data[controlName], type, ' data[controlName]');
				setValue(controlName, data[controlName]);
				// if (type === 'date-picker') {
				// 	setValue(controlName, test_validity);
				// } else {
				// 	setValue(controlName, data[controlName]);
				// }

				return (
					<div className={styles.control_container_two}>
						<div className={styles.label}>
							{label}
							<sup style={{ color: 'red' }}>*</sup>
						</div>

						<div className={styles.control}>
							<Element control={control} {...controlItem} className={styles[`element_${controlName}`]} />
							{errors[controlName]
							&& <div className={styles.error_msg}>{errors[controlName]?.message}</div>}
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default DurationAndValidity;
