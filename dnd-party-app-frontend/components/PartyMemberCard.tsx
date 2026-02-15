// StAuth10222: I Adoria Stevens, 000754661 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { PartyMember } from '@/types/PartyMember';
import HitPointsManager from './HitPointsManager';
import styles from './PartyMemberCard.module.css';

interface PartyMemberCardProps {
  member: PartyMember;
}

export default function PartyMemberCard({ member }: PartyMemberCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <span className={styles.memberLevel}>Level {member.level}</span>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.infoSection}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Class:</span>
            <span className={styles.infoValue}>{member.class}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Race:</span>
            <span className={styles.infoValue}>{member.race}</span>
          </div>
        </div>

        {/* Client component handles HP display and updates */}
        <HitPointsManager 
          memberId={member.id} 
          initialHitPoints={member.hit_points} 
        />
      </div>
    </div>
  );
}