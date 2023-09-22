import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body(props) {
	const {
		list,
		params,
		setParams,
		currLevel,
		setCurrLevel,
		setLevelStack,
	} = props;

	return (
		<div className={styles.container}>
			<LeftPanel
				list={list}
				params={params}
				setParams={setParams}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
				setLevelStack={setLevelStack}
			/>

			<RightPanel />
		</div>

	);
}

export default Body;
