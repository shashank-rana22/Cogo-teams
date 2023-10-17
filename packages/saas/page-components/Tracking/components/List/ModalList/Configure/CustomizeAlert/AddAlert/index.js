import { cl, Tooltip, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getMappingObject from '../../../../../../constant/card';
import useCreateAlert from '../../../../../../hooks/useCreateAlert';

import CheckBoxCol from './CheckBoxCol';
import styles from './styles.module.css';

function RenderTooltip({ description }) {
	if (!description) return null;
	return (
		<Tooltip
			content={description}
		>
			<span><IcMInfo className={styles.info_icon} /></span>
		</Tooltip>
	);
}

function AddAlert({
	prevStepHandler, prevAlertData = [], selectContactList = [], alertList = [], shipmentId = '', closeHandler,
	setSelectContactList, activeTab = 'ocean',
}) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const GET_MAPPING = getMappingObject({ t });

	const [tableValue, setTableValue] = useState({
		shipper   : [],
		consignee : [],
		dsr       : [],
	});

	const { POC_MAPPING } = GET_MAPPING[activeTab];

	const { loading, submitHandler, checkboxChangeHandler, contactList = [], disableCheckboxHandler } = useCreateAlert({
		tableValue,
		setTableValue,
		prevAlertData,
		selectContactList,
		alertList,
		shipmentId,
		closeHandler,
		setSelectContactList,
		activeTab,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>{t('airOceanTracking:tracking_alerts_text_1')}</h3>
			</div>

			<div className={styles.info_container}>

				<div className={styles.table_container}>
					<div className={cl`${styles.flex_box} ${styles.title_row}`}>
						<div className={cl`${styles.title_col} ${styles.col}`}>&nbsp;</div>
						{contactList.map((contact) => (
							<div key={contact?.id} className={styles.col}>{startCase(contact?.name)}</div>
						))}
					</div>

					<div className={styles.value_container}>
						<div>
							{Object.keys(POC_MAPPING).map((ele) => (
								<div key={ele} className={styles.flex_box}>
									<div className={cl`${styles.title_col} ${styles.col}`}>{POC_MAPPING[ele]}</div>

									<CheckBoxCol
										name={ele}
										tableValue={tableValue}
										contactList={contactList}
										disabled={disableCheckboxHandler({ name: ele })}
										checkboxChangeHandler={checkboxChangeHandler}
									/>
								</div>
							))}
						</div>

						{activeTab === 'ocean' && (
							<>
								<p className={styles.configure_title}>{t('airOceanTracking:tracking_alerts_text_2')}</p>
								<div>
									{(alertList || []).map((ele) => {
										const { alert_name = '', description = '' } = ele;
										return (
											<div key={ele?.id} className={styles.flex_box}>

												<div className={cl`${styles.title_col} ${styles.col}`}>
													<span>{alert_name}</span>
													<RenderTooltip description={description} />
												</div>

												<CheckBoxCol
													name={alert_name}
													tableValue={tableValue}
													contactList={contactList}
													checkboxChangeHandler={checkboxChangeHandler}
												/>
											</div>
										);
									})}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<Button type="button" themeType="secondary" onClick={prevStepHandler} disabled={loading}>
					{t('airOceanTracking:back_button_label')}
				</Button>
				<Button
					className={styles.submit_btn}
					themeType="accent"
					type="button"
					loading={loading}
					onClick={submitHandler}
				>
					{t('airOceanTracking:tracking_daily_report_next_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default AddAlert;
