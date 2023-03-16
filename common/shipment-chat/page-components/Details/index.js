import React, { useState, useRef } from 'react';
import { startCase } from '@cogoport/front/utils';
import { Button, Popover } from '@cogoport/components';
import getField from '@cogo/business-modules/form/components';
import { useFormCogo } from '@cogoport/front/hooks';
import { useRouter } from '@cogo/next';
import PortDetails from '@cogo/bookings/ShipmentDetails/commons/Header/PortDetails';
import {
	IcMSend,
	IcMAttach,
	IcMProfile,
	IcMDocument,
	IcMListView,
} from '@cogoport/icons-react';
import Loader from './Loader';
import getControls from './controls';
import useCreateMessage from '../../hooks/useCreateMessage';
import SendTo from './SendTo';
import MessageContainer from './MessageContainer';
import useFireBase from '../../hooks/useFireBase';
import stakeholderMappings from './SendTo/stakeholder-mappings';
import {
	Container,
	Header,
	SerialId,
	ChatSections,
	TypingContainer,
	IconWrap,
	AttachedDoc,
	AttachedContainer,
	PopoverContainer,
	Name,
	ChatUsers,
	UserName,
	Send,
} from './styles';

const Text = getField('textarea');
const Uploader = getField('file');

const shipmentChatStakeholders = [
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'booking_agent',
	'supply_agent',
];

const Details = ({
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
}) => {
	const { push } = useRouter();
	const sendToRef = useRef(null);
	const { data, isGettingShipment } = get;
	const { shipment_data, primary_service } = data || {};
	const { serial_id, id: shipment_id } = shipment_data || {};

	const [stakeHolderView, setStakeHolderView] = useState('');
	const [rows, setRows] = useState(1);

	const isStakeholder = shipmentChatStakeholders.includes(
		shipment_data?.stakeholder_types?.[0],
	);
	const groupChatUsers = isStakeholder
		? stakeholderMappings[shipment_data?.stakeholder_types?.[0] || 'default'] ||
		[]
		: stakeholderMappings.default;

	const { msgContent } = useFireBase({ id });

	const content = () => {
		return (
			<ChatUsers>
				{groupChatUsers?.map((item) => (
					<UserName>{startCase(item)}</UserName>
				))}
			</ChatUsers>
		);
	};

	const controls = getControls({ rows });
	const { watch, fields, handleSubmit, reset } = useFormCogo(controls);
	const formValues = watch();

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
		isStakeholder,
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

	const handleClick = () => {
		push('/shipments/[id]', `/shipments/${shipment_id}`);
		setShow(false);
	};

	if (activeId !== id) {
		return null;
	}

	return (
		<Container>
			{isGettingShipment ? (
				<Loader />
			) : (
				<Header>
					{isMobile ? (
						<IcMListView
							className="bar-icon"
							width={21}
							height={21}
							onClick={() => setShowMenu(true)}
						/>
					) : null}
					{serial_id ? (
						<SerialId onClick={() => handleClick()}>
							Shipment ID
							<span style={{ fontWeight: 700, marginLeft: '4px' }}>
								#{serial_id}
							</span>
						</SerialId>
					) : null}

					<PortDetails
						data={shipment_data}
						primary_service={primary_service}
						isShow={false}
					/>

					{personal_data?.channel_name ? (
						<Name>{startCase(personal_data?.channel_name)}</Name>
					) : (
						<PopoverContainer className="popOver-container">
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
						</PopoverContainer>
					)}
				</Header>
			)}

			<ChatSections>
				<MessageContainer
					msgContent={msgContent}
					isGettingShipment={isGettingShipment}
				/>

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

				<TypingContainer>
					<Popover
						theme="light"
						interactive
						content={<Uploader {...fields.file} />}
					>
						<IconWrap>
							<IcMAttach width={21} height={21} />
						</IconWrap>
					</Popover>
					<AttachedContainer>
						{(formValues?.file || []).map((url) => {
							return (
								<AttachedDoc>
									<IcMDocument style={{ marginRight: '4px' }} />
									{url.name}
								</AttachedDoc>
							);
						})}
					</AttachedContainer>

					<Text
						onKeyPress={(e) => handleKeyPress(e)}
						onKeyDown={(e) => handleDelete(e)}
						{...fields.message}
					/>

					<Send
						onClick={!loading ? handleSubmit(onCreate, onError) : null}
						className={loading ? 'loading' : null}
					>
						<IcMSend style={{ width: '2em', height: '2em', fill: '#303b67' }} />
					</Send>
				</TypingContainer>
			</ChatSections>
		</Container>
	);
};

export default Details;
