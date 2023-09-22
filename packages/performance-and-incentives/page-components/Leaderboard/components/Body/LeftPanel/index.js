import NEXT_LEVEL_MAPPING from '../../../constants/next-level-mapping';

import Header from './Header';
import LeaderboardFilters from './LeaderboardFilters';
import List from './List';
import styles from './styles.module.css';

function LeftPanel(props) {
	const {
		list,
		params,
		setParams,
		currLevel,
		setCurrLevel,
		setLevelStack,
	} = props;

	const handleClick = ({ id = '' }) => {
		setParams((prev) => ({
			...prev,
			filters: {
				...prev.filters,
				report_type : NEXT_LEVEL_MAPPING[currLevel],
				user_rm_ids : [id],
			},
		}));

		setLevelStack((prev) => prev.push(currLevel));

		setCurrLevel((prev) => NEXT_LEVEL_MAPPING[prev]);
	};

	return (
		<div className={styles.container}>
			<Header />

			<LeaderboardFilters />

			<List list={list} params={params} setParams={setParams} handleClick={handleClick} />
		</div>
	);
}

export default LeftPanel;
