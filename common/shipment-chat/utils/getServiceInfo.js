import {
	IcCFfcl,
	IcCFlcl,
	IcCFair,
	IcMFlocalCharges,
	IcMFairport,
	IcCFairCustoms,
	IcCFftl,
	IcCFltl,
	IcMFtrailorFull,
	IcCFhaulage,
	IcCFfclCustoms,
	IcCFlclCustoms,
	IcMFcfs,
} from '@cogoport/icons-react';
import React, {
	useState,
	useEffect,
	useRef,
	cloneElement,
	isValidElement,
} from 'react';

import styles from './styles.module.css';

const propsMapping = {
	fcl_freight: {
		icon : <IcCFfcl />,
		text : 'FCL',
	},
	fcl_freight_local: {
		icon : <IcMFlocalCharges fill="#356EFD" />,
		text : 'FCL Local',
	},
	lcl_freight: {
		icon : <IcCFlcl />,
		text : 'LCL',
	},
	lcl_freight_local: {
		icon : <IcMFlocalCharges fill="#66ACF7" />,
		text : 'LCL Local',
	},
	air_freight: {
		icon : <IcCFair />,
		text : 'AIR',
	},
	domestic_air_freight: {
		icon : <IcMFairport fill="#5936f0" />,
		text : 'Domestic AIR',
	},
	air_freight_local: {
		icon : <IcMFlocalCharges fill="#EF9B9B" />,
		text : 'AIR Local',
	},
	ftl_freight: {
		icon : <IcCFftl />,
		text : 'FTL',
	},
	ltl_freight: {
		icon : <IcCFltl />,
		text : 'LTL',
	},
	trailer_freight: {
		icon : <IcMFtrailorFull fill="#81C0AF" />,
		text : 'Trailer',
	},
	rail_domestic_freight: {
		icon : <IcCFhaulage fill="#81C0AF" />,
		text : 'RAIL',
	},
	haulage_freight: {
		icon : <IcCFhaulage />,
		text : 'Haulage',
	},
	fcl_customs: {
		icon : <IcCFfclCustoms />,
		text : 'FCL Customs',
	},
	lcl_customs: {
		icon : <IcCFlclCustoms />,
		text : 'LCL Customs',
	},
	air_customs: {
		icon : <IcCFairCustoms />,
		text : 'AIR Customs',
	},
	fcl_cfs: {
		icon : <IcMFcfs fill="#356EFD" />,
		text : 'FCL CFS',
	},
};

function IconWithText({ icon, text = '' }) {
	const iconContainer = useRef(null);
	const [fillColor, setFillColor] = useState(icon.props.fill);

	useEffect(() => {
		if (!fillColor) {
			const iconPath = iconContainer.current.querySelector('svg path');
			const fillAttribute = iconPath.getAttribute('fill');

			if (fillAttribute) setFillColor(fillAttribute);
		}
	}, [fillColor]);

	return (
		<div className={`${styles.icon_container} service-info-icon-container`} ref={iconContainer}>
			{icon}
			{text ? (
				<div className={`${styles.icon_text} service-info-text`} style={{ color: fillColor }}>
					{text}
				</div>
			) : null}
		</div>
	);
}

export const getServiceInfo = (props) => {
	const { service, showText = true, iconProps = {} } = props || {};
	const { icon, text } = propsMapping[service] || {};

	const cloneIconProps = {
		width     : 28,
		height    : 28,
		className : 'service-info-icon',
		...(iconProps || {}),
	};

	const iconWithProps = isValidElement(icon)
		? cloneElement(icon, cloneIconProps)
		: null;

	const serviceIcon = iconWithProps ? (
		<IconWithText
			key={service}
			icon={iconWithProps}
			text={showText ? text : null}
		/>
	) : null;

	return { serviceIcon };
};
