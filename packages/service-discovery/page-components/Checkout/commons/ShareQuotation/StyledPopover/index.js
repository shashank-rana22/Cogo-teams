import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function StyledPopover({ BUTTON_MAPPING = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Once you share the quotation, the checkout will be added to customer cart
			</div>

			<div className={styles.button_container}>
				{BUTTON_MAPPING.map((item) => {
					const { label, key, onClickFunction = () => {}, ...restProps } = item;

					return (
						<Button
							key={key}
							type="button"
							size="lg"
							onClick={onClickFunction}
							{...restProps}
						>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default StyledPopover;
