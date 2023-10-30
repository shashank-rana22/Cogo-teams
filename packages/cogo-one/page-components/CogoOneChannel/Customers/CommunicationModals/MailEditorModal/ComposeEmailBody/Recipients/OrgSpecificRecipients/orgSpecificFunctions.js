import { Pill, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function getOrgListOptions({
	organizationData = {},
	activeTab = '',
}) {
	const { list = [] } = organizationData || {};

	if (activeTab.includes('other')) {
		return [
			{
				value : 'lead_users',
				label : 'Lead Users',
			},
		];
	}

	return list.map((itm) => ({
		...itm,
		value : itm?.id,
		label : itm?.business_name,
	}));
}

function TooltipContent({ item = {} }) {
	return (
		<div className={styles.poc_container}>
			{item?.data?.map(
				(itm) => (
					<div className={styles.poc_data} key={itm?.id}>
						<div>
							<span>Billing Party Name:</span>
							{itm?.name}
						</div>
						<div>
							<span>Branch:</span>
							{itm?.branch?.branch_name}
						</div>
						<div>
							<span>Branch Code:</span>
							{itm?.branch?.branch_code}
						</div>
						<div>
							<span>Address:</span>
							{itm?.address}
						</div>
					</div>
				),
			) || null}
		</div>
	);
}

function RenderLabel({ item = {}, activeTab = '' }) {
	return (
		<div className={styles.option_container}>
			<div className={styles.option_data}>
				<div className={styles.agent_label}>
					{item?.value}
				</div>
				<div className={styles.lower_label}>
					{(item?.label)}
					{' '}
					{item?.value?.includes('cogoport')
						? <Pill size="sm" color="orange">internal</Pill>
						: null}
				</div>
			</div>

			{activeTab === 'pocs' ? (
				<Tooltip
					interactive
					placement="right"
					appendTo={() => document.body}
					className={styles.tooltip_container}
					content={(
						<TooltipContent item={item} />
					)}
				>
					<IcMInfo height={18} width={18} />
				</Tooltip>
			) : null}
		</div>
	);
}

function RenderOrgLabel({ item = {} }) {
	return (
		<div>
			<div className={styles.agent_label}>
				{startCase(item?.label)}
			</div>
			{item?.serial_id ? (
				<div className={styles.lower_label}>
					Serial ID:
					{' '}
					{item?.serial_id}
				</div>
			) : null}
		</div>
	);
}

function resetEmailRecipientData({
	prev = {},
	recipientTypes = [],
	orgId = '',
	orgType = '',
	twinImporterExporterId = '',
}) {
	let newValues = {};

	recipientTypes.forEach(
		(itm) => {
			newValues = {
				...newValues,
				[itm?.value]: [],
			};
		},
	);

	let customSubject = {
		...(prev?.customSubject || {}),
		serialId: prev?.orgData?.orgType === 'lead_organizations' ? 'custom' : '',
	};

	if (orgType === 'lead_organizations') {
		customSubject = {
			...(prev?.customSubject || {}),
			activeTab : 'custom',
			serialId  : 'custom',
		};
	}

	return {
		...prev,
		...newValues,
		customSubject,
		orgData: {
			orgType: orgType || prev?.orgData?.orgType,
			orgId,
			twinImporterExporterId,
		},
		user_ids: newValues,
	};
}

export { getOrgListOptions, RenderLabel, RenderOrgLabel, resetEmailRecipientData };
