import { Placeholder } from '@cogoport/components';
import React, { useEffect, useCallback } from 'react';

import RenderRibbon from '../RenderRibbon';
import styles from '../styles.module.css';

import getValue from './getValue';

function CardItem({
	fields,
	singleitem,
	functions = {},
	loading = false,
	isMobile = false,
	isOpen = '',
	Child = () => {},
	setViewDoc = () => {},
	setItem = () => {},
	listAPI = () => {},
	edit = false,
	setEdit = () => {},
	setGenerate = () => {},
}) {
	const expirationTime = new Date(singleitem.scheduleDeparture).getTime();
	const showTime = useCallback(() => {
		let formatted = {
			days    : 0,
			hours   : '00',
			minutes : '00',
			seconds : '00',
		};

		if (singleitem.scheduleDeparture) {
			const currentTime = new Date().getTime();
			const distanceToDate = expirationTime - currentTime;
			const days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24)) || '0';
			const h = Math.abs(Math.floor((distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) || 0;
			const m = Math.abs(Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60))) || 0;
			const s = Math.abs(Math.floor((distanceToDate % (1000 * 60)) / 1000)) || 0;

			let hours = '';
			if (h > 0 && h < 10) {
				hours = `0${h}`;
			} else if (h > 9 && h < 24) {
				hours = h;
			} else {
				hours = '00';
			}

			let minutes = '';
			if (m > 0 && m < 10) {
				minutes = `0${m}`;
			} else if (m > 9 && m < 59) {
				minutes = m;
			} else {
				minutes = '00';
			}

			let seconds = '';
			if (s > 0 && s < 10) {
				seconds = `0${s}`;
			} else if (s > 9 && s < 59) {
				seconds = s;
			} else {
				seconds = '00';
			}

			formatted = {
				days,
				hours,
				minutes,
				seconds,
			};
		}
		const element = document.getElementById(`scheduleDeparture-${singleitem.id}`);
		if (element) {
			if (formatted?.days < 0) {
				element.innerHTML = 'FLIGHT DEPARTED';
				element.style.color = '#EE3425';
				element.style.fontWeight = '800';
			} else {
				element.innerHTML = `${formatted?.days}d 
			${formatted?.hours}:${formatted?.minutes}:${formatted?.seconds} Hrs`;
			}
		}
	}, [expirationTime, singleitem.id, singleitem.scheduleDeparture]);

	useEffect(() => {
		let interval = null;
		interval = setInterval(() => {
			showTime();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [showTime, singleitem.scheduleDeparture]);

	return (
		<div>
			<section
				className={styles.list_container}
				style={{
					'--open-margin': isOpen ? 0 : '16px',
				}}
			>
				<div
					className={`${styles.row} ${
						isMobile ? styles.is_mobile : ''
					}`}
				>
					{fields.map((field) => {
						const itemStyle = field.styles || {};
						return (
							<div
								className={`${styles.col} ${field.className || ''} ${
									isMobile ? styles.is_mobile : ''
								}`}
								style={{
									'--span': (field.span || 1),
									...itemStyle,
								}}
								key={field.key}
							>
								{isMobile && (
									<div className={styles.tablelabel}>{field.label}</div>
								)}

								{loading ? <Placeholder />
									: (
										<div
											className={styles.flex}
											id={field.key
												=== 'scheduleDeparture' && `scheduleDeparture-${singleitem.id}`}
										>
											{field.render ? field.render(singleitem) : getValue(
												singleitem,
												field,
												functions,
												'-',
											)}
										</div>
									)}

							</div>
						);
					})}
				</div>
				<RenderRibbon item={singleitem} />
			</section>
			{isOpen === singleitem.id && (
				<Child
					data={singleitem}
					setViewDoc={setViewDoc}
					setItem={setItem}
					listAPI={listAPI}
					edit={edit}
					setEdit={setEdit}
					setGenerate={setGenerate}
				/>
			)}
		</div>
	);
}

export default CardItem;