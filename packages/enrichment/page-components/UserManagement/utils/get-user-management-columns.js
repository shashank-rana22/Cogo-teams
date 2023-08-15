import { ButtonIcon, Pill, Popover, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import ActionContent from '../components/ActionContent';
import styles from '../styles.module.css';

const getUserManagementColumns = ({ selectedRowId = '', setSelectedRowId = () => {}, setActionModal = () => {} }) => [
	{
		id       : 'name',
		Header   : 'Name',
		accessor : ({ name = '' }) => (
			<section className={styles.name}>

				<Tooltip
					placement="bottom"
					content={(
						<div className={styles.toottip_content}>
							{name || '__' }
						</div>
					)}
				>
					<div>
						{name || '__' }
					</div>
				</Tooltip>

			</section>

		),
	},
	{
		id       : 'email',
		Header   : 'Email',
		accessor : ({ email = '' }) => (
			<section>
				<Tooltip
					placement="bottom"
					content={email || '___'}
				>
					<div className={styles.email_id}>
						{email || '___'}
					</div>
				</Tooltip>

			</section>
		),
	},
	{
		id       : 'mobile_number',
		Header   : 'Mobile Number',
		accessor : ({ mobile_country_code = '', mobile_number = '' }) => (
			<section>
				{mobile_country_code && mobile_number ? `${mobile_country_code}-${mobile_number}` : '__'}
			</section>
		),
	},
	{
		id       : 'role',
		Header   : 'Role',
		accessor : ({ roles_data = [] }) => (
			<section>
				<Pill size="md" color="blue">
					{startCase(roles_data[GLOBAL_CONSTANTS.zeroth_index]?.name) || '-'}
				</Pill>

			</section>
		),
	},
	{
		id       : 'partner',
		Header   : 'Partner',
		accessor : ({ partner = {} }) => (

			<section className={styles.name}>

				<Tooltip
					placement="bottom"
					content={(
						<div className={styles.toottip_content}>
							{(partner && !isEmpty(partner)) ? partner.business_name : '__'}
						</div>
					)}
				>
					<div className={styles.business_name}>
						{(partner && !isEmpty(partner)) ? partner.business_name : '__'}
					</div>
				</Tooltip>

			</section>

		),
	},

	{
		id       : 'created_at',
		Header   : 'Created at',
		accessor : ({ created_at }) => (
			<seaction className={styles.date_time}>
				<div>
					{formatDate({
						date       : created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'dateTime',
					})}
				</div>
			</seaction>
		),
	},
	{
		id       : 'action',
		Header   : 'Action',
		accessor : ({ id = '', name = '', email = '', status = '', user_id = '' }) => {
			const onClickCta = (action_type = '') => {
				setSelectedRowId(null);

				setActionModal(() => ({
					type      : action_type,
					show      : true,
					agentData : { id, name, email, user_id },
				}));
			};

			return (
				<Popover
					placement="bottom"
					interactive
					visible={selectedRowId === id}
					render={(<ActionContent onClickCta={onClickCta} />)}
					onClickOutside={() => setSelectedRowId(null)}
				>
					<ButtonIcon
						size="md"
						type="button"
						icon={(
							<IcMOverflowDot
								height={16}
								width={16}
							/>
						)}
						disabled={status === 'inactive'}
						themeType="primary"
						onClick={() => setSelectedRowId(() => (selectedRowId === id ? null : id))}
					/>
				</Popover>
			);
		},
	},
];

export default getUserManagementColumns;
