import useGetIngestionList from '../../hooks/useGetIngestionList';

import Header from './Header';
import TableSection from './TableSection';

function Ingestion() {
	const {
		columns,
		onPageChange,
		loading,
		// Component,
		setTableModal,
		tableModal,
		data,
		row,
		formProps,
		params,
		setParams,
		refetch,
	} = useGetIngestionList();

	return (
		<>
			<Header refetch={refetch} />
			<TableSection
				columns={columns}
				onPageChange={onPageChange}
				loading={loading}
				// Component={Component}
				setTableModal={setTableModal}
				tableModal={tableModal}
				data={data}
				row={row}
				formProps={formProps}
				params={params}
				setParams={setParams}
			/>
		</>

	);
}

export default Ingestion;
