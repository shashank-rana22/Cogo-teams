import Filters from './Filters';
import List from './List';
import ReUploadModal from './Modals/ReUploadModal';
import UploadListModal from './Modals/UploadListModal';
import styles from './styles.module.css';

function TableSection(props) {
	const {
		columns = [],
		onPageChange = () => {},
		loading = false,
		setTableModal = () => {},
		tableModal = '',
		data,
		row = {},
		formProps = {},
		params = {},
		setParams = () => {},
	} = props;

	const CONSTANT_KEYS = {
		REUPLOAD    : 'reUpload',
		UPLOAD_LIST : 'uploadList',
	};

	const {
		REUPLOAD, UPLOAD_LIST,
	} = CONSTANT_KEYS;

	const TABLE_MODAL_MAPPING = {
		[REUPLOAD]    : ReUploadModal,
		[UPLOAD_LIST] : UploadListModal,

	};
	const Component = TABLE_MODAL_MAPPING[tableModal] || null;

	return (
		<div className={styles.table_main_container}>

			<Filters setParams={setParams} params={params} formProps={formProps} />
			<List
				columns={columns}
				onPageChange={onPageChange}
				data={data}
				loading={loading}
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
