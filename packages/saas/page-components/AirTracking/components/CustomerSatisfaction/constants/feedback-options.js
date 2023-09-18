export const feedbackMapping = ({ t }) => ({
	1: [
		{
			children : t('common:csat_poor_service_quality'),
			key      : 'poor_service_quality',
		},
		{
			children : t('common:csat_late_or_missed_deliveries'),
			key      : 'late_or_missed_deliveries',
		},
		{
			children : t('common:csat_rude_or_unhelpful_customer_support'),
			key      : 'rude_or_unhelpful_customer_support',
		},
		{
			children : t('common:csat_damaged_or_lost_items'),
			key      : 'damaged_or_lost_items',
		},
	],
	2: [
		{
			children : t('common:csat_significant_room_for_improvement'),
			key      : 'significant_room_for_improvement',
		},
		{
			children : t('common:csat_frequent_errors_in_order_processing'),
			key      : 'frequent_errors_in_order_processing',
		},
		{
			children : t('common:csat_difficulty_in_tracking_shipments'),
			key      : 'difficulty_in_tracking_shipments',
		},
		{
			children : t('common:csat_unmet_expectations'),
			key      : 'unmet_expectations',
		},
	],
	3: [
		{
			children : t('common:csat_mediocre_experience'),
			key      : 'mediocre_experience',
		},
		{
			children : t('common:csat_inconsistent_service'),
			key      : 'inconsistent_service',
		},
		{
			children : t('common:csat_average_delivery_times'),
			key      : 'average_delivery_times',
		},
		{
			children : t('common:csat_needs_improvement_in_several_areas'),
			key      : 'needs_improvement_in_several_areas',
		},
	],
	4: [
		{
			children : t('common:csat_slightly_below_expectations'),
			key      : 'slightly_below_expectations',
		},
		{
			children : t('common:csat_some_aspects_of_service_were_good'),
			key      : 'some_aspects_of_service_were_good',
		},
		{
			children : t('common:csat_room_for_enhancement_in_certain_areas'),
			key      : 'room_for_enhancement_in_certain_areas',
		},
		{
			children : t('common:csat_neutral_experience'),
			key      : 'neutral_experience',
		},
	],
	5: [
		{
			children : t('common:csat_neutral_opinion'),
			key      : 'neutral_opinion',
		},
		{
			children : t('common:csat_neither_satisfied_nor_dissatisfied'),
			key      : 'neither_satisfied_nor_dissatisfied',
		},
		{
			children : t('common:csat_adequate_service_quality'),
			key      : 'adequate_service_quality',
		},
		{
			children : t('common:csat_nothing_particularly_impressive_or_disappointing'),
			key      : 'nothing_particularly_impressive_or_disappointing',
		},
	],
});
