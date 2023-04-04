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

function GenerateHeader({ setGenerate, setEdit, category, activeCategory, setActiveCategory }) {
	return (
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
