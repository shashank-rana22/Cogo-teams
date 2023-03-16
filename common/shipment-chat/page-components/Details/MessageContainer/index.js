import React, { useState, useEffect } from 'react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/front/utils';
import { Toggle } from '@cogoport/components';
import { IcMStar, IcCStar, IcMDocument } from '@cogoport/icons-react';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import MsgLoader from '../MsgLoader';
import useUpdateMessage from '../../../hooks/useUpdateMessage';
import {
	Container,
	SendMsg,
	MainContainer,
	Details,
	Msg,
	FlexRow,
	FileName,
	Time,
	ImpSign,
	FilterBox,
} from './styles';

const MessageContainer = ({ msgContent, isGettingShipment }) => {
	const [showImpMsg, setShowImpMsg] = useState(false);
	const { user_name, user_id } = useSelector((s) => ({
		user_name: s?.profile?.name,
		user_id: s?.profile.id,
	}));

	const { onCreate } = useUpdateMessage();

	const handleClick = (msg) => {
		onCreate({
			params: {
				id: msg?.mainKey,
				important: !msg?.important,
			},
		});
	};

	let sortedMessageContentArr = [];

	Object.keys(msgContent || {}).forEach((key) => {
		const newObj = {
			...msgContent[key],
			mainKey: key,
		};
		sortedMessageContentArr.push(newObj);
	});

	sortedMessageContentArr = sortedMessageContentArr.sort((a, b) => {
		const date1 = new Date(a.created_at);
		const date2 = new Date(b.created_at);

		return date1 - date2;
	});

	let importantMessage = [];
	importantMessage = sortedMessageContentArr.filter((obj) => {
		return obj?.important === true;
	});

	const totalMessages = showImpMsg ? importantMessage : sortedMessageContentArr;

	const handleScroll = (id) => {
		if (id) {
			const docs = document.getElementById(id);

			if (docs) {
				docs.scrollIntoView({
					block: 'end',
					inline: 'nearest',
				});
				docs.focus();
			}
		}
	};

	useEffect(() => {
		const lastIndex = sortedMessageContentArr?.length - 1;

		handleScroll(`shipment_chat_message_container${lastIndex}`);
	}, [sortedMessageContentArr]);
	handleScroll('shipment_chat_message_container');

	const getSplited = (str) => {
		const all = str.split('\\n');
		let res = '';
		(all || []).forEach((ele) => {
			res += `${ele}\n`;
		});
		return res;
	};

	const allMessage = () => {
		return (
			<MainContainer>
				{isGettingShipment ? (
					<MsgLoader />
				) : (
					<>
						{(totalMessages || []).map((msg, index) => {
							return (
								<Container
									id={`shipment_chat_message_container${index}`}
									className={
										msg?.created_by_user === user_name ? 'right' : 'left'
									}
								>
									{(msg?.visible_to_user_ids || []).map((item) =>
										item === user_id ? (
											<div style={{ display: 'flex' }}>
												<SendMsg
													className={
														msg?.created_by_user === user_name
															? 'right'
															: 'left'
													}
												>
													<Details>
														<ImpSign
															className={
																msg?.created_by_user === user_name
																	? 'right'
																	: 'left'
															}
															onClick={() => handleClick(msg)}
														>
															{msg?.important === true ? (
																<IcCStar
																	style={{ width: '1.3em', height: '1.3em' }}
																/>
															) : (
																<IcMStar
																	style={{ width: '1.3em', height: '1.3em' }}
																/>
															)}
														</ImpSign>

														<span style={{ margin: '0px 8px' }}>
															{msg?.created_by_stakeholder ? (
																<span>
																	{msg?.created_by_stakeholder ===
																		'booking_agent'
																		? 'KAM'
																		: startCase(msg?.created_by_stakeholder)}
																</span>
															) : null}
														</span>
													</Details>

													{(msg?.attachment_urls || []).map((url) => {
														return (
															<FlexRow>
																<FileName
																	onClick={() => window.open(url, '_blank')}
																>
																	<IcMDocument style={{ marginRight: '6px' }} />
																	{url?.split('/').pop()}
																</FileName>
															</FlexRow>
														);
													})}

													{msg?.content ? (
														<Msg>{`${getSplited(msg.content)}`}</Msg>
													) : null}

													<Time>
														{formatDate({
															date: msg?.created_at,
															dateFormat:
																GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
															timeFormat:
																GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
															formatType: 'dateTime',
															separator: ' | ',
														})}
													</Time>
												</SendMsg>
											</div>
										) : null,
									)}
								</Container>
							);
						})}
					</>
				)}
			</MainContainer>
		);
	};

	return (
		<>
			<FilterBox>
				<div>Show only important Message</div>
				<Toggle value={showImpMsg} onChange={setShowImpMsg} />
			</FilterBox>
			{allMessage()}
		</>
	);
};

export default MessageContainer;
