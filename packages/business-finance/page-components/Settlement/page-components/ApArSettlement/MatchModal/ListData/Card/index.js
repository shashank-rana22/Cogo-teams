import { ButtonIcon } from '@cogoport/components';
import { IcMDelete, IcMEdit, IcMTick, IcMLineundo } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';

export default function CardItem({
	itm = {},
	selectedData = [],
	setSelectedData = () => {},
	originalAllocation = 0,
	originalTDS = 0,
	reRender = false,
	setIsDelete = () => {},
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reRender]);
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
		const newAllocation = new_itm.allocationAmount;
		const newBalanceAfterAllocation = parseFloat(
			balanceAmount - new_itm.allocationAmount,
		);
		if (newAllocation >= ZERO_BALANCE && newAllocation <= balanceAmount) {
			setEditedAllocation(new_itm.allocationAmount);
			new_itm.balanceAfterAllocation = newBalanceAfterAllocation;
		} else {
			// hb
		}
	};
	const handleEditTDS = () => {
		const tdsDifference = new_itm.tds - prevTDS;

		new_itm.balanceAmount -= tdsDifference;
		new_itm.allocationAmount -= tdsDifference;
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
										new_itm.tds = newTDS;
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
								{currency}
								{'  '}
								{new_itm?.tds}
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
										new_itm.allocationAmount = editedAllocation;
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
								{currency}
								{'  '}
								{new_itm?.allocationAmount}
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
