import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { forwardRef } from 'react';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function OrganizationCard(props, ref) {
	const { t } = useTranslation(['allocation']);

	const {
		current : {
			third_party = '',
		},
	} = ref;

	const str = third_party;

	const avatarName = `${str.split(' ')[GLOBAL_CONSTANTS.zeroth_index]} ${str.split(' ')[FIRST_INDEX] || ''}`;

	return (
		<div className={styles.card}>
			<Avatar personName={avatarName || '--'} size="72px" />
			<div className={styles.details}>
				{t('allocation:data_organization_name')}
				<span className={styles.name}>{startCase(third_party || '--')}</span>
			</div>
		</div>

	);
}

export default forwardRef(OrganizationCard);
