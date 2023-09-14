import { Button, Modal } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import React, { useState, useEffect } from 'react';

import useDeleteObjectivesKAMList from '../../../../../../../hooks/useDeleteObjectivesKAMList';

import DeleteList from './DeleteList';
import Generate from './Generate';
import styles from './styles.module.css';
import ViewList from './ViewList';

const modalComponentMapping = ({
	handleCloseActionModal = () => { },
	loader,
	handleDeleteKAMsList = () => { },
	t = () => {},
}) => ({
	generate: {
		title         : t('allocation:generate_list'),
		modalSize     : 'lg',
		Component     : Generate,
		actionButtons : [
			{
				text       : loader ? t('allocation:cancel_list_generation_button') : t('allocation:close_button'),
				themeType  : 'accent',
				onClickFun : handleCloseActionModal,
			},
		],
	},
	view: {
		title            : t('allocation:generated_list'),
		modalSize        : 'lg',
		Component        : ViewList,
		customModalStyle : { minHeight: '400px' },
		actionButtons    : [
			{
				text       : t('allocation:close_list_button'),
				themeType  : 'accent',
				onClickFun : handleCloseActionModal,
			},
		],
	},
	delete: {
		title         : t('allocation:delete_list'),
		modalSize     : 'md',
		Component     : DeleteList,
		actionButtons : [
			{
				text       : t('allocation:no_cancel_button'),
				themeType  : 'secondary',
				onClickFun : handleCloseActionModal,
			},
			{
				text       : t('allocation:yes_delete_list'),
				themeType  : 'accent',
				onClickFun : handleDeleteKAMsList,
			},
		],
	},
});

function ActionModal({
	showModal = {},
	setShowModal = () => { },
	refetchListObjectives = () => { },
}) {
	const { t } = useTranslation(['allocation']);

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
	} = modalComponentMapping({
		handleCloseActionModal,
		loader,
		handleDeleteKAMsList,
		t,
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
