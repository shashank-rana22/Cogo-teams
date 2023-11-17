import { Popover } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EditGroupName from '../EditGroupName';

import styles from './styles.module.css';

const groupNameRegex = new RegExp(GLOBAL_CONSTANTS.regex_patterns.group_draft_name);

function EditName({
	searchName = '',
	isGroup = false,
	firestore = {},
	activeTab = {},
	isDraft = false,
}) {
	const [openPopover, setOpenPopover] = useState(false);
	const isDraftName = !isEmpty(searchName.match(groupNameRegex));

	return (
		<>
			<div className={styles.name_display}>
				{!isDraftName ? startCase(searchName?.toLowerCase() || 'Unknown User') : searchName}
			</div>
			<div className={styles.popover_container}>
				{isGroup ? (
					<Popover
						render={openPopover ? (
							<EditGroupName
								firestore={firestore}
								activeTab={activeTab}
								searchName={searchName}
								setOpenPopover={setOpenPopover}
								isDraft={isDraft}
							/>
						) : null}
						trigger="mouseenter"
						placement="bottom"
						visible={openPopover}
						interactive
					>
						<IcMEdit
							className={styles.edit_icon}
							onClick={() => setOpenPopover((prev) => !prev)}
						/>
					</Popover>
				) : null}
			</div>
		</>
	);
}

export default EditName;
