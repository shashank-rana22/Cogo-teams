import Body from './Body';
import Header from './Header';
import useGetListObjectives from './useGetListObjectives';

function ListObjectives(props) {
	const { ...restProps } = props;

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
				{...restProps}
			/>

			<Body
				setParams={setParams}
				loading={loading}
				list={list}
				paginationData={paginationData}
				getNextPage={getNextPage}
				{...restProps}
			/>
		</>
	);
}

export default ListObjectives;
