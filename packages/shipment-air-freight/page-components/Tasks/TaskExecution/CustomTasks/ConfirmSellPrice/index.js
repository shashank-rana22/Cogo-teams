/* eslint-disable react-hooks/exhaustive-deps */
import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import controls from './configs/controls';
import useGetNewSellData from './hooks/useGetNewSellData';
import useUpdateRevenueDeskShipmentSellQuotation from './hooks/useUpdateRevenueDeskShipmentSellQuotation';
import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

function ConfirmSellPrice({ shipmentData, task, refetch, onCancel }) {
	const { getNewSellData, data } = useGetNewSellData(shipmentData);

	const {
		new_sell_price = '',
		new_sell_currency = '',
		new_sell_quantity = '',
		is_revert_awaited = true,
	} = data?.new_sell_data || {};

	const { updateShipmentPendingTask } = useUpdateShipmentPendingTask({
		task,
		refetch,
		onCancel,
	});

	const { updateShipmentSellQuotation, loading } =		useUpdateRevenueDeskShipmentSellQuotation({
		sellData: data?.new_sell_data,
		updateShipmentPendingTask,
	});

	const finalControls = controls(new_sell_price, is_revert_awaited);
	const {
		control,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm({ finalControls });

	const handleOnClick = (values) => {
		updateShipmentSellQuotation(values);
	};
	useEffect(() => {
		getNewSellData();
	}, []);

	useEffect(() => {
		setValue('chargeable_weight', new_sell_quantity);
		setValue('currency', new_sell_currency);
		setValue('sell_price', new_sell_price);
	}, [JSON.stringify(data)]);
	return (
		<div className={styles.container}>
			{is_revert_awaited && (
				<div className={styles.note_container}>Note: Revert is Awaited from Supply</div>
			)}
			<Layout fields={finalControls} errors={errors} control={control} />
			<div className={styles.button_container}>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(handleOnClick)}
					disabled={is_revert_awaited || loading}
				>
					Approve
				</Button>
			</div>
		</div>
	);
}

export default ConfirmSellPrice;
