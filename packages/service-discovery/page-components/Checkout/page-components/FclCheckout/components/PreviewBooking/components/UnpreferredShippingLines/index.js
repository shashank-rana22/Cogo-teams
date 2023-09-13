import { AsyncSelectController, ChipsController, InputNumberController } from '@cogoport/forms';
import { useEffect } from 'react';

import styles from './styles.module.css';

const MIN_CONTAINER_COUNT_FOR_PARTIAL_SHIPMENT = 2;
const ONE = 1;

function UnpreferredShippingLines({
	formProps = {},
	primaryService = {},
	totalContainerCount = 1,
}) {
	const {
		control,
		formState: { errors = {} },
		setValue = () => {},
		watch,
	} = formProps;

	const { shipping_preferences = {} } = primaryService;

	useEffect(() => {
		const {
			unpreferred_shipping_line_ids = [],
			partial_shipment_min_limit = 0,
		} = shipping_preferences || {};

		setValue('agreed_for_partial_shipment', partial_shipment_min_limit ? 'yes' : 'no');
		setValue('unpreferred_shipping_line_ids', unpreferred_shipping_line_ids);
		setValue('partial_shipment_min_limit', partial_shipment_min_limit);
	}, [setValue, shipping_preferences]);

	const agreedForPartialShipmentWatch = watch('agreed_for_partial_shipment');

	return (
		<div className={styles.container}>
			<div className={styles.header}>Unpreferred shipping lines</div>

			<div className={styles.text}>
				Unpreferred shipping lines will not be considered for your shipment.
				This will help us in getting you a better deal.
			</div>

			<AsyncSelectController
				control={control}
				asyncKey="list_operators"
				name="unpreferred_shipping_line_ids"
				multiple
				className={styles.select}
				initialCall
				params={{
					filters    : { operator_type: 'shipping_line', status: 'active' },
					page_limit : 100,
					sort_by    : 'short_name',
					sort_type  : 'asc',
				}}
			/>

			{errors?.unpreferred_shipping_line_ids?.message ? (
				<div className={styles.error_message}>
					{errors?.unpreferred_shipping_line_ids?.message}
				</div>
			) : null}

			{totalContainerCount >= MIN_CONTAINER_COUNT_FOR_PARTIAL_SHIPMENT ? (
				<div className={styles.partial_load}>
					In some rare occasion, we may break the shipment and
					send via different ships, is that okay with you?

					<ChipsController
						style={{ marginLeft: '12px' }}
						control={control}
						name="agreed_for_partial_shipment"
						type="chips"
						options={[
							{ value: 'no', label: 'No' },
							{ value: 'yes', label: 'Yes' },
						]}
						size="lg"
						enableMultiSelect={false}
					/>
				</div>
			) : null}

			{agreedForPartialShipmentWatch === 'yes'
			&& totalContainerCount >= MIN_CONTAINER_COUNT_FOR_PARTIAL_SHIPMENT && (
				<div className={styles.partial_load} style={{ marginTop: '16px' }}>
					How many minimum containers would you like to ship in one go?

					<InputNumberController
						style={{ marginLeft: '12px' }}
						control={control}
						name="partial_shipment_min_limit"
						size="md"
						max={totalContainerCount - ONE}
						min={1}
					/>
				</div>
			)}
		</div>
	);
}

export default UnpreferredShippingLines;
