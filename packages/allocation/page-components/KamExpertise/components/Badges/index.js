import CreateBadge from './CreateBadge';
import CreateBadgeV2 from './CreateBadgeV2';
import ViewBadges from './ViewBadges';

function Badges() {
	return (
		<div>
			<CreateBadge />

			<ViewBadges />

			<CreateBadgeV2 />
		</div>
	);
}

export default Badges;
