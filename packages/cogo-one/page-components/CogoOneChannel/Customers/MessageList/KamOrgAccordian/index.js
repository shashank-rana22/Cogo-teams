import KamUserContactCard from '../KamUserContactCard';

function KamOrgAccordian({
	getOrganizationUsers,
	formattedOrgUsersList,
	openOrgAccordian,
	item,
}) {
	console.log(
		'item',
		item,
		getOrganizationUsers,
		formattedOrgUsersList,
		openOrgAccordian,
	);
	return (
		<div>
			<KamUserContactCard />
		</div>
	);
}

export default KamOrgAccordian;
