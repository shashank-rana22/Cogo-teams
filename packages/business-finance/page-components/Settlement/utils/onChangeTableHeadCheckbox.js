const onChangeTableHeadCheckbox = ({
	setPageCheckedRows = () => {}, selectedData = [], currentPageListIds = [], list = [],
	selectAll = false, setSelectedData = () => {}, pageNumber = 1,
}) => {
	setPageCheckedRows((previousPageCheckedRows) => {
		let newSelectedData = [...selectedData];
		let newPageCheckedIds = [];
		if (selectAll) {
			newPageCheckedIds = [];
			newSelectedData = selectedData?.filter((item) => !currentPageListIds?.includes(item.id));
		} else {
			const newIdsToAdd = currentPageListIds?.filter((id) => !selectedData?.some((item) => item.id === id));
			newPageCheckedIds = currentPageListIds;
			const newDataToAdd = list?.filter((item) => newIdsToAdd?.includes(item.id));
			newSelectedData = [...selectedData, ...newDataToAdd];
		}
		setSelectedData(newSelectedData);
		return {
			...previousPageCheckedRows,
			[pageNumber]: newPageCheckedIds,
		};
	});
};
export default onChangeTableHeadCheckbox;
