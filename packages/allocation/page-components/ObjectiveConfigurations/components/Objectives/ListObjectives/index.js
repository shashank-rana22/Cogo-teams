import { forwardRef } from 'react';

import Header from './Header';
import List from './List';
import useGetListObjectives from './useGetListObjectives';

const ListObjectives = forwardRef((props, ref) => {
	const { setActiveMode } = props;

	const {
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
		setToggleValue,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = useGetListObjectives();

	const setRefCallback = (value) => {
		const tempRef = ref;
		tempRef.current.container = value;
	};

	return (
		<>
			<Header
				setToggleValue={setToggleValue}
				setActiveMode={setActiveMode}
				setParams={setParams}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			<List
				setActiveMode={setActiveMode}
				loading={loading}
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
				setRefCallback={setRefCallback}
			/>
		</>
	);
});

export default ListObjectives;
