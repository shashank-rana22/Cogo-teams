import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function InfoBannerContent({ popoverComponentData = {}, totalBanners = 1, setInfoBanner = () => {} }) {
	const {
		sequence_number = 1,
		heading = '',
		content = '',
		buttons = [],
		subText = '',
	} = popoverComponentData;

	const onButtonClick = ({ name }) => {
		if (name === 'close') {
			setInfoBanner((prev) => ({ ...prev, current: '' }));
			return;
		}

		if (name === 'next') {
			setInfoBanner((prev) => ({ ...prev, current: 'comparision_button' }));
			return;
		}

		setInfoBanner((prev) => ({ ...prev, current: 'edit_button' }));
	};

	return (
		<div>
			<div className={styles.heading}>{heading}</div>
			<div className={styles.content}>{content}</div>
			<div className={styles.content}>{subText}</div>

			<div className={styles.footer}>
				<div className={styles.flex}>
					Guide

					<div className={styles.count}>
						{sequence_number}
						/
						{totalBanners}
					</div>
				</div>

				<div className={styles.button_container}>
					{buttons.map((item) => {
						const { label, name, ...restProps } = item;

						return (
							<Button key={name} {...restProps} onClick={() => onButtonClick({ name })}>
								{label}
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default InfoBannerContent;
