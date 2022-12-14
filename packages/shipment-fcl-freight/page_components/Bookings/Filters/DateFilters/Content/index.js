import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/form';
import DatePickerController from '@cogoport/form/Controlled/DatePickerController';
import PillsController from '@cogoport/form/Controlled/PillsController';

import DateRangeOptions from './DateRangeOptions';
import DateTypeOptions from './DateTypeOptions';
import styles from './styles.module.css';

function Content() {
	const methods = useForm({
		defaultValues: {
			bn_upload_range: 'last_3_days',
		},
		shouldUnregister: true,
	});

	const { watch } = methods;

	const dateTypeValue = watch('date_type');
	const dateRangeValue = watch('date_range');

	return (
		<div className={styles.container}>
			<div className={styles.button_wrapper}>
				<Button className="clear_filter_button">Clear Filters</Button>
				<Button className="apply_button">Apply</Button>
			</div>
			<form className={styles.form_wrapper}>
				<PillsController
					label="Date Type"
					name="date_type"
					methods={methods}
					list={DateTypeOptions}
				/>
				{dateTypeValue?.[0] === 'bn_uploaded' ? (
					<PillsController
						methods={methods}
						name="bn_upload_range"
						label="Date Range"
						list={[{ label: 'Last 3 Days', value: 'last_3_days' }]}
					/>
				) : null}
				{dateTypeValue?.[0] !== 'bn_uploaded' && dateTypeValue?.length
					? (
						<PillsController
							name="date_range"
							label="Date Range"
							list={DateRangeOptions}
							methods={methods}
						/>
					) : null}
				{
					dateRangeValue?.[0] === 'custom'
						? (
							<DatePickerController
								methods={methods}
								name="custom_date"
							/>
						) : null
				}
			</form>
		</div>
	);
}
export default Content;
