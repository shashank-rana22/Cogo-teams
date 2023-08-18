import { Button } from '@cogoport/components';
import { InputController, useForm } from '@cogoport/forms';

import useSelfAllocateFund from '../../../../hooks/useSelfAllocateFund';

import styles from './styles.module.css';

function EnterAmountBox({ itemData = {}, refetch = () => {} }) {
	const { onSubmit, loading } = useSelfAllocateFund({ itemData, refetch });
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<InputController
				control={control}
				name="allotAmount"
				type="number"
				placeholder="Please Enter Amount"
				rules={{ required: 'Amount is Required *' }}
			/>
			<div className={styles.error_message}>
				{errors?.allotAmount?.message}
			</div>
			<div className={styles.button_conatiner}>
				<Button disabled={loading} type="submit">
					Save & Allot
				</Button>
			</div>
		</form>
	);
}

export default EnterAmountBox;
