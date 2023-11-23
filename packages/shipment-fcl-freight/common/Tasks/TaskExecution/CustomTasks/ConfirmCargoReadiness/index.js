import { Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { dynamic } from '@cogoport/next';
import { Layout } from '@cogoport/ocean-modules';
import { useContext, useState } from 'react';

import useUpdateShipmentPendingTask from '../../../../../hooks/useUpdateShipmentPendingTask';

import getUpdateTaskPayload from './getUpdateTaskPayload';
import readinessControls from './readinessControls';
import styles from './styles.module.css';

const CargoNotReady = dynamic(() => import('./CargoNotReady'), { ssr: false });

function ConfirmCargoReadiness({ task = {}, onCancel = () => {},	refetch = () => {} }) {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [showNotReady, setShowNotReady] = useState(false);

	const { control, handleSubmit, formState:{ errors } = {} } = useForm();

	const { apiTrigger = () => {}, loading } = useUpdateShipmentPendingTask({
		refetch: () => {
			refetch(); onCancel();
		},
	});

	const onSubmit = (values) => {
		const updateTaskPayload = getUpdateTaskPayload({ task, formValues: values, shipment_data });
		apiTrigger(updateTaskPayload);
	};

	return (
		<div>
			{shipment_data?.source === 'contract' ? (
				<div className={styles.not_ready}>
					<Button
						themeType="accent"
						onClick={() => setShowNotReady(true)}
						disabled={loading}
					>
						Cargo Not Ready ?
					</Button>
				</div>
			) : null}
			<div>
				<Layout control={control} fields={readinessControls} errors={errors} />
			</div>

			<div className={styles.action_buttons}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					Next

				</Button>
			</div>

			{showNotReady ? (
				<CargoNotReady
					show={showNotReady}
					setShow={setShowNotReady}
					task={task}
				/>
			) : null}
		</div>
	);
}

export default ConfirmCargoReadiness;
