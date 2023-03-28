import { Loader, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import { HawbFields } from '../../configurations/hawb_fields';
import useGetHawbList from '../../hooks/useGetHawbList';

import HawbListItem from './HawbListItem';
import styles from './styles.module.css';

function HawbList({ data }) {
	const { fields } = HawbFields;
	const { data:hawbData, loading } = useGetHawbList(data.shipmentId);

	const handleClickOnDownload = (documentUrl) => {
		if (typeof window !== 'undefined') {
			window.open(documentUrl, '_blank');
		}
	};

	const functions = {
		handleDownload: (singleItem) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={singleItem?.documentData?.status === 'document_uploaded'
					? () => { handleClickOnDownload(singleItem.documentUrl); }
					: () => { handleClickOnDownload(singleItem.documentUrl); }}
			>
				<IcMDownload fill="#8B8B8B" />

			</Button>
		),
	};

	return (
		<div className={styles.hawb_container}>
			{loading ? <Loader /> : (
				<div className={styles.hawb_list}>
					<header className={styles.header}>
						{fields.map((field) => (
							<div
								className={`${styles.col} ${field.className || ''}`}
								style={{ '--span': field.span || 1 } as React.CSSProperties}
							>
								{ field.label }
							</div>
						))}
					</header>
					{(hawbData.list || []).map((item) => (
						<HawbListItem
							item={item}
							fields={fields}
							loading={loading}
							functions={functions}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default HawbList;
