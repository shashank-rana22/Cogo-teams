import { forwardRef } from 'react';

import Body from './Body';
import Header from './Header';
import useGetListObjectives from './useGetListObjectives';

const ListObjectives = forwardRef((props, ref) => {
	const {
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
		setToggleValue,
	} = useGetListObjectives();

	const setRefCallback = (value) => {
		const tempRef = ref;
		tempRef.current.container = value;
	};

	return (
		<>
			<Header
				setToggleValue={setToggleValue}
				{...props}
			/>

			<Body
				setParams={setParams}
				loading={loading}
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
				setRefCallback={setRefCallback}
				{...props}
			/>
		</>
	);
});

export default ListObjectives;
