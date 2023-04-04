import Filters from './Filters';
import List from './List';
import styles from './styles.module.css';

function TableSection(props) {
	const {
		columns = [],
		onPageChange = () => {},
		loading = false,
		Component = () => {},
		setTableModal = () => {},
		tableModal = '',
		data,
		row = {},
		formProps = {},
		params = {},
		setParams = () => {},
	} = props;

	return (
		<div className={styles.table_main_container}>

			<Filters setParams={setParams} params={params} formProps={formProps} />
			<List
				columns={columns}
				onPageChange={onPageChange}
				data={data}
				loading={loading}
				setParams={setParams}
				params={params}
				formProps={formProps}
			/>

			{Component && (
				<Component
					setTableModal={setTableModal}
					tableModal={tableModal}
					row={row}
					loading={loading}
				/>
			)}
		</div>
	);
}

export default TableSection;
