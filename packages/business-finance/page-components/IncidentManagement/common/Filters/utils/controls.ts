import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

interface Props {
	t?: Function;
	isSettlementExecutive?: boolean;
	activeTab?: string
}
export const requestControls = ({ t = () => {}, activeTab = 'REQUESTED' }:Props) => [
	{
		name        : 'category',
		placeholder : t('incidentManagement:select_category_placeholder'),
		type        : 'asyncSelect',
		caret       : true,
		isClearable : true,
		asyncKey    : 'list_incident_types',
		searchByq   : true,
		renderLabel : ({ value }) => startCase(value),
		initialCall : true,
		params      : { status: activeTab },
		className   : styles.category_section,
	},
	{
		name        : 'urgency',
		placeholder : t('incidentManagement:select_urgency_placeholder'),
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : [
			{ value: 'all', label: t('incidentManagement:urgency_label_all') },
			{ value: 'urgent', label: t('incidentManagement:urgency_label_urgent') },
		],
		className: styles.urgency_section,
	},
	{
		name                  : 'date',
		placeholder           : t('incidentManagement:select_date_placeholder'),
		type                  : 'singleDateRange',
		isPreviousDaysAllowed : true,
		caret                 : true,
		isClearable           : true,
		className             : styles.date_section,
	},
	{
		name      : 'isMyTaskOnly',
		type      : 'toggle',
		size      : 'sm',
		onLabel   : t('incidentManagement:toggle_label'),
		offLabel  : '',
		className : styles.toggle,
	},
];

export const remainControls = ({ t = () => {}, activeTab = '' }:Props) => [
	{
		name        : 'category',
		placeholder : t('incidentManagement:select_category_placeholder'),
		type        : 'asyncSelect',
		caret       : true,
		isClearable : true,
		initialCall : true,
		asyncKey    : 'list_incident_types',
		renderLabel : ({ value }) => startCase(value),
		searchByq   : true,
		params      : { status: activeTab },
		className   : styles.category_section,
	},
	{
		name                  : 'date',
		placeholder           : t('incidentManagement:select_date_placeholder'),
		type                  : 'singleDateRange',
		caret                 : true,
		isPreviousDaysAllowed : true,
		isClearable           : true,
		className             : styles.date,
	},
];
