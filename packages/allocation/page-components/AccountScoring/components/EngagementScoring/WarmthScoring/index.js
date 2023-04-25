import { Button, Collapse } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useEditEngagementScoringConfiguration from '../../../hooks/useEditEngagementScoringConfiguration';
import useGetEngagementScoringConfiguration from '../../../hooks/useGetEngagementScoringConfiguration';

import EngagementType from './EngagementType';
import Header from './Header';
import styles from './styles.module.css';

function WarmthScoring(props) {
	const { setToggleComponent = () => {} } = props;

	const [activeCollapse, setActiveCollapse] = useState('');

	const [editMode, setEditMode] = useState('');

	const formProps = useForm();

	const { handleSubmit } = formProps;

	const {
		data,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = useGetEngagementScoringConfiguration({ activeCollapse });

	const { onSave } = useEditEngagementScoringConfiguration();

	const { list = [] } = data || {};

	const titleComponent = (value) => {
		const { engagement_type } = value;

		const handleSave = (formValues) => {
			onSave(formValues, engagement_type);
		};

		return (
			<div className={styles.title_container}>
				<div className={styles.engagement_type}>{startCase(engagement_type)}</div>
				{activeCollapse === engagement_type
					? (
						<div>
							{editMode === engagement_type ? (
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
										onClick={handleSubmit(handleSave)}
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
										setEditMode(engagement_type);
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
	};

	const options = list.map((value) => ({
		key      : value.engagement_type,
		title    : titleComponent(value),
		children : <EngagementType value={value} editMode={editMode} formProps={formProps} />,
	}));

	return (
		<div>
			<Header
				setToggleComponent={setToggleComponent}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
			/>

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
