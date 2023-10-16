import { Modal, Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import csvUploadControls from '../../../../configuration/csvUploadControls';
import { CSV_SAMPLE_FILE } from '../../../../constant/csvSampleFile';
import getField from '../../../../constant/getField';
import useCsvUpload from '../../../../hooks/useCsvUpload';

import styles from './styles.module.css';

const downloadSampleHandler = ({ trackingType = '' }) => {
	window.open(CSV_SAMPLE_FILE[trackingType], '_self');
};

function ImportCsvModal({ csvModal = false, setCsvModal = () => {}, trackingType = 'ocean', operatorData = {} }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const controls = csvUploadControls({ trackingType, operatorData, t });
	const { control, handleSubmit, formState:{ errors } } = useForm();

	const closeModalHandler = () => setCsvModal(false);
	const { loading, submitHandler } = useCsvUpload({ trackingType, closeModalHandler });

	if (!csvModal) return null;

	return (
		<Modal show={csvModal} onClose={closeModalHandler} closeOnOuterClick showCloseIcon>
			<div className={styles.container}>
				<div className={styles.header}>
					<h3>{`Import your CSV file to track at once (${startCase(trackingType)})`}</h3>
					<ButtonIcon icon={<IcMCross />} onClick={closeModalHandler} disabled={loading} />
				</div>

				<div className={styles.main_body}>
					{controls.map((config) => {
						const { name, type, width } = config || {};
						const Element = getField(type);
						return (
							<div key={name} className={styles.col} style={{ width }}>
								<Element control={control} {...config} type="card" />
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}

					<Button
						themeType="linkUi"
						onClick={() => downloadSampleHandler({ trackingType })}
					>
						{t('airOceanTracking:air_ocean_tracking_download_button_label')}
					</Button>

					<Button
						themeType="accent"
						className={styles.footer_btn}
						onClick={handleSubmit(submitHandler)}
						loading={loading}
					>
						{t('airOceanTracking:air_ocean_tracking_import_button_label')}
					</Button>
				</div>

			</div>
		</Modal>
	);
}

export default ImportCsvModal;
