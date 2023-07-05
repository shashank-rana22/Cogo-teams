import { Button, cl } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

function BookingPreferenceCard({ item, step0_data = {} }) {
	const { priority, source, data, preference_id } = item || {};

	const { updateBookingPreference = () => {}, updatePreferenceLoading, setSelectedServiceProvider } = step0_data;

	const dataArray = Array.isArray(data) ? data : [data];
	const { remarks, supplier_contract_no } = dataArray?.[0]?.validities?.[0] || dataArray?.[0] || {};

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
			value : obj?.reverted_shipping_line?.business_name || obj?.operator?.business_name
				|| obj?.shipping_line?.business_name,
		},
		{
			label : 'Source of Rate',
			value : obj?.source,
		},
		{
			label : 'Buy Rate',
			value : getFormattedPrice(
				obj?.validities[0]?.total_price,
				obj?.validities[0]?.currency,
			),
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
					<div key={uuid()} className={cl`${styles.sub_container} ${styles.justify_space_between}`}>
						{labelValueMapping(obj).map((eachObj) => (
							<div key={uuid()}>
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
							&nbsp;
							:
							&nbsp;
							{remarks}
						</div>
					)}

					{
						!isEmpty(supplier_contract_no) && (
							<div>
								<b>Supplier Contract No.</b>
								&nbsp;
								:
								&nbsp;
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
