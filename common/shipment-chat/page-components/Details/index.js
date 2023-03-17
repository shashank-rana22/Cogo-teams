import { Textarea, Upload, Popover } from '@cogoport/components';
import {
	IcMSend,
	IcMAttach,

	// IcMDocument,
	IcMListView,
} from '@cogoport/icons-react';
import React, { useRef, useState } from 'react';

import useCreateMessage from '../../hooks/useCreateMessage';
// import useFireBase from '../../hooks/useFireBase';

import getControls from './controls';
import Header from './Header';
import Loader from './Loader';
// import MessageContainer from './MessageContainer';
// import SendTo from './SendTo';
import styles from './styles.module.css';

// const Text = getField('textarea');
// const Uploader = getField('file');

function Details({
	id,
	activeId,
	sourceId,
	source,
	subscribedUsers = [],
	setShow = () => { },
	isMobile,
	setShowMenu = () => { },
	get = {},
	personal_data = {},
}) {
	const sendToRef = useRef(null);
	const { data, isGettingShipment } = get;
	const {
		shipment_data,
		primary_service,
	} = data || {};

	// console.log(getControls, 'getControls');

	const [stakeHolderView, setStakeHolderView] = useState('');
	const [rows, setRows] = useState(1);
	const [textContent, setTextContent] = useState('');

	console.log(textContent, 'textContent');

	// const { msgContent } = useFireBase({ id });

	// const controls = getControls({ rows });
	// const { watch, fields, handleSubmit, reset } = useForm(controls);
	// const formValues = watch();

	const formValues = {
		message: textContent,
	};

	const reset = () => {
		setTextContent('');
	};
	const { onCreate, onError, loading } = useCreateMessage({
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
		// isStakeholder,
	});

	// const contentData = formValues?.message?.split('\n').length;
	// const handleKeyPress = (e) => {
	// 	if (e.key === 'Enter' && e.shiftKey && rows < 5) {
	// 		setRows(contentData + 1);
	// 	}

	// 	// if (e.key === 'Enter' && !e.shiftKey) {
	// 	// 	onCreate();
	// 	// 	reset();
	// 	// 	setRows(1);
	// 	// }
	// };

	// const handleDelete = (e) => {
	// 	if (contentData > 1 && (e.keyCode === 8 || e.keyCode === 46)) {
	// 		setRows(contentData - 1);
	// 	}
	// };

	if (activeId !== id) {
		return null;
	}

	return (
		<div className={styles.container}>
			{isGettingShipment ? (
				<Loader />
			) : (
				<Header shipment_data={shipment_data} primary_service={primary_service} setShow={setShow} />
			)}

			<div className={styles.chat_sections}>
				{/* <MessageContainer
					msgContent={msgContent}
					isGettingShipment={isGettingShipment}
				/> */}

				{source === 'shipment' ? (
					// <SendTo
					// 	ref={sendToRef}
					// 	data={data}
					// 	// setStakeHolderView={setStakeHolderView}
					// 	isStakeholder={isStakeholder}
					// />
					null
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
						placeholder="Type here"
						value={textContent}
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
	);
}

export default Details;
