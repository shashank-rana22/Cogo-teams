import { cl, Button } from '@cogoport/components';
import { IcMInformation } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import getDetDemControls from '../../../../../configuration/detDemControls';
import useCreateShipment from '../../../../../hooks/useCreateShipment';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function DetentionDemurrage({ closeHandler, shipmentId, refetchTrackerList, shipmentInfo = {} }) {
	const { origin_detention = '', destination_demurrage = '', destination_detention = '' } = shipmentInfo || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const detDemControls = getDetDemControls({ t });

	const { loading, updateTrackerInfo } = useCreateShipment({ closeHandler, refetchTrackerList });

	const { control, formState:{ errors }, handleSubmit } = useForm({
		defaultValues: {
			origin_detention,
			destination_detention,
			destination_demurrage,
		},
	});

	const onSubmit = (data) => {
		const payload = {
			saas_container_subscription_id : shipmentId,
			origin_detention               : data?.origin_detention || 0,
			destination_detention          : data?.destination_detention || 0,
			destination_demurrage          : data?.destination_demurrage || 0,
		};
		updateTrackerInfo({ payload });
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>{t('airOceanTracking:tracking_detention_text_1')}</h3>
			</div>
			<div className={styles.notif}>
				<IcMInformation fill="#F68B21" width={20} height={20} />
				<div className={styles.notif_text}>
					{t('airOceanTracking:tracking_detention_text_2')}
				</div>
			</div>
			<div className={styles.form_container}>
				<div className={cl`${styles.row}`}>
					{detDemControls.map((config, index) => {
						const { name, label = '', type } = config || {};
						const Element = getField(type);
						return (
							<div key={name} className={cl`${styles.col} ${index === 0 ? styles.first_col : ''}`}>
								<p className={styles.label}>{label}</p>
								<Element control={control} {...config} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className={styles.footer}>
				<Button type="button" themeType="secondary" disabled={loading} onClick={closeHandler}>
					{t('airOceanTracking:air_ocean_tracking_cancel_button_label')}
				</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					type="button"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					{t('airOceanTracking:save_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default DetentionDemurrage;
