import { Input, Button } from '@cogoport/components';
import SelectMobileNumber from '@cogoport/forms/page-components/Business/SelectMobileNumber';
import { IcMSearchlight, IcCSendWhatsapp } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateCommunicationTemplate from '../../hooks/useCreateCommunicationTemplate';
import useListTemplate from '../../hooks/useListTemplates';
import hideDetails from '../../utils/hideDetails';

import CreateTemplateForm from './CreateTemplateForm';
import styles from './styles.module.css';
import { Preview, Loader, ListItem } from './templatesHelpers';

function Templates({
	openCreateReply = false,
	setOpenCreateReply = () => {},
	data = {},
	type = '',
	dialNumber = '',
	setDialNumber = () => {},
	viewType = '',
}) {
	const [customizableData, setCustomizableData] = useState({});
	const {
		sendCommunicationTemplate = () => {},
		communicationLoading = false,
	} = data || {};

	const [activeCard, setActiveCard] = useState({ show: type === 'whatsapp_new_message_modal', data: {} });

	const { name, html_template, variables = [] } = activeCard?.data || {};

	const isAllKeysAndValuesPresent = variables.every(
		(key) => Object.prototype.hasOwnProperty.call(customizableData, key) && customizableData[key],
	);

	const isDefaultOpen = type === 'whatsapp_new_message_modal';
	const maskMobileNumber = type === 'voice_call_component';

	const maskedMobileNumber = `${dialNumber?.country_code}
	 ${hideDetails({ type: 'number', data: dialNumber?.number })}`;

	const {
		setQfilter,
		handleScroll,
		qfilter,
		infiniteList: { list = [] },
		loading,
		refetch,
	} = useListTemplate({ viewType });

	const { createTemplate, loading: createLoading } = useCreateCommunicationTemplate();

	const handleClick = () => {
		sendCommunicationTemplate({
			template_name : name,
			type          : 'whatsapp',
			tags          : ['update_time'],
			variables     : customizableData,
		});
	};

	const onCreateClick = () => {
		setOpenCreateReply(true);
		setActiveCard({ show: false, data: {} });
	};

	const handleTemplateSelect = (val) => {
		if (val?.third_party_template_status !== 'approved' || openCreateReply) {
			return;
		}

		setCustomizableData({});
		setActiveCard({ show: true, data: val });
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
								(eachItem) => (
									<ListItem
										key={eachItem?.id}
										item={eachItem}
										activeCard={activeCard}
										handleTemplateSelect={handleTemplateSelect}
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
						onClick={onCreateClick}
					>
						+ Create Template
					</Button>
				</div>
			</div>
			{openCreateReply && !activeCard?.show && (
				<div className={styles.create_container}>
					<CreateTemplateForm
						createTemplate={createTemplate}
						createLoading={createLoading}
						refetch={refetch}
						setOpenCreateReply={setOpenCreateReply}
						setActiveCard={setActiveCard}
						isDefaultOpen={isDefaultOpen}
					/>
				</div>
			)}

			{activeCard?.show && !openCreateReply && (
				<div className={styles.create_container}>
					<div className={styles.preview}>
						<div className={styles.whatsapp}>
							<div className={styles.overflow_div}>
								<div className={styles.preview_div}>
									<Preview
										previewData={html_template}
										variables={variables}
										customizableData={customizableData}
										setCustomizableData={setCustomizableData}
									/>
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
									setActiveCard({ show: false, data: {} });
								}}
								disabled={communicationLoading}
							>
								Cancel
							</Button>
						)}
						<Button
							themeType="accent"
							size="md"
							onClick={handleClick}
							disabled={!name || !isAllKeysAndValuesPresent}
							loading={communicationLoading}
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
