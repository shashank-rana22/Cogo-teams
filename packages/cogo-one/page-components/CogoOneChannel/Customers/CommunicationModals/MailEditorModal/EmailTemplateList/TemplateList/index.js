import { cl, Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEmail } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';

import PreviewHtml from '../../../../../../../common/PreviewHtml';
import RenderTemplateTags from '../RenderTemplateTags';

import styles from './styles.module.css';

function TemplateList({
	list = [],
	setEmailTemplate = () => {},
	setEmailState = () => {},
	emailData = {},
}) {
	const { id: selectedId = '' } = emailData || {};

	const handleSelect = ({ item }) => {
		setEmailTemplate((prev) => ({ ...prev, emailData: item, isTemplateView: false }));
		setEmailState((prev) => ({ ...prev, rteContent: item?.html_template }));
	};

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_image}>
				<Image src={GLOBAL_CONSTANTS.image_url.empty_image} alt="empty" width={150} height={150} />
				<div>No Data Found</div>
			</div>
		);
	}

	return (
		<>
			{(list || []).map((item) => {
				const {
					html_template = '',
					language = '',
					tags = [],
					updated_at = '',
					id = '',
					name = '',
				} = item || {};

				return (
					<div
						role="presentation"
						className={cl`${styles.each_template} 
								${selectedId === id ? styles.selected_template : ''}`}
						key={id}
						onClick={() => handleSelect({ item })}
					>
						<div className={styles.header_section}>
							<IcMEmail width={20} height={20} fill="#E09B3D" />
							<Tooltip content={startCase(name)} placement="top">
								<div className={styles.name}>{startCase(name)}</div>
							</Tooltip>
						</div>
						<div className={styles.content_section}>
							<div className={styles.overlay} />
							<PreviewHtml html={html_template} />
						</div>
						<div className={styles.updated_text}>
							Update on :
							{' '}
							<span>
								{formatDate({
									date       : updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
									formatType : 'date',
								})}
							</span>
						</div>
						<RenderTemplateTags tags={tags} />
						<div className={styles.language_type}>
							Language :
							{' '}
							<Pill size="sm" color="green">{startCase(language)}</Pill>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default TemplateList;
