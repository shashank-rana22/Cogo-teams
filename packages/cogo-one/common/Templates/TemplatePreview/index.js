import { Button } from '@cogoport/components';

import { Preview } from '../templatesHelpers';
import TemplateSidHeader from '../TemplateSidHeader';

import styles from './styles.module.css';

function TemplatePreview({
	orgId = '', tags = [], shipmentData = {},
	setShipmentData = () => {}, html_template = null, variables = null, isDefaultOpen = false,
	customizableData = {}, setCustomizableData = () => {}, setFileValue = () => {}, fileValue = '', fileName = '',
	communicationLoading = false, setActiveCard = () => {}, handleClick = () => {},
	name = '', isAllKeysAndValuesPresent = null, setTemplateView = () => {}, isMobile = false,
}) {
	return (
		<div className={styles.create_container}>
			{tags.includes('shipment') && orgId && (
				<TemplateSidHeader
					orgId={orgId}
					shipmentData={shipmentData}
					setShipmentData={setShipmentData}
				/>
			)}
			<div className={styles.preview}>
				<div className={styles.whatsapp}>
					<div className={styles.overflow_div}>
						<div className={styles.preview_div}>
							<Preview
								previewData={html_template}
								variables={variables}
								customizableData={customizableData}
								setCustomizableData={setCustomizableData}
								tags={tags}
								setFileValue={setFileValue}
								fileValue={fileValue}
								fileName={fileName}
								shipmentData={shipmentData}
								orgId={orgId}
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
							if (isMobile) {
								setTemplateView({ listView: true, preview: false });
							}
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
	);
}

export default TemplatePreview;
