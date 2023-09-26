import { Input } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPlus, IcMCross, IcCFtick } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateBudgetAllocation from '../../../../hooks/useUpdateBudgetAllocation';

import styles from './styles.module.css';

const ZERO = 0;

function AllotedAmount({ item = {}, refetch, selectedDetails }) {
	const [showSaveLink, setShowSaveLink] = useState(false);

	const [inputValue, setInputValue] = useState(ZERO);
	const { updateBudget } = useUpdateBudgetAllocation({
		setShowSaveLink,
		refetch,
	});
	const handleSave = (value) => {
		updateBudget(value, inputValue);
	};

	const handleShow = (val) => {
		if (val.status !== 'deactivated') {
			setShowSaveLink(true);
		}
	};
	return (
		<div className={styles.amount_div}>
			{!showSaveLink ? (
				<div className={styles.styled_div}>
					<div className={styles.amount}>
						{formatAmount({
							amount   : item.budget_amount || ZERO,
							currency : item.budget_amount_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}
					</div>
					{selectedDetails?.status !== 'deactivated' && (
						<div
							className={styles.edit_button}
							role="button"
							tabIndex={0}
							style={{
								cursor: item.status === 'deactivated' ? 'no-drop' : 'pointer',
							}}
							onClick={() => handleShow(item)}
						>
							<IcMPlus height={21} width={21} className={styles.addicon} />
						</div>
					)}
				</div>
			) : null}
			{showSaveLink ? (
				<>
					<div className={styles.input_styled}>
						<Input
							className="primary sm"
							value={inputValue}
							type="number"
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</div>
					<div className={styles.save_close}>
						<div
							role="button"
							tabIndex={0}
							className={styles.link}
							onClick={() => handleSave(item)}
						>
							<IcCFtick className="saveicon" />
						</div>
						<div
							role="button"
							tabIndex={0}
							className={styles.link}
							onClick={() => setShowSaveLink(false)}
						>
							<IcMCross className="closeicon" />
						</div>
					</div>
				</>
			) : null}
		</div>
	);
}

export default AllotedAmount;
