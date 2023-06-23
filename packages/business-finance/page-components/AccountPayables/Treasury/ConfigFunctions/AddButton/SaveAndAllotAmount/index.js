import formatAmount from '@cogoport/globalization/utils/formatAmount';

import EnterAmountBox from './EnterAmountBox';
import Request from './Request';
import styles from './styles.module.css';

function SaveAndAllotAmount({ itemData, setShowModal, refetch }) {
	const {
		allocatedAmount,
		balance,
		utilizedAmount,
		currency = '',
		bankname = '',
		bankAccountNo = '',
		pendingRequestsCount,
		fundRequests,
	} = itemData || {};

	return (
		<div className={styles.container}>
			<div className={styles.header_text}>
				UPDATED BALANCE -
				{' '}
				{bankname}
				{' '}
				-
				{' '}
				{bankAccountNo}
			</div>
			<div className={styles.sub_container}>
				{pendingRequestsCount > 0 ? (
					<div className={styles.bank}>
						<div className={styles.label_text}>Bank A/C</div>
						<div className={styles.value_text}>
							{bankname}
							{' '}
						</div>
						<div className={styles.value_text}>{bankAccountNo}</div>
					</div>
				) : null}
				<div className={styles.amount_container}>
					<div className={styles.label_text}>Allocated Funds</div>
					<div className={styles.value_text}>
						{
                        formatAmount({
                        	amount  : allocatedAmount,
                        	currency,
                        	options : {
                        		style           : 'currency',
                        		currencyDisplay : 'code',
                        	},
                        })
}
					</div>
				</div>
				<div className={styles.amount_container}>
					<div className={styles.label_text}>Utilized</div>
					<div className={styles.value_text}>
						{
                        formatAmount({
                        	amount  : utilizedAmount,
                        	currency,
                        	options : {
                        		style           : 'currency',
                        		currencyDisplay : 'code',
                        	},
                        })
                    }
					</div>
				</div>
				<div className={styles.amount_container}>
					<div className={styles.label_text}>Balance</div>
					<div className={styles.value_text}>
						{
                        formatAmount({
                        	amount  : utilizedAmount,
                        	balance,
                        	options : {
                        		style           : 'currency',
                        		currencyDisplay : 'code',
                        	},
                        })
                    }
					</div>
				</div>
			</div>
			{pendingRequestsCount > 0 ? (
				<>
					{(fundRequests || []).map((item, index) => (
						<Request
							item={item}
							index={index}
							currency={currency}
							refetch={refetch}
						/>
					))}
				</>
			) : (
				<div className={styles.allot_amount}>
					<div className={styles.text}>Allot Amount</div>
					<EnterAmountBox
						itemData={itemData}
						setShowModal={setShowModal}
						refetch={refetch}
					/>
				</div>
			)}
		</div>
	);
}
export default SaveAndAllotAmount;
