import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import useCreateTicketActivity from '../../../../hooks/useCreateTicketActivity';
import useGetListShipments from '../../../../hooks/useGetListShipments';
import useGetTicketActivity from '../../../../hooks/useGetTicketActivity';
import useGetTicketDetails from '../../../../hooks/useGetTicketDetails';
import useListServiceTypeShipment from '../../../../hooks/useListServiceShipment';
import useUpdateTicketActivity from '../../../../hooks/useUpdateTicketActivity';

import ChatBody from './ChatBody';
import EscalateTicket from './EscalateTicket';
import FooterChat from './FooterChat';
import ModalHeader from './ModalHeader';
import ReassignTicket from './ReassignTicket';
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
		return 'calc(100% - 65px)';
	}

	return 'calc(100% - 97px)';
};

function TicketChat({
	modalData = {}, setModalData = () => {}, showReassign = false,
	setShowReassign = () => {}, partnerId = '',
}) {
	const { ticketId = '' } = modalData || {};

	const messageRef = useRef(null);
	const [file, setFile] = useState('');
	const [message, setMessage] = useState('');
	const [uploading, setUploading] = useState(false);
	const [showEscalate, setShowEscalate] = useState(false);

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
	const { Status: status = '', Data: data = {}, Category: category = '' } = ticket || {};
	const { SerialID: serialId, Service: service, IDType: idType } = data || {};

	const {
		listData = {},
		chatLoading = false,
		getTicketActivity = () => {},
		setListData = () => {},
	} = useGetTicketActivity({
		ticketId: ticketId || '',
	});
	const { shipmentData = {}, listLoading = false } = useGetListShipments({ ticketId, serialId, idType });
	const { serviceLoading = false, serviceData = {} } = useListServiceTypeShipment({
		idType,
		serialId,
		ticketId,
		category,
		service,
	});

	const isEmptyChat = isEmpty(listData?.items);

	const fetchDetails = () => {
		setListData({
			items       : [],
			page        : 0,
			total_pages : 0,
		});
		getTicketActivity(DEFAULT_TICKET_ACTIVITY);
	};

	const refreshTickets = () => {
		setListData({
			items       : [],
			page        : 0,
			total_pages : 0,
		});
		getTicketDetails(ticketId);
		getTicketActivity(DEFAULT_TICKET_ACTIVITY);
	};

	const { createTicketActivity = () => {}, createLoading = false } = useCreateTicketActivity({
		ticketId: ticketId || '',
		fetchDetails,
		scrollToBottom,
	});

	const { updateTicketActivity = () => {}, updateLoading = false } = useUpdateTicketActivity({
		refreshTickets,
	});

	const doesTicketsExists = !isEmpty(ticketData);

	const loading = chatLoading || createLoading;
	const updateShipmentData = category?.toLowerCase() === 'rates' ? serviceData : shipmentData;
	const updateShipmentLoading = category?.toLowerCase() === 'rates' ? serviceLoading : listLoading;

	const handleSendComment = async () => {
		if ((message || !isEmpty(file)) && !createLoading) {
			await createTicketActivity({
				message,
				file,
			});
			setMessage('');
			setFile(null);
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
						setModalData={setModalData}
						refreshTickets={refreshTickets}
						setShowEscalate={setShowEscalate}
						setShowReassign={setShowReassign}
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

				{(doesTicketsExists && isCurrentReviewer)
					&& !RESOLVED_CHECK.includes(status)
					&& (
						<FooterChat
							file={file}
							message={message}
							setFile={setFile}
							uploading={uploading}
							setMessage={setMessage}
							setUploading={setUploading}
							createLoading={createLoading}
							handleKeyPress={handleKeyPress}
							handleSendComment={handleSendComment}
						/>
					)}

				{doesTicketsExists && (
					<div className={styles.sub_modal_container}>
						<TicketSummary
							{...ticketData}
							detailsLoading={detailsLoading}
							updateShipmentData={updateShipmentData}
							updateShipmentLoading={updateShipmentLoading}
							partnerId={partnerId}
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
					/>
				)}
			</Modal.Body>
		</>
	);
}

export default TicketChat;
