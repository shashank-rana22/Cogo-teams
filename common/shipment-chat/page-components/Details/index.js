import { Textarea, Popover } from '@cogoport/components';
import { IcMSend, IcMAttach, IcMDocument } from '@cogoport/icons-react';
import React, { useRef, useState } from 'react';

import useCreateMessage from '../../hooks/useCreateMessage';
import useFireBase from '../../hooks/useFireBase';

import Header from './Header';
import Loader from './Loader';
import MessageContainer from './MessageContainer';
import SendTo from './SendTo';
import styles from './styles.module.css';

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
	personal_data = {},
}) {
	const sendToRef = useRef(null);
	const [stakeHolderView, setStakeHolderView] = useState('');
	const [rows, setRows] = useState(1);
	const [textContent, setTextContent] = useState('');
	const [showImpMsg, setShowImpMsg] = useState(false);

	const { data, isGettingShipment } = get;
	const { shipment_data, primary_service } = data || {};
	const { msgContent } = useFireBase({ id });

	const isStakeholder = shipmentChatStakeholders.includes(
		shipment_data?.stakeholder_types?.[0],
	);

	const formValues = {
		message: textContent,
	};

	const reset = () => {
		setTextContent('');
	};
	const { onCreate, loading } = useCreateMessage({
		shipment_data,
		formValues,
		reset,
		id,
		stakeHolderView,
		sourceId,
		source,
		sendToRef,
		personal_data,
		subscribedUsers,
		isStakeholder,
		shipmentChatStakeholders,
	});

	const contentData = formValues?.message?.split('\n').length;
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && e.shiftKey && rows < 5) {
			setRows(contentData + 1);
		}

		if (e.key === 'Enter' && !e.shiftKey) {
			onCreate();
			reset();
			setRows(1);
		}
	};

	const handleDelete = (e) => {
		if (contentData > 1 && (e.keyCode === 8 || e.keyCode === 46)) {
			setRows(contentData - 1);
		}
	};

	if (activeId !== id) {
		return null;
	}

	return (
		<div className={styles.container}>
			{isGettingShipment ? (
				<Loader />
			) : (
				<Header
					shipment_data={shipment_data}
					primary_service={primary_service}
					setShow={setShow}
					isStakeholder={isStakeholder}
					showImpMsg={showImpMsg}
					setShowImpMsg={setShowImpMsg}
				/>
			)}

			<div className={styles.chat_sections}>
				<MessageContainer
					msgContent={msgContent}
					isGettingShipment={isGettingShipment}
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
							content="aaa"
						>
							<div className={styles.icon_wrap}>
								<IcMAttach width={21} height={21} />
							</div>
						</Popover>
						<div className={styles.attached_container}>
							{/* {(formValues?.file || []).map((url) => (
							<div className={styles.attached_doc}>
								<IcMDocument style={{ marginRight: '4px' }} />
								{url.name}
							</div>
						))} */}
						</div>

						<Textarea
							className={styles.text_area}
							placeholder="Type your message here...."
							value={textContent}
							rows
							onKeyPress={(e) => handleKeyPress(e)}
							onKeyDown={(e) => handleDelete(e)}
							onChange={(val) => {
								setTextContent(val);
							}}
						/>

						<div
							className={styles.send}
							role="button"
							tabIndex={0}
							onClick={() => onCreate()}
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
