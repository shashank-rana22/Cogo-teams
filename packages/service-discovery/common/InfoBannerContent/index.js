import { Button } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import styles from './styles.module.css';

function InfoBannerContent({
	popoverComponentData = {},
	totalBanners = 1,
	setInfoBanner = () => {},
	guideKey = 'guide_completed_for',
	nextGuide = 'comparision_button',
	prevGuide = 'edit_button',
}) {
	const { user:{ id } } = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const {
		sequence_number = 1,
		heading = '',
		content = '',
		buttons = [],
		subText = '',
	} = popoverComponentData;

	const onButtonClick = ({ name, onclickFunction = () => {}, event }) => {
		if (name === 'close') {
			setInfoBanner((prev) => ({ ...prev, current: '' }));
			localStorage.setItem(`${guideKey}_${id}`, true);
			return;
		}

		if (name === 'next') {
			onclickFunction(event);
			setInfoBanner((prev) => ({ ...prev, current: nextGuide }));
			return;
		}

		onclickFunction(event);
		setInfoBanner((prev) => ({ ...prev, current: prevGuide }));
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
						const { label, name, onclickFunction, ...restProps } = item;

						return (
							<Button
								key={name}
								{...restProps}
								onClick={(event) => onButtonClick({ name, onclickFunction, event })}
							>
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
