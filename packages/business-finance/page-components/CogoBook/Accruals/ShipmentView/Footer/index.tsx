import { RadioGroup, Modal, Button, Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcCError } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import { optionsRadio, optionsRadioData } from '../../constant';
import { FilterInterface } from '../../interface';

import styles from './styles.module.css';

interface FooterInterface {
	actionConfirm?: (isBookedActive: any) => void
	checkedData?: any[]
	shipmentLoading?:boolean
	checkedRowsSerialId?: any[]
	isBookedActive?: boolean
	setCheckedRows: React.Dispatch<React.SetStateAction<{}>>
	addSelect?: (setOpenModal: any) => Promise<void>
	payload?: any[]
	filters?:FilterInterface
	viewSelected?: boolean
	showBtn?: boolean
	bulkSection?:{ value?:boolean, bulkAction?:string }
	setBulkSection?: React.Dispatch<React.SetStateAction<{}>>
	selectedDataLoading?:boolean
	actionConfirmedLoading?:boolean
}

function Footer({
	checkedData,
	payload,
	viewSelected,
	showBtn,
	addSelect,
	actionConfirm = () => {},
	shipmentLoading,
	setCheckedRows,
	actionConfirmedLoading,
	setBulkSection,
	selectedDataLoading,
	isBookedActive = false,
	bulkSection,
	checkedRowsSerialId,
	filters,
}:FooterInterface) {
	const { push, query } = useRouter();
	const { sub_active:subActive, active_tab:activeTab } = query;
	const [openModal, setOpenModal] = useState(false);

	const { year = '', month = '', tradeType = '', service = '', shipmentType = '' } = filters || {};

	const onSubmit = () => {
		push(
			`/business-finance/cogo-book/selected_invoice?year=${year
			}&month=${month}&tradeType=${tradeType}&service=${service}&shipmentType=${shipmentType}
            `,
			`/business-finance/cogo-book/selected_invoice?year=${year
			}&month=${month}&tradeType=${tradeType}&service=${service}&shipmentType=${shipmentType}`,
		);
	};

	const [show, setShow] = useState(false);
	const currency = (payload || checkedData)[0]?.expenseCurrency;
	const totalIExpense = (payload || checkedData)
		?.reduce((acc, obj) => +acc + +obj.expenseBooked + +obj.expenseAccrued, 0);
	const totalIncome = (payload || checkedData)
		?.reduce((acc, obj) => +acc + +obj.incomeBooked + +obj.incomeAccrued, 0);

	const { bulkAction, value } = bulkSection || {};

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
							Add to Selected
						</Button>
						<Button
							type="submit"
							themeType="secondary"
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
										disabled={!bulkAction}
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
								Please Choose The Selection Mode
							</div>

							<div>
								<RadioGroup
									options={optionsRadioData}
									value={bulkAction}
									onChange={(val) => {
										setBulkSection((prev) => ({
											...prev,
											bulkAction: val,
										}));
									}}
								/>
							</div>

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
									themeType="primary"
									loading={selectedDataLoading}
									disabled={!bulkAction}
									onClick={() => {
										addSelect(setOpenModal);
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
