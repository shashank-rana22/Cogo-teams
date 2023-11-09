import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const LOADING_COUNT = 4;
function LoadingState() {
	return (
		<div className={styles.container}>

			{([...Array(LOADING_COUNT)].map((itm) => (
				<div className={styles.card} key={itm}>
					<Placeholder type="circle" radius="45px" margin="0px 0px 20px 0px" />
					<div className={styles.content_loader}>
						{([...Array(LOADING_COUNT)].map((item) => (
							<Placeholder
								key={item}
								height="16px"
								width="180px"
								margin="0px 0px 10px 0px"
							/>
						)))}
					</div>
				</div>
			)))}

		</div>
	);
}

export default LoadingState;
