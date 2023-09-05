import { ButtonIcon } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import EditFields from './EditFields';
import styles from './styles.module.css';

const INITIAL_BAL = 0;
const KEY_TDS = 'tds';
const KEY_ALLOCATION = 'allocation';

export default function CardItem({
	itm = {},
	selectedData = [],
	setSelectedData = () => {},
	originalAllocation = 0,
	originalTDS = 0,
	setIsDelete = () => {},
	updatedData,
	setUpdateBal,
	isError = false,
}) {
	const new_itm = itm;
	const {
		documentValue = '',
		documentAmount = 0,
		balanceAmount = 0,
		currency,
		settledTds = 0,
		exchangeRate = 0,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [new_itm.tds, new_itm.allocationAmount]);
	const [isEdnew_itmode, setIsEdnew_itmode] = useState(false);
	const [isTdsEdnew_itmode, setIsTdsEdnew_itmode] = useState(false);
	const STATUS = {
		Unpaid               : '#FEF1DF',
		Unutilized           : '#FEF1DF',
		Utilized             : '#CDF7D4',
		'Partially Paid'     : '#D9EAFD',
		Paid                 : '#CDF7D4',
		'Knocked Off'        : '#CDF7D4',
		'Partially Utilized' : '#D9EAFD',
	};
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
					{currency}
					{'  '}
					{documentAmount}
				</div>
				<div className={styles.rate}>{exchangeRate?.toFixed(EXC_RATE_FIXED)}</div>
				<div>

					{
					isTdsEdnew_itmode
						? (
							<EditFields
								isError={isError}
								inputvalue={newTDS}
								inputSet={setNewTDS}
								originalTDS={originalTDS}
								doneSet={setIsTdsEdnew_itmode}
								handleFunc={handleEditTDS}
								newItem={new_itm}
								setNewTDS={setNewTDS}
								setPrevTDS={setPrevTDS}
								fieldType={KEY_TDS}
							/>
						)
						:					(
							<div className={styles.flex}>
								{currency}
								{'  '}
								{new_itm?.tds}
								<IcMEdit
									height={14}
									width={14}
									className={styles.btn}
									onClick={() => { setIsTdsEdnew_itmode(true); }}
									themeType="primary"
								/>
							</div>
						)
                    }
				</div>
				<div>
					{currency}
					{'  '}
					{new_itm?.nostroAmount}
				</div>
				<div>
					{currency}
					{'  '}
					{settledTds}
				</div>
				<div>
					{currency}
					{'  '}
					{balanceAmount}
				</div>
				<div>
					{
					isEdnew_itmode
						? (
							<EditFields
								isError={isError}
								inputvalue={editedAllocation}
								inputSet={setEditedAllocation}
								doneSet={setIsEdnew_itmode}
								handleFunc={handleEditAllocation}
								newItem={new_itm}
								originalAllocation={originalAllocation}
								fieldType={KEY_ALLOCATION}
							/>
						)
						:					(
							<>
								{currency}
								{'  '}
								{new_itm?.allocationAmount}
								<IcMEdit
									height={14}
									width={14}
									className={styles.btn}
									onClick={() => { setIsEdnew_itmode(true); }}
									themeType="primary"
								/>
							</>
						)
                    }
				</div>
				<div>
					{currency}
					{'  '}
					{new_itm?.balanceAfterAllocation}
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
