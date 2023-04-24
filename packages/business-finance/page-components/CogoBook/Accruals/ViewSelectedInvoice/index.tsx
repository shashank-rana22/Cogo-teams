import { Modal, Input, Tooltip, Button, Breadcrumb } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMSearchlight, IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';
import { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useViewSelect from '../../hooks/useViewSelect';
import { bookedColumn, column, monthData } from '../constant';
import Footer from '../ShipmentView/Footer';

import styles from './styles.module.css';

function ViewSelectedInvoice() {
	const { push, query } = useRouter();
	const [showSub, setShowSub] = useState(false);
	const [bulkSection, setBulkSection] = useState({ value: false, bulkAction: '' });
	const [filters, setFilters] = useState({
		search         : '',
		archivedStatus : '',
		page           : 1,
		pageLimit      : 10,
		sortBy         : '',
		sortType       : 'ASC',
	});
	const [bulkModal, setBulkModal] = useState(false);

	const { bulkAction } = bulkSection;

	const {
		getTableHeaderCheckbox,
		getTableBodyCheckbox,
		actionConfirm,
		deleteSelected,
		checkedRowsSerialId,
		checkedData,
		viewSelectedSidData,
		actionConfirmedLoading,
		loading,
		viewSelected,
		setCheckedRows,
	} = useViewSelect(filters, query, setBulkSection, bulkAction);
	const [isBookedActive, setIsBookActive] = useState(true);

	const goBack = () => {
		push(
			'/business-finance/cogo-book/accruals/shipment_view',
			'/business-finance/cogo-book/accruals/shipment_view',
		);
	};
	const { list = [], totalRecords = 0, pageSize = 10 } = viewSelectedSidData || {};

	const { page } = filters || {};
	const [openDeleteModal, setOpenDeleteModal] = useState({});

	const { year = '', startDate, endDate, month = '', tradeType = '', service = '', shipmentType = '' } = query || {};

	const subComponent = (itemData) => {
		const {
			sellQuotation = '', buyQuotation = '', quotationProfit = '',
			quotationMargin = '', bookingType = '', buyQuotationCurrency = '',
			sellQuotationCurrency = '',
		} = itemData || {};

		return (
			<div className={styles.sub_comp}>
				<div className={styles.quo}>
					Quotation
					<div className={styles.quo_border} />
				</div>

				<div>
					Purchase :
					{' '}
					{getFormattedPrice(buyQuotation, buyQuotationCurrency) || '-'}
				</div>
				<div>
					Sales :
					{' '}
					{getFormattedPrice(sellQuotation, sellQuotationCurrency) || '-' }
				</div>
				<div>
					Margin :
					{' '}
					{quotationProfit || '0'}
					{' '}
					(
					{quotationMargin || '0'}
					%)
				</div>
				<div>
					Shipment Type :
					{' '}
					{' '}
					<span className={styles.span_val}>{bookingType || '-'}</span>
				</div>
			</div>
		);
	};

	return (
		<div>

			<div className={styles.flex_bread}>
				<Breadcrumb>
					<Breadcrumb.Item
						label={(
							<Link href="/business-finance/cogo-book/accruals/shipment_view">
								Shipment View
							</Link>
						)}
					/>
					<Breadcrumb.Item label="Selected Shipments" />
					<div>
						<span className={styles.steps}>Step 2 -</span>

						{' '}
						<span className={styles.text_step}>Review The Selected Shipments And Accrue/Book Them</span>
					</div>
				</Breadcrumb>

			</div>
			<div className={styles.header_container}>
				<div className={styles.div_left}>
					<Tooltip placement="top" content="Go Back">
						<Button
							onClick={goBack}
							disabled={loading}
							themeType="secondary"
						>
							<IcMArrowBack
								height={20}
								width={20}
							/>
						</Button>
					</Tooltip>

					<div className={styles.filter_container}>
						<div className={styles.card_div} style={{ width: '120px' }}>
							Year -
							{year}
						</div>

						<div className={styles.card_div} style={{ width: '140px' }}>
							Month -
							{monthData[month]}
						</div>

						{startDate &&	(
							<div className={styles.card_div} style={{ width: '320px' }}>
								<div>{startDate && `Start Date - ${format(startDate, 'dd MMM yyyy')}`}</div>
								<div>{endDate && `End Date - ${format(endDate, 'dd MMM yyyy')}`}</div>
							</div>
						)}
						{ tradeType &&	(
							<div className={styles.card_div} style={{ width: '100px' }}>
								{tradeType}
							</div>
						)}
						{ service &&	(
							<div className={styles.card_div} style={{ width: '100px' }}>
								{startCase(service)}
							</div>
						)}
						{shipmentType && 	(
							<div className={styles.card_div} style={{ width: '100px' }}>
								{startCase(shipmentType)}
							</div>
						)}
					</div>
				</div>
				<div className={styles.filter}>
					<Input
						value={filters?.search}
						onChange={(val:string) => { setFilters((prev) => ({ ...prev, search: val })); }}
						placeholder="Search by SID"
						suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
					/>
					<div className={styles.booked_flex}>
						<Button themeType="secondary" onClick={() => { setBulkModal(true); }}>Bulk Delete</Button>
					</div>
				</div>
			</div>

			{bulkModal &&		(
				<Modal show={bulkModal} onClose={() => { setBulkModal(false); }}>
					<Modal.Body>
						<div
							className={styles.flex_modal}
						>
							<div style={{ margin: '20px' }}>Are you sure you want to bulk delete ?</div>

							<div className={styles.flex}>
								<Button
									id="cancel-modal-btn"
									style={{ marginRight: '10px' }}
									themeType="secondary"
									onClick={() => { setBulkModal(false); }}
								>
									Cancel
								</Button>
								<Button
									id="approve-modal-btn"
									themeType="primary"
									onClick={() => {
										const selectedIds = checkedData?.map((item) => item?.id);
										deleteSelected({
											selectedBulkData : selectedIds,
											bulkData         : selectedIds?.length > 0 ? 'SINGLE' : 'BULK',
											setBulkModal,
										});
									}}
								>
									Yes
								</Button>
							</div>
						</div>
					</Modal.Body>

				</Modal>
			)}

			<div className={styles.button_container}>
				<div className={styles.button_value}>
					<div
						className={isBookedActive ? styles.selected : styles.button_tab}
						onClick={() => {
							setFilters((p) => ({
								...p,
								archivedStatus: 'BOOKED',
							}));
							viewSelected();
							setIsBookActive(true);
						}}
						role="presentation"
					>
						Booked
					</div>

					<div
						className={!isBookedActive ? styles.selected : styles.button_tab}
						onClick={() => {
							setFilters((p) => ({
								...p,
								archivedStatus: 'ACCRUED',
							}));
							viewSelected();
							setIsBookActive(false);
						}}
						role="presentation"
					>
						Accrued

					</div>
				</div>
				{!isBookedActive && (
					<div
						onClick={() => { setShowSub(!showSub); }}
						className={styles.hide_data}
						role="presentation"
					>
						{showSub ? 'Hide All Quotations' : 'View All Quotations'}

					</div>
				)}

			</div>

			<div className={styles.table_data}>
				<StyledTable
					page={page}
					total={totalRecords}
					pageSize={pageSize}
					data={list}
					showEmptyState={isBookedActive ? 'BOOKED' : 'ACCRUED'}
					renderRowSubComponent={!isBookedActive && subComponent}
					selectType="multiple"
					showAllNestedOptions={!isBookedActive && showSub}
					columns={isBookedActive ? bookedColumn(
						{
							getTableBodyCheckbox,
							getTableHeaderCheckbox,
							deleteSelected,
							openDeleteModal,
							setOpenDeleteModal,
							filters,
							setFilters,
						},
					) : column(
						{
							getTableBodyCheckbox,
							getTableHeaderCheckbox,
							deleteSelected,
							openDeleteModal,
							setOpenDeleteModal,
							filters,
							setFilters,
						},
					)}
					loading={loading}
					setFilters={setFilters}
					filters={filters}
				/>
			</div>
			<Footer
				actionConfirm={actionConfirm}
				checkedData={checkedData}
				actionConfirmedLoading={actionConfirmedLoading}
				shipmentLoading={loading}
				bulkSection={bulkSection}
				setBulkSection={setBulkSection}
				checkedRowsSerialId={checkedRowsSerialId}
				isBookedActive={isBookedActive}
				setCheckedRows={setCheckedRows}
			/>
		</div>
	);
}
export default ViewSelectedInvoice;
