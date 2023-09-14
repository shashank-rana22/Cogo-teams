import { Button, Pill } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

const MIN_LENGTH = 1;

function Header(props) {
	const { t } = useTranslation(['allocation']);

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
				{t('allocation:edit_distribution_button')}
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
					{t('allocation:distribute_equally_button')}
				</Button>

				<Button
					type="button"
					themeType="secondary"
					onClick={onDiscardChanges}
					disabled={loading}
				>
					{t('allocation:discard_changes_button')}
				</Button>

				<Button
					type="button"
					themeType="accent"
					onClick={handleSubmit(onSaveChanges)}
					loading={loading}
				>
					<IcMTick style={{ marginRight: '4px' }} />
					{t('allocation:save_changes_button')}
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
						{t('allocation:entity_label')}
						:
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
