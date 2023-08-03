import { Button, cl, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import useUpdateShipmentBookingConfirmationPreferences from
	'../../../../../../../../hooks/useUpdateShipmentBookingConfirmationPreferences';
import getPreferenceLabel from '../../../helpers/getPreferenceLabel';

import styles from './styles.module.css';

function BookingPreferenceCard({
	item = {},
	step0_data = {},
	similarServiceIds = [],
	setStep = () => {},
	isProceedEnabled = true,
}) {
	const ONE = 1;
	const { priority, source, data } = item || {};
	const isSelectedPriority = item?.priority === item?.selected_priority;

	const {
		setSelectedServiceProvider,
		selectedServiceProvider = [],
	} = step0_data;

	const dataArray = Array.isArray(data) ? data : [data];
	const { remarks, supplier_contract_no } = dataArray?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { apiTrigger } = useUpdateShipmentBookingConfirmationPreferences({ });

	const handleProceed = async () => {
		setSelectedServiceProvider((prev) => [...prev, item]);
		if (selectedServiceProvider.length >= similarServiceIds.length - ONE) {
			await apiTrigger([...selectedServiceProvider, item]);
			setStep((prev) => prev + ONE);
		}
	};

	const remarksAndContactNotPresent = isEmpty(remarks) && isEmpty(supplier_contract_no);

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<div className={cl`${styles.heading_text} ${styles.priority}`}>{`(${priority} Priority)`}</div>

				<div className={cl`${styles.heading_text} ${styles.source}`}>{`${startCase(source)} Booking Note`}</div>

				{isSelectedPriority ? (
					<Pill className={styles.selected_priority} color="green"> Selected </Pill>
				) : null}
			</div>

			<div className={styles.divider} />

			<div>
				{(dataArray || []).map((obj) => (
					<div key={obj?.id} className={cl`${styles.sub_container} ${styles.justify_space_between}`}>
						{getPreferenceLabel(obj).map((eachObj) => (
							<div key={eachObj?.id}>
								<div className={styles.label}>{eachObj?.label}</div>
								<div className={styles.value}>{eachObj?.value}</div>
							</div>
						))}
					</div>
				))}
			</div>

			<div className={cl`${styles.supplier_proceed_wrapper} ${remarksAndContactNotPresent
				? styles.justify_flex_end : styles.justify_space_between}`}
			>
				<div>
					{!isEmpty(remarks) && (
						<div>
							<b>Supply Remarks</b>
							:
							{' '}
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

				{isProceedEnabled ? (
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
				) : null}
			</div>
		</div>
	);
}
export default BookingPreferenceCard;
