/* eslint-disable max-len */
import { Modal } from '@cogoport/components';
import { useState } from 'react';

import useUpdateComponentsContent from '../../../helpers/useUpdateComponentsContent';
import UploadImageModal from '../../UploadImageModal';

import styles from './styles.module.css';

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
					<img width="100%" src={content} alt="upload-img" />
				</div>
			) : (

				<div
					onClick={() => { if (modeType === 'edit') { setShowUploadModal(true); } }}
					role="presentation"
					className={styles.image_drop}
				>
					<img
						alt=""
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/svgviewer-png-output%20(4).png"
						width="48px"
						height="48px"
					/>
					<div>Drop your image here or browse</div>
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
