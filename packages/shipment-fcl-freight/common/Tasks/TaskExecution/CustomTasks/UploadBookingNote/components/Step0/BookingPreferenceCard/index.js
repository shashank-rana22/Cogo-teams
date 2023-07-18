import { Button, cl } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

function BookingPreferenceCard({ item = {}, step0_data = {}, similarServiceIds = [] }) {
	const ONE = 1;
	const { priority, source, data } = item || {};

	const {
		setSelectedServiceProvider,
		selectedServiceProvider = [],
	} = step0_data;

	const dataArray = Array.isArray(data) ? data : [data];
	const { remarks, supplier_contract_no } = dataArray?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const handleProceed = () => {
		setSelectedServiceProvider((prev) => [...prev, item]);
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
				obj?.price,
				obj?.currency,
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
							:
							{remarks}
						</div>
					)}

					{
						!isEmpty(supplier_contract_no) && (
							<div>
								<b>Supplier Contract No.</b>
								:
								{supplier_contract_no}
							</div>
						)
					}
				</div>

				<div>
					<Button
						themeType="accent"
						size="sm"
						onClick={handleProceed}
						disabled={(selectedServiceProvider || [])
							.find((service) => item.service_id === service.service_id)}
					>
						<b>
							{selectedServiceProvider.length === (similarServiceIds.length - ONE) ? 'Proceed' : 'Save'}
						</b>
					</Button>
				</div>
			</div>
		</div>
	);
}
export default BookingPreferenceCard;
