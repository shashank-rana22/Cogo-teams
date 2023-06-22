import { Input, Button } from '@cogoport/components';
import { useForm, TextAreaController, InputController } from '@cogoport/forms';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { IcMSearchlight, IcCSendWhatsapp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import controls from '../../configurations/create-instant-reply';
import useCreateCommunicationTemplate from '../../hooks/useCreateCommunicationTemplate';
import useListTemplate from '../../hooks/useListTemplates';
import hideDetails from '../../utils/hideDetails';

import styles from './styles.module.css';
import { Preview, Loader, ListItem } from './templatesHelpers';

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
	const [previewData, setPreviewData] = useState('');
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

	const handleSelect = ({ val, status, name, id }) => {
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

	const createAction = () => {
		setOpenCreateReply(true);
		setShowPreview(false);
		setActiveCard('');
		setPreviewData('');
		setTemplateName('');
	};

	useEffect(() => {
		setShowPreview(isDefaultOpen);
	}, [isDefaultOpen]);

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
								(eachItem) => (
									<ListItem
										key={eachItem?.id}
										item={eachItem}
										activeCard={activeCard}
										handleSelect={handleSelect}
										openCreateReply={openCreateReply}
									/>
								),
							)}
							{loading && <Loader />}
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
									<Preview previewData={previewData} />
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
