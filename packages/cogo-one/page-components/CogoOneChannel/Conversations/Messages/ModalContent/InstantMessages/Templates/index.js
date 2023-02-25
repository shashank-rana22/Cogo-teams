import { cl, Input, Button, Placeholder, Pill } from '@cogoport/components';
import { useForm, TextareaController, InputController } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../../../../../../../configurations/create-instant-reply';
import { statusMapping, statusColorMapping } from '../../../../../../../constants/index';
import useCreateCommunicationTemplate from '../../../../../../../hooks/useCreateCommunicationTemplate';
import useListTemplate from '../../../../../../../hooks/useListTemplates';

import styles from './styles.module.css';

function Templates({
	activeTab,
	openCreateReply,
	setOpenCreateReply = () => {},
	data = {},
}) {
	const { sendCommunicationTemplate, communicationLoading } = data || {};
	const [showPreview, setShowPreview] = useState(false);
	const [previewData, setPreviewData] = useState();
	const [templateName, setTemplateName] = useState('');
	const [activeCard, setActiveCard] = useState('');
	const { title, content = '' } = controls;

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
	} = useListTemplate({ activeTab });
	const { createTemplate, loading: CreateLoading } = useCreateCommunicationTemplate({
		reset: () => {
			reset({ title: '', content: '' });
		},
		refetch,
		setOpenCreateReply,
	});

	const handleSelect = (val, status, name, Id) => {
		if (!previewData && status === 'approved' && !openCreateReply) {
			setShowPreview(true);
			setPreviewData(val);
			setTemplateName(name);
			setActiveCard((prev) => {
				if (prev !== Id) {
					return Id;
				}
				return '';
			});
		}
	};

	const handleClick = () => {
		sendCommunicationTemplate(templateName);
	};

	function CreateReactComponent() {
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

	return (
		<div className={styles.main_container}>
			<div className={styles.messages_container}>
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
								content: { name: messageTitle },
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
                                            previewData
                                            || whatsapp_approval_status
                                                !== 'approved'
                                            || openCreateReply
                                            	? 'not-allowed'
                                            	: 'pointer',
									}}
								>
									<div className={styles.wrap}>
										<div className={styles.title}>
											{messageTitle}
										</div>
										<div>
											<Pill size="md" color={statusColorMapping[whatsapp_approval_status]}>
												{statusMapping[whatsapp_approval_status]}
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
				<div className={styles.footer}>
					<Button
						themeType="accent"
						size="md"
						disabled={openCreateReply || showPreview}
						onClick={() => setOpenCreateReply(true)}
					>
						+ Create Reply
					</Button>
				</div>
			</div>
			{openCreateReply && (
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
							<TextareaController
								control={control}
								{...content}
								id="content"
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
							onClick={() => setOpenCreateReply(!openCreateReply)}
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

			{showPreview && (
				<div className={styles.create_container}>
					<div className={styles.preview}>
						<div className={styles.whatsapp}>
							<div className={styles.overflow_div}>
								<div className={styles.preview_div}>
									{CreateReactComponent()}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.create_footer}>
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
						<Button
							themeType="accent"
							size="md"
							onClick={handleClick}
							disabled={communicationLoading}
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
