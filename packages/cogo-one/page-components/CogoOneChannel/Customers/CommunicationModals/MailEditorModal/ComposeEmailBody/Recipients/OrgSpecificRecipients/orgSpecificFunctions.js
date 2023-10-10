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

function RenderLabel({ item = {} }) {
	return (
		<div>
			<div className={styles.agent_label}>
				{item?.value}
			</div>
			<div className={styles.lower_label}>
				{startCase(item?.label)}
			</div>
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
		},
	};
}

export { getOrgListOptions, RenderLabel, RenderOrgLabel, resetEmailRecipientData };
