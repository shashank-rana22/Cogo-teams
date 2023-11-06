import { Textarea, Popover, Toast, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSend, IcMAttach, IcMDocument } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useRef, useState } from 'react';

import useCreateMessage from '../../hooks/useCreateMessage';
import useFireBase from '../../hooks/useFireBase';

import Header from './Header';
import Loader from './Loader';
import MessageContainer from './MessageContainer';
import SendTo from './SendTo';
import styles from './styles.module.css';

const INITIAL_STATE_ROWS = 1;
const TOTAL_STAKEHOLDERS_LENGTH = 1;
const TOTAL_ROWS = 3;
const ENTER_KEY = 13;
const DELETE_KEY_1 = 46;
const DELETE_KEY_2 = 8;

const shipmentChatStakeholders = [
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'booking_agent',
	'ckam',
	'supply_agent',
	'sales_agent',
	'costbooking_ops',
	'lastmile_ops',
	'release_desk',
	'collection_desk',
	'bl_release_desk',
	'bl_collection_desk',
	'do_release_desk',
	'do_collection_desk',
];

const CONDITION_MAPPING = {
	CCS           : 'booking_agent',
	document_desk : 'service_ops2',
	'BL/DO'       : 'release_desk',
	booking_desk  : 'service_ops1',
	OKAM          : 'origin_booking_agent',
	DKAM          : 'destination_booking_agent',
};

function Details({
	id = '',
	activeId = '',
	sourceId = '',
	source = '',
	subscribedUsers = [],
	setShow = () => {},
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

	let isStakeholder = false;

	channelData?.stakeholder_types?.forEach((stakeholder) => {
		isStakeholder = shipmentChatStakeholders.includes(stakeholder);
	});

	const formValues = {
		message : textContent,
		file    : selectedFile,
	};

	const reset = () => {
		setTextContent('');
		setRows(INITIAL_STATE_ROWS);
	};

	// formatting Data for hooks
	const stakeholder = stakeHolderView?.split(' ');
	const stakeholderArray = (stakeholder || []).map((item) => item?.replace('@', ''));
	const conditionArr = stakeholderArray?.length && stakeholderArray?.[GLOBAL_CONSTANTS.zeroth_index]
	!== '' ? [...stakeholderArray] : [];
	const filteredArr = (conditionArr || []).map((item) => {
		if (item === '') {
			return null;
		}
		return CONDITION_MAPPING[item] || item?.toLowerCase();
	});

	const PersonalChannel = {
		visible_to_user_ids: personalData?.subscribed_user_ids,
	};

	let visible_to_stakeholders = isStakeholder
		? [...filteredArr, ...channelData.stakeholder_types]
		: [...filteredArr];

	visible_to_stakeholders = Array.from(new Set(visible_to_stakeholders?.filter((item) => item !== null)));

	const GroupChannel = filteredArr?.length
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

	const handleClick = (event) => {
		const text = formValues?.message || '';
		const contentData = text?.split('\n').length;

		if (event.keyCode === ENTER_KEY && event.shiftKey && rows < TOTAL_ROWS) {
			setRows(contentData + INITIAL_STATE_ROWS);
		}
		if (event.keyCode === ENTER_KEY && !event.shiftKey) {
			onCreateMessage();
			reset();
		}
		if (text?.[text.length - INITIAL_STATE_ROWS] === '\n'
		&& (event.keyCode === DELETE_KEY_2 || event.keyCode === DELETE_KEY_1)) {
			const maxRows = contentData - INITIAL_STATE_ROWS;
			setRows(maxRows > TOTAL_ROWS ? TOTAL_ROWS : maxRows);
		}
	};

	return (
		<div className={styles.container}>
			{loadingChannel ? (
				<Loader setShow={setShow} />
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
						<div className={styles.empty_send_to} />
					)}

					<div className={styles.text_docs_container}>
						{!isEmpty(formValues?.file) ? (
							<div className={styles.attached_container}>
								{(formValues?.file || []).map((url) => (
									<div className={styles.attached_doc} key={url}>
										<IcMDocument className={styles.icm_doc} />
										{decodeURIComponent(url?.split('/')?.pop())}
									</div>
								))}
							</div>
						) : null}

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

							<Textarea
								className={styles.text_area}
								placeholder="Type your message here...."
								value={textContent}
								onKeyDown={(e) => handleClick(e)}
								rows={rows}
								onChange={(val) => {
									setTextContent(val);
									if (textContent === '' && val === '\n') {
										reset();
									}
								}}
							/>

							<Button
								themeType="linkUi"
								className={styles.send}
								onClick={!loading ? onCreateMessage : null}
							>
								<IcMSend width="2.8em" height="2.8em" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
