const onChangeBodyCheckbox = ({
	event = {}, id = '', data = {}, setPageCheckedRows = () => {},
	pageNumber = 1, setSelectedData = () => {},
}) => {
	const rowData = data?.list?.find((row) => row?.id === id);
	if (!rowData) {
		return;
	}
	setPageCheckedRows((previousPageCheckedRows) => {
		const currentPageCheckedIds = previousPageCheckedRows[pageNumber] || [];
		let newPageCheckedIds = [];
		if (event?.target?.checked) {
			newPageCheckedIds = [...currentPageCheckedIds, id];
			setSelectedData((previousData) => [...previousData, rowData]);
		} else {
			newPageCheckedIds = currentPageCheckedIds?.filter((selectedId) => selectedId !== id);
			setSelectedData((previousData) => previousData.filter((row) => row?.id !== rowData?.id));
		}
		return {
			...previousPageCheckedRows,
			[pageNumber]: newPageCheckedIds,
		};
	});
};
export default onChangeBodyCheckbox;
