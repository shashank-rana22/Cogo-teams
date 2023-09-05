import { ButtonIcon } from '@cogoport/components';
import { IcMDelete, IcMEdit, IcMTick, IcMLineundo } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import { getFormatAmount } from '../../../../../utils/getFormatAmount';

import styles from './styles.module.css';

const INITIAL_BAL = 0;
const STATUS = {
	Unpaid               : '#FEF1DF',
	Unutilized           : '#FEF1DF',
	Utilized             : '#CDF7D4',
	'Partially Paid'     : '#D9EAFD',
	Paid                 : '#CDF7D4',
	'Knocked Off'        : '#CDF7D4',
	'Partially Utilized' : '#D9EAFD',
};
export default function CardItem({
	itm = {},
	selectedData = [],
	setSelectedData = () => {},
	originalAllocation = 0,
	originalTDS = 0,
	setIsDelete = () => {},
	updatedData,
	setUpdateBal,
}) {
	const new_itm = itm;
	const {
		documentValue = '',
		documentAmount = 0,
		balanceAmount = 0,
		currency,
		settledTds = 0,
		exchangeRate = 0,
		nostroAmount = 0,
	} = new_itm || {};
	const [prevTDS, setPrevTDS] = useState(new_itm.tds);
	const [newTDS, setNewTDS] = useState(new_itm.tds);
	const [editedAllocation, setEditedAllocation] = useState(new_itm.allocationAmount);
	useEffect(() => {
		setNewTDS(new_itm.tds);
		setPrevTDS(new_itm.tds);
		setEditedAllocation(new_itm.allocationAmount);
		const total = updatedData.reduce((sum, item) => +sum + +item.balanceAmount
		* +item.exchangeRate * item.signFlag, INITIAL_BAL);
		setUpdateBal(total);
	}, [new_itm.tds, new_itm.allocationAmount, setUpdateBal, updatedData]);
	const [isEdnew_itmode, setIsEdnew_itmode] = useState(false);
	const [isTdsEdnew_itmode, setIsTdsEdnew_itmode] = useState(false);

	const EXC_RATE_FIXED = 2;
	const handleDeleteClick = (idToDelete) => {
		const updatedSelectedData = selectedData.filter((item) => item.id !== idToDelete);
		setIsDelete(true);
		setSelectedData(updatedSelectedData);
	};
	const ZERO_BALANCE = 0;
	const handleEditAllocation = () => {
		const newAllocation = parseFloat(new_itm.allocationAmount);
		const newBalanceAfterAllocation = parseFloat(
			+balanceAmount - parseFloat(new_itm.allocationAmount),
		);
		if (newAllocation >= ZERO_BALANCE && newAllocation <= balanceAmount) {
			setEditedAllocation(new_itm.allocationAmount);
			new_itm.balanceAfterAllocation = newBalanceAfterAllocation;
		} else {
			// j
		}
	};
	const handleEditTDS = () => {
		const tdsDifference = parseFloat(+new_itm.tds - +prevTDS);
		new_itm.balanceAmount -= +tdsDifference;
		new_itm.allocationAmount -= +tdsDifference;
		setEditedAllocation(new_itm.allocationAmount);
		setNewTDS(new_itm.tds);
		setPrevTDS(new_itm.tds);
	};
	useEffect(() => {
	}, [selectedData]);
	return (
		<div className={styles.Row}>
			<div className={styles.Card} style={{ '--colortype': STATUS[new_itm.status] }}>
				<div className={styles.ribbon}>{new_itm.status}</div>
				<div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/dragons.svg"
						alt="dragon icon"
					/>
				</div>
				<div>
					<div className={styles.ContainerDiv}>
						{documentValue}
					</div>
				</div>
				<div>
					{getFormatAmount(documentAmount, currency)}
				</div>
				<div className={styles.rate}>{exchangeRate?.toFixed(EXC_RATE_FIXED)}</div>
				<div>
					{isTdsEdnew_itmode ? (
						<>
							<input
								type="number"
								value={newTDS}
								onChange={(e) => setNewTDS(e.target.value)}
							/>
							<ButtonIcon
								size="lg"
								icon={<IcMTick />}
								themeType="primary"
								onClick={() => {
									setIsTdsEdnew_itmode(false);
									new_itm.tds = parseFloat(newTDS);
									handleEditTDS();
								}}
							/>
							<ButtonIcon
								size="lg"
								icon={<IcMLineundo />}
								themeType="primary"
								onClick={() => {
									setIsTdsEdnew_itmode(false);
									new_itm.tds = originalTDS;
									setNewTDS(originalTDS);
									setPrevTDS(originalTDS);
									handleEditTDS();
								}}
							/>
						</>
					)
						:					(
							<>
								{getFormatAmount(new_itm?.tds, currency)}
								<ButtonIcon
									size="lg"
									icon={(
										<IcMEdit
											height={14}
											width={14}
											onClick={() => { setIsTdsEdnew_itmode(true); }}
										/>
									)}
									themeType="primary"
								/>
							</>
						)}
				</div>
				<div>
					{getFormatAmount(nostroAmount, currency)}
				</div>
				<div>
					{getFormatAmount(settledTds, currency)}
				</div>
				<div>
					{getFormatAmount(balanceAmount, currency)}
				</div>
				<div>
					{
					isEdnew_itmode
						? (
							<>
								<input
									type="number"
									value={editedAllocation}
									onChange={(e) => { setEditedAllocation(e.target.value); }}
								/>
								<ButtonIcon
									size="lg"
									icon={<IcMTick />}
									themeType="primary"
									onClick={() => {
										setIsEdnew_itmode(false);
										new_itm.allocationAmount = parseFloat(editedAllocation);
										handleEditAllocation();
									}}
								/>
								<ButtonIcon
									size="lg"
									icon={<IcMLineundo />}
									themeType="primary"
									onClick={() => {
										setIsEdnew_itmode(false);
										new_itm.allocationAmount = originalAllocation;
										handleEditAllocation();
									}}
								/>
							</>
						)
						:					(
							<>
								{getFormatAmount(new_itm?.allocationAmount, currency)}
								<ButtonIcon
									size="lg"
									icon={(
										<IcMEdit
											height={14}
											width={14}
											onClick={() => { setIsEdnew_itmode(true); }}
										/>
									)}
									themeType="primary"
								/>
							</>
						)
                    }
				</div>
				<div>
					{getFormatAmount(new_itm?.balanceAfterAllocation, currency)}
				</div>
				<div>
					<ButtonIcon
						size="lg"
						icon={<IcMDelete />}
						themeType="primary"
						onClick={() => handleDeleteClick(new_itm?.id)}
					/>
				</div>
			</div>
		</div>
	);
}
