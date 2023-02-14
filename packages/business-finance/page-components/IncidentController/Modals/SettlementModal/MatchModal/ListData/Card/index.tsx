import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMEdit, IcMGrid } from '@cogoport/icons-react';

import EditInput from './EditInput';
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

	const statusColor = {
		Unpaid               : '#FEF1DF',
		Unutilized           : '#FEF1DF',
		Utilized             : '#CDF7D4',
		'Partially Paid'     : '#D9EAFD',
		Paid                 : '#CDF7D4',
		'Knocked Off'        : '#CDF7D4',
		'Partially Utilized' : '#D9EAFD',
	};
	return (
		<>
			<div className={styles.ribbon} style={{ background: statusColor[item.status] }}>{status}</div>
			<div><IcMGrid /></div>
			<div>
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
			<div>
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

			<div>{exchangeRate}</div>

			<div style={{ display: 'flex' }}>
				<EditInput
					itemData={item}
					setEditedValue={setEditedValue}
					handleCrossClick={handleCrossClick}
					types={type}
					setRestEdit={setRestEdit}
					restEdit={restEdit}
				/>

				{!checkEdit && !tdsEditable && isEditable && (
					<div
						role="presentation"
						onClick={() => {
							setEditeAble(item, true, false);
							setRestEdit(!restEdit);
						}}
					>
						<IcMEdit />
					</div>
				)}
			</div>

			<div style={{ display: 'flex' }}>
				<NostroInput
					itemData={item}
					setEditedNostro={setEditedNostro}
					handleCrossClick={handleCrossClick}
					types={type}
					setRestEdit={setRestEdit}
					restEdit={restEdit}
				/>

				{!checkEdit && !nostroButton && !nostroEditable && isEditable && (
					<div
						role="presentation"
						onClick={() => {
							setEditeAble(item, true, false);
							setRestEdit(!restEdit);
						}}
					>
						<IcMEdit />
					</div>
				)}
			</div>

		</>
	);
}
export default Card;
