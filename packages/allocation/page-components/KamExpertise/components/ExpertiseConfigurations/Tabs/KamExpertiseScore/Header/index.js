import { Placeholder } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({ auditData, loading }) {
	const { name, updated_at } = auditData;

	console.log('auditData::', auditData);
	if (loading) {
		return (
			<div className={styles.main_container}>
				<div className={styles.config_basic_detail}>
					<div className={styles.draft_name}>
						<div style={{ marginRight: '8px' }}>
							Currently Editing :
							{' '}
						</div>
						<Placeholder height="20px" width="120px" />

					</div>
					<div className={styles.lower_details}>
						<div style={{ marginRight: '8px' }}>
							Last Modified
							{' '}
							:
						</div>
						<Placeholder height="20px" width="120px" />
						<div style={{ marginLeft: '36px', display: 'flex' }}>
							<div style={{ marginRight: '8px' }}>
								Last Edit By
								{' '}
								:
								{' '}
							</div>
							<Placeholder height="20px" width="120px" />
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
	// <div className={styles.container}>
	// 	<div className={styles.config_basic_details}>
	// 		<div className={styles.draft_name}>
	// 			Currently Editing :
	// 			{' '}
	// 		&nbsp;
	// 			<b>Saved Draft</b>
	// 		</div>

	// 		<div className={styles.lower_details}>
	// 			<div>
	// 				Last Modified:
	// 				{' '}
	// 				{format(updated_at, 'dd-MM-YYYY')}
	// 			</div>

	// 			<div>
	// 				Last Edit By:
	// 				{' '}
	// 				<b>{startCase(name)}</b>
	// 			</div>
	// 		</div>
	// 	</div>

	// 	{/* <div className={styles.button_container}>
	// 		<Button themeType="secondary">
	// 			Save As Draft
	// 		</Button>

	// 		<Button themeType="primary" style={{ marginLeft: '8px' }}>
	// 			Publish
	// 		</Button>
	// 	</div> */}

		// </div>
		<div className={styles.main_container}>
			<div className={styles.config_basic_detail}>
				<div className={styles.draft_name}>
					<div style={{ marginRight: '8px' }}>
						Currently Editing :
						{' '}
					</div>
					<b>Saved Draft</b>
				</div>
				<div className={styles.lower_details}>
					<div>
						Last Modified
						{' '}
						:
					</div>
					{ (format(updated_at, 'dd-MM-YYYY') || '--')}
					<div style={{ marginLeft: '20px' }}>

						Last Edit By
						{' '}
						:
						{' '}
						<b>{startCase(name || '----')}</b>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
