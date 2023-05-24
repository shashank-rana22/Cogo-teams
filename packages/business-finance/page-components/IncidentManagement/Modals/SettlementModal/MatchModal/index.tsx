import { Textarea, Datepicker, Button } from '@cogoport/components';
import { IcMDownload, IcMRadioLoader, IcMRefresh } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import useSettlement from '../../../apisModal/useSettlement';
import { MatchModalInterface } from '../../../common/interface';

import CardHeader from './CardHeader';
import ListData from './ListData';
import styles from './styles.module.css';

function MatchModal({
	value,
	setShow,
	setValue,
	checkedData,
	incidentMappingId,
	settlementDate,
	supportingDocUrl,
	id,
	type,
	refetch,
	isEditable,
}:MatchModalInterface) {
	const [checkResetButton, setCheckResetButton] = useState(false);

	const {
		setEditedValue,
		handleCrossClick,
		setEditeAble,
		setAllocationValue,
		changeData,
		submitMatch,
		setReject,
		setChangeData,
		checkMatching,
		checkLoading,
		loading,
		setEditedNostro,
		nostroButton,
	} = useSettlement({
		checkedData,
		refetch,
		type,
		id,
		checkResetButton,
		incidentMappingId,
		supportingDocUrl,
	});

	const newDate = format(settlementDate, 'yyyy-mm-dd 00:00:00', {}, false) || new Date();

	const checkReact = () => {
		setChangeData(checkedData);
		setCheckResetButton(!checkResetButton);
	};

	const onApprove = (item:string) => {
		const { date } = value;
		const setDate = format(
			date || settlementDate,
			'yyyy-mm-dd 00:00:00',
			{},
			false,
		);
		return item === 'settle'
			? submitMatch(changeData, setShow, setDate, value)
			: setReject(value, setShow);
	};

	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.flex_settle}>
					Settlement Date
					<div className={styles.date_range}>
						<Datepicker
							placeholder="Enter Date"
							dateFormat="dd/MM/yyyy"
							name="date"
							disable={!isEditable}
							value={value?.date}
							onChange={(item: any) => setValue((prev) => ({ ...prev, date: item }))}
							style={{ width: '100px', height: '29px' }}
						/>
					</div>
				</div>

				<div>
					{isEditable && (
						<div style={{ display: 'flex' }}>
							{supportingDocUrl && (
								<Button
									themeType="secondary"
									style={{ marginRight: '10px' }}
									onClick={() => window.open(supportingDocUrl, '_blank')}
								>
									Supporting Doc
									<IcMDownload width="20px" />
								</Button>
							)}
							<Button
								themeType="secondary"
								disabled={loading || checkLoading || !isEditable}
								onClick={() => checkMatching(changeData, newDate)}
							>
								{checkLoading ? (
									<IcMRadioLoader style={{ width: 55, height: 16 }} />
								) : (
									'Dry Run'
								)}
							</Button>
							<Button
								themeType="secondary"
								disabled={loading || checkLoading || !isEditable}
								onClick={() => checkReact()}
								style={{
									marginLeft: '10px',
								}}
							>
								{checkLoading ? (
									<IcMRadioLoader style={{ width: 55, height: 16 }} />
								) : (
									<IcMRefresh />
								)}
							</Button>
						</div>
					)}
				</div>
			</div>
			<div>
				<CardHeader />
				<ListData
					setEditedValue={setEditedValue}
					handleCrossClick={handleCrossClick}
					setEditeAble={setEditeAble}
					setAllocationValue={setAllocationValue}
					setChangeData={setChangeData}
					changeData={changeData || []}
					setEditedNostro={setEditedNostro}
					type={type}
					nostroButton={nostroButton}
					isEditable={isEditable}
				/>
			</div>

			{isEditable && (
				<>
					<div className={styles.remarks}>Remarks*</div>
					<div className={styles.textarea}>
						<Textarea
							name="remark"
							size="md"
							placeholder="Enter Remark Here..."
							onChange={(v: string) => setValue((prev) => ({ ...prev, remarks: v }))}
							style={{ width: '700', height: '100px', marginBottom: '12px' }}
						/>
					</div>
				</>
			) }

			{isEditable && (

				<div className={styles.button}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: '8px' }}
						disabled={!(value?.remarks.length) || loading}
						loading={loading}
						onClick={() => {
							onApprove('reject');
						}}
					>
						Reject
					</Button>

					<Button
						size="md"
						style={{ marginRight: '8px' }}
						disabled={!(value?.remarks.length) || loading}
						loading={loading}
						onClick={() => {
							onApprove('settle');
						}}
					>
						Settle
					</Button>
				</div>

			)}

		</div>
	);
}
export default MatchModal;
