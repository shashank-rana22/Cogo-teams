import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getRefNumberControls from '../../../../../configuration/refNumberControls';
import useCreateRefNum from '../../../../../hooks/useCreateRefNum';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function RefNumber({ closeHandler, shipmentId, refetchTrackerList, activeTab = 'ocean' }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const refNumberControls = getRefNumberControls({ t });

	const { control, handleSubmit, formState:{ errors } } = useForm();
	const { loading, onSubmitHandler } = useCreateRefNum({ shipmentId, refetchTrackerList, closeHandler, activeTab });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>{t('airOceanTracking:tracking_detention_reference_number')}</h3>
			</div>
			<div className={styles.form_container}>
				{refNumberControls.map((config) => {
					const { name, type } = config;
					const Element = getField(type);
					return (
						<div key={name} className={styles.col}>
							<Element control={control} {...config} />
							<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
						</div>
					);
				})}
			</div>
			<div className={styles.footer}>
				<Button type="button" themeType="secondary" disabled={loading} onClick={closeHandler}>
					{t('airOceanTracking:air_ocean_tracking_cancel_button_label')}
				</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					type="button"
					onClick={handleSubmit(onSubmitHandler)}
					loading={loading}
				>
					{t('airOceanTracking:save_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default RefNumber;
