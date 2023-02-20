import {
	cl,
	Toast,
	Input,
	Button,
	Placeholder,
	Pill,
} from '@cogoport/components';
import { useForm, TextareaController, InputController } from '@cogoport/forms';
import { IcMSearchlight, IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import controls from '../../../../../../../configurations/create-instant-reply';
import useCreateCommunicationTemplate from '../../../../../../../hooks/useCreateCommunicationTemplate';
import useListTemplate from '../../../../../../../hooks/useListTemplates';

import styles from './styles.module.css';

function Templates({
	activeTab,
	openCreateReply,
	setOpenCreateReply = () => {},
	// setActiveTab = () => {},
	data = {},
}) {
	const { sendCommunicationTemplate, communicationLoading } = data || {};
	const [showPreview, setShowPreview] = useState(false);
	const [previewData, setPreviewData] = useState();
	const [templateName, setTemplateName] = useState('');
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
	});

	const handleSelect = (val, status, name) => {
		if (!previewData && status === 'approved') {
			setShowPreview(true);
			setPreviewData(val);
			setTemplateName(name);
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
							}) => (
								<div
									role="presentation"
									className={cl`${!openCreateReply ? styles.each_message : styles.disable}`}
									onClick={() => handleSelect(html_template, whatsapp_approval_status, templateTitle)}
									style={{
										cursor: previewData || whatsapp_approval_status !== 'approved'
											? 'not-allowed' : 'pointer',
									}}
								>
									<div className={styles.wrap}>
										<div className={styles.title}>{messageTitle}</div>
										<div>
											{whatsapp_approval_status === 'approved' && (
												<Pill size="md" color="green">
													Approved
												</Pill>
											)}
											{whatsapp_approval_status === 'rejected' && (
												<Pill size="md" color="red">
													Rejected
												</Pill>
											)}
											{whatsapp_approval_status === null && (
												<Pill size="md" color="orange">
													Pending
												</Pill>
											)}
										</div>
									</div>
									<div className={styles.message}>{messageContent}</div>
								</div>
							),
						)}
						{loading && loader()}
						{isEmpty(list) && !loading && (
							<div className={styles.empty_div}>No Templates Found</div>
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
						<InputController control={control} {...title} id="title" />
						{errors?.title && (
							<div className={styles.error_text}>This is Required</div>
						)}
						<div className={styles.text_area_container}>
							<div className={styles.label}>Content</div>
							<TextareaController control={control} {...content} id="content" />
							{errors?.content && (
								<div className={styles.error_text}>This is Required</div>
							)}
						</div>
					</div>
					<div className={styles.create_footer}>
						<Button
							themeType="tertiary"
							size="md"
							className={styles.button_styles}
							onClick={() => setOpenCreateReply(false)}
						>
							cancel
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
				<div className={styles.wrapper}>
					<div className={styles.preview}>
						<div className={styles.whatsapp}>
							{/* <div className={styles.back_icon}>
								<IcMArrowBack height={14} width={14} />
							</div> */}
							<div className={styles.overflow_div}>
								<div className={styles.preview_div}>{CreateReactComponent()}</div>
							</div>
						</div>
					</div>
					<div className={styles.create_footer}>
						<Button
							themeType="tertiary"
							size="md"
							className={styles.button_styles}
							onClick={() => setOpenCreateReply(false)}
						>
							Cancel
						</Button>
						<Button
							themeType="accent"
							size="md"
							onClick={handleClick}
							loading={communicationLoading}
						>
							Submit
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
export default Templates;
