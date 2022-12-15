import { Button } from '@cogoport/components';
import { useForm, DatepickerController, PillsController } from '@cogoport/components/src/forms';

import DateRangeOptions from './DateRangeOptions';
import DateTypeOptions from './DateTypeOptions';
import styles from './styles.module.css';

function Content() {
	const { control, watch } = useForm({
		defaultValues: {
			bn_upload_range: 'last_3_days',
		},
		shouldUnregister: true,
	});

	const dateTypeValue = watch('date_type');
	const dateRangeValue = watch('date_range');

	return (
		<div className={styles.container}>
			<div className={styles.button_wrapper}>
				<Button className="clear_filter_button">Clear Filters</Button>
				<Button className="apply_button">Apply</Button>
			</div>
			<form className={styles.form_wrapper}>
				<label>	Date Type</label>
				<PillsController
					name="date_type"
					control={control}
					list={DateTypeOptions}
				/>
				{dateTypeValue?.[0] === 'bn_uploaded' ? (
					<>
						<label>Date Range</label>
						<PillsController
							control={control}
							name="bn_upload_range"
							list={[{ label: 'Last 3 Days', value: 'last_3_days' }]}
						/>
					</>
				) : null}
				{dateTypeValue?.[0] !== 'bn_uploaded' && dateTypeValue?.length
					? (
						<>
							<label>Date Range</label>
							<PillsController
								name="date_range"
								list={DateRangeOptions}
								control={control}
							/>
						</>
					) : null}
				{
					dateRangeValue?.[0] === 'custom'
						? (
							<DatepickerController
								control={control}
								name="custom_date"
							/>
						) : null
				}
			</form>
		</div>
	);
}
export default Content;
