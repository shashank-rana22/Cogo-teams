import { Input, Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateCogooneGroup from '../../../../../../hooks/useUpdateCogooneGroup';
import useUpdateDraftLocalCogooneGroup from '../../../../../../hooks/useUpdateDraftLocalCogooneGroup';

import styles from './styles.module.css';

function EditGroupName({
	firestore = {},
	activeTab = {},
	searchName = '',
	setOpenPopover = () => {},
	isDraft = false,
}) {
	const [groupName, setGroupName] = useState(searchName || '');

	const cleanUpFunc = () => {
		setOpenPopover(false);
		setGroupName('');
	};

	const {
		updateCogooneGroup = () => {},
		globalLoading = false,
	} = useUpdateCogooneGroup({ activeTab, cleanUpFunc });

	const {
		updateDraftLocalCogooneGroup,
		draftUpdateLoading = false,
	} = useUpdateDraftLocalCogooneGroup({ activeTab, firestore, cleanUpFunc });

	const updateGroup = () => {
		if (isDraft) {
			updateDraftLocalCogooneGroup(
				{
					actionName: 'UPDATE_GROUP_NAME',
					groupName,
				},
			);
			return;
		}

		updateCogooneGroup(
			{ actionName: 'UPDATE_GROUP_NAME', groupName },
		);
	};

	return (
		<div className={styles.container}>
			<label className={styles.label_styles}>
				Group name
			</label>
			<Input
				size="sm"
				placeholder="type here..."
				onChange={setGroupName}
				value={groupName}
			/>
			<div className={styles.footer}>
				<Button
					size="sm"
					themeType="tertiary"
					onClick={() => setOpenPopover(false)}
					disabled={draftUpdateLoading || globalLoading}
				>
					Cancel
				</Button>
				<Button
					size="sm"
					themeType="primary"
					loading={draftUpdateLoading || globalLoading}
					onClick={updateGroup}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default EditGroupName;
