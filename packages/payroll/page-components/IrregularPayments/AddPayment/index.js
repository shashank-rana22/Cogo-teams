import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpload } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import { leaveControls, controlMapping, stylesMapping } from '../../../utils/leaveControls';

import styles from './styles.module.css';

function AddPayment({
	setStep = () => {}, control = () => {}, errors = {}, watch = () => {},
	setValue = () => {}, clearErrors = () => {},
}) {
	const isRecurring = watch('is_recurring');

	const handleBulkUpload = () => {
		setStep(GLOBAL_CONSTANTS.one);
	};

	const controls = leaveControls();

	useEffect(() => {
		if (!isRecurring) {
			setValue('start_month', '');
			setValue('month_count', '');
			clearErrors(['start_month', 'month_count']);
		}
	}, [isRecurring, setValue, clearErrors]);

	return (
		<div className={styles.container}>
			<div className={styles.head_container}>
				<span className={styles.heading}>Add a Payment</span>
				<Button size="md" themeType="secondary" onClick={handleBulkUpload}>
					<div className={styles.upload_container}>
						<IcMUpload width={14} height={14} />
						<span className={styles.bulk_upload}>Bulk Upload</span>
					</div>
				</Button>
			</div>
			<div className={styles.main_container}>
				{controls.map((value) => {
					const Element = controlMapping[value.controlType];
					return ((
						(value.name !== 'month_count')
						|| isRecurring)
						? (
							<div
								className={cl`${styles.input_container} ${value.isHalf ? styles.half : null}`}
								key={value.name}
							>
								{value.controlType !== 'checkbox'
									? <label className={styles.label}>{value.label}</label> : null}
								<Element
									className={stylesMapping[value.controlType]}
									control={control}
									key={value.name}
									{...value}
								/>
								{errors[value.name]
									? <div className={styles.error_msg}>{errors[value.name].message}</div>
									: null}
							</div>
						) : null
					);
				})}
			</div>
		</div>
	);
}

export default AddPayment;
