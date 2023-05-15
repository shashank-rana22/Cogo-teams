import { Popover, ButtonGroup, Tooltip } from '@cogoport/components';
import { IcMOverflowDot, IcMCall, IcMEmail } from '@cogoport/icons-react';
import {
	format,
	startCase,
} from '@cogoport/utils';

import { TYPE, STATUS_MAPPING } from '../../../../constants';

import ListButtons from './ListButtons';
import Nodes from './Nodes';
import styles from './styles.module.css';
import TooltipContent from './TooltipContent';

function ShowButtons({
	item = {},
	activeTab = '',
}) {
	const buttonOptions = ListButtons({
		item,
		activeTab,
	});

	return (
		<div className={styles.popover_content} key={item?.id}>
			<Popover
				placement="left"
				render={(
					<ButtonGroup
						size="sm"
						options={buttonOptions}
						direction="vertical"
					/>
				)}
			>
				<div>
					<IcMOverflowDot className={styles.dots_icon} />
				</div>
			</Popover>
		</div>
	);
}

const TableColumns = ({ activeTab = '' }) => {
	const columns = [
		{
			Header   : 'NAME',
			accessor : (item = {}) => (

				<div className={styles.tooltip_content}>
					<Tooltip content={startCase(item?.name)} placement="bottom">
						<div className={styles.user_name}>
							{startCase(item?.name)}
						</div>
					</Tooltip>
				</div>
			),
			conditions: ['invited', 'users', 'affiliate', 'employees'],
		},
		{
			Header   : 'ORGANISATION',
			accessor : ({ organisation = [] }) => (
				<Tooltip
					content={(
						<div className={styles.organisation_list}>
							{(organisation || []).map((org) => (
								<div className={styles.single_org} key={org}>
									{startCase(org)}
								</div>
							))}
						</div>
					)}
					placement="bottom"
				>
					<div className={styles.organisation_div}>
						<div className={styles.organisation_name}>
							{startCase(organisation?.[0])}
						</div>
						{organisation?.length > 1 && (
							<div className={styles.more_count}>
								+
								{organisation.length - 1}
								{' '}
								More
							</div>
						)}

					</div>
				</Tooltip>
			),
			conditions: ['users', 'employees'],

		},
		{
			Header   : 'TYPE',
			accessor : ({ type = '' }) => (
				<div className={styles.more_count}>
					{TYPE[type]}
				</div>
			),
			conditions: ['users', 'employees'],
		},
		{
			Header   : 'INVITED BY',
			accessor : (item = {}) => (
				<div className={styles.invented_by}>
					<Tooltip content="Ashish- Cogoverse" placement="bottom">
						<div className={styles.user_name}>Ashish- Cogoverse njenje je</div>
					</Tooltip>
					<div className={styles.invited_date}>
						{format(
							item?.created_at,
							'dd/MM/yy',
						)}
					</div>
				</div>
			),
			conditions: ['invited', 'users', 'affiliate', 'employees'],
		},
		{
			Header   : 'DIRECT NODES',
			accessor : () => (
				<div className={styles.node_container}>
					{Nodes({ type: 'direct_node' })}
				</div>
			),
			conditions: ['users', 'affiliate', 'employees'],
		},
		{
			Header   : 'NETWORK',
			accessor : () => (
				<div className={styles.node_container}>
					{Nodes({ type: 'network_node' })}
				</div>
			),
			conditions: ['users', 'affiliate', 'employees'],
		},
		{
			Header   : 'COGOPOINTS ALLOCATED',
			accessor : () => (
				<div className={styles.node_container}>
					{Nodes({ type: 'alloted_cogopoints' })}
				</div>

			),
			conditions: ['users', 'affiliate', 'employees'],
		},
		{
			Header   : 'COGOPOINTS ON HOLD',
			accessor : () => (
				<div className={styles.node_container}>
					{Nodes({ type: 'holded_cogopoints' })}
				</div>
			),
			conditions: ['users', 'affiliate', 'employees'],
		},

		{
			Header   : 'CONTACT',
			accessor : (item = {}) => (
				<div className={styles.each_item}>
					{item?.email && (
						<div className={styles.contact_details}>
							<IcMEmail
								className={styles.contact_icon}
								fill="#BDBDBD"
							/>
							<div className={styles.action_type}>
								<TooltipContent content={item?.email} type="" />
							</div>
						</div>
					)}

					{item?.whatsapp_number && (
						<div className={styles.contact_details}>
							<IcMCall className={styles.contact_icon} fill="#BDBDBD" />
							<div className={styles.action_type}>
								<TooltipContent
									content={item?.whatsapp_number}
									countryCode={item?.whatsapp_country_code}
									type="mobile"
								/>
							</div>
						</div>
					)}
				</div>
			),
			conditions: ['invited'],
		},
		{
			Header   : 'STATUS',
			accessor : (item = {}) => (
				<div className={styles.user_name}>
					{STATUS_MAPPING[item?.status]}
				</div>
			),
			conditions: ['invited'],
		},
		{
			Header   : ' ',
			accessor : (item) => (
				<div className={styles.show_details} key={item?.id}>
					<ShowButtons
						item={item}
						activeTab={activeTab}
					/>
				</div>
			),
			conditions: ['invited', 'users', 'affiliate', 'employees'],
		},

	];
	return columns.filter((itm) => itm.conditions.includes(activeTab));
};
export default TableColumns;
