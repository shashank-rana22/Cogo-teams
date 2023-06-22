import React from 'react';

import styles from './styles.module.css';

function ServiceItem({ data = {}, selectedService, setSelectedService, setSelectedMode }) {
	const { label, value, icon:Icon } = data;

	const handleClick = () => {
		if (selectedService === value) setSelectedService(null);
		else setSelectedService(value);
		setSelectedMode({});
	};

	return (
		<div
			className={`${styles.container} ${selectedService !== value && styles.top_border}`}
			style={{
				background: selectedService === value ? '#FCDC00' : '#FFFFFF',
			}}
			key={value}
			onClick={handleClick}
			role="presentation"
		>
			<div className={styles.img_container}>

				{selectedService === value ? null : (
					<div className={`${styles.yellow_circle}`} />
				)}

				<Icon className={`${styles.icon} ${selectedService !== value && styles.icon_hover}`} />
			</div>
			<div
				className={styles.label}
				style={{ fontWeight: selectedService === value ? 600 : 500 }}
			>
				{label}
			</div>
		</div>
	);
}

export default ServiceItem;
