import { Button, SingleDateRange } from '@cogoport/components';
import { IcMDownload, IcMRadioLoader, IcMRefresh } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState } from 'react';

import useSettlement from '../../../apisModal/useSettlement';
import { MatchModalInterface } from '../../../interface';

import CardHeader from './CardHeader';
import ListData from './ListData';
import styles from './styles.module.css';

function MatchModal({
	checkedData,
	incidentMappingId,
	settlementDate,
	supportingDocUrl,
	id,
	type,
	refetch,
	isEditable,
}:MatchModalInterface) {
	const [value, setValue] = useState({ date: '' });
	const [checkResetButton, setCheckResetButton] = useState(false);

	const {
		setEditedValue,
		handleCrossClick,
		setEditeAble,
		setAllocationValue,
		changeData,
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
	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.flex}>
					Settlement Date
					<div className={styles.date_range}>
						<SingleDateRange
							placeholder="Enter Date"
							dateFormat="MM/dd/yyyy"
							name="date"
							value={value?.date}
							onChange={(item: string) => setValue((prev) => ({ ...prev, date: item }))}
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
									onClick={() => window.open(supportingDocUrl, '_blanck')}
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

		</div>
	);
}
export default MatchModal;
