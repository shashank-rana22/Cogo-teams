import { Button, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMEdit, IcMGrid } from '@cogoport/icons-react';

import { statusColor } from './constant';
import EditInput from './EditInput';
import EditInputAllocation from './EditInputAllocation';
import NostroInput from './NostroInput';
import styles from './styles.module.css';

function Card({
	item,
	setEditedValue,
	setEditeAble,
	handleCrossClick,
	setAllocationValue,
	type,
	setRestEdit,
	restEdit,
	setEditedNostro,
	nostroButton,
	isEditable,
}) {
	const {
		documentValue = '',
		documentAmount = 0,
		balanceAmount = 0,
		balanceAfterAllocation = 0,
		currency,
		allocationEditable = false,
		tdsEditable = false,
		settledTds = 0,
		nostroEditable = false,
		accountType,
		status,
		exchangeRate = 0,
	} = item || {};

	const checkEdit = accountType === 'REC' || accountType === 'PAY';

	return (
		<>
			<div className={styles.ribbon} style={{ background: statusColor[item.status] }}>{status}</div>

			<div className={styles.item_icon}><IcMGrid /></div>

			<div className={styles.item}>
				<Tooltip
					content={(
						<div>
							{documentValue}
						</div>
					)}
					placement="top"
				>
					<div className={styles.wrapper}>{documentValue}</div>
				</Tooltip>
			</div>

			<div className={styles.item}>
				{documentAmount?.length > 10 ? (
					<Tooltip
						content={(
							<div>
								{documentAmount}
							</div>
						)}
						placement="top"
					>
						<div className={styles.wrapper}>{getFormattedPrice(documentAmount, currency)}</div>
					</Tooltip>
				) : <div>{getFormattedPrice(documentAmount, currency)}</div>}
			</div>

			<div className={styles.item_exchange}>{exchangeRate}</div>

			<div style={{ display: 'flex', alignItems: 'center', width: '10%' }}>
				<EditInput
					itemData={item}
					setEditedValue={setEditedValue}
					handleCrossClick={handleCrossClick}
					types={type}
					setRestEdit={setRestEdit}
					restEdit={restEdit}
				/>

				{!checkEdit && !tdsEditable && isEditable && (
					<Button
						className={styles.edit_icon}
						onClick={() => {
							setEditeAble(item, true, false);
							setRestEdit(!restEdit);
						}}
					>
						<IcMEdit
							width="15px"
							height="15px"
						/>
					</Button>
				)}
			</div>

			<div style={{ display: 'flex', alignItems: 'center', width: '10%' }}>
				<NostroInput
					itemData={item}
					setEditedNostro={setEditedNostro}
					handleCrossClick={handleCrossClick}
					types={type}
					setRestEdit={setRestEdit}
					restEdit={restEdit}
				/>

				{!checkEdit && !nostroButton && !nostroEditable && isEditable && (
					<Button
						className={styles.edit_icon}
						onClick={() => {
							setEditeAble(item, false, false, true);
							setRestEdit(!restEdit);
						}}
					>
						<IcMEdit
							width="15px"
							height="15px"
						/>
					</Button>
				)}
			</div>

			<div className={styles.item}>
				{settledTds?.length > 10 ? (
					<Tooltip
						content={(
							<div>
								{settledTds}
							</div>
						)}
						placement="top"
					>
						<div className={styles.wrapper}>{getFormattedPrice(settledTds, currency)}</div>
					</Tooltip>
				) : <div>{getFormattedPrice(settledTds, currency)}</div>}
			</div>

			<div className={styles.item}>
				{balanceAmount?.length > 10 ? (
					<Tooltip
						content={(
							<div>
								{balanceAmount}
							</div>
						)}
						placement="top"
					>
						<div className={styles.wrapper}>{getFormattedPrice(balanceAmount, currency)}</div>
					</Tooltip>
				) : <div>{getFormattedPrice(balanceAmount, currency)}</div>}
			</div>

			<div style={{ display: 'flex', alignItems: 'center', width: '10%' }}>
				<EditInputAllocation
					itemData={item}
					handleCrossClick={handleCrossClick}
					setAllocationValue={setAllocationValue}
					setRestEdit={setRestEdit}
					restEdit={restEdit}
					types={type}
				/>

				{!allocationEditable && isEditable && (
					<Button
						className={styles.edit_icon}
						onClick={() => {
							setEditeAble(item, false, true);
							setRestEdit(!restEdit);
						}}
					>
						<IcMEdit
							width="15px"
							height="15px"
						/>
					</Button>
				)}
			</div>

			<div className={styles.item}>
				{balanceAfterAllocation?.length > 10 ? (
					<Tooltip
						content={(
							<div>
								{balanceAfterAllocation}
							</div>
						)}
						placement="top"
					>
						<div className={styles.wrapper}>{getFormattedPrice(balanceAfterAllocation, currency)}</div>
					</Tooltip>
				) : <div>{getFormattedPrice(balanceAfterAllocation, currency)}</div>}
			</div>

		</>
	);
}
export default Card;
