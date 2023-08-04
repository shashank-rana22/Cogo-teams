import { Button, Pill } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const MIN_LENGTH = 1;

function Header(props) {
	const {
		userDetails,
		mode,
		setMode,
		handleSubmit,
		onSaveChanges,
		onDistributeEqually,
		onDiscardChanges,
		loading,
		objectivesCount,
	} = props;

	const { user = {}, partner = {}, role = {} } = userDetails || {};

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
					disabled={loading}
				>
					Distribute Equally
				</Button>

				<Button
					type="button"
					themeType="secondary"
					onClick={onDiscardChanges}
					disabled={loading}
				>
					Discard Changes
				</Button>

				<Button
					type="button"
					themeType="accent"
					onClick={handleSubmit(onSaveChanges)}
					loading={loading}
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
					{role?.name}
					:
					{' '}
					<strong>{user?.name}</strong>
				</h4>

				{!isEmpty(partner) && (
					<Pill size="md">
						Entity:
						{' '}
						{partner.business_name}
					</Pill>
				)}
			</div>

			{objectivesCount > MIN_LENGTH && (
				<div className={styles.button_container}>
					{BUTTON_MAPPING_BASIS_MODE[mode]}
				</div>
			)}
		</div>
	);
}

export default Header;
