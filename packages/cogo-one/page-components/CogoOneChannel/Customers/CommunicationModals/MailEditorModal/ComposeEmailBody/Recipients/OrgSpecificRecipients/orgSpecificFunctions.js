import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function getOrgListOptions({ organizationData = {} }) {
	const { list = [] } = organizationData || {};

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
				{startCase(item?.label)}
			</div>
			<div className={styles.lower_label}>
				{item?.value}
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
			<div className={styles.lower_label}>
				Serial ID:
				{' '}
				{item?.serial_id}
			</div>
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
