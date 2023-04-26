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
	console.log('activeCollapse', activeCollapse);

	const [editMode, setEditMode] = useState('');
	console.log('editMode', editMode);

	const formProps = useForm();

	const { handleSubmit } = formProps;

	const {
		data,
		debounceQuery,
		searchValue,
		setSearchValue,
		refetch,
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
			refetch={refetch}
		/>,
		children: <EngagementType value={value} editMode={editMode} formProps={formProps} refetch={refetch} />,
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
