import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function EmptyState({ heading = 'data', placement = 'center' }) {
	return (
		<div className={styles.container}>
			<div className={`${styles.wrapper} ${styles[placement]}`}>
				<div className={styles.heading}>
					No
					{' '}
					{heading}
					{' '}
					found
				</div>

				<div className={styles.content}>
					Looks like you do not have any
					{' '}
					{heading}
					{' '}
					in this category
				</div>
			</div>

			{placement === 'center' ? (
				<div className={styles.icn_container}>
					<img
						src={GLOBAL_CONSTANTS.image_url.empty_state}
						alt={`no ${heading} found`}
						height="100%"
						width="100%"
						style={{ marginLeft: 12 }}
					/>
				</div>
			) : null}
		</div>
	);
}

EmptyState.propTypes = {};

export default EmptyState;
