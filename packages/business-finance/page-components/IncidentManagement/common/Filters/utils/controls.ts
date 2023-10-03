import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

interface Props {
	t?: Function;
	isSettlementExecutive?: boolean;
	activeTab?: string
	entityCode?: string;
}

export const requestControls = ({ t = () => {}, entityCode = '', activeTab = 'REQUESTED' }:Props) => {
	const getModifiedOptions = (option) => option?.options?.map(
		(itm) => ({ ...itm, value: startCase(itm?.value).replaceAll('_', ' ') }),
	);
	return [
		{
			name               : 'category',
			placeholder        : t('incidentManagement:select_category_placeholder'),
			type               : 'asyncSelect',
			caret              : true,
			isClearable        : true,
			asyncKey           : 'list_incident_types',
			searchByq          : true,
			renderLabel        : ({ value }) => startCase(value),
			initialCall        : true,
			params             : { status: activeTab, entityCode },
			className          : styles.category_section,
			getModifiedOptions : ({ options }) => getModifiedOptions({ options }),
		},
		{
			name               : 'categorySubType',
			placeholder        : t('incidentManagement:select_request_sub_type_placeholder'),
			type               : 'asyncSelect',
			caret              : true,
			isClearable        : true,
			asyncKey           : 'list_incident_types',
			searchByq          : true,
			renderLabel        : ({ value }) => startCase(value),
			initialCall        : true,
			params             : { status: activeTab, type: 'incidentSubtype', entityCode },
			className          : styles.category_section,
			getModifiedOptions : ({ options }) => getModifiedOptions({ options }),
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
};

export const remainControls = ({ t = () => {}, entityCode = '', activeTab = '' }:Props) => {
	const getModifiedOptions = (option) => option?.options?.map(
		(itm) => ({ ...itm, value: startCase(itm?.value).replaceAll('_', ' ') }),
	);
	return [
		{
			name               : 'category',
			placeholder        : t('incidentManagement:select_category_placeholder'),
			type               : 'asyncSelect',
			caret              : true,
			isClearable        : true,
			initialCall        : true,
			asyncKey           : 'list_incident_types',
			renderLabel        : ({ value }) => startCase(value),
			searchByq          : true,
			params             : { status: activeTab },
			className          : styles.category_section,
			getModifiedOptions : ({ options }) => getModifiedOptions({ options }),
		},
		{
			name               : 'categorySubType',
			placeholder        : t('incidentManagement:select_request_sub_type_placeholder'),
			type               : 'asyncSelect',
			caret              : true,
			isClearable        : true,
			asyncKey           : 'list_incident_types',
			searchByq          : true,
			renderLabel        : ({ value }) => startCase(value),
			initialCall        : true,
			params             : { status: activeTab, type: 'incidentSubtype', entityCode },
			className          : styles.category_section,
			getModifiedOptions : ({ options }) => getModifiedOptions({ options }),
		},
		{
			name                  : 'date',
			placeholder           : t('incidentManagement:select_date_placeholder'),
			type                  : 'singleDateRange',
			caret                 : true,
			isPreviousDaysAllowed : true,
			isClearable           : true,
			className             : styles.date,
			style                 : { width: '170px' },
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
};
