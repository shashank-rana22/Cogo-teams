import Body from './Body';
import Header from './Header';
import useGetListObjectives from './useGetListObjectives';

function ListObjectives(props) {
	const {
		setParams,
		loading,
		list,
		paginationData,
		getNextPage,
		setToggleValue,
	} = useGetListObjectives();

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
				{...props}
			/>
		</>
	);
}

export default ListObjectives;
