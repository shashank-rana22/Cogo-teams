import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import useCreateTicketActivity from '../../../hooks/useCreateTicketActivity';
import useGetTicketActivity from '../../../hooks/useGetTicketActivity';
import useGetTicketDetails from '../../../hooks/useGetTicketDetails';

import ChatBody from './ChatBody';
import FooterChat from './FooterChat';
import ModalHeader from './ModalHeader';
import styles from './styles.module.css';
import TicketSummary from './TicketSummary';

const chatBodyHeight = (rating, ticketExists, status, file, uploading) => {
	if (!ticketExists) {
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

function TicketChat({ modalData = {}, setModalData = () => {} }) {
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
					top      : maxScrollTop + 5,
					behavior : 'smooth',
				});
			}
		}, 300);
	};

	const {
		getTicketDetails = () => {},
		ticketData = '',
		detailsLoading,
	} = useGetTicketDetails({
		ticketId: modalData?.ticketId || '',
	});

	const { TicketFeedback: ticketFeedback = {}, Ticket: ticket = {} } =		ticketData || {};

	const { Rating: rating = 0 } = ticketFeedback || {};
	const { Status: status = '' } = ticket || {};

	const {
		listData = {},
		chatLoading = false,
		getTicketActivity = () => {},
		setListData = () => {},
	} = useGetTicketActivity({
		ticketId: modalData?.ticketId || '',
	});

	const refetchTicket = () => {
		setListData({
			items       : [],
			page        : 0,
			total_pages : 0,
		});
		getTicketDetails();
		getTicketActivity(0);
	};

	const isEmptyChat = isEmpty(listData?.items || {});

	const { createTicketActivity = () => {}, createLoading = false } =		useCreateTicketActivity({
		ticketId: modalData?.ticketId || '',
		refetchTicket,
		scrollToBottom,
	});

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

	const ticketExists = typeof ticketData === 'object' || false;

	const loading = chatLoading || createLoading;

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
						ticketData={ticketData}
						refetchTicket={refetchTicket}
						ticketExists={ticketExists}
					/>
				)}
			/>
			<Modal.Body className={styles.modal_body} key={loading}>
				<div
					className={styles.container}
					style={{
						height: chatBodyHeight(
							rating,
							ticketExists,
							status,
							file,
							uploading,
						),
					}}
				>
					<ChatBody
						listData={listData}
						modalData={modalData}
						chatLoading={chatLoading}
						messageRef={messageRef}
						getTicketActivity={getTicketActivity}
						ticketData={ticketData}
						ticketExists={ticketExists}
						setModalData={setModalData}
						detailsLoading={detailsLoading}
					/>
				</div>
				{ticketExists && (
					<div
						style={{
							background: ['closed', 'rejected'].includes(status)
								? '#f4f4f4'
								: '#fff',
						}}
					>
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
				{ticketExists && (
					<div className={styles.sub_modal_container}>
						<TicketSummary
							{...ticketData}
							ticketExists={ticketExists}
						/>
					</div>
				)}
			</Modal.Body>
		</>
	);
}

export default TicketChat;
