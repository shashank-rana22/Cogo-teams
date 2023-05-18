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

const func = () => {};

function ShowButtons({
	item = {},
	activeTab = '',
	setActivityModal = func,
	showPopover = {},
	setShowPopover = func,
	setUserData = func,
}) {
	const buttonOptions = ListButtons({
		item,
		activeTab,
		setActivityModal,
		setShowPopover,
	});

	return (
		<div className={styles.popover_content} key={item?.id}>
			<Popover
				placement="left"
				visible={showPopover?.id === item?.id}
				onClickOutside={() => setShowPopover({})}
				render={(
					<ButtonGroup
						size="sm"
						options={buttonOptions}
						direction="vertical"

					/>
				)}
			>
				<div>
					<IcMOverflowDot
						onClick={() => {
							setShowPopover(item);
							setUserData(item);
						}}
						className={styles.dots_icon}
					/>
				</div>
			</Popover>
		</div>
	);
}

const TableColumns = ({
	activeTab = '', showPopover = {},
	setShowPopover = func,
	setActivityModal = func,
	setUserData = func,
}) => {
	const columns = [
		{
			Header   : 'NAME',
			accessor : (item = {}) => {
				const { name = '', referee_data = {} } = item;

				return (
					<div className={styles.tooltip_content}>
						<Tooltip content={startCase(name || referee_data?.name)} placement="bottom">
							<div className={styles.user_name}>
								{startCase(name || referee_data?.name)}
							</div>
						</Tooltip>
					</div>
				);
			},
			conditions: ['invited', 'user', 'affiliate'],
		},

		{
			Header   : 'ORGANISATION',
			accessor : (item = {}) => {
				const { organization_names = [] } = item;
				return (
					<Tooltip
						content={(
							<div className={styles.organisation_list}>
								{(organization_names || []).map((org) => (
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
								{startCase(organization_names?.[0])}
							</div>
							{organization_names?.length > 1 && (
								<div className={styles.more_count}>
									+
									{organization_names.length - 1}
									{' '}
									More
								</div>
							)}

						</div>
					</Tooltip>
				);
			},
			conditions: ['user'],

		},
		{
			Header   : 'TYPE',
			accessor : (item = {}) => (
				<div className={styles.more_count}>
					{TYPE[item?.organization_type?.[0]]}
				</div>
			),
			conditions: ['user'],
		},
		{
			Header   : 'INVITED BY',
			accessor : (item = {}) => {
				const {
					created_at = '',
					referrer_data = {},
				} = item;
				return (
					<div className={styles.invented_by}>

						{referrer_data?.name ? (
							<>
								<Tooltip content={startCase(referrer_data?.name)} placement="bottom">
									<div className={styles.user_name}>{startCase(referrer_data?.name)}</div>
								</Tooltip>
								<div className={styles.invited_date}>
									{format(
										created_at,
										'dd/MM/yy',
									)}
								</div>
							</>
						) : '__' }

					</div>
				);
			},
			conditions: ['invited', 'user', 'affiliate'],
		},
		{
			Header   : 'DIRECT NODES',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					{Nodes({ index, item, type: 'direct_node' })}
				</div>
			),
			conditions: ['user', 'affiliate'],
		},
		{
			Header   : 'NETWORK',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					{Nodes({ index, item, type: 'network_node' })}
				</div>
			),
			conditions: ['user', 'affiliate'],
		},
		{
			Header   : 'COGOPOINTS ALLOCATED',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					{Nodes({ index, item, type: 'alloted_cogopoints' })}
				</div>

			),
			conditions: ['user', 'affiliate'],
		},
		{
			Header   : 'COGOPOINTS ON HOLD',
			accessor : (item, index) => (
				<div className={styles.node_container}>
					{Nodes({ index, item, type: 'holded_cogopoints' })}
				</div>
			),
			conditions: ['user', 'affiliate'],
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
			accessor : (item = {}) => (
				<div className={styles.show_details} key={item?.id}>
					<ShowButtons
						item={item}
						activeTab={activeTab}
						showPopover={showPopover}
						setShowPopover={setShowPopover}
						setActivityModal={setActivityModal}
						setUserData={setUserData}
					/>
				</div>
			),
			conditions: ['user', 'affiliate'],
		},

	];
	return columns.filter((itm) => itm.conditions.includes(activeTab));
};
export default TableColumns;
