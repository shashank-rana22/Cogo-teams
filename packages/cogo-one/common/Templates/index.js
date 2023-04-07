import { cl, Input, Button, Placeholder, Pill } from '@cogoport/components';
import { useForm, TextAreaController, InputController } from '@cogoport/forms';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { IcMSearchlight, IcCSendWhatsapp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import controls from '../../configurations/create-instant-reply';
import { statusMapping, statusColorMapping } from '../../constants';
import useCreateCommunicationTemplate from '../../hooks/useCreateCommunicationTemplate';
import useListTemplate from '../../hooks/useListTemplates';
import hideDetails from '../../utils/hideDetails';

import styles from './styles.module.css';

function Templates({
	openCreateReply,
	setOpenCreateReply = () => {},
	data = {},
	type = '',
	dialNumber = '',
	setDialNumber = () => {},
}) {
	const {
		sendCommunicationTemplate = () => {},
		communicationLoading = false,
	} = data || {};
	const [showPreview, setShowPreview] = useState(false);
	const [previewData, setPreviewData] = useState();
	const [templateName, setTemplateName] = useState('');
	const [activeCard, setActiveCard] = useState('');
	const { title, content = '' } = controls;

	const isDefaultOpen = type === 'whatsapp_new_message_modal';
	const maskMobileNumber = type === 'voice_call_component';

	const maskedMobileNumber = `${dialNumber?.country_code}
	 ${hideDetails({ type: 'number', data: dialNumber?.number })}`;

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const {
		setQfilter,
		handleScroll,
		qfilter,
		infiniteList: { list = [] },
		loading,
		refetch,
	} = useListTemplate();

	const { createTemplate, loading: CreateLoading } = useCreateCommunicationTemplate({
		reset: () => {
			reset({ title: '', content: '' });
		},
		refetch,
		setOpenCreateReply,
	});

	const handleSelect = (val, status, name, id) => {
		if (status === 'approved' && !openCreateReply) {
			setShowPreview(true);
			setPreviewData(val);
			setTemplateName(name);
			setActiveCard(id);
		}
	};

	const handleClick = () => {
		sendCommunicationTemplate({
			template_name : templateName,
			type          : 'whatsapp',
			tags          : ['update_time'],
		});
	};

	function handlePreview() {
		const preview = previewData
			?.replaceAll(/<p>\s+(<[/]p>)/g, '<br>')
			?.replaceAll(/<p>(<[/]p>)/g, '<br>')
			?.replaceAll('<p', '<div')
			?.replaceAll('<p>', '<div>')
			?.replaceAll('</p>', '&nbsp;</div>')
			?.replaceAll('</span>', '&nbsp;</span>');

		return <div dangerouslySetInnerHTML={{ __html: preview }} />;
	}

	const loader = () => [...Array(6)].map(() => (
		<div className={styles.loader_div}>
			<Placeholder height="10px" width="100px" margin="0 0 10px 0" />
			<Placeholder height="30px" width="200px" margin="0 0 10px 0" />
		</div>
	));

	useEffect(() => {
		setShowPreview(isDefaultOpen);
	}, [isDefaultOpen]);

	const createAction = () => {
		setOpenCreateReply(true);
		setShowPreview(false);
		setActiveCard('');
		setPreviewData('');
		setTemplateName('');
	};
	return (
		<div className={styles.main_container}>
			<div className={styles.messages_container}>
				<div>
					{isDefaultOpen && (
						<>
							<div className={styles.wrap_heading}>
								<div>Enter mobile number</div>
							</div>
							<div className={styles.wrap_mobile_number}>
								<SelectMobileNumber
									value={dialNumber}
									onChange={(val) => setDialNumber(val)}
									inputType="number"
									placeholder="Enter number"
								/>
							</div>
							<div className={styles.template_heading}>
								<div>Select a template</div>
							</div>
						</>
					)}
					{
						maskMobileNumber && (
							<div className={styles.flex_div}>
								<div className={styles.mobile_number}>To</div>
								<IcCSendWhatsapp className={styles.whatsapp_icon} />
								<div className={styles.mobile_number}>{maskedMobileNumber}</div>
							</div>
						)
					}
					<div className={styles.container}>
						<Input
							value={qfilter}
							onChange={(e) => setQfilter(e)}
							placeholder="Search saved template here..."
							prefix={<IcMSearchlight />}
						/>
						<div
							className={styles.message_container}
							onScroll={(e) => handleScroll(
								e.target.clientHeight,
								e.target.scrollTop,
								e.target.scrollHeight,
							)}
						>
							{(list || []).map(
								({
									content: { name: messageTitle = '' } = {},
									description: messageContent = '',
									whatsapp_approval_status,
									html_template,
									name: templateTitle,
									id,
								}) => (
									<div
										role="presentation"
										className={cl`${
											activeCard === id
												? styles.active
												: styles.each_message
										}`}
										onClick={() => handleSelect(
											html_template,
											whatsapp_approval_status,
											templateTitle,
											id,
										)}
										style={{
											cursor:
                                                whatsapp_approval_status
                                                    !== 'approved'
                                                || openCreateReply ? 'not-allowed' : 'pointer',
										}}
									>
										<div className={styles.wrap}>
											<div className={styles.title}>
												{messageTitle}
											</div>
											<div>
												<Pill
													size="md"
													color={
                                                        statusColorMapping[whatsapp_approval_status || 'pending']
                                                    }
												>
													{
                                                        statusMapping[whatsapp_approval_status || 'pending']
                                                    }
												</Pill>
											</div>
										</div>
										<div className={styles.message}>
											{messageContent}
										</div>
									</div>
								),
							)}
							{loading && loader()}
							{isEmpty(list) && !loading && (
								<div className={styles.empty_div}>
									No Templates Found
								</div>
							)}
						</div>
					</div>
				</div>
				<div className={styles.footer}>
					<Button
						themeType="accent"
						size="md"
						disabled={openCreateReply}
						onClick={createAction}
					>
						+ Create Template
					</Button>
				</div>
			</div>
			{openCreateReply && !showPreview && (
				<div className={styles.create_container}>
					<div>
						<div className={styles.label}>Name</div>
						<InputController
							control={control}
							{...title}
							id="title"
						/>
						{errors?.title && (
							<div className={styles.error_text}>
								This is Required
							</div>
						)}
						<div className={styles.text_area_container}>
							<div className={styles.label}>Content</div>
							<TextAreaController
								control={control}
								{...content}
								id="content"
								rows={10}
							/>
							{errors?.content && (
								<div className={styles.error_text}>
									This is Required
								</div>
							)}
						</div>
					</div>
					<div className={styles.create_footer}>
						<Button
							themeType="tertiary"
							size="md"
							className={styles.button_styles}
							onClick={() => {
								setOpenCreateReply((p) => !p);
								setShowPreview(isDefaultOpen);
							}}
						>
							Cancel
						</Button>
						<Button
							themeType="accent"
							size="md"
							onClick={handleSubmit(createTemplate)}
							loading={CreateLoading}
						>
							Create
						</Button>
					</div>
				</div>
			)}

			{showPreview && !openCreateReply && (
				<div className={styles.create_container}>
					<div className={styles.preview}>
						<div className={styles.whatsapp}>
							<div className={styles.overflow_div}>
								<div className={styles.preview_div}>
									{handlePreview()}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.create_footer}>
						{!isDefaultOpen && (
							<Button
								themeType="tertiary"
								size="md"
								className={styles.button_styles}
								onClick={() => {
									setShowPreview(false);
									setActiveCard('');
									setPreviewData('');
								}}
							>
								Cancel
							</Button>
						)}
						<Button
							themeType="accent"
							size="md"
							onClick={handleClick}
							disabled={!templateName || communicationLoading}
						>
							Send
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
export default Templates;
