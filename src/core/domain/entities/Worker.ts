// ===== DOMAIN ENTITIES =====

import type { WorkerSkill } from "../../types";

/**
 * Worker Entity - Core business entity
 * Follows Domain-Driven Design principles
 */
export class Worker {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly avatar: string,
    public readonly city: string,
    public readonly country: string,
    public readonly skills: WorkerSkill[],
    public readonly verifiedSkills: WorkerSkill[],
    public readonly humanVerified: boolean,
    public readonly rating: number,
    public readonly reviews: number,
    public readonly completedWork: number,
    public readonly expectedRate: number,
    public readonly currency: string,
    public readonly languages: string[],
    public readonly availableNow: boolean,
    public readonly bio: string,
    public readonly joinedYear: number,
    public readonly responseTime: string,
    public readonly distanceKm?: number,
    public readonly nextAvailable?: string
  ) {}

  /**
   * Factory method to create a Worker
   */
  static create(data: WorkerData): Worker {
    // Validation
    if (!data.id || !data.name || !data.skills.length) {
      throw new Error("Invalid worker data");
    }

    if (data.rating < 0 || data.rating > 5) {
      throw new Error("Rating must be between 0 and 5");
    }

    return new Worker(
      data.id,
      data.name,
      data.avatar,
      data.city,
      data.country,
      data.skills,
      data.verifiedSkills,
      data.humanVerified,
      data.rating,
      data.reviews,
      data.completedWork,
      data.expectedRate,
      data.currency,
      data.languages,
      data.availableNow,
      data.bio,
      data.joinedYear,
      data.responseTime,
      data.distanceKm,
      data.nextAvailable
    );
  }

  /**
   * Check if worker is verified
   */
  isVerified(): boolean {
    return this.humanVerified && this.verifiedSkills.length > 0;
  }

  /**
   * Check if worker has specific skill
   */
  hasSkill(skill: WorkerSkill): boolean {
    return this.skills.includes(skill);
  }

  /**
   * Check if worker speaks a language
   */
  speaksLanguage(language: string): boolean {
    return this.languages.includes(language);
  }

  /**
   * Calculate trust score based on rating and reviews
   */
  getTrustScore(): number {
    const ratingWeight = 0.7;
    const reviewWeight = 0.3;
    const normalizedReviews = Math.min(this.reviews / 100, 1);
    
    return (this.rating * ratingWeight) + (normalizedReviews * reviewWeight * 5);
  }

  /**
   * Convert to plain object
   */
  toJSON(): WorkerData {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      city: this.city,
      country: this.country,
      skills: this.skills,
      verifiedSkills: this.verifiedSkills,
      humanVerified: this.humanVerified,
      rating: this.rating,
      reviews: this.reviews,
      completedWork: this.completedWork,
      expectedRate: this.expectedRate,
      currency: this.currency,
      languages: this.languages,
      availableNow: this.availableNow,
      bio: this.bio,
      joinedYear: this.joinedYear,
      responseTime: this.responseTime,
      distanceKm: this.distanceKm,
      nextAvailable: this.nextAvailable,
    };
  }
}

// ===== DATA TRANSFER OBJECT =====

export interface WorkerData {
  id: string;
  name: string;
  avatar: string;
  city: string;
  country: string;
  skills: WorkerSkill[];
  verifiedSkills: WorkerSkill[];
  humanVerified: boolean;
  rating: number;
  reviews: number;
  completedWork: number;
  expectedRate: number;
  currency: string;
  languages: string[];
  availableNow: boolean;
  bio: string;
  joinedYear: number;
  responseTime: string;
  distanceKm?: number;
  nextAvailable?: string;
}
