import { Placeholder } from '@cogoport/components';

import MyResponsiveScatterPlot from '../DiameterGraph';
import LevelPayouts from '../LevelPayouts';
import styles from '../styles.module.css';

function ReturnComponent({
	activeTab = '',
	type = '', singleData = {}, setSingleData = () => {}, simulationData = {}, loading,
}) {
	const renderCom = {
		level   : <LevelPayouts singleData={singleData} activeTab={activeTab} />,
		revenue : <MyResponsiveScatterPlot
			singleData={singleData}
			setSingleData={setSingleData}
			simulationData={simulationData}
			activeTab={activeTab}
		/>,

	};
	if (loading) {
		return (
			<div>
				<div className={styles.networks_chart}>
					{[...Array(type === 'level' ? 14 : 15).keys()].map((itm) => (
						<Placeholder
							className={styles.networks_skeleton}
							key={itm}
						/>
					))}
				</div>
			</div>
		);
	}
	return renderCom[type];
}

export default ReturnComponent;
