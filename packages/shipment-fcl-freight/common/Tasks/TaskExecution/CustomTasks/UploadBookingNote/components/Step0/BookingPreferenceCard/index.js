import { Button, cl } from '@cogoport/components';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import getPreferenceBuyPrice from '../../../helpers/getPreferenceBuyPrice';

import styles from './styles.module.css';

function BookingPreferenceCard({ item, step0_data = {} }) {
	const { priority, source, data, preference_id } = item || {};

	const { updateBookingPreference = () => {}, updatePreferenceLoading, setSelectedServiceProvider } = step0_data;

	const dataArray = Array.isArray(data) ? data : [data];
	const { remarks, supplier_contract_no } = dataArray?.[0] || {};

	const handleProceed = () => {
		setSelectedServiceProvider(item);
		updateBookingPreference({
			selected_priority : priority,
			id                : preference_id,
		});
	};

	const labelValueMapping = (obj) => [
		{ label: 'Supplier Name', value: obj?.service_provider?.business_name },
		{
			label : 'Shipping Line',
			value : obj?.reverted_shipping_line?.business_name
		|| obj?.operator?.business_name
		|| obj?.shipping_line.business_name,
		},
		{
			label : 'Source of Rate',
			value :	startCase(source),
		},
		{
			label : 'Buy Rate',
			value : getPreferenceBuyPrice(obj, source),
		},
		{
			label : 'Sailing Date',
			value : formatDate({
				date       : new Date(),
				formatType : 'dd MMM yyyy',
			}),
		},

	];

	const remarksAndContactNotPresent = isEmpty(remarks) && isEmpty(supplier_contract_no);

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={cl`${styles.heading_text} ${styles.priority}`}>{`(${priority} Priority)`}</div>

				<div className={cl`${styles.heading_text} ${styles.source}`}>{`${startCase(source)} Booking Note`}</div>
			</div>

			<div className={styles.divider} />

			<div>
				{(dataArray || []).map((obj) => (
					<div className={cl`${styles.sub_container} ${styles.justify_space_between}`}>
						{labelValueMapping(obj).map((eachObj) => (
							<div>
								<div className={styles.label}>{eachObj?.label}</div>
								<div className={styles.value}>{eachObj?.value}</div>
							</div>
						))}
					</div>
				))}
			</div>

			<div className={`${styles.supplier_proceed_wrapper} ${remarksAndContactNotPresent
				? styles.justify_flex_end : styles.justify_space_between}`}
			>
				<div>
					{!isEmpty(remarks) && (
						<div>
							<b>Supply Remarks</b>
							{' '}
							:
							{' '}
							{remarks}
						</div>
					)}

					{
						!isEmpty(supplier_contract_no) && (
							<div>
								<b>Supplier Contract No.</b>
								{' '}
								:
								{' '}
								{supplier_contract_no}
							</div>
						)
					}
				</div>

				<div>
					<Button themeType="accent" size="sm" onClick={handleProceed} disabled={updatePreferenceLoading}>
						<b>Proceed</b>
					</Button>
				</div>
			</div>
		</div>
	);
}
export default BookingPreferenceCard;
