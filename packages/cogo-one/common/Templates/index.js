import { cl, Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { DEFAULT_OPTIONS } from '../../constants';
import useCreateCommunicationTemplate from '../../hooks/useCreateCommunicationTemplate';
import useListTemplate from '../../hooks/useListTemplates';
import hideDetails from '../../utils/hideDetails';

import CreateTemplateForm from './CreateTemplateForm';
import { Header } from './headerHelpers';
import styles from './styles.module.css';
import TemplatePreview from './TemplatePreview';
import { Loader, ListItem } from './templatesHelpers';

const LAST_VALUE = 1;

function Templates({
	openCreateReply = false,
	setOpenCreateReply = () => {},
	data = {},
	type = '',
	dialNumber = '',
	setDialNumber = () => {},
	viewType = '',
	userName = '',
	orgId = '',
	isMobile = false,
}) {
	const [shipmentData, setShipmentData] = useState(null);
	const [customizableData, setCustomizableData] = useState({});
	const [activeCard, setActiveCard] = useState({
		show : DEFAULT_OPTIONS.includes(type),
		data : {},
	});

	const [fileValue, setFileValue] = useState('');
	const [templateView, setTemplateView] = useState({
		preview  : false,
		listView : true,
	});

	const {
		sendCommunicationTemplate = () => {},
		communicationLoading = false,
	} = data || {};

	const { name, html_template, variables = null, tags = [], id = '' } = activeCard?.data || {};

	const isAllKeysAndValuesPresent = (variables || [])?.every(
		(key) => (key in customizableData) && customizableData[key],
	);

	const isDefaultOpen = DEFAULT_OPTIONS.includes(type);

	const maskedMobileNumber = `${dialNumber?.country_code}
	 ${hideDetails({ type: 'number', data: dialNumber?.number })}`;

	const urlArray = decodeURI(fileValue)?.split('/');
	const fileName = urlArray?.[(urlArray.length || GLOBAL_CONSTANTS.zeroth_index) - LAST_VALUE] || '';
	const formatFileName = fileName?.split('.')[GLOBAL_CONSTANTS.zeroth_index];

	const {
		setQfilter,
		handleScroll,
		qfilter,
		infiniteList: { list = [] },
		loading,
		refetch,
	} = useListTemplate({ viewType });

	const { createTemplate, loading: createLoading } = useCreateCommunicationTemplate();

	const documentDetails = {
		filename : formatFileName || undefined,
		link     : fileValue || undefined,
	};

	const handleClick = () => {
		sendCommunicationTemplate({
			template_name : name,
			type          : 'whatsapp',
			tags          : ['update_time'],
			variables     : {
				...customizableData,
				document: tags.includes('document') ? documentDetails : undefined,
			},
		});
	};

	const handleTemplateSelect = (val) => {
		if (val?.third_party_template_status !== 'approved' || openCreateReply) {
			return;
		}
		if (isMobile) {
			setTemplateView(() => ({ listView: false, preview: true }));
		}

		setCustomizableData({});
		setActiveCard({ show: true, data: val });
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.messages_container}>

				<Header
					type={type}
					dialNumber={dialNumber}
					setDialNumber={setDialNumber}
					maskedMobileNumber={maskedMobileNumber}
					userName={userName}
					isMobile={isMobile}
					setActiveCard={setActiveCard}
					setTemplateView={setTemplateView}
					selectedTemplateId={id}
				/>
				<div className={cl`${!isMobile ? styles.wrap : ''}`}>
					{(!isMobile || templateView?.listView) ? (
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
					) : null}

					{((activeCard?.show && !openCreateReply) && (!isMobile || templateView?.preview)) ? (
						<TemplatePreview
							tags={tags}
							orgId={orgId}
							shipmentData={shipmentData}
							setShipmentData={setShipmentData}
							setCustomizableData={setCustomizableData}
							html_template={html_template}
							variables={variables}
							customizableData={customizableData}
							setFileValue={setFileValue}
							fileValue={fileValue}
							fileName={fileName}
							isDefaultOpen={isDefaultOpen}
							setActiveCard={setActiveCard}
							handleClick={handleClick}
							name={name}
							communicationLoading={communicationLoading}
							isAllKeysAndValuesPresent={isAllKeysAndValuesPresent}
						/>
					) : null}
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

		</div>
	);
}
export default Templates;
