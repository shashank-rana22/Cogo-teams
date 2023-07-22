import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateCommunicationTemplate from '../../hooks/useCreateCommunicationTemplate';
import useListTemplate from '../../hooks/useListTemplates';
import hideDetails from '../../utils/hideDetails';

import CreateTemplateForm from './CreateTemplateForm';
import { Header } from './headerHelpers';
import styles from './styles.module.css';
import { Preview, Loader, ListItem } from './templatesHelpers';

const DEFAULT_OPTIONS = ['whatsapp_new_message_modal', 'bulk_communication'];

function Templates({
	openCreateReply = false,
	setOpenCreateReply = () => {},
	data = {},
	type = '',
	dialNumber = '',
	setDialNumber = () => {},
	viewType = '',
	selectedAutoAssign = {},
	userName = '',
}) {
	const [customizableData, setCustomizableData] = useState({});
	const [activeCard, setActiveCard] = useState({
		show : DEFAULT_OPTIONS.includes(type),
		data : {},
	});

	const {
		sendCommunicationTemplate = () => {},
		communicationLoading = false,
	} = data || {};

	const { name, html_template, variables = [] } = activeCard?.data || {};

	const isAllKeysAndValuesPresent = variables.every(
		(key) => (key in customizableData) && customizableData[key],
	);

	const isDefaultOpen = DEFAULT_OPTIONS.includes(type);

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
					<Header
						type={type}
						dialNumber={dialNumber}
						setDialNumber={setDialNumber}
						maskedMobileNumber={maskedMobileNumber}
						userName={userName}
						selectedAutoAssign={selectedAutoAssign}
					/>
					<div className={styles.container}>
						<Input
							value={qfilter}
							onChange={(e) => setQfilter(e)}
							placeholder="Search saved template here..."
							prefix={<IcMSearchlight />}
							className={styles.search_input}
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
