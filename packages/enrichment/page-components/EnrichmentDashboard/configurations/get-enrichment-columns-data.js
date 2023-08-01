import { ButtonIcon, Pill, Popover, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils/';

import ActionContent from '../components/MainComponent/ActionContent';
import styles from '../styles.module.css';

const getEnrichmentColumnsData = ({
	handleEditDetails = () => {},
	setSelectedRowId = () => {},
	selectedRowId = '',
	secondaryTab = 'active',
	user_id = '',
	setActionModal = () => {},
}) => [
	{
		id       : 'id',
		Header   : 'SERIAL ID',
		accessor : ({ organization, lead_organization }) => (
			<section>
				<Pill>
					#
					{lead_organization?.serial_id || organization?.serial_id}
					{' '}
				</Pill>
			</section>
		),
	},
	{
		id       : 'business_name',
		Header   : 'ORGANIZATION',
		accessor : ({ organization, lead_organization, lead_organization_id }) => {
			const business_name = lead_organization_id
				? (lead_organization || {}).business_name : (organization || {}).business_name;

			return (
				<Tooltip
					placement="bottom"
					content={(
						<div className={styles.toottip_content}>
							{business_name || '__' }
						</div>
					)}
				>
					<div className={styles.business_name}>
						{business_name || '__' }
					</div>
				</Tooltip>
			);
		},
	},

	{
		id       : 'registration_number',
		Header   : 'Registration Number',
		accessor : ({ organization, lead_organization, lead_organization_id }) => (
			<section>
				{lead_organization_id
					? (lead_organization || {}).registration_number || '-'
					: (organization || {}).registration_number || '-'}
			</section>
		),
	},
	{
		id       : 'requested_agent',
		Header   : 'Agent',
		accessor : ({ assigned_user = {} }) => (
			<section
				className={styles.value_container}
			>
				{startCase(assigned_user?.name || '___')}
				<div className={styles.email_id}>{assigned_user?.email || '___'}</div>

			</section>
		),

	},
	{
		id       : 'created_at',
		Header   : 'REQUESTED AT',
		accessor : ({ created_at = '' }) => (
			<section>
				{created_at ? (
					<div>
						{formatDate({
							date       : created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'dateTime',
						}) || '-'}

					</div>
				) : (
					'___'
				)}
			</section>
		),
	},
	{
		id       : 'status',
		Header   : 'STATUS',
		accessor : ({ status }) => (
			<seaction>
				<Pill size="md" color="red">
					{startCase(status) || '-'}
				</Pill>
			</seaction>
		),
	},

	{
		id       : 'action',
		Header   : <div className={styles.action_header}>Action</div>,
		accessor : (item) => {
			const { id, assigned_user = {}, lead_organization, organization } = item;

			const business_name = lead_organization?.business_name || organization?.business_name;
			const serial_id = lead_organization?.serial_id || organization?.serial_id;

			const onClickCta = (workflow) => {
				if (['add', 'edit', 'view'].includes(workflow)) {
					handleEditDetails(id, workflow);
				} else {
					setActionModal(() => ({
						show        : true,
						requestData : {
							id,
							workflow,
							business_name,
							serial_id,
						},

					}));

					setSelectedRowId(null);
				}
			};

			return (
				<Popover
					placement="bottom"
					interactive
					visible={selectedRowId === id}
					render={(
						<ActionContent
							onClickCta={onClickCta}
							secondaryTab={secondaryTab}
						/>
					)}
					onClickOutside={() => setSelectedRowId(null)}
				>

					<div className={styles.action_cta}>
						<ButtonIcon
							size="md"
							themeType="primary"
							type="button"
							disabled={secondaryTab !== 'success' && assigned_user
							&& !isEmpty(assigned_user) && assigned_user.id !== user_id}
							icon={(
								<IcMOverflowDot
									height={16}
									width={16}
								/>
							)}
							onClick={() => setSelectedRowId(() => (selectedRowId === id ? null : id))}
						/>
					</div>

				</Popover>
			);
		},
	},

];

export default getEnrichmentColumnsData;
