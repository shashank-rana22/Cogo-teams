import BadgeDescription from './BadgeDescription';
import BadgesList from './BadgesList';
import ProfileBadgeCard from './ProfileBadgeCard';

function ViewBadges() {
	return (
		<>
			<BadgeDescription />

			<div style={{ height: '100px', width: '100px' }} />

			<BadgesList />

			<ProfileBadgeCard />
		</>
	);
}

export default ViewBadges;
