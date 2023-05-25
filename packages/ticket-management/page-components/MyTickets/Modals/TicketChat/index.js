import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useRef, useEffect } from 'react';

import useCreateTicketActivity from '../../../../hooks/useCreateTicketActivity';
import useGetTicketActivity from '../../../../hooks/useGetTicketActivity';
import useGetTicketDetails from '../../../../hooks/useGetTicketDetails';

import ChatBody from './ChatBody';
import FooterChat from './FooterChat';
import ModalHeader from './ModalHeader';
import RateTicket from './RateTicket';
import styles from './styles.module.css';
import TicketSummary from './TicketSummary';

const chatBodyHeight = (Rating, ticketExists, Status, file, uploading) => {
	if (!ticketExists) {
		return '100%';
	}
	if (['closed', 'rejected'].includes(Status)) {
		if (Rating || Status === 'rejected') {
			return 'calc(100% - 62px)';
		}
		return 'calc(100% - 138px)';
	}
	if (isEmpty(file) && !uploading) {
		return 'calc(100% - 55px)';
	}
	return 'calc(100% - 84px)';
};

function TicketChat({ modalData = {}, setModalData = () => {} }) {
	const messageRef = useRef(null);
	const [file, setFile] = useState(null);
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

	const { TicketFeedback = {}, Ticket = {} } = ticketData || {};

	const { Rating = 0 } = TicketFeedback || {};
	const { Status = '', ID } = Ticket || {};

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

	const { createTicketActivity = () => {}, createLoading = false } =	useCreateTicketActivity({
		ticketId: modalData?.ticketId || '',
		refetchTicket,
		scrollToBottom,
	});

	const handleSendComment = async () => {
		if ((message || !isEmpty(file)) && !createLoading) {
			await createTicketActivity({
				message,
				file: file?.url,
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
						setModalData={setModalData}
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
							Rating,
							ticketExists,
							Status,
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
							background: ['closed', 'rejected'].includes(Status)
								? '#f4f4f4'
								: '#fff',
						}}
					>
						{['closed', 'rejected'].includes(Status) ? (
							<RateTicket
								ID={ID}
								Status={Status}
								ticketData={ticketData}
								refetchTicket={refetchTicket}
							/>
						) : (
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
							ticketData={ticketData}
							ticketExists={ticketExists}
						/>
					</div>
				)}
			</Modal.Body>
		</>
	);
}

export default TicketChat;
