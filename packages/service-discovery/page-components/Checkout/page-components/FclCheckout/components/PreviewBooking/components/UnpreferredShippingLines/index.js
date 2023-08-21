import { AsyncSelectController, ChipsController } from '@cogoport/forms';
import { useEffect } from 'react';

import styles from './styles.module.css';

function UnpreferredShippingLines({
	formProps = {},
	primaryService = {},
}) {
	const {
		control,
		formState: { errors = {} },
		setValue = () => {},
	} = formProps;

	const { shipping_preferences = {} } = primaryService;

	useEffect(() => {
		const {
			agreed_for_partial_shipment = false,
		} = shipping_preferences || {};

		setValue('agreed_for_partial_shipment', agreed_for_partial_shipment ? 'yes' : 'no');
	}, [setValue, shipping_preferences]);

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
				name="unpreferred_shipping_lines"
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

			{errors?.unpreferred_shipping_lines?.message ? (
				<div className={styles.error_message}>
					{errors?.unpreferred_shipping_lines?.message}
				</div>
			) : null}

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
		</div>
	);
}

export default UnpreferredShippingLines;
