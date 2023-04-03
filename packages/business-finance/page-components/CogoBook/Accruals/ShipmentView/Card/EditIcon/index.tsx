import { Tooltip } from '@cogoport/components';
import { IcMEdit, IcMInfo, IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import EditInput from './editInput';
import ProfitText from './ProfitText';
import styles from './styles.module.css';

function EditIcon({
	profit,
	itemData,
	onEditProfit,
	changeProfitHandler,
	profitValue,
	onTickProfit,
	onCrossProfit,
}) {
	const [tickEnable, setTickEnable] = useState(!!profitValue || false);

	return (
		<div className={styles.container}>
			{itemData?.editProfit ? (
				<div className={styles.section}>
					<div className={styles.flex}>
						<EditInput
							profit={profit}
							profitValue={profitValue}
							itemData={itemData}
							changeProfitHandler={changeProfitHandler}
							onTickProfit={onTickProfit}
							setTickEnable={setTickEnable}
						/>
						<div
							className={styles.rest_icon}
							role="presentation"
							onClick={() => onCrossProfit(itemData)}
						>
							<img
								className={styles.img_height}
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/reset.svg"
								alt="No Data"
							/>
						</div>

						<div className={tickEnable ? styles.tick : styles.tick_not}>
							<div
								role="presentation"
								onClick={() => {
									if (tickEnable) {
										onTickProfit(itemData);
									}
								}}
							>
								<IcMTick height="20px" width="20px" />
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className={styles.flex}>
					<ProfitText itemData={itemData} profit={profit} />
					<div
						onClick={() => onEditProfit(itemData)}
						role="presentation"
						className={styles.edit_icon}
					>
						<IcMEdit height="12px" width="12px" />

					</div>
					{profit[itemData.jobId] && (
						<Tooltip
							content="Profitability has been edited"
							placement="top"
						>
							<div className={styles.info_container}>
								<IcMInfo height="12px" width="12px" />
							</div>
						</Tooltip>
					)}
				</div>
			)}
		</div>
	);
}

export default EditIcon;
