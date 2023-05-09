import { Breadcrumb } from '@cogoport/components';

import styles from './styles.module.css';

const tabs = [
	{
		key   : 'hawb',
		label : 'HAWB',
	},
	{
		key   : 'mawb',
		label : 'MAWB',
	},
];

function GenerateHeader({ setGenerate, setEdit, category, activeCategory, setActiveCategory, awbNumber, serialId }) {
	return (
		<div>
			<div className={styles.top_flex}>
				<div>
					<div className={styles.heading}>Add Export Details</div>
					<Breadcrumb>
						<Breadcrumb.Item label={(
							<div
								onClick={() => { setGenerate(false); setEdit(false); }}
								role="link"
								tabIndex={0}
							>
								SO2 - Docs Dashboard
							</div>
						)}
						/>
						<Breadcrumb.Item label="Add Export Details" />
					</Breadcrumb>
				</div>
				<table>
					<tr>
						<td className={styles.awb_style}>AWB Number</td>
						<td>
							:
							{' '}
							{awbNumber}
						</td>

					</tr>
					<tr>
						<td className={styles.awb_style}>Serial ID</td>
						<td>
							:
							{' '}
							{serialId}
						</td>

					</tr>
				</table>

			</div>
			{category === 'hawb' && (
				<div className={styles.flex}>
					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								setActiveCategory(tab.key);
							}}
							role="presentation"
						>
							<div
								className={`${styles.container_click} 
								${tab.key
									=== activeCategory ? styles.category_container_click : styles.category_container}`}
							>
								{tab.label}
							</div>

						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default GenerateHeader;
