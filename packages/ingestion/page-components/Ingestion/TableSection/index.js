import { CONSTANT_KEYS } from '../../../constants/table-modal-mapping';

import Filters from './Filters';
import List from './List';
import CurrentStatus from './Modals/CurrentStatus';
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
		refetch = () => {},
	} = props;

	const {
		REUPLOAD, UPLOAD_LIST, CURRENT_STATUS,
	} = CONSTANT_KEYS;

	const TABLE_MODAL_MAPPING = {
		[REUPLOAD]       : ReUploadModal,
		[UPLOAD_LIST]    : UploadListModal,
		[CURRENT_STATUS] : CurrentStatus,

	};
	const Component = TABLE_MODAL_MAPPING[tableModal] || null;

	return (
		<>

			<Filters setParams={setParams} params={params} formProps={formProps} refetch={refetch} />
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
					refetch={refetch}
				/>
			)}
		</>
	);
}

export default TableSection;
