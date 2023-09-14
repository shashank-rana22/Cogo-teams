import { Collapse, Placeholder } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../common/EmptyState';
import useGetEngagementScoringConfiguration from '../../../hooks/useGetEngagementScoringConfiguration';

import EngagementType from './EngagementType';
import Header from './Header';
import styles from './styles.module.css';
import TitleComponent from './TitleComponent';

const LOADING_ROWS = 3;

function WarmthScoring(props) {
	const { t } = useTranslation(['allocation']);

	const { setToggleComponent = () => {} } = props;

	const formProps = useForm();

	const { handleSubmit } = formProps;

	const {
		data,
		debounceQuery,
		searchValue,
		setSearchValue,
		refetch,
		loading,
		activeCollapse,
		setActiveCollapse,
		editMode,
		setEditMode,
	} = useGetEngagementScoringConfiguration();

	const { list = [] } = data || {};

	const options = list.map((item) => ({
		key   : item.engagement_type,
		title : <TitleComponent
			item={item}
			handleSubmit={handleSubmit}
			editMode={editMode}
			setEditMode={setEditMode}
			activeCollapse={activeCollapse}
			refetch={refetch}
		/>,
		children: <EngagementType
			item={item}
			editMode={editMode}
			setEditMode={setEditMode}
			formProps={formProps}
			refetch={refetch}
		/>,
	}));

	return (
		<div>
			<Header
				setToggleComponent={setToggleComponent}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
			/>

			{isEmpty(list) && !loading ? (
				<div className={styles.empty_container}>
					<EmptyState
						height={220}
						width={380}
						flexDirection="column"
						emptyText={t('allocation:no_data_found')}
						textSize={20}
					/>
				</div>
			) : null}

			{loading && !activeCollapse ? (
				<div className={styles.collapse_container}>
					{[...Array(LOADING_ROWS).keys()].map((item) => (
						<div key={item} className={styles.dummy_collapse}>
							<Placeholder width="100px" height="32px" />
							<IcMArrowRotateDown />
						</div>
					))}
				</div>
			) : (
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
			) }

		</div>

	);
}

export default WarmthScoring;
