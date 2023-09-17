import { Button, Datepicker, ButtonIcon, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh, IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { getFormatAmount } from '../../../utils/getFormatAmount';

import styles from './styles.module.css';
import UploadDocument from './UploadDocument';

const ZERO_BAL = 0;

const handleSetTdsZero = (updatedData = [], setUpdatedData = () => {}) => {
	const UPDATED_DATA_WITH_ZERO_TDS = updatedData?.map((item) => {
		const allocationAmount = parseFloat(item.allocationAmount || ZERO_BAL);
		const balanceAmount = +item.balanceAmount || ZERO_BAL;
		const tds = +item.tds || ZERO_BAL;
		return {
			...item,
			allocationAmount : allocationAmount + tds,
			balanceAmount    : balanceAmount + tds,
			tds              : 0,
		};
	});

	setUpdatedData(UPDATED_DATA_WITH_ZERO_TDS);
};

function Header(
	{
		updateBal = '',
		selectedData = [],
		showDocument = '',
		setShowDocument = () => {},
		setFileValue = () => {},
		setDryRun = () => {},
		postPaymentsSettlementCheck = () => {},
		setCheckedData = () => {},
		setUpdatedData = () => {},
		setCanSettle = () => {},
		setDate = () => {},
		updatedData = [],
		setShowJV = () => {},
		date = '',
		dryRun = false,
		fileValue = '',
		checkLoading = false,
		t = () => {},
	},
) {
	const [showJvButton, setShowJvButton] = useState(false);
	const onClick = () => {
		setShowDocument(true);
	};
	const onOuterClick = () => {
		setShowDocument(false);
		setFileValue({});
	};
	const handleDryRunClick = () => {
		setDryRun(true);
		postPaymentsSettlementCheck();
	};
	const handleRefreshClick = () => {
		setDryRun(false);
		setCheckedData([]);
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
		setCanSettle(false);
	};

	return (
		<>
			<div className={cl`${styles.header} ${styles.supheader}`}>
				<span className={styles.supheader}>{t('settlement:matching_text')}</span>
				{' '}
				<span className={cl`${styles.subheader} ${styles.supheader}`}>
					{t('settlement:drag_drop_text')}

				</span>
			</div>
			<br />

			<div className={styles.balanceStyle}>
				<div className={styles.overflow_style}>
					<div className={styles.match_bal_style}>
						{t('settlement:matching_balance_text')}
						<p className={styles.paragraph}>
							{getFormatAmount(updateBal, selectedData[GLOBAL_CONSTANTS.zeroth_index]?.currency)}
						</p>
					</div>
					<div className={styles.overflow_dot}>
						<IcMOverflowDot
							height={20}
							width={20}
							onClick={() => setShowJvButton(!showJvButton)}
						/>
						<div>
							{showJvButton
							&& (
								<Button
									className={styles.btn}
									themeType="primary"
									onClick={() => setShowJV(true)}
								>
									{t('settlement:create_jv_text')}
								</Button>
							)}
						</div>
					</div>
				</div>

				<div className={styles.btn_container}>
					<div className={styles.Datepicker}>
						<div style={{ margin: '0px 6px', fontSize: '12px', fontWeight: '500' }}>
							{t('settlement:settlement_date')}
						</div>

						<Datepicker
							placeholder={t('settlement:date_placeholder') || ''}
							dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
							name="date"
							onChange={(e) => { setDate(e); }}
							value={date}
						/>
					</div>

					<Button
						className={styles.btn}
						onClick={() => { handleSetTdsZero(updatedData, setUpdatedData); }}
						themeType="secondary"
					>
						{t('settlement:set_tds_zero')}
					</Button>

					<div>
						<Button
							className={styles.btn}
							onClick={() => onClick('primary sm')}
							themeType="secondary"
						>
							{t('settlement:upload_file_label')}
						</Button>
						<p className={styles.optional}>{t('settlement:optional_label')}</p>
						{showDocument && (
							<UploadDocument
								showDocument={showDocument}
								setShowDocument={setShowDocument}
								onOuterClick={onOuterClick}
								fileValue={fileValue}
								setFileValue={setFileValue}
								t={t}
							/>
						)}
					</div>

					<div className={styles.dryrun}>
						<Button
							className={styles.btn}
							themeType="secondary"
							disabled={dryRun}
							onClick={() => {
								handleDryRunClick();
							}}
						>
							{t('settlement:dry_run_text')}
						</Button>
						{dryRun
					&& (
						<p className={styles.error}>{t('settlement:refresh_alert')}</p>
					)}
					</div>

					<div className={styles.refreshStyle}>
						<ButtonIcon
							icon={(
								<IcMRefresh
									className={styles.icon}
								/>
							)}
							themeType="primary"
							onClick={() => {
								handleRefreshClick();
							}}
							disabled={checkLoading}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
