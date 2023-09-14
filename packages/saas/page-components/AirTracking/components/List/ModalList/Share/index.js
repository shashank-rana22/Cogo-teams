import { Button, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getShareListConfig from '../../../../configuration/shareListConfig';
import getShareTrackerControls from '../../../../configuration/shareTrackerControls';
import useShareTracker from '../../../../hooks/useShareTracker';

import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import getField from '@/packages/forms/Controlled';
import Table from '@/ui/page-components/air-ocean-tracking/common/Table';

function Share({ shipmentId = '' }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const shareListConfig = getShareListConfig({ t });
	const shareTrackerControls = getShareTrackerControls({ t });

	const { control, handleSubmit, formState:{ errors } } = useForm();

	const {
		createLoading = false,
		shareTrackerHandler, data = [], getListLoading = false,
	} = useShareTracker({ id: shipmentId });

	const onSubmit = (info) => {
		shareTrackerHandler({ info });
	};

	return (
		<div className={styles.container}>
			<div className={styles.main_body}>
				<div className={styles.form_container}>
					<div className={styles.row}>

						{shareTrackerControls.map((config) => {
							const { name, type, label } = config;
							const Element = getField(type);
							return (
								<div key={name} className={styles.col}>
									<p className={styles.label}>{label}</p>
									<Element control={control} {...config} />
									<p className={styles.error}>{errors?.[name]?.message || errors?.[name]?.type}</p>
								</div>
							);
						})}
						<div className={cl`${styles.col} ${styles.submit_btn}`}>
							<Button
								type="button"
								themeType="accent"
								onClick={handleSubmit(onSubmit)}
								loading={createLoading}
							>
								{t('airOceanTracking:tracking_list_share_tracker_button_label')}
							</Button>
						</div>
					</div>
				</div>

				{!isEmpty(data) &&	(
					<div className={styles.list_container}>
						<Table
							title={t('airOceanTracking:tracking_list_table_title')}
							configs={shareListConfig}
							data={{ list: data }}
							loading={getListLoading}
							isClickable={false}
							isScroll
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Share;
