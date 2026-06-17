"use client";

import { useState, type ReactNode } from "react";
import { FaBehance, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  note?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
};

const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Chief Idoko",
    role: "Family blessing",
    note: "Receives guests on behalf of the family.",
  },
  {
    id: "2",
    name: "Mercy’s Ladies",
    role: "Bridal party",
    note: "The softness, the laughter, the first dance circle.",
    social: { instagram: "#" },
  },
  {
    id: "3",
    name: "Idoko’s Men",
    role: "Groomsmen",
    note: "Keeping the groom calm, sharp, and on time.",
  },
  {
    id: "4",
    name: "The Planner",
    role: "Guest concierge",
    note: "Directions, timing, questions, and calm logistics.",
    social: { instagram: "#" },
  },
  {
    id: "5",
    name: "Lens & Light",
    role: "Photo + film",
    note: "Capturing the day as a memory room after the wedding.",
    social: { instagram: "#", behance: "#" },
  },
  {
    id: "6",
    name: "Glam Room",
    role: "Makeup + styling",
    note: "Details, fabric, glow, and the final mirror moment.",
    social: { instagram: "#" },
  },
];

type TeamShowcaseProps = {
  members?: TeamMember[];
};

export default function TeamShowcase({ members = defaultMembers }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, index) => index % 3 === 0);
  const col2 = members.filter((_, index) => index % 3 === 1);
  const col3 = members.filter((_, index) => index % 3 === 2);

  return (
    <div className="team-showcase">
      <div className="team-photo-grid" aria-label="Wedding circle photo grid">
        <div className="team-photo-column">
          {col1.map((member) => (
            <PhotoCard
              className="team-photo-card-large"
              hoveredId={hoveredId}
              key={member.id}
              member={member}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="team-photo-column team-photo-column-offset-deep">
          {col2.map((member) => (
            <PhotoCard
              className="team-photo-card-feature"
              hoveredId={hoveredId}
              key={member.id}
              member={member}
              onHover={setHoveredId}
            />
          ))}
        </div>

        <div className="team-photo-column team-photo-column-offset-soft">
          {col3.map((member) => (
            <PhotoCard
              className="team-photo-card-medium"
              hoveredId={hoveredId}
              key={member.id}
              member={member}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      <div className="team-member-list">
        {members.map((member) => (
          <MemberRow hoveredId={hoveredId} key={member.id} member={member} onHover={setHoveredId} />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <button
      className={cn("team-photo-card", className, isActive && "is-active", isDimmed && "is-dimmed")}
      onBlur={() => onHover(null)}
      onFocus={() => onHover(member.id)}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      type="button"
    >
      <span aria-hidden="true" className={`team-cartoon-portrait team-cartoon-portrait-${member.id}`}>
        <span className="team-cartoon-head" />
        <span className="team-cartoon-body" />
        <span className="team-cartoon-sparkle" />
      </span>
      <span className="team-photo-role">{member.role}</span>
    </button>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance;

  return (
    <article
      className={cn("team-member-row", isActive && "is-active", isDimmed && "is-dimmed")}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="team-member-heading">
        <span aria-hidden="true" />
        <h3>{member.name}</h3>
        {hasSocial && (
          <div className="team-socials">
            {member.social?.twitter && <SocialLink href={member.social.twitter} label="X / Twitter" icon={<FaTwitter />} />}
            {member.social?.linkedin && <SocialLink href={member.social.linkedin} label="LinkedIn" icon={<FaLinkedinIn />} />}
            {member.social?.instagram && <SocialLink href={member.social.instagram} label="Instagram" icon={<FaInstagram />} />}
            {member.social?.behance && <SocialLink href={member.social.behance} label="Behance" icon={<FaBehance />} />}
          </div>
        )}
      </div>
      <p className="team-role">{member.role}</p>
      {member.note && <p className="team-note">{member.note}</p>}
    </article>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a aria-label={label} href={href} onClick={(event) => event.stopPropagation()} rel="noopener noreferrer" target="_blank">
      {icon}
    </a>
  );
}
