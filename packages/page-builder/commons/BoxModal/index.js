import { Input } from '@cogoport/components';
import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

const marginKeys = [
	'margin-top',
	'margin-left',
	'margin-right',
	'margin-bottom',
];

const paddingKeys = [
	'padding-top',
	'padding-left',
	'padding-right',
	'padding-bottom',
];

function BoxModal(props) {
	const { selectedItem, isRootComponent, pageConfiguration, handleChange } = props;

	const [value, setValue] = useState < { } > ({});

	useEffect(() => {
		setValue(isRootComponent ? { ...pageConfiguration.style } : { ...selectedItem.component.style });
	}, [isRootComponent, pageConfiguration.style, selectedItem, setValue]);

	const handleInputChange = useCallback(
		(key, val) => {
			setValue((prevValue) => ({ ...prevValue, [key]: val }));
			handleChange(key, Number(val));
		},
		[handleChange, setValue],
	);

	return (
		<div className={styles.container}>
			<div className={styles.rectangle}>
				<div className={styles.title}>Margin</div>
				<div className={styles['inner-rectangle']}>
					<div className={styles.title}>Padding</div>
					<div className={styles.box}>
						{marginKeys.map((key) => (
							<Input
								key={key}
								size="sm"
								type="number"
								value={value?.[key] || ''}
								onChange={(val) => handleInputChange(key, val)}
								placeholder="0"
								className={styles[key]}
							/>
						))}
					</div>
					{paddingKeys.map((key) => (
						<Input
							key={key}
							size="sm"
							type="number"
							value={value?.[key] || ''}
							onChange={(val) => handleInputChange(key, val)}
							placeholder="0"
							className={styles[key]}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default BoxModal;
