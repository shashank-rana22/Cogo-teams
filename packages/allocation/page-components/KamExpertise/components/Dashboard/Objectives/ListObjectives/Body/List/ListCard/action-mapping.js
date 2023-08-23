const getActionMapping = ({
	setShowModal = () => { },
	setListObjectivesParams = () => { },
}) => ({
	handleGenerateList: (id) => {
		setShowModal(() => ({
			id,
			action: 'generate',
		}));
	},

	handleViewList: (id, name) => {
		setShowModal(() => ({
			id,
			action          : 'view',
			objective_title : name,
		}));
	},

	handleDeleteList: (id) => {
		setShowModal(() => ({
			id,
			action: 'delete',
		}));
	},

	handleSortAsc: () => {
		setListObjectivesParams((pv) => ({
			...pv,
			sort_type: 'asc',
		}));
	},

	handleSortDesc: () => {
		setListObjectivesParams((pv) => ({
			...pv,
			sort_type: 'desc',
		}));
	},
});

export default getActionMapping;
