import { Button, Modal } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import useDeleteObjectivesKAMList from '../../../../../../../hooks/useDeleteObjectivesKAMList';

import DeleteList from './DeleteList';
import Generate from './Generate';
import styles from './styles.module.css';
import ViewList from './ViewList';

const MODAL_COMPONENT_MAPPING = ({
	handleCloseActionModal = () => { },
	loader,
	handleDeleteKAMsList = () => { },
}) => ({
	generate: {
		title         : 'Generate List',
		modalSize     : 'lg',
		Component     : Generate,
		actionButtons : [
			{
				text       : loader ? 'Cancel list generation' : 'Close',
				themeType  : 'accent',
				onClickFun : handleCloseActionModal,
			},
		],
	},
	view: {
		title            : 'Generated List',
		modalSize        : 'lg',
		Component        : ViewList,
		customModalStyle : { minHeight: '400px' },
		actionButtons    : [
			{
				prefix    : <IcMDownload height={16} width={16} />,
				text      : 'Download List',
				themeType : 'secondary',
				// onClickFun : handleClose,
			},
			{
				text       : 'Close List',
				themeType  : 'accent',
				onClickFun : handleCloseActionModal,
			},
		],
	},
	delete: {
		title         : 'Delete List',
		modalSize     : 'md',
		Component     : DeleteList,
		actionButtons : [
			{
				text       : 'No, Cancel',
				themeType  : 'secondary',
				onClickFun : handleCloseActionModal,
			},
			{
				text       : 'Yes, Delete List',
				themeType  : 'accent',
				onClickFun : handleDeleteKAMsList,
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

	const handleCloseActionModal = () => {
		setShowModal(() => ({
			id: '',
		}));
	};

	const { handleDeleteKAMsList = () => { } } = useDeleteObjectivesKAMList({
		objective_id: showModal?.id,
		refetchListObjectives,
		handleCloseActionModal,
	});

	useEffect(() => {
		setLoader(true);
	}, [showModal?.id]);

	if (!showModal.id) {
		return null;
	}

	const {
		Component = null,
		title = '',
		modalSize = 'lg',
		actionButtons = [],
		customModalStyle = {},
	} = MODAL_COMPONENT_MAPPING({
		handleCloseActionModal,
		loader,
		handleDeleteKAMsList,
	})[action] || {};

	return (
		<Modal
			show={showModal.id}
			onClose={handleCloseActionModal}
			size={modalSize}
		>
			<Modal.Header title={title} />
			<Modal.Body style={customModalStyle}>
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
