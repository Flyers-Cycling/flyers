import { describe, expect, it } from 'vitest';
import { matchProgramPathway } from '../../src/lib/pathway';

describe('matchProgramPathway', () => {
  it('recommends Jr. Flyers for K-6 riders focused on fundamentals', () => {
    const match = matchProgramPathway('k-6', 'fundamentals');
    expect(match.primaryProgram).toBe('jr-flyers');
    expect(match.secondaryProgram).toBeUndefined();
    expect(match.feeNote).toContain('$50');
  });

  it('includes Enduro as a secondary option for K-6 gravity riders (ages 10+)', () => {
    const match = matchProgramPathway('k-6', 'gravity');
    expect(match.primaryProgram).toBe('jr-flyers');
    expect(match.secondaryProgram).toBe('enduro');
  });

  it('recommends Flyers Enduro for ages 10-12 ready for technical trails', () => {
    const match = matchProgramPathway('10-12', 'gravity');
    expect(match.primaryProgram).toBe('enduro');
    expect(match.feeNote).toContain('$150');
  });

  it('recommends Flyers XC for grades 7-12 seeking NICA off-season synergy', () => {
    const match = matchProgramPathway('9-12', 'nica-offseason');
    expect(match.primaryProgram).toBe('xc');
    expect(match.secondaryProgram).toBe('enduro');
    expect(match.nicaNote).toContain('Skyridge');
    expect(match.nicaNote).toContain('Lone Peak');
  });

  it('recommends Flyers Enduro with XC secondary for high school gravity riders', () => {
    const match = matchProgramPathway('9-12', 'gravity');
    expect(match.primaryProgram).toBe('enduro');
    expect(match.secondaryProgram).toBe('xc');
  });
});
