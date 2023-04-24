import { Button, Collapse } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import EngagementType from './EngagementType';
import Header from './Header';
import list from './list';
import styles from './styles.module.css';

function WarmthScoring(props) {
	const { setToggleComponent = () => {} } = props;

	const [activeCollapse, setActiveCollapse] = useState('');

	const [editMode, setEditMode] = useState('');

	const titleComponent = (value) => (
		<div className={styles.title_container}>
			<div className={styles.engagement_type}>{startCase(value.engagement_type)}</div>
			{activeCollapse === value.engagement_type
				? (
					<div>
						{editMode === value.engagement_type ? (
							<div className={styles.title_buttons}>
								<Button size="md" themeType="tertiary" style={{ marginLeft: '16px' }}>
									<IcMDelete style={{ marginRight: '8px' }} />
									Delete
								</Button>

								<Button
									size="md"
									themeType="secondary"
									style={{ marginLeft: '16px' }}
									onClick={(e) => {
										e.stopPropagation();
										setEditMode('');
									}}
								>
									Cancel

								</Button>

								<Button
									size="md"
									themeType="primary"
									style={{ marginLeft: '16px', marginRight: '16px' }}
								>
									Save
								</Button>

							</div>
						) : (
							<Button
								size="md"
								themeType="secondary"
								onClick={(e) => {
									e.stopPropagation();
									setEditMode(value.engagement_type);
								}}
								style={{ marginLeft: '16px', marginRight: '16px' }}
							>
								<IcMEdit style={{ marginRight: '8px' }} />

								Edit
							</Button>
						)}
					</div>
				) : null }

		</div>
	);

	const options = list.map((value) => ({
		key      : value.engagement_type,
		title    : titleComponent(value),
		children : <EngagementType value={value} editMode={editMode} />,
	}));

	return (
		<div>
			<Header setToggleComponent={setToggleComponent} />

			<div className={styles.collapse_container}>
				<Collapse
					panels={options}
					activeKey={activeCollapse}
					setActive={(v) => {
						setActiveCollapse(v);
						if (activeCollapse) {
							setEditMode('');
						}
					}}
					type="text"
				/>
			</div>
		</div>

	);
}

export default WarmthScoring;
