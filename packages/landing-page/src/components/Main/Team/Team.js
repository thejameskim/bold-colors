import React from 'react';
import './Team.css';
import { ColorifiedImg } from '../../ColorifiedImg/ColorifiedImg';
import * as william from '../../../assets/will-color.png';
import * as williamOutline from '../../../assets/will-outline.png';
import * as james from '../../../assets/james-color.png';
import * as jamesOutline from '../../../assets/james-outline.png';
import * as allison from '../../../assets/allison-color.png';
import * as allisonOutline from '../../../assets/allison-outline.png';
import * as elisa from '../../../assets/elisa-color.png';
import * as elisaOutline from '../../../assets/elisa-outline.png';
import { CustomFade } from '../../CustomFade/CustomFade';

const TEAM_MEMBERS = [
	{
		name: "James Kim",
		role: "Software Engineer / Product Manager",
		image: james,
		outline: jamesOutline,
		website: "https://jameskim.me/"
	},
	{
		name: "William Kwok",
		role: "Software Engineer",
		image: william,
		outline: williamOutline,
		website: "https://williamk.info/?q=bold_colors"
	},
	{
		name: "Allison Lee",
		role: "Software Engineer",
		image: allison,
		outline: allisonOutline,
		website: "https://www.linkedin.com/in/allison20"
	},
	{
		name: "Elisa Truong",
		role: "Designer / Software Engineer",
		image: elisa,
		outline: elisaOutline,
		website: "https://www.linkedin.com/in/elisa-truong"
	}
];

export function Team() {
	return <div className="team" id="team">
		<div className="team-inner">
			<div className="team-content">
				<div className="team-header">
					<h1>Meet the Team</h1>
					<h3>The men and women behind bold colors</h3>
				</div>
				<CustomFade>
					<div className="team-images">
						{TEAM_MEMBERS.map(member => <TeamPerson {...member} />)}
					</div>
				</CustomFade>
			</div>
		</div>
	</div>
}

function TeamPerson({ name, image, outline, role, website }) {
	return <div className="team-person-container">
		<TeamImage name={name} image={image} outline={outline} />
		<h3 id="team-person"><a href={website} rel="noopener noreferrer" target="_blank">{name}</a></h3>
		<p>{role}</p>
	</div>
}

function TeamImage({ name, image, outline }) {
	return <div class="team-image-container">
		<div class="team-image"><ColorifiedImg src={image} alt={name} /></div>
		<div class="team-image"><img src={outline} alt={""} /></div>
	</div>
}