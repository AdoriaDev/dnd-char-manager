import { PartyMember } from '@/types/PartyMember';
import PartyMemberCard from '@/components/PartyMemberCard';
import PartyMemberForm from '@/components/PartyMemberForm';
import styles from './home.module.css';

async function getPartyMembers(): Promise<PartyMember[]> {
  const response = await fetch('http://localhost:4000/members', {
    cache: 'no-store' // Always fetch fresh data
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch party members');
  }
  
  return response.json();
}

export default async function Home() {
  const partyMembers = await getPartyMembers();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>D&D Party Manager</h1>
      
      {/* Form for adding new members */}
      <div className={styles.formSection}>
        <PartyMemberForm />
      </div>

      {/* Display all party members */}
      <div className={styles.membersSection}>
        <h2 className={styles.sectionHeading}>Current Party Members</h2>
        
        {partyMembers.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No party members yet. Add your first adventurer above!</p>
          </div>
        ) : (
          <div className={styles.memberGrid}>
            {partyMembers.map((member: PartyMember) => (
              <PartyMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}