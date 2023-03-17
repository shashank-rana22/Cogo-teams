import { Button, Popover } from '@cogoport/components';
// import getField from '@cogo/business-modules/form/components';
// import { useForm } from '@cogoport/forms';
// import PortDetails from '@cogo/bookings/ShipmentDetails/commons/Header/PortDetails';
import {
	IcMSend,
	// IcMAttach,
	IcMProfile,
	// IcMDocument,
	IcMListView,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React, { useRef } from 'react';

// import useCreateMessage from '../../hooks/useCreateMessage';
// import useFireBase from '../../hooks/useFireBase';

// import getControls from './controls';
import Loader from './Loader';
// import MessageContainer from './MessageContainer';
import SendTo from './SendTo';
import stakeholderMappings from './SendTo/stakeholder-mappings';
import styles from './styles.module.css';

// const Text = getField('textarea');
// const Uploader = getField('file');

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
	// sourceId,
	source,
	// subscribedUsers = [],
	setShow = () => { },
	isMobile,
	setShowMenu = () => { },
	get = {},
	personal_data = {},
}) {
	const { push } = useRouter();
	const sendToRef = useRef(null);
	const { data, isGettingShipment } = get;
	const {
		shipment_data,
		// primary_service,
	} = data || {};
	const { serial_id, id: shipment_id } = shipment_data || {};

	// const [stakeHolderView, setStakeHolderView] = useState('');
	// const [rows, setRows] = useState(1);

	const isStakeholder = shipmentChatStakeholders.includes(
		shipment_data?.stakeholder_types?.[0],
	);
	const groupChatUsers = isStakeholder
		? stakeholderMappings[shipment_data?.stakeholder_types?.[0] || 'default']
		|| []
		: stakeholderMappings.default;

	// const { msgContent } = useFireBase({ id });

	const content = () => (
		<div className={styles.chat_users}>
			{groupChatUsers?.map((item) => (
				<div className={styles.user_name}>{startCase(item)}</div>
			))}
		</div>
	);

	// const controls = getControls({ rows });
	// const { watch, fields, handleSubmit, reset } = useForm(controls);
	// const formValues = watch();

	// const { onCreate, onError, loading } = useCreateMessage({
	// 	shipment_data,
	// 	formValues,
	// 	reset,
	// 	id,
	// 	stakeHolderView,
	// 	sourceId,
	// 	source,
	// 	sendToRef,
	// 	personal_data,
	// 	subscribedUsers,
	// 	isStakeholder,
	// });

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

	const handleClick = () => {
		push('/shipments/[id]', `/shipments/${shipment_id}`);
		setShow(false);
	};

	if (activeId !== id) {
		return null;
	}

	return (
		<div className={styles.container}>
			{isGettingShipment ? (
				<Loader />
			) : (
				<div className={styles.header}>
					{isMobile ? (
						<IcMListView
							className="bar-icon"
							width={21}
							height={21}
							onClick={() => setShowMenu(true)}
						/>
					) : null}
					{serial_id ? (
						<div
							className={styles.serial_id}
							role="button"
							tabIndex={0}
							onClick={() => handleClick()}
						>
							Shipment ID
							<span style={{ fontWeight: 700, marginLeft: '4px' }}>
								#
								{serial_id}
							</span>
						</div>
					) : null}

					{/* <PortDetails
						data={shipment_data}
						primary_service={primary_service}
						isShow={false}
					/> */}

					{personal_data?.channel_name ? (
						<div className={styles.name}>{startCase(personal_data?.channel_name)}</div>
					) : (
						<div
							className={styles.popover_container}
							// className="popOver-container"
						>
							<Popover
								theme="light"
								interactive
								placement="top"
								content={content()}
							>
								<Button className="primary md">
									<IcMProfile width={28} height={28} />
									{groupChatUsers?.length}
								</Button>
							</Popover>
						</div>
					)}
				</div>
			)}

			<div className={styles.chat_sections}>
				{/* <MessageContainer
					msgContent={msgContent}
					isGettingShipment={isGettingShipment}
				/> */}

				{source === 'shipment' ? (
					<SendTo
						ref={sendToRef}
						data={data}
						// setStakeHolderView={setStakeHolderView}
						isStakeholder={isStakeholder}
					/>
				) : (
					<div style={{ padding: '21px' }} />
				)}

				<div className={styles.typing_container}>
					{/* <Popover
						theme="light"
						interactive
						content={<Uploader {...fields.file} />}
					>
						<div className={styles.icon_wrap}>
							<IcMAttach width={21} height={21} />
						</div>
					</Popover> */}
					<div className={styles.attached_container}>
						{/* {(formValues?.file || []).map((url) => (
							<div className={styles.attached_doc}>
								<IcMDocument style={{ marginRight: '4px' }} />
								{url.name}
							</div>
						))} */}
					</div>

					{/* <Text
						onKeyPress={(e) => handleKeyPress(e)}
						onKeyDown={(e) => handleDelete(e)}
						{...fields.message}
					/> */}

					<div className={styles.send}>
						<IcMSend style={{ width: '2em', height: '2em', fill: '#303b67' }} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
