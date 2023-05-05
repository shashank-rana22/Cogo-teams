import { Modal } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import UploadImageModal from '../../UploadImageModal';

function ImageComponent(props) {
	const {
		pageConfiguration,
		setPageConfiguration,
		widget,
		rowData,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		modeType,
	} = props;

	const { component } = widget || {};
	const [showUploadModal, setShowUploadModal] = useState(false);
	const { content } = component || {};

	const { handleUpdateContent } = useUpdateComponentsContent({
		pageConfiguration,
		setPageConfiguration,
		selectedRow,
		selectedColumn,
		selectedNestedColumn,
		selectedItem,
		columnData,
		nestedColumData,
		type: 'image',
		modeType,
	});

	return (
		<div>
			{content ? (
				<div>
					<img width="100%" height="auto" src={content} alt="upload-img" />
				</div>
			) : (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div
						onClick={() => setShowUploadModal(true)}
						role="presentation"
						style={{ cursor: 'pointer' }}
					>
						<IcMCloudUpload width={48} height={48} />
						<div>Upload</div>
					</div>
				</div>
			)}

			{showUploadModal && (
				<Modal
					size="md"
					placement="top"
					show={showUploadModal}
					onClose={() => setShowUploadModal(false)}
				>
					<UploadImageModal
						setShowUploadModal={setShowUploadModal}
						handleChange={handleUpdateContent}
						rowData={rowData}
						type="image"
						accept=".png, .jpg, .webp, .webm, .jpeg, .svg, .gif"
					/>
				</Modal>
			)}
		</div>
	);
}

export default ImageComponent;
