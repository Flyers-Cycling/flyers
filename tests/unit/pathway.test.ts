import { describe, expect, it } from 'vitest';
import { matchProgramPathway, type ProgramFees } from '../../src/lib/pathway';

const fees: ProgramFees = { xc: '$50', enduro: '$150', 'jr-flyers': '$50' };

describe('matchProgramPathway', () => {
  it('recommends Jr. Flyers for K–4 riders focused on fundamentals', () => {
    const match = matchProgramPathway('k-6', 'fundamentals', fees);
    expect(match.primaryProgram).toBe('jr-flyers');
    expect(match.secondaryProgram).toBeUndefined();
    expect(match.feeNote).toContain('$50');
  });

  it('points K–4 gravity riders to Jr. Flyers, with Enduro as the next step', () => {
    const match = matchProgramPathway('k-6', 'gravity', fees);
    expect(match.primaryProgram).toBe('jr-flyers');
    expect(match.secondaryProgram).toBe('enduro');
  });

  it('recommends Flyers Enduro for grades 5–6 ready for technical trails', () => {
    const match = matchProgramPathway('10-12', 'gravity', fees);
    expect(match.primaryProgram).toBe('enduro');
    expect(match.feeNote).toContain('$150');
  });

  it('recommends Flyers XC for grades 9–12 riding between NICA seasons', () => {
    const match = matchProgramPathway('9-12', 'nica-offseason', fees);
    expect(match.primaryProgram).toBe('xc');
    expect(match.secondaryProgram).toBe('enduro');
    expect(match.feeNote).toContain('$50');
    expect(match.nicaNote).toContain('school team');
  });

  it('recommends Flyers Enduro with XC secondary for high school gravity riders', () => {
    const match = matchProgramPathway('9-12', 'gravity', fees);
    expect(match.primaryProgram).toBe('enduro');
    expect(match.secondaryProgram).toBe('xc');
  });
});
