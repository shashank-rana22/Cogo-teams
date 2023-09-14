import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import getCommodityControls from '../../../../../configuration/commodityControls';
import getMappingObject from '../../../../../constant/card';
import useCreateShipment from '../../../../../hooks/useCreateShipment';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';

function Commodity({ closeHandler, shipmentId = '', refetchTrackerList, shipmentInfo = {}, activeTab }) {
	const { hs_code = '' } = shipmentInfo || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const [commodityValue, setCommodityValue] = useState('');

	const commodityControls = getCommodityControls({ t });
	const MAPPING_OBJ = getMappingObject({ t });
	const { TRACKER_ID_KEY } = MAPPING_OBJ[activeTab];

	const { control, handleSubmit, setValue, formState:{ errors } } = useForm({
		defaultValues: {
			hscode: hs_code,
		},
	});

	const { loading, updateTrackerInfo } = useCreateShipment({ closeHandler, refetchTrackerList, activeTab });

	const onSubmit = () => {
		const payload = {
			commodity        : commodityValue?.description,
			hs_code          : commodityValue?.hsCode,
			[TRACKER_ID_KEY] : shipmentId,
		};
		updateTrackerInfo({ payload });
	};

	useEffect(() => {
		if (!isEmpty(hs_code)) {
			setValue('hscode', hs_code);
		}
	}, [hs_code, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>{t('airOceanTracking:tracking_list_modal_list_select_commodity_text')}</h3>
			</div>
			<div className={styles.form_container}>
				{commodityControls.map((config) => {
					const { name, label, type } = config;
					const Element = getField(type);
					return (
						<div key={name} className={styles.col}>
							<p>{label}</p>
							<Element control={control} {...config} handleChange={(e) => setCommodityValue(e)} />
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
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					{t('airOceanTracking:save_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default Commodity;
