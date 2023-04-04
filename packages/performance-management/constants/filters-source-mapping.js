const filtersSourceMapping = {
	hr_pip_stats: {
		left: [
			{ name: 'ManagerID' },
			{ name: 'Year', isClearable: false },
			{ name: 'Month' },
			{ name: 'Department' },
			{ name: 'Designation' },
		],
	},
	hr_kpi_dashboard: {
		left: [
			{ name: 'Department' },
			{ name: 'Designation' },
			{ name: 'Q', placeholder: 'Search Manager' },
			{ name: 'Year' },
			{ name: 'Month' },
		],
	},
	hr_feedback: {
		left: [
			{ name: 'Department' },
			{ name: 'Designation' },
			{ name: 'ManagerID' },
			{ name: 'Year' },
			{ name: 'Month' },
		],
		right: [
			{ name: 'Q' },
		],
	},
	hr_pip_dashboard: {
		left: [
			{ name: 'Department' },
			{ name: 'Designation' },
			{ name: 'ManagerID' },
		],
		right: [
			{ name: 'Q' },
		],
	},
	uploaded_files: {
		left: [
			{ name: 'Q', placeholder: 'Search FileName...' },
		],
	},
	user_dashboard: {
		left: [
			{ name: 'Year' },
			{ name: 'Month' },
			{ name: 'Rating' },
		],
	},
	employee_directory_list: {
		left: [
			{ name: 'Department' },
			{ name: 'Designation' },
			{ name: 'ManagerID' },
		],
		right: [{ name: 'Q' }],
	},
};
export default filtersSourceMapping;
