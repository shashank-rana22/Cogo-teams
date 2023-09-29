import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit, IcMAppDelete } from '@cogoport/icons-react';
import { Image, useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useUpdateCommunicationTemplate from '../../hooks/useUpdateCommunicationTemplate';

import styles from './styles.module.css';

const SHOW_TOOLTIP_AFTER = 200;
const CLOSE_TOOLTIP_AFTER = 500;

function TooltipContent({
	templateData = {},
	templateAddition = false,
	partnerId = '',
	deleteCommunicationTemplate = () => {},
}) {
	const {
		id = '',
		name = '',
		html_template = '',
	} = templateData || {};

	return (
		<div className={styles.template_container}>
			<div className={styles.header}>
				<div className={styles.title}>
					{startCase(name)}
				</div>

				<div className={styles.icons_container}>
					{templateAddition ? (
						<>
							<IcMEdit
								className={styles.edit_icon}
								onClick={(e) => {
									e.stopPropagation();
									window.open(
										`${window.location.origin}/${partnerId}/marketing/templates/${id}`,
										'_blank',
									);
								}}
							/>

							<IcMAppDelete
								className={styles.delete_icon}
								onClick={(e) => {
									e.stopPropagation();
									deleteCommunicationTemplate({ id });
								}}
							/>
						</>
					) : null}

					<Image
						height={18}
						width={18}
						alt="refresh"
						src={GLOBAL_CONSTANTS.image_url.edit_square_icon}
					/>
				</div>

			</div>

			<div className={styles.template_body}>
				<div dangerouslySetInnerHTML={{ __html: html_template || '' }} />
			</div>
		</div>
	);
}

function TemplateSuggestion({
	templateData = {}, setEmailState = () => {},
	templateAddition = false, handleRefreshTemplates = () => {},
}) {
	const { name = '', html_template = '', subject = '' } = templateData || {};
	const { query: { partner_id: partnerId = '' } = {} } = useRouter();

	const { deleteLoading, deleteCommunicationTemplate } = useUpdateCommunicationTemplate({ handleRefreshTemplates });

	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={() => setEmailState((prev) => ({
				...prev,
				subject,
				body: html_template,
			}))}
		>
			<Tooltip
				content={(
					<TooltipContent
						templateData={templateData}
						templateAddition={templateAddition}
						partnerId={partnerId}
						deleteLoading={deleteLoading}
						deleteCommunicationTemplate={deleteCommunicationTemplate}
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
