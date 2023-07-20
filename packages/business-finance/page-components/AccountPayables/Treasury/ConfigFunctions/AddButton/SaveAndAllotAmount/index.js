import { Modal } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import EnterAmountBox from './EnterAmountBox';
import Request from './Request';
import styles from './styles.module.css';

const commonFormatAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style           : 'currency',
		currencyDisplay : 'code',
	},
});

function SaveAndAllotAmount({ itemData = {}, setShowModal = () => {}, refetch = () => {}, showModel = false }) {
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
		<Modal
			size="lg"
			show={showModel}
			onClose={() => {
				setShowModal(false);
			}}
		>
			<Modal.Header title={(
				<div className={styles.header_text}>
					UPDATED BALANCE -
					{' '}
					{bankname}
					{' '}
					-
					{' '}
					{bankAccountNo}
				</div>
			)}
			/>
			<div className={styles.container}>

				<div className={styles.sub_container}>
					{pendingRequestsCount ? (
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
							{commonFormatAmount(allocatedAmount, currency)}
						</div>
					</div>
					<div className={styles.amount_container}>
						<div className={styles.label_text}>Utilized</div>
						<div className={styles.value_text}>
							{commonFormatAmount(utilizedAmount, currency)}
						</div>
					</div>
					<div className={styles.amount_container}>
						<div className={styles.label_text}>Balance</div>
						<div className={styles.value_text}>
							{commonFormatAmount(balance, currency)}
						</div>
					</div>
				</div>
				{pendingRequestsCount ? (
					<div>
						{(fundRequests || []).map((item, index) => (
							<Request
								key={item?.id}
								item={item}
								index={index}
								currency={currency}
								refetch={refetch}
							/>
						))}
					</div>
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
		</Modal>
	);
}
export default SaveAndAllotAmount;
