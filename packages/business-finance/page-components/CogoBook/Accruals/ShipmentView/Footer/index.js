import { RadioGroup, Modal, Button, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcCError } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import { optionsRadio } from '../../constant';

import styles from './styles.module.css';

function Footer({
	checkedData = [],
	payload = [],
	viewSelected = false,
	showBtn = false,
	addSelect,
	actionConfirm = () => {},
	shipmentLoading = false,
	setCheckedRows = () => {},
	actionConfirmedLoading = false,
	setBulkSection = () => {},
	selectedDataLoading = false,
	isBookedActive = false,
	bulkSection = {},
	checkedRowsSerialId = [],
}) {
	const { query } = useRouter();
	const { sub_active:subActive, active_tab:activeTab } = query;
	const [openModal, setOpenModal] = useState(false);

	const [show, setShow] = useState(false);
	const currency = (payload || checkedData)[0]?.expenseCurrency;
	const totalIExpense = (payload || checkedData)
		?.reduce((acc, obj) => +acc + +obj.expenseBilled + +obj.expenseUnbilled, 0);
	const totalIncome = (payload || checkedData)
		?.reduce((acc, obj) => +acc + +obj.incomeBilled + +obj.incomeUnbilled, 0);

	const { bulkAction, value } = bulkSection || {};

	return (
		<div className={styles.div_footer}>
			<div className={styles.container}>
				<div className={styles.title}>Expense</div>
				<div className={styles.div_currency}>
					<div className={styles.currency_value}>
						{formatAmount({
							amount  :	totalIExpense.toFixed(2),
							currency,
							options : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						}) }
					</div>

				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.title}>Income</div>
				<div className={styles.div_currency}>
					<div className={styles.currency_value}>
						{formatAmount({
							amount  :	totalIncome.toFixed(2),
							currency,
							options : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						}) }
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
								<IcCError className="alert_icon" />
							</div>
						</Tooltip>
					</div>
				)}
				{(activeTab || subActive) && (
					<div className={styles.button_container}>
						<Button
							type="submit"
							themeType="primary"
							className={styles.add_to_select}
							disabled={shipmentLoading || payload.length === 0}
							onClick={() => {
								setOpenModal(true);
							}}
						>
							Accrue Shipment
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
					<Modal show={show} onClose={() => setShow(false)}>
						<Modal.Body>
							<div
								className={styles.flex_modal}
							>
								{isBookedActive ? (
									<div className={!value ? styles.margin : styles.margin_not}>

										{!value ? 'Are you sure you want to book?'
											: 'Please Choose The Selection Mode' }

									</div>
								) : (
									<div className={!value ? styles.margin : styles.margin_not}>
										{!value ? 'Are you sure you want to accrue?'
											: 'Please Choose The Selection Mode' }

									</div>
								)}
								{value && (
									<div>
										<RadioGroup
											options={optionsRadio}
											value={bulkAction}
											onChange={(val) => {
												setBulkSection((prev) => ({
													...prev,
													bulkAction: val,
												}));
											}}
										/>
									</div>
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
										loading={actionConfirmedLoading}
										disabled={!bulkAction && value}
										onClick={() => {
											actionConfirm({ isBookedActive, setShow });
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
				<Modal show={openModal} onClose={() => setOpenModal(false)}>
					<Modal.Body>
						<div className={styles.flex_modal}>
							<div className={styles.margin_not}>
								Do you want to Accrue selected shipments?
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.flex}>
							<Button
								id="cancel-modal-btn"
								style={{ marginRight: 10 }}
								themeType="secondary"
								onClick={() => setOpenModal(false)}
							>
								No
							</Button>
							<Button
								id="approve-modal-btn"
								themeType="primary"
								loading={selectedDataLoading}
								onClick={() => {
									addSelect(setOpenModal);
									setCheckedRows({});
								}}
							>
								Yes
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}

		</div>

	);
}
export default Footer;
