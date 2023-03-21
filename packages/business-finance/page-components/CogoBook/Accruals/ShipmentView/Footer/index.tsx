import { Modal, Button, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcCError } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

function Footer({
	checkedData, payload, viewSelected,
	showBtn,
	addSelect,
	actionConfirm = () => {},
	shipmentLoading,
	setCheckedRows,
	isBookedActive = false,
	checkedRowsSerialId,
}) {
	const { push, query } = useRouter();
	const { sub_active:subActive, active_tab:activeTab } = query;
	const [openModal, setOpenModal] = useState(false);

	const onSubmit = () => {
		push(
			'/business-finance/cogo-book/selected_invoice',
			'/business-finance/cogo-book/selected_invoice',
		);
	};
	const [show, setShow] = useState(false);
	const currency = (payload || checkedData)[0]?.expenseCurrency;
	const totalIExpense = (payload || checkedData)
		?.reduce((acc, obj) => +acc + +obj.expenseBooked + +obj.expenseAccrued, 0);
	const totalIncome = (payload || checkedData)
		?.reduce((acc, obj) => +acc + +obj.incomeBooked + +obj.incomeAccrued, 0);

	console.log(totalIExpense, 'totalIExpense');
	return (
		<div className={styles.div_footer}>
			<div className={styles.container}>
				<div className={styles.title}>Expense</div>
				<div className={styles.div_currency}>
					<div className={styles.currency_value}>
						{getFormattedPrice(
							totalIExpense.toFixed(2),
							currency,
						) || 'INR 0'}
					</div>

				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.title}>Income</div>
				<div className={styles.div_currency}>
					<div className={styles.currency_value}>
						{getFormattedPrice(
							totalIncome.toFixed(2),
							currency,
						) || 'INR 0'}
					</div>

				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.title}>SID</div>
				<div className={styles.div_sid}>
					{(payload || checkedData)?.length}
				</div>
			</div>

			<div className={styles.button_div}>
				{showBtn && viewSelected && (
					<div className={styles.alert_icon_div}>
						<Tooltip
							placement="top"
							content="Please ensure all the filters are selected and apply"
						>
							<div>
								<IcCError className="alert_icon" size={1.5} />
							</div>
						</Tooltip>
					</div>
				)}
				{(activeTab || subActive) && (
					<div className={styles.button_container}>
						<Button
							type="submit"
							themeType="secondary"
							className={styles.add_to_select}
							disabled={shipmentLoading || payload.length === 0}
							onClick={() => {
								setOpenModal(true);
							}}
						>
							Add to Selected
						</Button>
						<Button
							type="submit"
							themeType="primary"
							disabled={shipmentLoading || viewSelected}
							onClick={() => {
								onSubmit();
								setCheckedRows({});
							}}
						>
							View Selected SID
						</Button>
					</div>
				)}
				{!subActive && !activeTab && (
					<Button
						type="submit"
						themeType="primary"
						disabled={shipmentLoading || checkedRowsSerialId.length === 0}
						onClick={() => setShow(true)}
					>
						Action
					</Button>
				)}
				{show && (
					<Modal show={show} onClose={() => setShow(false)} width={500}>
						<Modal.Body>
							<div
								className={styles.flex_modal}
							>
								<IcCError size={2} />
								{isBookedActive ? (
									<div style={{ margin: '20px' }}>Are you sure you want to book?</div>
								) : (
									<div style={{ margin: '20px' }}>Are you sure you want to accrue?</div>
								)}
								<div className={styles.flex}>
									<Button
										id="cancel-modal-btn"
										style={{ marginRight: 10 }}
										themeType="secondary"
										onClick={() => setShow(false)}
									>
										Cancel
									</Button>
									<Button
										id="approve-modal-btn"
										themeType="primary"
										onClick={() => {
											actionConfirm(isBookedActive);
											setShow(false);
										}}
									>
										Confirm
									</Button>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				)}
			</div>
			{openModal && (
				<Modal show={openModal} onClose={() => setOpenModal(false)} width={500}>
					<Modal.Body>
						<div className={styles.flex_modal}>
							<div style={{ margin: '20px' }}>Are you sure you want to select this?</div>
							<div className={styles.flex}>
								<Button
									id="cancel-modal-btn"
									style={{ marginRight: 10 }}
									themeType="secondary"
									onClick={() => setOpenModal(false)}
								>
									Cancel
								</Button>
								<Button
									id="approve-modal-btn"
									cthemeType="primary"
									onClick={() => {
										addSelect();
										setOpenModal(false);
										setCheckedRows({});
									}}
								>
									Confirm
								</Button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}

		</div>

	);
}
export default Footer;
