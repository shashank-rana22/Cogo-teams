import { CONSTANT_KEYS } from '../../../constants/table-modal-mapping';

import Filters from './Filters';
import List from './List';
import ReUploadModal from './Modals/ReUploadModal';
import UploadListModal from './Modals/UploadListModal';

function TableSection(props) {
	const {
		columns = [],
		onPageChange = () => {},
		loading = false,
		setTableModal = () => {},
		tableModal = '',
		data = {},
		row = {},
		formProps = {},
		params = {},
		setParams = () => {},
	} = props;

	const {
		REUPLOAD, UPLOAD_LIST,
	} = CONSTANT_KEYS;

	const TABLE_MODAL_MAPPING = {
		[REUPLOAD]    : ReUploadModal,
		[UPLOAD_LIST] : UploadListModal,

	};
	const Component = TABLE_MODAL_MAPPING[tableModal] || null;

	return (
		<>

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
		</>
	);
}

export default TableSection;
