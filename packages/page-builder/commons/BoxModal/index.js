import { Input } from '@cogoport/components';

import styles from './styles.module.css';

function BoxModal(props) {
	const {
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
						{marginKeys.map((key) => (
							<Input
								size="sm"
								type="number"
								defaultValue={0}
								onChange={(val) => handleChange(key, Number(val))}
								placeholder="0"
								className={styles[key]}
							/>
						))}
					</div>
					{paddingKeys.map((key) => (
						<Input
							size="sm"
							type="number"
							defaultValue={0}
							placeholder="0"
							onChange={(val) => handleChange(key, Number(val))}
							className={styles[key]}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default BoxModal;
