import { Button, Modal } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import DeleteList from './DeleteList';
import Generate from './Generate';
import styles from './styles.module.css';
import ViewList from './ViewList';

const MODAL_COMPONENT_MAPPING = ({ handleClose = () => { }, loader }) => ({
	generate: {
		title         : 'Generate List',
		modalSize     : 'lg',
		Component     : Generate,
		actionButtons : [
			{
				text       : loader ? 'Cancel list generation' : 'Close',
				themeType  : 'accent',
				onClickFun : handleClose,
			},
		],
	},
	view: {
		title         : 'Generated List',
		modalSize     : 'lg',
		Component     : ViewList,
		actionButtons : [
			{
				prefix    : <IcMDownload height={16} width={16} />,
				text      : 'Download List',
				themeType : 'secondary',
				// onClickFun : handleClose,
			},
			{
				text       : 'Close List',
				themeType  : 'accent',
				onClickFun : handleClose,
			},
		],
	},
	delete: {
		title         : 'Delete List',
		modalSize     : 'sm',
		Component     : DeleteList,
		actionButtons : [
			{
				text       : 'No, Cancel',
				themeType  : 'secondary',
				onClickFun : handleClose,
			},
			{
				text      : 'Yes, Delete List',
				themeType : 'accent',
				// onClickFun : handleClose,
			},
		],
	},
});

function ActionModal({
	showModal = {},
	setShowModal = () => { },
	filters = {},
	setFilters = () => { },
	refetchListObjectives = () => { },
}) {
	const { action } = showModal || {};

	const [loader, setLoader] = useState(true);

	if (!showModal.id) {
		return null;
	}

	const handleClose = () => {
		setShowModal(() => ({
			id: '',
		}));
	};

	const {
		Component = null,
		title = '',
		modalSize = 'lg',
		actionButtons = [],
	} = MODAL_COMPONENT_MAPPING({
		handleClose,
		loader,
	})[action] || {};

	return (
		<Modal
			show={showModal.id}
			onClose={handleClose}
			size={modalSize}
		>
			<Modal.Header title={title} />
			<Modal.Body>
				<Component
					filters={filters}
					setFilters={setFilters}
					showModal={showModal}
					refetchListObjectives={refetchListObjectives}
					loader={loader}
					setLoader={setLoader}
				/>
			</Modal.Body>
			<Modal.Footer>
				{(actionButtons || []).map((btn) => {
					const {
						text = '',
						themeType = '',
						onClickFun = () => { },
						prefix,
					} = btn || {};

					return (
						<Button
							key={`${text}_${themeType}`}
							themeType={themeType}
							onClick={onClickFun}
							style={{ marginLeft: 8 }}
						>
							{prefix ? (
								<div className={styles.btn_icon}>
									{prefix || null}
								</div>
							) : null}
							{text}
						</Button>
					);
				})}
			</Modal.Footer>
		</Modal>
	);
}

export default ActionModal;
