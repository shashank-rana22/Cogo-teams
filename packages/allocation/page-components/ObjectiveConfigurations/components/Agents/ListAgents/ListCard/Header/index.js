import { Button, Pill } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header(props) {
	const {
		role,
		user,
		partner,
		mode,
		setMode,
		handleSubmit,
		onSaveChanges,
		onDistributeEqually,
		onDiscardChanges,
	} = props;

	const BUTTON_MAPPING_BASIS_MODE = {
		view: (
			<Button
				type="button"
				themeType="secondary"
				onClick={() => setMode('edit')}
			>
				Edit Distribution
			</Button>
		),
		edit: (
			<>
				<Button
					type="button"
					themeType="link"
					onClick={onDistributeEqually}
				>
					Distribute Equally
				</Button>

				<Button
					type="button"
					themeType="secondary"
					onClick={onDiscardChanges}
				>
					Discard Changes
				</Button>

				<Button
					type="button"
					themeType="accent"
					onClick={handleSubmit(onSaveChanges)}
				>
					<IcMTick style={{ marginRight: '4px' }} />
					Save Changes
				</Button>
			</>
		),
	};

	return (
		<div className={styles.card_header}>
			<div className={styles.agent_detail}>
				<h4 className={styles.agent}>
					{role.name}
					:
					{' '}
					<strong>{user.name}</strong>
				</h4>

				{!isEmpty(partner) && (
					<Pill size="md">
						Entity:
						{' '}
						{partner.business_name}
					</Pill>
				)}

				{/* <Pill size="md">
					Channel:
					{' '}
					{role.role_sub_function}
				</Pill> */}
			</div>

			<div className={styles.button_container}>{BUTTON_MAPPING_BASIS_MODE[mode]}</div>
		</div>
	);
}

export default Header;
