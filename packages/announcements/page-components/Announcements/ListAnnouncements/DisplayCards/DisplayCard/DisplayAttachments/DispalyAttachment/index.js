/* eslint-disable no-undef */
import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function DisplayAttachment({ data = {}, name }) {
	const openDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}
		window.open(modifiedUrl, '_blank');
	};

	// console.log('data', data);
	return (
		<div className={styles.conatiner}>
			<div>
				Document Type :&nbsp;
				{name}
			</div>
			<div className={styles.map_conatiner}>
				{data.map((item) => (
					<div className={styles.data_container}>
						<div className={styles.data_display}>
							<span className={styles.name}>Name :&nbsp;</span>
							<span className={styles.name_data}>{item?.document_name}</span>
						</div>

						<div className={styles.buttoncontainer}>
							<Button
								themeType="primary"
								size="sm"
								style={{ marginRight: 8 }}
								onClick={() => openDocument(item?.document_url)}
							>
								View
							</Button>
							<Button
								themeType="secondary"
								size="sm"
								style={{ marginRight: 8 }}
								// onClick={() => editDetails()}
							>
								Edit
							</Button>
							<IcMDelete
								height={20}
								width={20}
								style={{ cursor: 'pointer' }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DisplayAttachment;
