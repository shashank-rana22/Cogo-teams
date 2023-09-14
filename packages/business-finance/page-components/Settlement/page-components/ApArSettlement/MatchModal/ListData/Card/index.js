import { cl, Tooltip, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDelete, IcMEdit, IcMDrag, IcMCopy } from '@cogoport/icons-react';
import { copyToClipboard } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import { getFormatAmount } from '../../../../../utils/getFormatAmount';

import EditFields from './EditFields';
import styles from './styles.module.css';

const DOC_LENGTH = 10;

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
const ZERO_BALANCE = 0;
const EXC_RATE_FIXED_LENGTH = 2;

const onClickCopy = (documentValue = '', t = () => {}) => {
	copyToClipboard(documentValue, 'Document Value');
	Toast.success(t('settlement:copied_text_success_message'));
};

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
	setCanSettle = () => {},
}) {
	const { t = () => {} } = useTranslation(['settlement']);
	const cardData = itm;
	const {
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
	const handleDeleteClick = (idToDelete = '') => {
		const UPDATED_SELECTED_DATA = selectedData?.filter((item) => item?.id !== idToDelete);
		setIsDelete(true);
		setSelectedData(UPDATED_SELECTED_DATA);
		setCanSettle(false);
	};

	const handleEditAllocation = () => {
		const NEW_ALLOCATION = parseFloat(cardData?.allocationAmount) || INITIAL_BAL;
		const NEW_BALANCE_AFTER_ALLOCATION = parseFloat(+balanceAmount - NEW_ALLOCATION) || INITIAL_BAL;

		if (NEW_ALLOCATION >= ZERO_BALANCE && NEW_ALLOCATION <= balanceAmount) {
			setEditedAllocation(NEW_ALLOCATION);
			cardData.balanceAfterAllocation = NEW_BALANCE_AFTER_ALLOCATION;
		}
	};

	const handleEditTDS = () => {
		const TDS_DIFFERENCE = parseFloat(+cardData.tds - +prevTDS) || INITIAL_BAL;
		cardData.balanceAmount -= +TDS_DIFFERENCE;
		cardData.allocationAmount -= +TDS_DIFFERENCE;
		setEditedAllocation(cardData?.allocationAmount);
		setNewTDS(cardData?.tds);
		setPrevTDS(cardData?.tds);
	};

	useEffect(() => {
		setNewTDS(cardData?.tds);
		setPrevTDS(cardData?.tds);
		setEditedAllocation(cardData?.allocationAmount);
		const TOTAL = updatedData?.reduce((sum, item) => {
			const balAmt = +item.balanceAmount || INITIAL_BAL;
			const excRate = +item.exchangeRate || INITIAL_BAL;
			const signFlag = item.signFlag || INITIAL_BAL;
			return sum + balAmt * excRate * signFlag;
		}, INITIAL_BAL);
		setUpdateBal(TOTAL);
	}, [cardData?.tds, cardData?.allocationAmount, setUpdateBal, updatedData]);
	return (
		<div className={styles.row}>
			<div className={styles.card} style={{ '--colortype': STATUS[cardData?.status || ''] }}>
				<div className={styles.ribbon}>{cardData?.status}</div>

				<div className={cl`${styles.icon_div} ${styles.flex}`}>
					<IcMDrag
						className={styles.icon}
						height={40}
						width={40}
					/>
				</div>

				<div className={cl`${styles.ContainerDiv} ${styles.flex}`}>
					<Tooltip
						content={(
							<div>
								{cardData?.documentValue || ''}
								<IcMCopy
									width={18}
									height={18}
									onClick={() => onClickCopy(cardData?.documentValue || '', t)}
									className={styles.copy_icon}
								/>
							</div>
						)}
						interactive
					>
						<div>
							{(cardData?.documentValue && cardData?.documentValue?.length > DOC_LENGTH
								? `${cardData?.documentValue.substr(GLOBAL_CONSTANTS.zeroth_index, DOC_LENGTH)}...`
								: cardData?.documentValue) || '-'}
						</div>
					</Tooltip>
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
								t={t}
							/>
						)
						:					(
							<div className={styles.flex}>
								{getFormatAmount(cardData?.tds || '', currency)}
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
								t={t}
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
					onClick={() => handleDeleteClick(cardData?.id || '')}
					fill="#ED3726"
					className={styles.icon}
				/>
			</div>
		</div>
	);
}
