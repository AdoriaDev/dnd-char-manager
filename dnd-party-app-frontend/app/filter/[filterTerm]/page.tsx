import Link from 'next/link';
import { PartyMember } from '@/types/PartyMember';
import PartyMemberCard from '@/components/PartyMemberCard';
import styles from './filter.module.css';

async function getFilteredMembers(filterTerm: string): Promise<PartyMember[]> {
  let url = 'http://localhost:4000/members';
  
  // Add filter parameter if not 'all'
  if (filterTerm && filterTerm !== 'all') {
    url += `?filter=${filterTerm}`;
  }
  
  const response = await fetch(url, {
    cache: 'no-store' // Always fetch fresh data
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch party members');
  }
  
  return response.json();
}

export default async function FilterPage({ 
  params 
}: { 
  params: Promise<{ filterTerm: string }> 
}) {
  const { filterTerm } = await params;
  const partyMembers = await getFilteredMembers(filterTerm);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {filterTerm === 'all' ? 'All Party Members' : `${filterTerm}s`}
      </h1>
      
      {/* Filter Navigation */}
      <nav className={styles.filterNav}>
        <Link 
          href="/filter/all"
          className={`${styles.filterLink} ${filterTerm === 'all' ? styles.active : ''}`}
        >
          All Classes
        </Link>
        <Link 
          href="/filter/Wizard"
          className={`${styles.filterLink} ${filterTerm === 'Wizard' ? styles.active : ''}`}
        >
          Wizards
        </Link>
        <Link 
          href="/filter/Fighter"
          className={`${styles.filterLink} ${filterTerm === 'Fighter' ? styles.active : ''}`}
        >
          Fighters
        </Link>
        <Link 
          href="/filter/Rogue"
          className={`${styles.filterLink} ${filterTerm === 'Rogue' ? styles.active : ''}`}
        >
          Rogues
        </Link>
        <Link 
          href="/filter/Cleric"
          className={`${styles.filterLink} ${filterTerm === 'Cleric' ? styles.active : ''}`}
        >
          Clerics
        </Link>
      </nav>

      {/* Display filtered members */}
      <div className={styles.membersSection}>
        {partyMembers.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No {filterTerm === 'all' ? 'party members' : filterTerm + 's'} found.</p>
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