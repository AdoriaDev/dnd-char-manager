'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PartyMemberForm.module.css';

interface FormErrors {
  name?: string;
  class?: string;
  race?: string;
  level?: string;
  hitPoints?: string;
}

export default function PartyMemberForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    race: '',
    level: '',
    hitPoints: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation 1: Name is required and must be at least 2 characters
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    // Validation 2: Class is required
    if (!formData.class) {
      newErrors.class = 'Class is required';
    }

    // Validation 3: Race is required
    if (!formData.race) {
      newErrors.race = 'Race is required';
    }

    // Validation 4: Level must be a number between 1 and 20
    const levelNum = parseInt(formData.level);
    if (!formData.level) {
      newErrors.level = 'Level is required';
    } else if (isNaN(levelNum)) {
      newErrors.level = 'Level must be a number';
    } else if (levelNum < 1 || levelNum > 20) {
      newErrors.level = 'Level must be between 1 and 20';
    }

    // Validation 5: Hit Points must be a positive number
    const hpNum = parseInt(formData.hitPoints);
    if (!formData.hitPoints) {
      newErrors.hitPoints = 'Hit Points are required';
    } else if (isNaN(hpNum)) {
      newErrors.hitPoints = 'Hit Points must be a number';
    } else if (hpNum < 1) {
      newErrors.hitPoints = 'Hit Points must be at least 1';
    } else if (hpNum > 999) {
      newErrors.hitPoints = 'Hit Points cannot exceed 999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitSuccess(false);

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:4000/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          class: formData.class,
          race: formData.race,
          level: parseInt(formData.level),
          hitPoints: parseInt(formData.hitPoints)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add party member');
      }

      // Success! Clear form and show success message
      setFormData({
        name: '',
        class: '',
        race: '',
        level: '',
        hitPoints: ''
      });
      setSubmitSuccess(true);
      
      // Refresh the server component to show the new member
      router.refresh();

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);

    } catch (error) {
      console.error('Error adding party member:', error);
      setErrors({ name: 'Failed to add party member. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeading}>Add New Party Member</h2>
      
      {submitSuccess && (
        <div className={styles.successMessage}>
          Party member added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name Input */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Character Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Enter character name"
          />
          {errors.name && (
            <p className={styles.errorText}>{errors.name}</p>
          )}
        </div>

        {/* Class Select */}
        <div className={styles.formGroup}>
          <label htmlFor="class" className={styles.label}>
            Class *
          </label>
          <select
            id="class"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className={`${styles.select} ${errors.class ? styles.inputError : ''}`}
          >
            <option value="">Select a class</option>
            <option value="Barbarian">Barbarian</option>
            <option value="Bard">Bard</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Monk">Monk</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Rogue">Rogue</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
            <option value="Wizard">Wizard</option>
          </select>
          {errors.class && (
            <p className={styles.errorText}>{errors.class}</p>
          )}
        </div>

        {/* Race Select */}
        <div className={styles.formGroup}>
          <label htmlFor="race" className={styles.label}>
            Race *
          </label>
          <select
            id="race"
            name="race"
            value={formData.race}
            onChange={handleInputChange}
            className={`${styles.select} ${errors.race ? styles.inputError : ''}`}
          >
            <option value="">Select a race</option>
            <option value="Human">Human</option>
            <option value="Elf">Elf</option>
            <option value="Dwarf">Dwarf</option>
            <option value="Halfling">Halfling</option>
            <option value="Dragonborn">Dragonborn</option>
            <option value="Gnome">Gnome</option>
            <option value="Half-Elf">Half-Elf</option>
            <option value="Half-Orc">Half-Orc</option>
            <option value="Tiefling">Tiefling</option>
          </select>
          {errors.race && (
            <p className={styles.errorText}>{errors.race}</p>
          )}
        </div>

        {/* Level Input */}
        <div className={styles.formGroup}>
          <label htmlFor="level" className={styles.label}>
            Level (1-20) *
          </label>
          <input
            type="number"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            min="1"
            max="20"
            className={`${styles.input} ${errors.level ? styles.inputError : ''}`}
            placeholder="1"
          />
          {errors.level && (
            <p className={styles.errorText}>{errors.level}</p>
          )}
        </div>

        {/* Hit Points Input */}
        <div className={styles.formGroup}>
          <label htmlFor="hitPoints" className={styles.label}>
            Hit Points *
          </label>
          <input
            type="number"
            id="hitPoints"
            name="hitPoints"
            value={formData.hitPoints}
            onChange={handleInputChange}
            min="1"
            max="999"
            className={`${styles.input} ${errors.hitPoints ? styles.inputError : ''}`}
            placeholder="10"
          />
          {errors.hitPoints && (
            <p className={styles.errorText}>{errors.hitPoints}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
        >
          {isSubmitting ? 'Adding...' : 'Add Party Member'}
        </button>
      </form>
    </div>
  );
}