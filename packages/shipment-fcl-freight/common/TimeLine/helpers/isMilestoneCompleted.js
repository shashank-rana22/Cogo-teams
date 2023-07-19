import setDateHours from '@cogoport/core/helpers/setDateHours';

const ICD_MILESTONES_TO_SHOW_COMPLETED = ['Container Departed From ICD', 'Container Arrived At destination ICD'];

export default function isMileStoneCompleted({ consecutivelyCompleted = false, timelineItem = {} }) {
	const { milestone, completed_on } = timelineItem || {};

	let isMilestoneComplete = !!completed_on
		|| ICD_MILESTONES_TO_SHOW_COMPLETED.includes(milestone);

	if (isMilestoneComplete) {
		const todayEnd = setDateHours({ date: new Date(), time: '23,59,59,999' });
		isMilestoneComplete = new Date(completed_on) < todayEnd;
	}

	const consecutiveComplete = consecutivelyCompleted && isMilestoneComplete;

	return {
		consecutivelyCompleted : consecutiveComplete,
		isCompleted            : isMilestoneComplete,
	};
}
