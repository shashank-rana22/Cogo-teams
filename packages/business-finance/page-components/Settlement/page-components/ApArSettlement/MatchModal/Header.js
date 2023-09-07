import { Button, Datepicker, ButtonIcon } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import React from 'react';

import { getFormatAmount } from '../../../utils/getFormatAmount';

import styles from './styles.module.css';
import UploadDocument from './UploadDocument';

const handleSetTdsZero = (updatedData = [], setUpdatedData = () => {}) => {
	const UPDATED_DATA_WITH_ZERO_TDS = updatedData?.map((item) => ({
		...item,
		allocationAmount : parseFloat(+item.allocationAmount) + parseFloat(+item.tds),
		balanceAmount    : +item.balanceAmount + +item.tds,
		tds              : 0,
	}));
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
	},
) {
	const onClick = () => {
		setShowDocument(true);
	};
	const onOuterClick = () => {
		setShowDocument(false);
		setFileValue({});
	};
	const handleDryRunClick = async () => {
		setDryRun(true);
		await postPaymentsSettlementCheck();
	};
	const handleRefreshClick = async () => {
		setDryRun(false);
		setCheckedData([]);
		setUpdatedData(JSON.parse(JSON.stringify(selectedData)));
		setCanSettle(false);
	};

	return (
		<>
			<div className={styles.header}>
				<span className={styles.supheader}>MATCHING</span>
				{' '}
				<span className={styles.subheader}>( Drag and drop to set the matching hierarchy )</span>
			</div>
			<br />

			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
					Matching Balance
					<p className={styles.paragraph}>
						{getFormatAmount(updateBal, selectedData[GLOBAL_CONSTANTS.zeroth_index]?.currency)}
					</p>
				</div>

				<div className={styles.btn_container}>
					<div className={styles.Datepicker}>
						<div style={{ margin: '0px 6px', fontSize: '12px', fontWeight: '500' }}>
							Settlement Date
						</div>

						<Datepicker
							placeholder="Enter Date"
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
						disabled={dryRun}
					>
						Set TDS Zero
					</Button>

					<div>
						<Button
							className={styles.btn}
							onClick={() => onClick('primary sm')}
							themeType="secondary"
						>
							Upload File
						</Button>
						<p className={styles.optional}>(Optional)</p>
						{showDocument && (
							<UploadDocument
								showDocument={showDocument}
								setShowDocument={setShowDocument}
								onOuterClick={onOuterClick}
								fileValue={fileValue}
								setFileValue={setFileValue}
							/>
						)}
					</div>

					<Button
						className={styles.btn}
						themeType="secondary"
						onClick={() => setShowJV(true)}
						disabled={dryRun}
					>
						CREATE JV
					</Button>

					<div className={styles.dryrun}>
						<Button
							className={styles.btn}
							themeType="secondary"
							disabled={dryRun}
							onClick={() => {
								handleDryRunClick();
							}}
						>
							DRY RUN
						</Button>
						{dryRun
					&& (
						<p className={styles.error}>Please refresh to dry run again !</p>
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
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
