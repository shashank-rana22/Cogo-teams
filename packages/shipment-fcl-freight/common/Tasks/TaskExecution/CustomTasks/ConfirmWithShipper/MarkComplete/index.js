import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import styles from './styles.module.css';

const checkIsLocalUpsell = ({ primaryTradeType, servicesList = [] }) => {
	const localTradeType = primaryTradeType === 'export' ? 'import' : 'export';
	const local = servicesList?.find((s) => s?.service_type === 'fcl_freight_local_service'
	&& s?.trade_type === localTradeType);

	return isEmpty(local);
};
function MarkComplete({
	task = {}, refetch = () => {}, onCancel = () => {},
	servicesList = [],
	primary_service = {},
	setStep = () => {},
}) {
	useEffect(() => {
		const isLocalUpselled = checkIsLocalUpsell({ primaryTradeType: primary_service?.trade_type, servicesList });

		if (!isLocalUpselled) {
			setStep(2);
		}
	}, [servicesList, primary_service, setStep]);

	const taskRefetch = () => {
		refetch();
		onCancel();
	};
	const { apiTrigger, loading } = useUpdateShipmentPendingTask({ refetch: taskRefetch });

	const onClick = () => {
		apiTrigger({ id: task?.id });
	};

	return (
		<div className={styles.button}>
			<Button on onClick={onCancel} themeType="secondary">Cancel</Button>
			<Button onClick={onClick} disabled={loading}>Mark Complete</Button>
		</div>
	);
}

export default MarkComplete;
