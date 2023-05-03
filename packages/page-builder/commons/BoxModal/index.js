import { Input } from '@cogoport/components';

import styles from './styles.module.css';

function BoxModal(props) {
	const {
		selectedItem,
		isRootComponent,
		pageConfiguration,
		handleChange,
	} = props;

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

	return (
		<div className={styles.container}>
			<div className={styles.rectangle}>
				<div className={styles.title}>Margin</div>
				<div className={styles['inner-rectangle']}>
					<div className={styles.title}>Padding</div>
					<div className={styles.box}>
						{marginKeys.map((key) => {
							const value = isRootComponent
								? pageConfiguration.style?.[key] : selectedItem?.component?.style?.[key];

							return (
								<Input
									key={key}
									size="sm"
									type="number"
									value={value}
									onChange={(val) => handleChange(key, Number(val))}
									placeholder="0"
									className={styles[key]}
								/>
							);
						})}
					</div>
					{paddingKeys.map((key) => {
						const value = isRootComponent
							? pageConfiguration.style?.[key] : selectedItem?.component?.style?.[key];

						return (
							<Input
								key={key}
								size="sm"
								type="number"
								value={value}
								placeholder="0"
								onChange={(val) => handleChange(key, Number(val))}
								className={styles[key]}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default BoxModal;
