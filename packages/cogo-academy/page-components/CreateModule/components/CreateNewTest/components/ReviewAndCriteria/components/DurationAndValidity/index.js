import { Placeholder } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';

import controls from './controls';
import styles from './styles.module.css';

function DurationAndValidity({ setValue, data, control, errors, loading }) {
	useEffect(() => {
		if (!isEmpty(data)) {
			controls.forEach(({ name: controlName }) => {
				const { validity_end, validity_start } = data || {};

				if (controlName === 'test_validity') {
					setValue(controlName, {
						startDate : new Date(format(validity_start)),
						endDate   : (validity_end) ? new Date(format(validity_end))
							: new Date(Date.now() + (3600 * 1000 * 24)),
					});
				} else if (data[controlName]) {
					setValue(controlName, data[controlName]);
				}
			});
		}
	}, [data, setValue]);

	if (isEmpty(data) || loading) {
		return <Placeholder height="130px" width="100%" margin="0px 0px 20px 0px" />;
	}

	return (
		<div className={styles.container}>
			{controls?.map((controlItem) => {
				const { type, label, name: controlName } = controlItem || {};
				const Element = getElementController(type);

				return (
					<div key={controlName} className={styles.control_container_two}>
						<div className={styles.label}>
							{label}

							<sup className={styles.sup}>*</sup>
						</div>

						<div className={styles.control}>
							<Element control={control} {...controlItem} className={styles[`element_${controlName}`]} />

							{errors[controlName]?.message
								? <div className={styles.error_msg}>{errors[controlName]?.message}</div> : null}
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default DurationAndValidity;
