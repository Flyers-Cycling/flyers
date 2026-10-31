export type AgeBand = 'k-6' | '10-12' | '7-8' | '9-12';
export type RidingFocus = 'fundamentals' | 'endurance' | 'gravity' | 'nica-offseason';
export type ProgramSlug = 'xc' | 'enduro' | 'jr-flyers';

export interface PathwayRecommendation {
  primaryProgram: ProgramSlug;
  secondaryProgram?: ProgramSlug;
  headline: string;
  explanation: string;
  feeNote: string;
  nicaNote: string;
}

export function matchProgramPathway(ageBand: AgeBand, focus: RidingFocus): PathwayRecommendation {
  if (ageBand === 'k-6') {
    if (focus === 'gravity') {
      return {
        primaryProgram: 'jr-flyers',
        secondaryProgram: 'enduro',
        headline: 'Start with Jr. Flyers (K–6) — or explore Flyers Enduro at ages 10–12',
        explanation:
          'Elementary riders build essential braking, cornering, and singletrack confidence in Jr. Flyers (June–August). Experienced 5th–6th graders (ages 10+) with full-suspension trail bikes can also evaluate Flyers Enduro.',
        feeNote:
          'Jr. Flyers is $50 and Flyers Enduro is $150 (covering rider t-shirt & insurance only; 100% volunteer-led).',
        nicaNote:
          'Gives young riders years of dirt confidence before joining local junior devo & NICA school squads.',
      };
    }

    return {
      primaryProgram: 'jr-flyers',
      headline: 'Recommended: Jr. Flyers (Grades K–6 Summer Program)',
      explanation:
        'Designed specifically for Kindergarten through 6th grade riders in Eagle Mountain and Northwest Utah County, focusing on skill games, safe braking/shifting, and fun summer singletrack pods.',
      feeNote:
        '$50 registration covers your Jr. Flyers t-shirt and rider insurance (all volunteer-led).',
      nicaNote:
        'Builds the foundation to step smoothly into Flyers XC, Flyers Enduro, and middle-school NICA.',
    };
  }

  if (ageBand === '10-12') {
    if (focus === 'fundamentals') {
      return {
        primaryProgram: 'jr-flyers',
        secondaryProgram: 'enduro',
        headline: 'Recommended: Jr. Flyers (K–6) with a pathway into Flyers Enduro',
        explanation:
          'For ages 10–12 still mastering dirt fundamentals, Jr. Flyers offers encouraging summer skill progression. Once comfortable on blue/black trails with disc brakes, Flyers Enduro opens gravity coaching starting at age 10.',
        feeNote: '$50 (Jr. Flyers) or $150 (Flyers Enduro) — covers t-shirt & insurance only.',
        nicaNote: 'Prepares 5th & 6th graders ahead of 7th-grade NICA and Flyers XC eligibility.',
      };
    }

    return {
      primaryProgram: 'enduro',
      secondaryProgram: 'jr-flyers',
      headline: 'Recommended: Flyers Enduro (Ages 10–19 Gravity Program)',
      explanation:
        'Riders ages 10–12 who already ride singletrack confidently can join Flyers Enduro (Jan–Aug) for structured coaching on technical descents, braking zones, drops, and regional enduro stages.',
      feeNote: '$150 registration covers your Flyers Enduro t-shirt and gravity rider insurance.',
      nicaNote:
        'Sharpens technical bike handling right before riders enter 7th–12th grade NICA and Flyers XC.',
    };
  }

  // Grades 7–8 or 9–12
  if (focus === 'gravity') {
    return {
      primaryProgram: 'enduro',
      secondaryProgram: 'xc',
      headline: 'Recommended: Flyers Enduro — optionally paired with Flyers XC',
      explanation:
        'Flyers Enduro (Jan–Aug) delivers dedicated gravity progression, suspension setup, track walks, and stage-race support across Utah. Many 7th–12th grade riders also ride Flyers XC to keep climbing fitness sharp.',
      feeNote:
        '$150 for Flyers Enduro ($50 if adding Flyers XC) — covers t-shirt & insurance; 100% volunteer-led.',
      nicaNote:
        'Pairs seamlessly with fall NICA racing at Westlake, Lehi, Cedar Valley, Skyridge, and Lone Peak.',
    };
  }

  if (focus === 'nica-offseason') {
    return {
      primaryProgram: 'xc',
      secondaryProgram: 'enduro',
      headline: 'Recommended: Flyers XC (Winter/Spring/Summer) + Optional Enduro Skills',
      explanation:
        'Flyers XC runs weekly winter base rides, 1–2x/week spring ICUP prep, and Saturday summer mountain adventures—specifically scheduled so student-athletes transition smoothly into their fall NICA high school teams.',
      feeNote:
        '$50 registration covers your Flyers t-shirt and rider insurance, led 100% by volunteer coaches.',
      nicaNote:
        'Built in active partnership with Westlake, Lehi, Cedar Valley, Skyridge, and Lone Peak NICA riders.',
    };
  }

  return {
    primaryProgram: 'xc',
    secondaryProgram: focus === 'endurance' ? 'enduro' : undefined,
    headline: 'Recommended: Flyers XC (Grades 7–12 Endurance & Singletrack)',
    explanation:
      'Pace- and skill-matched pods welcome both newer middle/high school riders building trail confidence and experienced racers targeting spring ICUP podiums.',
    feeNote: '$50 registration covers your Flyers t-shirt and rider insurance (all volunteer-led).',
    nicaNote:
      'Complements fall NICA teams across Westlake, Lehi, Cedar Valley, Skyridge, and Lone Peak.',
  };
}
