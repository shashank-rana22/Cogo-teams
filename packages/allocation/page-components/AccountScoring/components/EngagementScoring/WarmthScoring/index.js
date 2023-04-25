import { Collapse } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useGetEngagementScoringConfiguration from '../../../hooks/useGetEngagementScoringConfiguration';

import EngagementType from './EngagementType';
import Header from './Header';
import styles from './styles.module.css';
import TitleComponent from './TitleComponent';

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

	const { list = [] } = data || {};

	const options = list.map((value) => ({
		key   : value.engagement_type,
		title : <TitleComponent
			value={value}
			handleSubmit={handleSubmit}
			editMode={editMode}
			setEditMode={setEditMode}
			activeCollapse={activeCollapse}
		/>,
		children: <EngagementType value={value} editMode={editMode} formProps={formProps} />,
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
