const tabsWithCountry = [
	'country',
	'city',
	'seaport',
	'cfs',
	'yard',
	'warehouse',
	'railway_terminal',
];
const tabsWithStatus = ['continent', 'region'];

const getStatusColumns = ({ t = () => {} }) => [
	{

		Header   : t('locations:list_name_label'),
		accessor : (item) => <p>{(item?.name)}</p>,
	},
	{
		Header   : t('locations:list_type_label'),
		accessor : (item) => <p>{(item?.type)}</p>,
	}, {
		Header   : t('locations:list_status_label'),
		accessor : (item) => <p>{(item?.status)}</p>,
	},
];

const getCountryColumns = ({ t = () => {} }) => [
	{
		Header   : t('locations:list_name_label'),
		accessor : (item) => <p>{(item?.name)}</p>,
	},
	{
		Header   : t('locations:list_type_label'),
		accessor : (item) => <p>{(item?.type)}</p>,
	},
	{
		Header: t('locations:list_country_code_label'),

		accessor: (item) => <p>{(item?.country_code)}</p>,
	},
];

const getDefaultColumns = ({ t = () => {} }) => [
	{
		Header   : t('locations:list_name_label'),
		accessor : (item) => <p>{(item?.name)}</p>,
	},
	{
		Header   : t('locations:list_type_label'),
		accessor : (item) => <p>{(item?.type)}</p>,
	},
];

const getFieldsByTab = ({ type, t = () => {} }) => {
	const countryColumns = getCountryColumns({ t });
	const statusColumns = getStatusColumns({ t });
	const defaultColumns = getDefaultColumns({ t });

	if (tabsWithCountry.includes(type)) {
		return countryColumns;
	}

	if (tabsWithStatus.includes(type)) {
		return statusColumns;
	}

	return defaultColumns;
};

export default getFieldsByTab;
