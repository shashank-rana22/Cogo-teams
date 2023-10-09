import { Popover } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import EditGroupName from '../EditGroupName';

import styles from './styles.module.css';

function EditName({
	searchName = '',
	isGroup = false,
	firestore = {},
	activeTab = {},
	isDraft = false,
}) {
	const [openPopover, setOpenPopover] = useState(false);

	return (
		<>
			<div className={styles.name_display}>
				{startCase(searchName?.toLowerCase() || 'Unkown User')}
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
