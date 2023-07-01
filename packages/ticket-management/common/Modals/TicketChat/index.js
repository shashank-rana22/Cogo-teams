import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import useCreateTicketActivity from '../../../hooks/useCreateTicketActivity';
import useGetTicketActivity from '../../../hooks/useGetTicketActivity';
import useGetTicketDetails from '../../../hooks/useGetTicketDetails';
import ReassignTicket from '../../ReassignTicket';

import ChatBody from './ChatBody';
import FooterChat from './FooterChat';
import ModalHeader from './ModalHeader';
import styles from './styles.module.css';
import TicketSummary from './TicketSummary';

const WINDOW_VIEW_ASPECT = 5;
const TIMEOUT_COUNT = 300;
const DEFAULT_TICKET_ACTIVITY = 0;

const getChatBodyHeight = ({ doesTicketsExists, status, file, uploading }) => {
	if (!doesTicketsExists) {
		return '100%';
	}
	if (['closed', 'rejected'].includes(status)) {
		return '100%';
	}
	if (isEmpty(file) && !uploading) {
		return 'calc(100% - 55px)';
	}
	return 'calc(100% - 75px)';
};

function TicketChat({
	modalData = {}, setModalData = () => {}, setIsUpdated = () => {}, showReassign,
	setShowReassign = () => {},
}) {
	const messageRef = useRef(null);
	const [file, setFile] = useState('');
	const [message, setMessage] = useState('');
	const [uploading, setUploading] = useState(false);

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
		ticketId: modalData?.ticketId || '',
	});

	const {
		Ticket: ticket = {}, IsClosureAuthorizer: isClosureAuthorizer = false,
	} = ticketData || {};

	const { Status: status = '' } = ticket || {};

	const {
		listData = {},
		chatLoading = false,
		getTicketActivity = () => {},
		setListData = () => {},
	} = useGetTicketActivity({
		ticketId: modalData?.ticketId || '',
	});

	const isEmptyChat = isEmpty(listData?.items);

	const refreshTickets = () => {
		setListData({
			items       : [],
			page        : 0,
			total_pages : 0,
		});
		getTicketDetails();
		getTicketActivity(DEFAULT_TICKET_ACTIVITY);

		setIsUpdated(true);
	};

	const { createTicketActivity = () => {}, createLoading = false } = useCreateTicketActivity({
		ticketId: modalData?.ticketId || '',
		refreshTickets,
		scrollToBottom,
	});

	const doesTicketsExists = !isEmpty(ticketData);

	const loading = chatLoading || createLoading;

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
						refreshTickets={refreshTickets}
						setShowReassign={setShowReassign}
						isClosureAuthorizer={isClosureAuthorizer}
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
				{doesTicketsExists && (
					<div style={{ background: ['closed', 'rejected'].includes(status) ? '#f4f4f4' : '#fff' }}>
						{!['closed', 'rejected'].includes(status)
							&& (
								<FooterChat
									file={file}
									message={message}
									setFile={setFile}
									uploading={uploading}
									setMessage={setMessage}
									setUploading={setUploading}
									handleKeyPress={handleKeyPress}
									handleSendComment={handleSendComment}
								/>
							)}
					</div>
				)}
				{doesTicketsExists && (
					<div className={styles.sub_modal_container}>
						<TicketSummary {...ticketData} />
					</div>
				)}

				<ReassignTicket
					ticketId={modalData?.ticketId}
					showReassign={showReassign}
					setShowReassign={setShowReassign}
					getTicketActivity={getTicketActivity}
					getTicketDetails={getTicketDetails}
				/>
			</Modal.Body>
		</>
	);
}

export default TicketChat;
