import { CheckboxController, useForm } from '@cogoport/forms';
import { forwardRef, useImperativeHandle } from 'react';

import styles from './styles.module.css';

function SameAsBookingPartyForm({ tradePartnersData = {} }, ref) {
	const { list = [] } = tradePartnersData;
	const disabled = list?.find((i) => i?.trade_party_type === 'self');

	const { control, handleSubmit, formState:{ errors = {} } } = useForm({ defaultValues: { self: !disabled } });

	useImperativeHandle(ref, () => ({ handleSubmit }));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<div>
			<form>
				<div className={styles.checkbox}>
					<CheckboxController
						control={control}
						name="self"
						disabled={!disabled}
						rules={{ required: { value: true, message: 'This is required' } }}
					/>
					<label>Same as Booking Party</label>
				</div>
				{Error('self')}
			</form>
		</div>
	);
}

export default forwardRef(SameAsBookingPartyForm);
