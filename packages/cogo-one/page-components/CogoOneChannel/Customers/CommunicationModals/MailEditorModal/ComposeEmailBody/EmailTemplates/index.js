import { Chips, Popover } from '@cogoport/components';
import { IcMPlusInCircle, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { SUBJECT_MAPPING } from '../../../../../../../constants/mailConstants';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../../constants/viewTypeMapping';
import useListCommunicationTemplates from '../../../../../../../hooks/useListCommunicationTemplates';

import CreateTemplate from './CreateTemplate';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function EmailTemplates({ mailProps = {} }) {
	const {
		emailState = {},
		viewType = '',
		setEmailState = () => {},
	} = mailProps || {};

	const [singleSelected, setSingleSelected] = useState('');
	const [showCreation, setShowCreation] = useState(false);

	const templateAddition = VIEW_TYPE_GLOBAL_MAPPING?.[viewType]?.permissions?.allow_adding_mail_template || false;

	const {
		loading = false,
		templatesList = [],
		handleScroll = () => {},
		handleRefresh = () => {},
	} = useListCommunicationTemplates({
		tags: SUBJECT_MAPPING?.[emailState?.customSubject?.activeTab]?.template_tags || null,
		templateAddition,
		setEmailState,
	});
	// const loading = true;
	// const	templatesList = [];

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Temp:
			</div>

			<div
				className={styles.templates_list}
				style={{ margin: templateAddition ? '0px 4px 0px 10px' : '0px 0px 0px 10px' }}
				onScroll={handleScroll}
			>
				{isEmpty(templatesList) && !loading
					? <div className={styles.no_data_found}>No Templates.</div>
					: (
						<Chips
							items={templatesList || []}
							selectedItems={singleSelected}
							onItemChange={setSingleSelected}
						/>
					) }
				{loading ? <LoadingState /> : null}
			</div>

			{templateAddition ? (
				<div className={styles.icons_container}>
					<Popover
						interactive
						placement="left"
						visible={showCreation}
						onClickOutside={() => setShowCreation(false)}
						content={showCreation ? (
							<CreateTemplate
								templateTags={SUBJECT_MAPPING?.[emailState?.customSubject?.activeTab]?.template_tags}
								setShowCreation={setShowCreation}
							/>
						) : null}
					>
						<IcMPlusInCircle
							className={styles.add_icon}
							onClick={() => setShowCreation((prev) => !prev)}
						/>
					</Popover>
					<IcMRefresh className={styles.refresh_icon} onClick={handleRefresh} />
				</div>
			) : null}
		</div>
	);
}

export default EmailTemplates;
