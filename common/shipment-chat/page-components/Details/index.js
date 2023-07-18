import { Textarea, Popover, Toast } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSend, IcMAttach, IcMDocument } from '@cogoport/icons-react';
import React, { useRef, useState } from 'react';

import useCreateMessage from '../../hooks/useCreateMessage';
import useFireBase from '../../hooks/useFireBase';

import Header from './Header';
import Loader from './Loader';
import MessageContainer from './MessageContainer';
import SendTo from './SendTo';
import styles from './styles.module.css';

const INITIAL_STATE_ROWS = 1;
const TOTAL_STAKEHOLDERS_LENGTH = 2;
const TOTAL_ROWS = 5;
const ENTER_KEY = 13;
const DELETE_KEY_1 = 46;
const DELETE_KEY_2 = 8;

const shipmentChatStakeholders = [
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'booking_agent',
	'supply_agent',
];

function Details({
	id,
	activeId,
	sourceId,
	source,
	subscribedUsers = [],
	setShow = () => { },
	get = {},
	personalData = {},
}) {
	const sendToRef = useRef(null);
	const [stakeHolderView, setStakeHolderView] = useState('');
	const [textContent, setTextContent] = useState('');
	const [showImpMsg, setShowImpMsg] = useState(false);
	const [selectedFile, setSelectedFile] = useState([]);
	const [rows, setRows] = useState(INITIAL_STATE_ROWS);

	const { data, loadingChannel } = get;
	const { channelData, primaryService } = data || {};
	const { msgContent } = useFireBase({ id });

	const isStakeholder = shipmentChatStakeholders.includes(
		channelData?.stakeholder_types?.[GLOBAL_CONSTANTS.zeroth_index],
	);

	const formValues = {
		message : textContent,
		file    : selectedFile,
	};

	const reset = () => {
		setTextContent('');
	};

	// formatting Data for hooks
	const stakeholder = stakeHolderView.split(' ');
	const stakeholderArray = (stakeholder || []).map((item) => item.replace('@', ''));
	const conditionArr = stakeholderArray.length && stakeholderArray[GLOBAL_CONSTANTS.zeroth_index]
	!== '' ? [...stakeholderArray] : [];
	const filteredArr = (conditionArr || []).map((item) => {
		if (item === '') {
			return null;
		}
		if (item === 'Kam') {
			return 'booking_agent';
		}
		return item?.toLowerCase();
	});

	const PersonalChannel = {
		visible_to_user_ids: personalData?.subscribed_user_ids,
	};

	let visible_to_stakeholders = isStakeholder
		? [...filteredArr, channelData?.stakeholder_types?.[GLOBAL_CONSTANTS.zeroth_index]]
		: [...filteredArr];

	visible_to_stakeholders = visible_to_stakeholders?.filter((item) => shipmentChatStakeholders.includes(item));

	const GroupChannel = filteredArr.length
		? {
			created_by_stakeholder : channelData?.stakeholder_types?.[GLOBAL_CONSTANTS.zeroth_index],
			source_id              : sourceId,
			visible_to_stakeholders,
		}
		: {
			created_by_stakeholder : channelData?.stakeholder_types?.[GLOBAL_CONSTANTS.zeroth_index],
			source_id              : sourceId,
			visible_to_user_ids    : subscribedUsers,
		};

	const payloadData = source === 'shipment' ? GroupChannel : PersonalChannel;

	const refetch = () => {
		reset();
		sendToRef?.current?.setText('');
		setSelectedFile([]);
	};

	const createMsgPayload = {
		content         : formValues?.message || '',
		attachment_urls : formValues?.file || [],
		channel_id      : id,
		...payloadData,
	};

	const { loading, handleSendMsg } = useCreateMessage({ payload: createMsgPayload, refetch });

	const onCreateMessage = () => {
		if (payloadData?.visible_to_stakeholders?.length < TOTAL_STAKEHOLDERS_LENGTH) {
			Toast.error('Please tag appropriate stakeholder');
		} else {
			handleSendMsg();
		}
	};

	if (activeId !== id) {
		return null;
	}

	const contentData = formValues?.message?.split('\n').length;
	const handleClick = (e) => {
		if (e.keyCode === ENTER_KEY && e.shiftKey && rows < TOTAL_ROWS) {
			setRows(contentData + INITIAL_STATE_ROWS);
		}
		if (e.keyCode === ENTER_KEY && !e.shiftKey) {
			onCreateMessage();
			reset();
			setRows(INITIAL_STATE_ROWS);
		}
		if (contentData > INITIAL_STATE_ROWS && (e.keyCode === DELETE_KEY_2 || e.keyCode === DELETE_KEY_1)) {
			setRows(contentData - INITIAL_STATE_ROWS);
		}
	};

	return (
		<div className={styles.container}>
			{loadingChannel ? (
				<Loader />
			) : (
				<Header
					channelData={channelData}
					primaryService={primaryService}
					setShow={setShow}
					isStakeholder={isStakeholder}
					showImpMsg={showImpMsg}
					setShowImpMsg={setShowImpMsg}
				/>
			)}

			<div className={styles.chat_sections}>
				<MessageContainer
					msgContent={msgContent}
					loadingChannel={loadingChannel}
					showImpMsg={showImpMsg}
				/>

				<div>
					{source === 'shipment' ? (
						<SendTo
							ref={sendToRef}
							data={data}
							setStakeHolderView={setStakeHolderView}
							isStakeholder={isStakeholder}
						/>
					) : (
						<div style={{ padding: '21px' }} />
					)}

					<div className={styles.typing_container}>
						<Popover
							theme="light"
							interactive
							content={(
								<div className={styles.uploader}>
									<FileUploader
										value={selectedFile}
										onChange={setSelectedFile}
										showProgress
										draggable
										multiple
									/>
								</div>
							)}
						>
							<div className={styles.icon_wrap}>
								<IcMAttach width={21} height={21} />
							</div>
						</Popover>

						<div className={styles.attached_container}>
							{(formValues?.file || []).map((url) => (
								<div className={styles.attached_doc} key={url}>
									<IcMDocument style={{ marginRight: '4px' }} />
									{url?.split('/').pop()}
								</div>
							))}
						</div>

						<Textarea
							className={styles.text_area}
							placeholder="Type your message here...."
							value={textContent}
							onKeyDown={(e) => handleClick(e)}
							rows={rows}
							onChange={(val) => {
								setTextContent(val);
							}}
						/>

						<div
							className={styles.send}
							role="button"
							tabIndex={0}
							onClick={!loading ? onCreateMessage : null}
						>
							<IcMSend style={{ width: '2em', height: '2em', fill: '#303b67' }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
