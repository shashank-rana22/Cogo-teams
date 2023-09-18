import { cl } from '@cogoport/components';
import { L } from '@cogoport/maps';
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

// eslint-disable-next-line custom-eslint/import-from-react
import '../../../libs/motion';

import { getIcon, getLatLng } from '../../../utils/getMapFn';

import styles from './styles.module.css';

const getAnimationOptions = ({ path = [], icon }) => [
	path,
	{
		opacity     : 0,
		fillOpacity : 0,
		weight      : 0.2,
	},
	{
		auto: false,
		duration:
           8000,
		easing: L.Motion.Ease.easeInOutQuart,
	},
	{
		removeOnEnd: true,
		icon,
	},
];
const TWENTY = 20;
const TWELVE = 12;
const TEN = 10;
const getMapDivIcon = (
	SvgIcon,
	className,
	iconSize = [TWENTY, TWENTY],
	iconAnchor = [TEN, TWELVE],
	...rest
) => new L.DivIcon({
	html: ReactDOMServer.renderToString(SvgIcon),
	iconSize,
	iconAnchor,
	className,
	...rest,
});

function useAnimatedRoute({ map, path, transportMode }) {
	const { origin, dest } = getLatLng({
		route : path,
		src   : 'icon',
	});
	const rotate = origin > dest && transportMode === 'air';

	const Icon = getIcon({ type: transportMode, origin, dest });

	const sequence = L.motion.polyline(...getAnimationOptions(
		{
			path,
			icon: getMapDivIcon(
				<div className={styles.container}>
					<Icon className={cl`${styles[`${transportMode}_icon`]} ${rotate && styles.rotate_icon}`} />
				</div>,
			),
		},
	));

	useEffect(() => {
		if (map) {
			sequence?.addTo(map);
			sequence?.motionStart();
		}
		return () => {
			if (map) {
				map?.removeLayer(sequence);
			}
		};
	}, [map, sequence]);

	return (
		null);
}

export default useAnimatedRoute;
