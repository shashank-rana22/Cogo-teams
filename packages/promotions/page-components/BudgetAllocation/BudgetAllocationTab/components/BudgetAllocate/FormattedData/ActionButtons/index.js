import { Tags, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import DeactivatePromoBudget from '../../../../hooks/useDeactivatePromoBudget';

import styles from './styles.module.css';

function ActionButtons({ item, refetch }) {
	const { deactivateBudget, loading } = DeactivatePromoBudget({ refetch });
	const handleDeactivate = (deactivateData) => {
		deactivateBudget(deactivateData);
	};

	if (item?.status === 'active') {
		return (
			<Button
				onClick={() => handleDeactivate(item)}
				className="secondary sm"
				style={{ width: 'fit-content' }}
				loading={loading}
			>
				Deactivate
			</Button>
		);
	}
	if (item?.status === 'deactivated') {
		return (
			<div
				style={{
					display       : 'flex',
					flexDirection : 'column',
					justifyItems  : 'center',
				}}
			>
				<div className={styles.deactivate_text}>
					Deactivated on
					<div className={`${styles.deactivate_text} ${styles.tile_bold}`}>
						{formatDate({
							date       : item?.deactivation_date,
							formatType : 'date',
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						}) || '-'}
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className={`${styles.styled_tag} '.core-ui-tag-text'`}>
			<Tags className="primary lg">{item?.status}</Tags>
		</div>
	);
}

export default ActionButtons;
