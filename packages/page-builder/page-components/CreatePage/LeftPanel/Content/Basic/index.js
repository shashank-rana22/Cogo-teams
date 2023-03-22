import { startCase } from '@cogoport/utils';

import contents from '../../../../../configurations/basic-contents';

import styles from './styles.module.css';

function Basic(props) {
	const { activeTool, setActiveTool } = props;

	return (
		<div className={styles.container}>

			{contents.map((content) => {
				const style = activeTool === content.type ? { backgroundColor: '#CFEAED' } : {};

				return (
					<div
						style={style}
						key={content.type}
						role="presentation"
						onClick={() => setActiveTool(content.type)}
						className={styles.grid_item}
					>
						<div>{content.icon}</div>
						<div>{startCase(content.type)}</div>
					</div>
				);
			})}

		</div>
	);
}

export default Basic;
