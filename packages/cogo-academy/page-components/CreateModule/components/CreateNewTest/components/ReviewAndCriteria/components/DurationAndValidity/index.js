import { Placeholder } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';
import { useEffect } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function DurationAndValidity({ setValue, data, control, errors, loading }) {
	const controls = getControls();

	useEffect(() => {
		if (data) {
			controls.forEach(({ name: controlName }) => {
				const { validity_end, validity_start } = data || {};
				if (controlName === 'test_validity') {
					setValue(controlName, {
						startDate : new Date(format(validity_start)),
						endDate   : new Date(format(validity_end)),
					});
				} else {
					setValue(controlName, data[controlName]);
				}
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	if (isEmpty(data) || loading) {
		return <Placeholder height="130px" width="100%" margin="0px 0px 20px 0px" />;
	}

	return (
		<div className={styles.container}>
			{controls?.map((controlItem) => {
				const { type, label, name: controlName } = controlItem || {};
				const Element = getElementController(type);
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
