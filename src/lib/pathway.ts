// Grade bands shown in the program finder. Values are stable IDs; labels live in the component.
//   'k-6'   → Grades K–4 (Jr. Flyers only)
//   '10-12' → Grades 5–6 (Jr. Flyers or Flyers Enduro)
//   '7-8'   → Grades 7–8
//   '9-12'  → Grades 9–12
export type AgeBand = 'k-6' | '10-12' | '7-8' | '9-12';
export type RidingFocus = 'fundamentals' | 'endurance' | 'gravity' | 'nica-offseason';
export type ProgramSlug = 'xc' | 'enduro' | 'jr-flyers';

/** Registration fee per program, read from the program content collection (e.g. "$50"). */
export type ProgramFees = Record<ProgramSlug, string>;

export interface PathwayRecommendation {
  primaryProgram: ProgramSlug;
  secondaryProgram?: ProgramSlug;
  headline: string;
  explanation: string;
  feeNote: string;
  nicaNote: string;
}

const COVERS = 'covers a club t-shirt and rider insurance';

export function matchProgramPathway(
  ageBand: AgeBand,
  focus: RidingFocus,
  fees: ProgramFees,
): PathwayRecommendation {
  if (ageBand === 'k-6') {
    if (focus === 'gravity') {
      return {
        primaryProgram: 'jr-flyers',
        secondaryProgram: 'enduro',
        headline: 'Start with Jr. Flyers',
        explanation:
          'Jr. Flyers (June–August) builds the braking, cornering, and balance skills every descender needs. Flyers Enduro opens up in 5th grade, so it’s a good one to plan for.',
        feeNote: `Jr. Flyers registration is ${fees['jr-flyers']} and ${COVERS}.`,
        nicaNote: 'Years of trail confidence before middle school and NICA.',
      };
    }

    return {
      primaryProgram: 'jr-flyers',
      headline: 'Start with Jr. Flyers',
      explanation:
        'Jr. Flyers is a summer program (June–August) for kids who can ride a two-wheeler. Small groups play skill games, learn to brake and shift, and ride beginner singletrack together.',
      feeNote: `Registration is ${fees['jr-flyers']} and ${COVERS}.`,
      nicaNote: 'A fun first step before Flyers XC, Flyers Enduro, or a middle school NICA team.',
    };
  }

  if (ageBand === '10-12') {
    if (focus === 'fundamentals') {
      return {
        primaryProgram: 'jr-flyers',
        secondaryProgram: 'enduro',
        headline: 'Start with Jr. Flyers',
        explanation:
          'If your rider is still building trail basics, Jr. Flyers is a relaxed place to do it. Once they’re comfortable on intermediate trails, Flyers Enduro is open to 5th and 6th graders too.',
        feeNote: `Jr. Flyers is ${fees['jr-flyers']} and Flyers Enduro is ${fees.enduro}. Each ${COVERS}.`,
        nicaNote: 'Good preparation for Flyers XC and NICA, which start in 7th grade.',
      };
    }

    return {
      primaryProgram: 'enduro',
      secondaryProgram: 'jr-flyers',
      headline: 'Try Flyers Enduro',
      explanation:
        'For 5th and 6th graders who already ride singletrack with confidence. Flyers Enduro (January–August) coaches braking, cornering, drops, and line choice, with optional enduro races.',
      feeNote: `Registration is ${fees.enduro} and ${COVERS}.`,
      nicaNote: 'Strong bike handling helps riders when they join Flyers XC or NICA in 7th grade.',
    };
  }

  // Grades 7–8 or 9–12
  if (focus === 'gravity') {
    return {
      primaryProgram: 'enduro',
      secondaryProgram: 'xc',
      headline: 'Try Flyers Enduro',
      explanation:
        'Flyers Enduro (January–August) is for riders who love technical descents: bike setup, line choice, track walks, and support at enduro races. Some riders add Flyers XC to keep their climbing fitness up.',
      feeNote: `Flyers Enduro is ${fees.enduro}, and adding Flyers XC is ${fees.xc}. Each ${COVERS}.`,
      nicaNote: 'Better descending skills carry straight into fall NICA racing.',
    };
  }

  if (focus === 'nica-offseason') {
    return {
      primaryProgram: 'xc',
      secondaryProgram: 'enduro',
      headline: 'Try Flyers XC',
      explanation:
        'Flyers XC rides once a week in winter, once or twice a week in spring, and on select summer Saturdays. It’s scheduled around the fall NICA season so riders stay fit and sharp all year.',
      feeNote: `Registration is ${fees.xc} and ${COVERS}.`,
      nicaNote: 'Designed to fit alongside your fall school team, not replace it.',
    };
  }

  return {
    primaryProgram: 'xc',
    secondaryProgram: focus === 'endurance' ? 'enduro' : undefined,
    headline: 'Try Flyers XC',
    explanation:
      'Riders are grouped by pace and skill, so newer riders building trail confidence and experienced racers both have a place. Racing is optional.',
    feeNote: `Registration is ${fees.xc} and ${COVERS}.`,
    nicaNote: 'Winter-to-summer riding that fits around your fall school team.',
  };
}
