'use client';

import { useState } from 'react';
import styles from './HitPointsManager.module.css';

interface HitPointsManagerProps {
  memberId: number;
  initialHitPoints: number;
}

export default function HitPointsManager({ memberId, initialHitPoints }: HitPointsManagerProps) {
  const [hitPoints, setHitPoints] = useState(initialHitPoints);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateHitPoints = async (newHitPoints: number) => {
    console.log("New hit points: " + newHitPoints);
    if (newHitPoints < 0) return;

    setIsUpdating(true);
    
    try {
      const response = await fetch(`http://localhost:4000/members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hit_points: newHitPoints
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update hit points');
      }

      setHitPoints(newHitPoints);
    } catch (error) {
      console.error('Error updating hit points:', error);
      alert('Failed to update hit points');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIncrease = () => {
    updateHitPoints(hitPoints + 1);
  };

  const handleDecrease = () => {
    updateHitPoints(hitPoints - 1);
  };

  const handleDamage = () => {
    updateHitPoints(hitPoints - 5);
  };

  const handleHeal = () => {
    updateHitPoints(hitPoints + 5);
  };

  return (
    <div className={styles.hpManager}>
      <div className={styles.hpDisplay}>
        <span className={styles.hpLabel}>HP:</span>
        <span className={`${styles.hpValue} ${hitPoints <= 10 ? styles.lowHp : ''}`}>
          {hitPoints}
        </span>
      </div>
      
      <div className={styles.hpControls}>
        <button
          onClick={handleDecrease}
          disabled={isUpdating || hitPoints <= 0}
          className={styles.btnSmall}
          title="Decrease by 1"
        >
          -1
        </button>
        
        <button
          onClick={handleDamage}
          disabled={isUpdating || hitPoints <= 0}
          className={styles.btnDamage}
          title="Take 5 damage"
        >
          -5
        </button>
        
        <button
          onClick={handleHeal}
          disabled={isUpdating}
          className={styles.btnHeal}
          title="Heal 5 HP"
        >
          +5
        </button>
        
        <button
          onClick={handleIncrease}
          disabled={isUpdating}
          className={styles.btnSmall}
          title="Increase by 1"
        >
          +1
        </button>
      </div>
    </div>
  );
}