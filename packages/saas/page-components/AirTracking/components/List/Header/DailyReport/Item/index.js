import { Toast, Placeholder } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getDailyStatusConfig from '../../../../../configuration/dailyStatusConfig';
import useUpdateDsrStatus from '../../../../../hooks/useUpdateDsrStatus';
import itemFunction from '../../../../../utils/itemFunction';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

const Item = ({ data = {}, loading: listLoading = false, setStatusModal }) => {
	const { id = '', schedule = '', shipments = 0 } = data || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const dailyStatusConfig = getDailyStatusConfig({ t });

	const [status, setStatus] = useState(data.status === 'active');

	const { loading, updateDsrStatus } = useUpdateDsrStatus();

	const statusChangeHandler = async (val) => {
		if (schedule || shipments) {
			const currStatus = val.target.checked;
			const resp = await updateDsrStatus({ id, status: currStatus });
			if (resp) setStatus(currStatus);
		} else {
			Toast.error(t('airOceanTracking:tracking_daily_report_toast_1'));
		}
	};

	const editHandler = ({ itemData = {}, key }) => {
		setStatusModal({
			isOpen  : true,
			info    : itemData || {},
			stepper : key,
		});
	};
	const newFunction = itemFunction({ status, statusChangeHandler, loading, editHandler, t });

	return (
		dailyStatusConfig.map((config) => (
			<div key={config.key} className={styles.col} style={{ width: config.width }}>
				{listLoading ? <Placeholder height="20px" /> : getValue(data, config, newFunction)}
			</div>
		))
	);
};

export default Item;
