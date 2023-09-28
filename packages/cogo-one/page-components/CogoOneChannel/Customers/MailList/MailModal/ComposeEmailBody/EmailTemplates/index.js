import { Chips, Popover } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { SUBJECT_MAPPING } from '../../../../../../../constants/mailConstants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../constants/viewTypeMapping';
import useListCommunicationTemplates from '../../../../../../../hooks/useListCommunicationTemplates';

import CreateTemplate from './CreateTemplate';
import getTemplateChipOptions from './getTemplateChipOptions';
import styles from './styles.module.css';
import TemplateEditor from './TemplateEditor';

function EmailTemplates({ mailProps = {} }) {
	const {
		emailState = {},
		viewType = '',
	} = mailProps || {};

	const [singleSelected, setSingleSelected] = useState('');
	const [templateData, setTemplateData] = useState(null);
	const [showCreation, setShowCreation] = useState(false);

	const templateAddition = VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.permissions?.allow_adding_mail_template || false;

	const {
		data = {},
		loading = false,
		handleScroll = () => {},
	} = useListCommunicationTemplates({
		shouldTrigger : !!(emailState?.orgId),
		tags          : SUBJECT_MAPPING?.[emailState?.customSubject?.activeTab]?.template_tags,
	});

	const options = getTemplateChipOptions({ data });

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Templates:
			</div>

			<div
				className={styles.templates_list}
				style={{ padding: templateAddition ? '0px 4px 0px 10px' : '0px 0px 0px 10px' }}
				onScroll={handleScroll}
			>
				{loading ? 'Loading' : (
					<Chips
						items={options || []}
						selectedItems={singleSelected}
						onItemChange={setSingleSelected}
					/>
				)}
			</div>

			{templateAddition ? (
				<div className={styles.add_icon}>
					<Popover
						interactive
						placement="left"
						visible={showCreation}
						onClickOutside={() => setShowCreation(false)}
						content={showCreation ? (
							<CreateTemplate
								templateTags={SUBJECT_MAPPING?.[emailState?.customSubject?.activeTab]?.template_tags}
								setShowCreation={setShowCreation}
								setTemplateData={setTemplateData}
							/>
						) : null}
					>
						<IcMPlusInCircle
							onClick={() => setShowCreation((prev) => !prev)}
						/>
					</Popover>
				</div>
			) : null}

			<TemplateEditor templateData={templateData} setTemplateData={setTemplateData} />
		</div>
	);
}

export default EmailTemplates;
