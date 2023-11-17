import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import { FETCH_API_FOR_REQUEST } from '../../../constants';
import useCreateTicketActivity from '../../../hooks/useCreateTicketActivity';
import useListShipments from '../../../hooks/useGetListShipment';
import useGetTicketActivity from '../../../hooks/useGetTicketActivity';
import useGetTicketDetails from '../../../hooks/useGetTicketDetails';
import useListServiceTypeShipment from '../../../hooks/useListServiceShipment';
import useUpdateTicketActivity from '../../../hooks/useUpdateTicketActivity';
import ReassignTicket from '../../ReassignTicket';
import ResolveRequest from '../../ResolveRequest';

import ChatBody from './ChatBody';
import EscalateTicket from './EscalateTicket';
import FooterChat from './FooterChat';
import ModalHeader from './ModalHeader';
import styles from './styles.module.css';
import TicketSummary from './TicketSummary';

const WINDOW_VIEW_ASPECT = 5;
const TIMEOUT_COUNT = 300;
const DEFAULT_TICKET_ACTIVITY = 0;
const RESOLVED_CHECK = ['closed', 'overdue'];

const getChatBodyHeight = ({ doesTicketsExists, status, file, uploading }) => {
	if (!doesTicketsExists) {
		return '100%';
	}
	if (RESOLVED_CHECK.includes(status)) {
		return '100%';
	}
	if (isEmpty(file) && !uploading) {
		return 'calc(100% - 84px)';
	}
	return 'calc(100% - 116px)';
};

function TicketChat({
	modalData = {}, setModalData = () => {}, setIsUpdated = () => {}, showReassign = false,
	setShowReassign = () => {}, isInternal = true, setIsInternal = () => {}, partnerId = '',
	userId = '',
}) {
	const { ticketId = '' } = modalData || {};

	const messageRef = useRef(null);
	const [file, setFile] = useState('');
	const [message, setMessage] = useState('');
	const [uploading, setUploading] = useState(false);
	const [showEscalate, setShowEscalate] = useState(false);
	const [showResolveRequest, setShowResolveRequest] = useState(false);

	const scrollToBottom = () => {
		setTimeout(() => {
			if (messageRef.current) {
				const { scrollHeight, clientHeight } = messageRef.current;
				const maxScrollTop = scrollHeight - clientHeight;
				messageRef.current.scrollTo({
					top      : maxScrollTop + WINDOW_VIEW_ASPECT,
					behavior : 'smooth',
				});
			}
		}, TIMEOUT_COUNT);
	};

	const {
		getTicketDetails = () => {},
		ticketData = {},
		detailsLoading,
	} = useGetTicketDetails({
		ticketId: ticketId || '',
	});

	const { Ticket: ticket = {}, IsCurrentReviewer: isCurrentReviewer = false } = ticketData || {};
	const {
		Status: status = '', NotifyCustomer: notifyCustomer = false, Data: data = {},
		Category: category = '',
	} = ticket || {};
	const {
		SerialID: serialId, Service: service, IDType: idType,
		RequestType: requestType = '',
	} = data || {};

	const {
		listData = {},
		chatLoading = false,
		getTicketActivity = () => {},
		setListData = () => {},
	} = useGetTicketActivity({
		ticketId: ticketId || '',
	});

	const isEmptyChat = isEmpty(listData?.items);

	const refreshTickets = () => {
		setListData({
			items       : [],
			page        : 0,
			total_pages : 0,
		});
		getTicketDetails(ticketId);
		getTicketActivity(DEFAULT_TICKET_ACTIVITY);

		setIsUpdated(true);
	};

	const { createTicketActivity = () => {}, createLoading = false } = useCreateTicketActivity({
		ticketId: ticketId || '',
		refreshTickets,
		scrollToBottom,
		isInternal,
	});

	const { updateTicketActivity = () => {}, updateLoading = false } = useUpdateTicketActivity({
		refreshTickets,
	});

	const { shipmentsData = {}, listLoading = false } = useListShipments({
		idType,
		serialId,
		ticketId,
		requestType,
		category,
	});
	const { serviceLoading = false, serviceData = {} } = useListServiceTypeShipment({
		idType,
		serialId,
		ticketId,
		requestType,
		service,
	});

	const doesTicketsExists = !isEmpty(ticketData);

	const loading = chatLoading || createLoading;
	const formatShipmentData = idType !== 'sid' && !FETCH_API_FOR_REQUEST.includes(requestType)
		&& category?.toLowerCase() !== 'shipment' ? serviceData : shipmentsData;
	const formatShipmentloading = idType !== 'sid' && !FETCH_API_FOR_REQUEST.includes(requestType)
		&& category?.toLowerCase() !== 'shipment' ? serviceLoading : listLoading;

	const handleSendComment = async () => {
		if ((message || !isEmpty(file)) && !createLoading) {
			await createTicketActivity({
				message,
				file,
			});
			setMessage('');
			setFile('');
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSendComment();
			scrollToBottom();
		}
	};

	useEffect(() => {
		if (!isEmptyChat) {
			scrollToBottom();
		}
	}, [isEmptyChat]);

	return (
		<>
			<Modal.Header
				title={(
					<ModalHeader
						modalData={modalData}
						ticketData={ticketData}
						updateLoading={updateLoading}
						refreshTickets={refreshTickets}
						setShowReassign={setShowReassign}
						setShowEscalate={setShowEscalate}
						setShowResolveRequest={setShowResolveRequest}
						updateTicketActivity={updateTicketActivity}
					/>
				)}
			/>
			<Modal.Body className={styles.modal_body} key={loading}>
				<div
					className={styles.container}
					style={{
						height: getChatBodyHeight({
							doesTicketsExists,
							status,
							file,
							uploading,
						}),
					}}
				>
					<ChatBody
						listData={listData}
						modalData={modalData}
						chatLoading={chatLoading}
						messageRef={messageRef}
						getTicketActivity={getTicketActivity}
						ticketData={ticketData}
						doesTicketsExists={doesTicketsExists}
						setModalData={setModalData}
						detailsLoading={detailsLoading}
					/>
				</div>

				{(doesTicketsExists && isCurrentReviewer) && !RESOLVED_CHECK.includes(status)
							&& (
								<FooterChat
									file={file}
									message={message}
									setFile={setFile}
									uploading={uploading}
									setMessage={setMessage}
									setUploading={setUploading}
									setIsInternal={setIsInternal}
									createLoading={createLoading}
									isInternal={isInternal}
									notifyCustomer={notifyCustomer}
									handleKeyPress={handleKeyPress}
									handleSendComment={handleSendComment}
								/>
							)}
				{doesTicketsExists && (
					<div className={styles.sub_modal_container}>
						<TicketSummary
							{...ticketData}
							detailsLoading={detailsLoading}
							partnerId={partnerId}
							listLoading={formatShipmentloading}
							shipmentsData={formatShipmentData}
							userId={userId}
						/>
					</div>
				)}

				{showEscalate && (
					<EscalateTicket
						ticketId={ticketId}
						showEscalate={showEscalate}
						updateLoading={updateLoading}
						setShowEscalate={setShowEscalate}
						updateTicketActivity={updateTicketActivity}
					/>
				)}

				{showReassign && (
					<ReassignTicket
						ticketId={ticketId}
						showReassign={showReassign}
						setShowReassign={setShowReassign}
						getTicketActivity={getTicketActivity}
						getTicketDetails={getTicketDetails}
						setListData={setListData}
						ticket={ticket}
						shipmentsData={shipmentsData}
					/>
				)}

				{showResolveRequest && (
					<ResolveRequest
						ticketId={ticketId}
						updateLoading={updateLoading}
						showResolveRequest={showResolveRequest}
						setShowResolveRequest={setShowResolveRequest}
						updateTicketActivity={updateTicketActivity}
					/>
				)}

			</Modal.Body>
		</>
	);
}

export default TicketChat;
