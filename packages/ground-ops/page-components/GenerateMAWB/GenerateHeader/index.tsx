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

function GenerateHeader({ setGenerate, edit, setEdit, activeCategory, setActiveCategory }) {
	return (
		<div>
			<div className={styles.heading}>Add Export Details</div>
			<Breadcrumb>
				<Breadcrumb.Item label={(
					<div
						onClick={() => { setGenerate(false); if (edit) { setEdit(false); } }}
						role="link"
						tabIndex={0}
					>
						SO2 - Docs Dashboard
					</div>
				)}
				/>
				<Breadcrumb.Item label="Add Export Details" />
			</Breadcrumb>
			{activeCategory === 'hawb' && (
				<div className={styles.flex}>
					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								setActiveCategory(tab.key);
							}}
							role="presentation"
						>
							{' '}
							<div
								className={tab.key
										=== activeCategory
									? styles.category_container_click : styles.category_container}
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
