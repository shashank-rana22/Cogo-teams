import { Button, Input } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPlus, IcMCross, IcCFtick } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateBudgetAllocation from '../../../../hooks/useUpdateBudgetAllocation';

import styles from './styles.module.css';

const ZERO = 0;

function AllotedAmount({ item = {}, refetch, selectedDetails }) {
	const [inputValue, setInputValue] = useState(ZERO);
	const {
		updateBudget = () => {},
		loading,
		showSaveLink,
		setShowSaveLink,
	} = useUpdateBudgetAllocation({ refetch });
	const handleSave = (value) => {
		updateBudget({ value, inputValue });
	};

	const handleShow = () => {
		if (item?.status !== 'deactivated') {
			setShowSaveLink(true);
		}
	};

	return (
		<div className={styles.amount_div}>
			{showSaveLink ? (
				<>
					<div className={styles.input_styled}>
						<Input value={inputValue} type="number" onChange={setInputValue} />
					</div>
					<div className={styles.save_close}>
						<Button
							className={styles.link}
							disabled={loading}
							onClick={() => handleSave(item)}
						>
							<IcCFtick className={styles.saveicon} />
						</Button>
						<Button
							className={styles.link}
							disabled={loading}
							onClick={() => setShowSaveLink(false)}
						>
							<IcMCross className={styles.closeicon} />
						</Button>
					</div>
				</>
			) : (
				<div className={styles.styled_div}>
					<div className={styles.amount}>
						{formatAmount({
							amount   : item?.budget_amount || 0,
							currency : item?.budget_amount_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}
					</div>

					{selectedDetails?.status !== 'deactivated' ? (
						<Button
							className={styles.edit_button}
							style={{
								cursor: item.status === 'deactivated' ? 'no-drop' : 'pointer',
							}}
							disabled={loading}
							onClick={handleShow}
						>
							<IcMPlus height={21} width={21} className={styles.addicon} />
						</Button>
					) : null}
				</div>
			)}
		</div>
	);
}

export default AllotedAmount;
