import { cl } from '@cogoport/components';
import { IcMDelete, IcMEdit, IcMDrag } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import showOverflowingNumber from '../../../../../../commons/showOverflowingNumber.tsx';
import { getFormatAmount } from '../../../../../utils/getFormatAmount';

import EditFields from './EditFields';
import styles from './styles.module.css';

const STATUS = {
	Unpaid               : '#edd7a9',
	Unutilized           : '#FEF1DF',
	Utilized             : '#CDF7D4',
	'Partially Paid'     : '#D9EAFD',
	Paid                 : '#CDF7D4',
	'Knocked Off'        : '#CDF7D4',
	'Partially Utilized' : '#D9EAFD',
};
const INITIAL_BAL = 0;
const KEY_TDS = 'tds';
const KEY_ALLOCATION = 'allocation';
const TRUNCATION_LENGTH = 10;
const ZERO_BALANCE = 0;
const EXC_RATE_FIXED_LENGTH = 2;

export default function CardItem({
	itm = {},
	selectedData = [],
	setSelectedData = () => {},
	originalAllocation = 0,
	originalTDS = 0,
	setIsDelete = () => {},
	updatedData = [],
	setUpdateBal = () => {},
	isError = false,
}) {
	const cardData = itm;
	const {
		documentValue = '',
		documentAmount = 0,
		balanceAmount = 0,
		currency,
		settledTds = 0,
		exchangeRate = 0,
		nostroAmount = 0,
	} = cardData || {};
	const [prevTDS, setPrevTDS] = useState(cardData.tds);
	const [newTDS, setNewTDS] = useState(cardData.tds);
	const [editedAllocation, setEditedAllocation] = useState(cardData.allocationAmount);
	const [isEdnew_itmode, setIsEdnew_itmode] = useState(false);
	const [isTdsEdnew_itmode, setIsTdsEdnew_itmode] = useState(false);
	const handleDeleteClick = (idToDelete) => {
		const UPDATED_SELECTED_DATA = selectedData.filter((item) => item.id !== idToDelete);
		setIsDelete(true);
		setSelectedData(UPDATED_SELECTED_DATA);
	};
	const handleEditAllocation = () => {
		const NEW_ALLOCATION = parseFloat(cardData.allocationAmount);
		const NEW_BALANCE_AFTER_ALLOCATION = parseFloat(
			+balanceAmount - parseFloat(cardData.allocationAmount),
		);
		if (NEW_ALLOCATION >= ZERO_BALANCE && NEW_ALLOCATION <= balanceAmount) {
			setEditedAllocation(cardData.allocationAmount);
			cardData.balanceAfterAllocation = NEW_BALANCE_AFTER_ALLOCATION;
		}
	};
	const handleEditTDS = () => {
		const TDS_DIFFERENCE = parseFloat(+cardData.tds - +prevTDS);
		cardData.balanceAmount -= +TDS_DIFFERENCE;
		cardData.allocationAmount -= +TDS_DIFFERENCE;
		setEditedAllocation(cardData.allocationAmount);
		setNewTDS(cardData.tds);
		setPrevTDS(cardData.tds);
	};
	useEffect(() => {
		setNewTDS(cardData.tds);
		setPrevTDS(cardData.tds);
		setEditedAllocation(cardData.allocationAmount);
		const TOTAL = updatedData.reduce((sum, item) => +sum + +item.balanceAmount
		* +item.exchangeRate * item.signFlag, INITIAL_BAL);
		setUpdateBal(TOTAL);
	}, [cardData.tds, cardData.allocationAmount, setUpdateBal, updatedData]);
	useEffect(() => {
	}, [selectedData]);
	return (
		<div className={styles.row}>
			<div className={styles.card} style={{ '--colortype': STATUS[cardData.status] }}>
				<div className={styles.ribbon}>{cardData.status}</div>

				<div className={cl`${styles.icon_div} ${styles.flex}`}>
					<IcMDrag
						className={styles.icon}
						height={30}
						width={30}
					/>
				</div>

				<div className={cl`${styles.ContainerDiv} ${styles.flex}`}>
					{showOverflowingNumber(documentValue || '-', TRUNCATION_LENGTH)}
				</div>

				<div className={cl`${styles.formattedamount} ${styles.flex}`}>
					{getFormatAmount(documentAmount, currency)}
				</div>

				<div className={cl`${styles.rate} ${styles.flex}`}>{exchangeRate?.toFixed(EXC_RATE_FIXED_LENGTH)}</div>
				<div className={cl`${styles.edited_fields} ${styles.flex}`}>
					{
					(isTdsEdnew_itmode)
						? (
							<EditFields
								isError={isError}
								inputvalue={newTDS}
								inputSet={setNewTDS}
								originalTDS={originalTDS}
								doneSet={setIsTdsEdnew_itmode}
								handleFunc={handleEditTDS}
								newItem={cardData}
								setNewTDS={setNewTDS}
								setPrevTDS={setPrevTDS}
								fieldType={KEY_TDS}
							/>
						)
						:					(
							<div className={styles.flex}>
								{getFormatAmount(cardData?.tds, currency)}
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
				<div className={cl`${styles.formattedamount} ${styles.flex} ${styles.nostro}`} style={{ width: '10%' }}>
					{getFormatAmount(nostroAmount, currency)}
				</div>
				<div className={cl`${styles.formattedamount} ${styles.flex}`}>
					{getFormatAmount(settledTds, currency)}
				</div>
				<div className={cl`${styles.formattedamount} ${styles.flex}`}>
					{getFormatAmount(balanceAmount, currency)}
				</div>
				<div className={cl`${styles.edited_fields} ${styles.flex}`}>
					{
					isEdnew_itmode
						? (
							<EditFields
								isError={isError}
								inputvalue={editedAllocation}
								inputSet={setEditedAllocation}
								doneSet={setIsEdnew_itmode}
								handleFunc={handleEditAllocation}
								newItem={cardData}
								originalAllocation={originalAllocation}
								fieldType={KEY_ALLOCATION}
							/>
						)
						:					(
							<>
								{getFormatAmount(cardData?.allocationAmount, currency)}
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
				<div className={cl`${styles.formattedamount} ${styles.flex}`}>
					{getFormatAmount(cardData?.balanceAfterAllocation, currency)}
				</div>

				<IcMDelete
					height={16}
					width={16}
					onClick={() => handleDeleteClick(cardData?.id)}
					fill="#ED3726"
					className={styles.icon}
				/>
			</div>
		</div>
	);
}
