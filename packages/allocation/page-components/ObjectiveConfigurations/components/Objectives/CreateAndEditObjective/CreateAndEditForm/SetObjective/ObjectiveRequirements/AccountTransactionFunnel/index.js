import { DateRangePickerController, InputController } from '@cogoport/forms';

import styles from './styles.module.css';

function AccountTransactionFunnel(props) {
	const { control } = props;

	return 		(
		<div className={styles.container}>
			<h4>3. Account Transaction Funnel</h4>

			<div className={styles.form_container}>
				<div className={styles.form_element}>
					<p>Select Date Range</p>

					<DateRangePickerController
						name="date_range"
						control={control}
						maxDate={new Date()}
						isPreviousDaysAllowed
					/>
				</div>

				<div className={styles.input_fields}>
					<div className={styles.form_element}>
						<p>No of Shipments in selected date Range</p>

						<InputController
							name="shipment_count"
							control={control}
						/>
					</div>

					<div className={styles.form_element}>
						<p>No of Quotations in selected date Range</p>

						<InputController
							name="quotation_count"
							control={control}
						/>
					</div>

					<div className={styles.form_element}>
						<p>No of Searches in selected date Range</p>

						<InputController
							name="search_count"
							control={control}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountTransactionFunnel;
