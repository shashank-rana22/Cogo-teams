import { Input, Tooltip, Button, Breadcrumb } from '@cogoport/components';
import { IcMSearchlight, IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { startCase, format } from '@cogoport/utils';
import { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useViewSelect from '../../hooks/useViewSelect';
import { column, monthData } from '../constant';
import Footer from '../ShipmentView/Footer';

import styles from './styles.module.css';

function ViewSelectedInvoice() {
	const { push, query } = useRouter();
	const [filters, setFilters] = useState({
		search         : '',
		archivedStatus : '',
		page           : 1,
		pageLimit      : 10,
	});
	const {
		getTableHeaderCheckbox,
		getTableBodyCheckbox,
		actionConfirm,
		deleteSelected,
		checkedRowsSerialId,
		checkedData,
		viewSelectedSidData,
		loading,
		viewSelected,
		setCheckedRows,
	} = useViewSelect(filters, query);
	const [isBookedActive, setIsBookActive] = useState(true);
	const goBack = () => {
		push(
			'/business-finance/cogo-book/[active_tab]/[sub_active]',
			'/business-finance/cogo-book/accruals/shipment_view',
		);
	};
	const { list = [], total = 0, pageSize = 10 } = viewSelectedSidData || {};

	const { page } = filters || {};
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const { year = '', startDate, endDate, month = '', tradeType = '', service = '', shipmentType = '' } = query || {};
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
					<Breadcrumb.Item label="Selected Invoices" />
				</Breadcrumb>
			</div>
			<div className={styles.header_container}>
				<div className={styles.div_left}>
					<Tooltip placement="top" content="Go Back">
						<Button
							type="submit"
							onClick={goBack}
							// disabled={loading}
							themeType="secondary"
						>
							<IcMArrowBack
								// disabled={loading}
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
				</div>
			</div>
			<div className={styles.button_container}>
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
			<div className={styles.table_data}>
				<StyledTable
					page={page}
					total={total}
					pageSize={pageSize}
					data={list}
					columns={column(
						{
							getTableBodyCheckbox,
							getTableHeaderCheckbox,
							deleteSelected,
							openDeleteModal,
							setOpenDeleteModal,
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
				shipmentLoading={loading}
				checkedRowsSerialId={checkedRowsSerialId}
				isBookedActive={isBookedActive}
				setCheckedRows={setCheckedRows}
			/>
		</div>
	);
}
export default ViewSelectedInvoice;
