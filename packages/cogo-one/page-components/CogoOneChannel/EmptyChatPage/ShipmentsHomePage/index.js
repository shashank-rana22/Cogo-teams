import { Pagination, Input, Select, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import AddPrimaryPocModal from '../../../../common/AddPrimaryPocModal';
import ShipmentChatModal from '../../../../common/ShipmentChatModal';
import SHIPMENT_TYPE_OPTIONS from '../../../../constants/shipmentTypes';
import useListShipments from '../../../../hooks/useListShipments';
import getFormatedPath from '../../../../utils/getFormatedPath';
import { getDefaultFilters } from '../../../../utils/startDateOfMonth';

import BookingNoteModal from './BookingNoteModal';
import Filter from './Filter';
import LoadingState from './LoadingState';
import NotesModal from './NotesModal';
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';

const DEFAULT_PAGE = 1;
const PAGE_LIMIT = 6;
const DEFAULT_SHIPMENTS_COUNT = 1;

function ListShipmentCards({
	list = [],
	setActiveTab = () => {},
	showPocDetails = {},
	setShowPocDetails = () => {},
	setShowBookingNote = () => {},
	setShowShipmentChat = () => {},
	setShowPopover = () => {},
	showPopover = '',
	setShowPocModal = () => {},
	viewType = '',
	mailProps = {},
	showModalType = () => {},
	params = {},
	range = '',
}) {
	if (isEmpty(list)) {
		return (
			<div className={styles.empty_shipments}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_list}
					height={400}
					width={400}
					className={styles.empty_shipments_image}
					alt="no-shipments"
				/>
			</div>
		);
	}

	return (list || []).map(
		(shipmentItem) => (
			<ShipmentCard
				setActiveTab={setActiveTab}
				key={shipmentItem?.id}
				shipmentItem={shipmentItem}
				showPocDetails={showPocDetails}
				setShowPocDetails={setShowPocDetails}
				setShowBookingNote={setShowBookingNote}
				setShowShipmentChat={setShowShipmentChat}
				setShowPopover={setShowPopover}
				showPopover={showPopover}
				setShowPocModal={setShowPocModal}
				viewType={viewType}
				mailProps={mailProps}
				showModalType={showModalType}
				params={params}
				range={range}
			/>
		),
	);
}

function ShipmentsHomePage({ setActiveTab = () => {}, viewType = '', mailProps = {} }) {
	const { queryParams = {} } = getFormatedPath();

	const [showPocDetails, setShowPocDetails] = useState({});
	const [range, setRange] = useState(queryParams?.range || 'today');
	const [showShipmentChat, setShowShipmentChat] = useState({});
	const [showBookingNote, setShowBookingNote] = useState({ show: false, data: {} });
	const [showPopover, setShowPopover] = useState('');
	const [showPocModal, setShowPocModal] = useState({ show: false, shipmentData: {} });

	const [modalState, setModalState] = useState({ show: '', shipmentData: {} });
	const defaultFilters = getDefaultFilters({ range });

	const [dateFilters, setDateFilters] = useState({ ...defaultFilters });

	const {
		listLoading,
		shipmentsData,
		setParams,
		params,
		handlePageChange = () => {},
	} = useListShipments({ dateFilters });

	const {
		list = [],
		page = DEFAULT_PAGE,
		page_limit = PAGE_LIMIT,
		total_count = DEFAULT_SHIPMENTS_COUNT,
	} = shipmentsData || {};

	const showModalType = ({ modalType = '', shipmentData = {} }) => {
		setModalState({ show: modalType, shipmentData });
	};

	const contextValues = useMemo(() => ({
		shipment_data: showShipmentChat,
	}), [showShipmentChat]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.header_title}>
						Bookings
					</div>
					<div className={styles.filter_container}>
						<Input
							size="sm"
							value={params?.query}
							onChange={(val) => setParams((prev) => ({ ...prev, query: val }))}
							prefix={<IcMSearchlight className={styles.bishal_search_icon} />}
							placeholder="Search SID..."
							type="number"
						/>
						<Select
							size="sm"
							value={params?.shipmentType}
							className={styles.select_field}
							onChange={(val) => setParams((prev) => ({ ...prev, shipmentType: val }))}
							placeholder="Shipment Type"
							options={Object.values(SHIPMENT_TYPE_OPTIONS)}
							isClearable
						/>
						<div className={cl`${styles.custom_date_filter}
						${params?.query ? styles.not_applicable : ''}`}
						>
							<Filter
								setDateFilters={setDateFilters}
								range={range}
								setRange={setRange}
							/>
							{params?.query ? <div className={styles.overlay} /> : null }
						</div>

					</div>
				</div>
				<div className={styles.shipments_cards_container}>
					{listLoading
						? <LoadingState />
						: (
							<ListShipmentCards
								list={list}
								setActiveTab={setActiveTab}
								showPocDetails={showPocDetails}
								setShowPocDetails={setShowPocDetails}
								setShowBookingNote={setShowBookingNote}
								setShowShipmentChat={setShowShipmentChat}
								setShowPopover={setShowPopover}
								showPopover={showPopover}
								setShowPocModal={setShowPocModal}
								viewType={viewType}
								mailProps={mailProps}
								showModalType={showModalType}
								params={params}
								range={range}
							/>
						)}
				</div>

				<div className={styles.pagination_container}>
					{!isEmpty(list) && (
						<Pagination
							type="number"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							disabled={listLoading}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</div>
			{showBookingNote?.show
				? <BookingNoteModal setShowBookingNote={setShowBookingNote} showBookingNote={showBookingNote} /> : null}

			<ShipmentDetailContext.Provider value={contextValues}>
				<ShipmentChatModal
					showShipmentChat={showShipmentChat}
					setShowShipmentChat={setShowShipmentChat}
				/>
			</ShipmentDetailContext.Provider>

			{showPocModal?.show
				? (
					<AddPrimaryPocModal
						showPocModal={showPocModal}
						setShowPocModal={setShowPocModal}
						getShipmentsList={handlePageChange}
						setActiveTab={setActiveTab}
					/>
				) : null}

			{modalState?.show === 'show_notes_modal' ? (
				<NotesModal
					modalState={modalState}
					setModalState={setModalState}
					key={modalState?.shipmentData?.id}
				/>
			) : null}
		</>
	);
}

export default ShipmentsHomePage;
