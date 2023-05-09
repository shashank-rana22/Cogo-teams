import { IcMDownload, IcMRefresh } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ExcelComponent({ Element, name, label, controlItem, control, errors }) {
	return (
		<div key={name} className={`${styles.excel_container} ${styles[name]}`}>
			<div className={styles.excel_label_container}>
				<div className={styles.excel_label}>{label}</div>
				<div className={styles.refresh_div}>
					Refresh to see if list has been Generated
				</div>
			</div>

			<div className={styles.excel_buttons_container}>
				<div className={styles.left_section}>
					<div
						className={styles.sample_div}
						role="presentation"
						onClick={() => window.open(
							`https://cogoport-testing.sgp1.digitaloceanspaces.com/
        8b3de8aeee4620f0f863c681d28e7767/test-module-sample-set.csv`,
							'_blank',
						)}
					>
						<IcMDownload />
						<div className={styles.sample_text}>
							Download Default Excel Format
						</div>
					</div>
				</div>

				<div className={styles.right_section}>
					<div
						className={styles.sample_div}
						role="presentation"
						onClick={() => window.open(
							`https://cogoport-testing.sgp1.digitaloceanspaces.com/
        8b3de8aeee4620f0f863c681d28e7767/test-module-sample-set.csv`,
							'_blank',
						)}
					>
						<IcMDownload />
						<div className={styles.sample_text}>
							Generate & Download User list
						</div>
					</div>

					<div className={`${styles.sample_div} ${styles.right}`}>
						<IcMRefresh />
						<div className={styles.sample_text}>Refresh</div>
					</div>
				</div>
			</div>

			<div className={`${styles.input_group} ${styles[name]}`}>
				<Element
					{...controlItem}
					key={name}
					control={control}
					id={`${name}_input`}
				/>
			</div>

			{errors?.[name]?.message ? (
				<div className={styles.error_message}>
					{errors?.[name]?.message}
				</div>
			) : null}
		</div>
	);
}

export default ExcelComponent;
