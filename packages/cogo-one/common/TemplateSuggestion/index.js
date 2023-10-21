import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image, useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';
import { v1 as uuid } from 'uuid';

import styles from './styles.module.css';

const SHOW_TOOLTIP_AFTER = 500;
const CLOSE_TOOLTIP_AFTER = 0;

function TooltipContent({
	templateData = {},
	templateAddition = false,
	partnerId = '',
}) {
	const {
		id = '',
		name = '',
		html_template = '',
	} = templateData || {};

	return (
		<div className={styles.template_container}>
			{templateAddition ? (
				<div className={styles.header}>
					<div className={styles.title}>
						{startCase(name)}
					</div>
					<div className={styles.icons_container}>
						<Image
							height={18}
							width={18}
							alt="refresh"
							src={GLOBAL_CONSTANTS.image_url.edit_square_icon}
							onClick={(e) => {
								e.stopPropagation();
								window.open(
									`${window.location.origin}/${partnerId}/marketing/templates/${id}`,
									'_blank',
								);
							}}
						/>
					</div>

				</div>
			) : null}

			<div className={styles.template_body}>
				<div dangerouslySetInnerHTML={{ __html: html_template || '' }} />
			</div>
		</div>
	);
}

function TemplateSuggestion({
	templateData = {},
	setEmailState = () => {},
	templateAddition = false,
}) {
	const { name = '', html_template = '', subject = '' } = templateData || {};
	const { query: { partner_id: partnerId = '' } = {} } = useRouter();

	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={() => setEmailState(
				(prev) => ({
					...prev,
					reloadKey     : uuid(),
					customSubject : {
						...(prev.customSubject || {}),
						subjectText: subject,
					},
					rteContent: html_template,
				}),
			)}
		>
			<Tooltip
				content={(
					<TooltipContent
						templateData={templateData}
						templateAddition={templateAddition}
						partnerId={partnerId}
					/>
				)}
				delay={[SHOW_TOOLTIP_AFTER, CLOSE_TOOLTIP_AFTER]}
				placement="bottom"
				interactive
				className={styles.tooltip_container}
			>
				{startCase(name)}
			</Tooltip>
		</div>
	);
}

export default TemplateSuggestion;
