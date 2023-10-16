import { cl, Button, Select } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState, useMemo } from 'react';

import getField from '../../../constant/getField';
import useCreateTracker from '../../../hooks/useCreateTracker';
import useGetOperatorList from '../../../hooks/useGetOperatorList';

import { getOptions } from './getOptions';
import ImportCsvModal from './ImportCsvModal';
import OrTag from './OrTag';
import styles from './styles.module.css';

function Header() {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const options = useMemo(() => getOptions({ t }), [t]);

	const [csvModal, setCsvModal] = useState(false);

	const operatorData = useGetOperatorList();

	const {
		loading, formHook, trackingType, setTrackingType, controls,
		onSubmitHandler,
	} = useCreateTracker({ operatorData });

	const { control, handleSubmit, formState:{ errors } } = formHook;

	return (
		<div className={styles.container}>
			<h2>{t('airOceanTracking:track_your_shipments_text')}</h2>
			<div className={styles.form_container}>

				<div className={styles.row}>
					<Select
						className={styles.select_container}
						value={trackingType}
						onChange={setTrackingType}
						options={options}
					/>

					{controls.map((controlItem) => {
						const { name, type } = controlItem;
						const Element = getField(type);

						return (
							<div key={name} className={cl`${styles.col} ${styles.form_col}`}>
								<Element {...controlItem} control={control} />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}
					<div className={styles.col}>
						<Button
							size="lg"
							type="button"
							className={styles.heading_btn}
							loading={loading}
							onClick={handleSubmit(onSubmitHandler)}
						>
							{t('airOceanTracking:track_button_label')}
						</Button>
					</div>
					<div className={cl`${styles.col} ${styles.or_tag}`}>
						<OrTag />
					</div>
					<div className={styles.col}>
						<Button
							size="lg"
							themeType="accent"
							className={styles.heading_btn}
							disabled={loading}
							onClick={() => setCsvModal(true)}
						>
							{t('airOceanTracking:import_button_label')}
						</Button>
					</div>
				</div>

			</div>
			{csvModal ? (
				<ImportCsvModal
					csvModal={csvModal}
					setCsvModal={setCsvModal}
					trackingType={trackingType}
					operatorData={operatorData}
				/>
			) : null}
		</div>
	);
}
export default Header;