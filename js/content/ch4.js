/* =========================================================
   CHAPTER 4 — Structure and properties of materials
   ========================================================= */
window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 4,
  title: "Structure and properties of materials",
  emoji: "⚛️",
  color: "#3b82f6",
  blurb: "What's inside an atom, how scientists changed their models, and how chromatography separates dyes.",
  topics: [
    /* ---------------------------------------------------- 4.1 ATOM */
    {
      id: "4.1",
      title: "Structure of an atom",
      emoji: "⚛️",
      tagline: "Tiny building blocks — and the experiments that cracked them open.",
      sections: [
        {
          h: "Atoms and models",
          html: `<p>Every object in the Universe is made of <b>atoms</b> from just under 100 different <b>elements</b> (listed in the Periodic Table). Like toy building blocks, atoms join together in different ways to make different substances.</p>
          <p>Atoms are far too small to see, so scientists make a <b>model</b> — a simple way of showing or explaining something complicated, based on <b>evidence</b>. When new evidence appears that the old model can't explain, the model is <b>changed</b>.</p>
          <p>An <b>analogy</b> compares something unfamiliar to something more familiar (e.g. "the atom is like a plum pudding").</p>
          <p>Step through the history of the atom 👇</p>`,
          widget: "atomTimeline"
        },
        {
          h: "Thomson's plum pudding model (1904)",
          html: `<p>In <b>1904</b> J.J. Thomson did experiments that showed atoms contain particles with a <b>negative charge</b>. He called them <b>electrons</b>.</p>
          <p>Atoms are <b>neutral</b> (no overall charge), so there must also be something <b>positive</b>. His model: electrons spread out in a <b>sphere of positive charge</b> — like plums in a pudding. This is an <b>analogy</b>.</p>`
        },
        {
          h: "Rutherford's gold foil experiment (1909)",
          html: `<p>A team led by <b>Ernest Rutherford</b> fired fast-moving, positively charged <b>alpha particles</b> at very thin gold foil.</p>
          <p>If the plum pudding model was right, all the alpha particles should pass straight through. What they saw:</p>
          <ul><li><b>Most</b> went straight through → the atom is <b>mostly empty space</b>.</li>
          <li><b>Some</b> were deflected (bent) → there is a concentrated <b>positive charge</b> that repels them.</li>
          <li><b>A very few bounced back</b> → the positive charge is in a tiny, dense centre: the <b>nucleus</b>.</li></ul>
          <p>Fire some alpha particles yourself 👇</p>`,
          widget: "goldFoil"
        },
        {
          h: "Inside the atom: protons, neutrons, electrons",
          html: `<p>In the 1920s and 1930s scientists found the nucleus is made of two kinds of particle:</p>
          <table class="tbl"><tr><th>Particle</th><th>Charge</th><th>Where?</th></tr>
          <tr><td><b>Proton</b></td><td>Positive (+)</td><td>Nucleus</td></tr>
          <tr><td><b>Neutron</b></td><td>Neutral — no charge</td><td>Nucleus</td></tr>
          <tr><td><b>Electron</b></td><td>Negative (−)</td><td>Around the nucleus</td></tr></table>
          <p>The nucleus is about <b>10 000 times smaller</b> than the whole atom. If the nucleus were the size of a pea, the atom would be the size of a large sports stadium!</p>
          <p>An atom has the <b>same number of protons and electrons</b>, so the charges cancel — the atom is <b>neutral</b>. Build one 👇</p>`,
          widget: "atomBuilder"
        },
        {
          h: "Electrostatic attraction",
          html: `<p><b>Opposite charges attract.</b> The attraction between the positively charged nucleus and the negatively charged electrons holds the atom together. This is called <b>electrostatic attraction</b>.</p>
          <p>The nucleus has a positive charge because it contains <b>protons</b> (neutrons have no charge).</p>`
        }
      ],
      keyFacts: [
        "Rutherford's model was that an atom has a small, central, positively charged nucleus, but most of it is empty space.",
        "Electrons have negative charge, protons have positive charge and neutrons have no charge.",
        "The electrostatic attraction between positive and negative charges holds the atom together."
      ],
      terms: [
        ["atom", "smallest particle of an element"],
        ["model", "simple way of showing or explaining a complicated object or idea, based on evidence"],
        ["analogy", "a model that compares something unfamiliar with something more familiar"],
        ["electron", "very small negatively charged particle in an atom"],
        ["plum pudding model", "Thomson's early model: electrons in a cloud (sphere) of positive charge"],
        ["alpha particle", "particle with a positive charge given out by some radioactive elements"],
        ["nucleus", "the central part of an atom — contains protons and neutrons"],
        ["proton", "positively charged particle in the nucleus of an atom"],
        ["neutron", "particle with no charge in the nucleus of an atom"],
        ["electrostatic attraction", "attraction between opposite charges; holds the atom together"]
      ],
      quiz: [
        { t: "match", q: "Match each particle to its charge.", pairs: [["proton", "positive"], ["electron", "negative"], ["neutron", "no charge (neutral)"]], ex: "P = positive, N = neutral, E = negative." },
        { t: "mcq", q: "Which two particles are found in the nucleus?", o: ["Protons and electrons", "Protons and neutrons", "Neutrons and electrons", "Only electrons"], a: 1, ex: "Protons + neutrons in the nucleus; electrons around it." },
        { t: "mcq", q: "Who discovered the electron and suggested the plum pudding model?", o: ["Rutherford", "Dalton", "J.J. Thomson", "Newton"], a: 2, ex: "Thomson, 1904." },
        { t: "mcq", q: "In the gold foil experiment, most alpha particles went straight through. This showed that…", o: ["the atom is solid", "the atom is mostly empty space", "electrons are positive", "gold is magnetic"], a: 1, ex: "Mostly empty space." },
        { t: "mcq", q: "A very few alpha particles bounced back. This showed that…", o: ["there is a tiny, dense, positive nucleus", "the foil was too thick", "electrons are large", "atoms have no charge"], a: 0, ex: "Only a small, concentrated positive charge could repel them straight back." },
        { t: "short", q: "Explain why the plum pudding model had to change after Rutherford's experiment. [2]", marks: 2, kw: [["bounced", "deflect", "bent", "back"], ["nucleus", "concentrated", "centre", "center", "small", "empty space"]], model: "Some alpha particles were deflected or bounced back, which the plum pudding model could not explain (1). So the positive charge must be concentrated in a small central nucleus, with the rest mostly empty space (1).", ex: "New evidence → new model." },
        { t: "fill", q: "The attraction between the positive nucleus and the negative electrons is called electrostatic ____.", a: ["attraction"], bank: ["attraction", "repulsion", "friction", "diffusion"], ex: "Opposite charges attract." },
        { t: "short", q: "Why does the nucleus have a positive charge? [1]", marks: 1, kw: [["proton"]], model: "It contains protons, which are positive (neutrons have no charge).", ex: "" },
        { t: "num", q: "A carbon atom contains 6 protons and has no overall charge. How many electrons does it have?", a: 6, unit: "electrons", ex: "Neutral atom: protons = electrons." },
        { t: "tf", q: "An atom has an overall positive charge.", a: false, ex: "Same number of + protons and − electrons → neutral." },
        { t: "mcq", q: "Alpha particles are…", o: ["negatively charged", "positively charged", "neutral", "electrons"], a: 1, ex: "Positive — that's why the positive nucleus repels them." },
        { t: "num", q: "The nucleus is about 10 000 times smaller than the atom. A bead of diameter 1 cm represents the nucleus. How big (in metres) would the atom be? (100 cm = 1 m)", a: 100, unit: "m", ex: "1 cm × 10 000 = 10 000 cm = 100 m." },
        { t: "order", q: "Put the atomic models in the order they were suggested.", items: ["Tiny solid spheres (Dalton)", "Plum pudding (Thomson, 1904)", "Nuclear model (Rutherford, 1909)", "Protons and neutrons in nucleus (1920s–30s)"], ex: "Each model improved on the last using new evidence." },
        { t: "mcq", q: "What is an analogy?", o: ["A type of atom", "A model that compares something unfamiliar to something familiar", "An experiment", "A charged particle"], a: 1, ex: "e.g. plum pudding, or a pea in a stadium." },
        { t: "short", q: "The gold foil experiment was repeated many times by other scientists. Suggest why this is important. [1]", marks: 1, kw: [["reliable", "check", "same result", "repeat", "accurate", "confirm", "evidence"]], model: "To check the results are reliable / that others get the same results, so the evidence can be trusted.", ex: "" },
        { t: "sort", q: "Which particle?", buckets: ["Proton", "Neutron", "Electron"], items: [["Positive charge", 0], ["No charge", 1], ["Negative charge", 2], ["Found outside the nucleus", 2], ["Discovered by Thomson", 2]], ex: "" }
      ]
    },

    /* ---------------------------------------------------- 4.2 CHROMATOGRAPHY */
    {
      id: "4.2",
      title: "Paper chromatography",
      emoji: "🧪",
      tagline: "Separating the hidden colours in inks and dyes.",
      sections: [
        {
          h: "What is chromatography?",
          html: `<p>Substances in a mixture have different chemical and physical properties, which makes it possible to separate them.</p>
          <p><b>Chromatography</b> separates mixtures of <b>soluble</b> substances, often coloured dyes in ink or food colouring.</p>
          <ol><li>Draw a line in <b>pencil</b> across the bottom of filter paper. (Pencil doesn't dissolve — ink would run!)</li>
          <li>Put small spots of the inks on the line.</li>
          <li>Stand the paper in a beaker of <b>solvent</b> (e.g. water). The solvent level must be <b>below</b> the pencil line, or the dyes just dissolve into the beaker.</li>
          <li>The solvent soaks up the paper, carrying the dyes. They travel different distances.</li></ol>
          <p>The final pattern is called a <b>chromatogram</b>. Run one 👇</p>`,
          widget: "chromatography"
        },
        {
          h: "How chromatography works",
          html: `<p>If the dyes are <b>soluble</b>, they <b>dissolve</b> in the solvent and travel up the paper because they are attracted to <b>both</b> the solvent and the paper.</p>
          <table class="tbl"><tr><th>Dye is…</th><th>Result</th></tr>
          <tr><td>Strongly attracted to the <b>solvent</b>, weakly to the paper</td><td>Travels <b>far</b> up the paper</td></tr>
          <tr><td>Weakly attracted to the solvent, strongly to the <b>paper</b></td><td>Stays <b>near the bottom</b></td></tr>
          <tr><td><b>Insoluble</b> in the solvent</td><td>Doesn't move at all</td></tr></table>
          <p>A <b>pure</b> substance gives <b>one</b> spot. A mixture gives <b>two or more</b> spots.</p>`
        },
        {
          h: "Using chromatography: matching and forensics",
          html: `<p>Chromatography can identify unknown substances by comparing them with known samples. A spot at the <b>same height</b> as a known dye means the same substance.</p>
          <p>E.g. a scientist tests the coloured coating on sweets against food colourings E131, E142, E133 and E102 — matching spots show which colourings are in the sweets.</p>
          <p>It's used in <b>forensics</b> (science that helps police solve crimes): inks, paints or dyes from a crime scene are compared to known samples. Solve the case 👇</p>`,
          widget: "crimeChroma"
        }
      ],
      keyFacts: [
        "Chromatography is used to separate mixtures of soluble substances.",
        "The final pattern created is called a chromatogram.",
        "During chromatography soluble dyes separate out at different locations.",
        "Chromatography can be used to identify unknown substances in a mixture."
      ],
      terms: [
        ["chromatography", "a technique used to separate soluble substances (usually coloured dyes or inks)"],
        ["chromatogram", "the pattern of spots produced during chromatography"],
        ["soluble", "substance that dissolves to form a solution"],
        ["solvent", "a liquid that dissolves a soluble substance"],
        ["dissolve", "when a substance breaks up and mixes completely with a solvent to form a solution"],
        ["forensics", "science used to help solve crimes"]
      ],
      quiz: [
        { t: "mcq", q: "Why is the start line drawn in pencil, not ink?", o: ["Pencil is darker", "Pencil (graphite) does not dissolve in the solvent", "Ink is too expensive", "Pencil helps the solvent move"], a: 1, ex: "Ink would dissolve and run, mixing with your results." },
        { t: "mcq", q: "Why must the solvent be below the start line?", o: ["So the dyes don't dissolve straight into the beaker", "So the paper stays dry", "To make it faster", "It doesn't matter"], a: 0, ex: "Otherwise the spots wash off into the solvent." },
        { t: "fill", q: "The pattern of spots made in chromatography is called a ____.", a: ["chromatogram"], bank: ["chromatogram", "solution", "spectrum", "solvent"], ex: "" },
        { t: "mcq", q: "A black ink produces 3 spots. This shows the ink…", o: ["is pure", "contains 3 different dyes", "is insoluble", "contains 1 dye"], a: 1, ex: "Number of spots = number of dyes." },
        { t: "mcq", q: "A dye that is very strongly attracted to the solvent and weakly to the paper will…", o: ["stay on the start line", "travel far up the paper", "turn black", "disappear"], a: 1, ex: "More attraction to solvent → carried further." },
        { t: "mcq", q: "Which mixture could be separated by chromatography?", o: ["Salt and sand", "Different coloured dyes", "Water and ethanol", "Iron and sulfur"], a: 1, ex: "Chromatography is for soluble dyes." },
        { t: "tf", q: "A pure substance gives only one spot on a chromatogram.", a: true, ex: "" },
        { t: "short", q: "Luca put black ink on chromatography paper and placed it in water, but the ink did not separate. Suggest a reason and what he should change. [2]", marks: 2, kw: [["insoluble", "not soluble", "doesn't dissolve", "does not dissolve", "permanent"], ["different solvent", "another solvent", "ethanol", "alcohol", "change the solvent"]], model: "The ink is insoluble in water (1), so he should use a different solvent such as ethanol (1).", ex: "" },
        { t: "short", q: "Describe how chromatography can be used to find out whether a sweet contains a certain food colouring. [3]", marks: 3, kw: [["dissolve", "water", "extract"], ["spot", "line", "paper"], ["compare", "same height", "match", "known"]], model: "Dissolve the colouring off the sweet in a little water (1). Spot it on a pencil line on chromatography paper next to a spot of the known food colouring and stand in solvent (1). If a spot from the sweet is at the same height as the known colouring, the sweet contains it (1).", ex: "" },
        { t: "match", q: "Match the words.", pairs: [["solvent", "liquid that dissolves a substance"], ["soluble", "can dissolve"], ["chromatogram", "final pattern of spots"], ["forensics", "science to solve crimes"]], ex: "" },
        { t: "order", q: "Put the steps of chromatography in order.", items: ["Draw a pencil line near the bottom of the paper", "Put small spots of ink on the line", "Stand the paper in solvent below the line", "Wait for the solvent to rise up the paper", "Remove and dry the chromatogram"], ex: "" },
        { t: "sort", q: "Good practice or mistake?", buckets: ["Good practice", "Mistake"], items: [["Start line in pencil", 0], ["Solvent below the start line", 0], ["Small, concentrated spots", 0], ["Start line in felt-tip pen", 1], ["Solvent above the spots", 1]], ex: "" }
      ]
    }
  ],
  review: [
    { t: "short", q: "Describe the Rutherford model of the structure of an atom. [2]", marks: 2, kw: [["nucleus", "centre", "center"], ["empty space", "electrons around", "electrons orbit", "mostly empty"]], model: "A tiny, positively charged nucleus in the centre (1) with electrons around it — most of the atom is empty space (1).", ex: "" },
    { t: "short", q: "Name the force that holds the electrons to the nucleus in an atom. [1]", marks: 1, kw: [["electrostatic"]], model: "Electrostatic attraction.", ex: "" },
    { t: "mcq", q: "Which chromatogram shows a pure substance?", o: ["One with a single spot", "One with three spots", "One with a streak", "One with no spots"], a: 0, ex: "Pure = one substance = one spot." },
    { t: "short", q: "Explain why electrons are attracted to the nucleus. [1]", marks: 1, kw: [["opposite", "positive", "negative"]], model: "Electrons are negative and the nucleus is positive — opposite charges attract.", ex: "" }
  ]
});
