/* =========================================================
   CHAPTER 6 — Chemical changes
   NOTE: the scanned book only contains this chapter's opening
   page. Topics follow its "You will learn about" list and the
   standard Grade 7/8 syllabus. Replace/extend when the full
   chapter pages are available.
   ========================================================= */
window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 6,
  title: "Chemical changes",
  emoji: "🎆",
  color: "#f97316",
  blurb: "Word equations, purity, reactions that get hot or cold, and how reactive different metals are.",
  topics: [
    /* ---------------------------------------------------- 6.1 */
    {
      id: "6.1",
      title: "Word equations & chemical reactions",
      emoji: "🎇",
      tagline: "Reactants in, products out.",
      sections: [
        {
          h: "What is a chemical reaction?",
          html: `<p>In a <b>chemical reaction</b>, atoms rearrange to make <b>new substances</b>. Signs that a reaction is happening:</p>
          <ul><li>🎨 a <b>colour change</b></li><li>🫧 <b>bubbles</b> of gas (fizzing)</li><li>🌡️ a <b>temperature change</b> (gets hot or cold)</li><li>💡 <b>light</b> or sound given out</li><li>🧱 a solid forms (a precipitate)</li></ul>
          <p>Fireworks: a powder burns and releases gases very quickly — a fast reaction that transfers energy to the surroundings as heat and light. Metal compounds called <b>salts</b> give the colours: <b>sodium → yellow</b>, <b>copper → blue/green</b>.</p>
          <p>A <b>physical change</b> (like melting ice or dissolving sugar) makes <b>no new substance</b> and is usually easy to reverse.</p>`,
          widget: "fireworks"
        },
        {
          h: "Word equations",
          html: `<p>A <b>word equation</b> shows a reaction. <b>Reactants</b> (starting substances) go on the left of the arrow; <b>products</b> (new substances) go on the right.</p>
          <div class="equation">magnesium + oxygen → magnesium oxide</div>
          <p>Useful patterns:</p>
          <ul><li>metal + oxygen → metal <b>oxide</b></li>
          <li>metal + water → metal <b>hydroxide</b> + <b>hydrogen</b></li>
          <li>metal + hydrochloric acid → metal <b>chloride</b> + <b>hydrogen</b></li>
          <li>metal + sulfuric acid → metal <b>sulfate</b> + <b>hydrogen</b></li>
          <li>fuel + oxygen → carbon dioxide + water (<b>combustion</b>)</li></ul>
          <p>Build the equations 👇</p>`,
          widget: "eqLab"
        }
      ],
      keyFacts: [
        "In a chemical reaction new substances are made.",
        "Word equations show reactants on the left of the arrow and products on the right.",
        "Metal + oxygen → metal oxide; metal + acid → salt + hydrogen."
      ],
      terms: [
        ["chemical reaction", "a change in which new substances are made"],
        ["physical change", "a change where no new substance is made, e.g. melting"],
        ["reactant", "a substance at the start of a reaction (left of the arrow)"],
        ["product", "a new substance made in a reaction (right of the arrow)"],
        ["word equation", "shows the reactants and products of a reaction in words"],
        ["oxide", "compound made when an element reacts with oxygen"],
        ["combustion", "burning — a reaction with oxygen that releases energy"],
        ["salt", "compound made when an acid reacts with a metal (e.g. a chloride or sulfate)"]
      ],
      quiz: [
        { t: "mcq", q: "Which of these is a sign of a chemical reaction?", o: ["Ice melting", "Bubbles of gas forming when a metal is added to acid", "Sugar dissolving", "Water boiling"], a: 1, ex: "Gas given off = new substance." },
        { t: "sort", q: "Chemical or physical change?", buckets: ["Chemical", "Physical"], items: [["Burning wood", 0], ["Iron rusting", 0], ["A firework exploding", 0], ["Ice melting", 1], ["Salt dissolving in water", 1], ["Water boiling", 1]], ex: "Chemical = new substance made." },
        { t: "fill", q: "magnesium + oxygen → magnesium ____", a: ["oxide"], bank: ["oxide", "chloride", "hydroxide", "sulfate"], ex: "Metal + oxygen → metal oxide." },
        { t: "fill", q: "zinc + hydrochloric acid → zinc chloride + ____", a: ["hydrogen"], bank: ["hydrogen", "oxygen", "water", "carbon dioxide"], ex: "Metal + acid → salt + hydrogen." },
        { t: "mcq", q: "In a word equation, the substances on the left of the arrow are the…", o: ["products", "reactants", "catalysts", "solutions"], a: 1, ex: "" },
        { t: "mcq", q: "Which salt is made when iron reacts with sulfuric acid?", o: ["Iron chloride", "Iron oxide", "Iron sulfate", "Iron hydroxide"], a: 2, ex: "Sulfuric acid → sulfates." },
        { t: "mcq", q: "Sodium salts in fireworks give which colour?", o: ["Blue", "Yellow", "Red", "Green"], a: 1, ex: "Sodium = yellow; copper = blue/green." },
        { t: "fill", q: "sodium + water → sodium hydroxide + ____", a: ["hydrogen"], bank: ["hydrogen", "oxygen", "salt", "chlorine"], ex: "Metal + water → metal hydroxide + hydrogen." },
        { t: "short", q: "Write the word equation for methane burning in oxygen. [2]", marks: 2, kw: [["methane + oxygen", "oxygen + methane"], ["carbon dioxide + water", "water + carbon dioxide"]], model: "methane + oxygen → carbon dioxide + water", ex: "Combustion of a fuel." },
        { t: "tf", q: "In a physical change, new substances are made.", a: false, ex: "Physical = no new substance." }
      ]
    },

    /* ---------------------------------------------------- 6.2 */
    {
      id: "6.2",
      title: "Purity",
      emoji: "💎",
      tagline: "How much of the chemical you want is really there?",
      sections: [
        {
          h: "Pure and impure substances",
          html: `<p>In science, a <b>pure</b> substance contains only <b>one</b> substance (one element or one compound). An <b>impure</b> substance is a <b>mixture</b> — it has other substances in it.</p>
          <p><b>Purity</b> describes how much of the chemical you want is in a mixture, often as a percentage:</p>
          <div class="equation">% purity = (mass of pure substance ÷ total mass) × 100</div>
          <p>Reactions don't always give a single pure product — they can produce <b>impure mixtures</b> (leftover reactants, side products), which then need to be separated (filtering, evaporating, chromatography…).</p>
          <p>Medicines must be very pure — impurities could be harmful. Drag the slider 👇</p>`,
          widget: "purity"
        },
        {
          h: "Testing purity",
          html: `<ul><li>A <b>pure</b> substance melts and boils at an <b>exact, fixed temperature</b>. Pure water boils at <b>100 °C</b> and freezes at <b>0 °C</b>.</li>
          <li>Impurities <b>change</b> the melting/boiling point and make it happen over a <b>range</b> of temperatures (salty water boils above 100 °C).</li>
          <li>Chromatography: a pure substance gives <b>one spot</b>.</li></ul>`
        }
      ],
      keyFacts: [
        "A pure substance contains only one substance.",
        "Purity describes how much of a chemical is in a mixture.",
        "Pure substances have fixed melting and boiling points; impurities change them."
      ],
      terms: [
        ["pure", "containing only one substance"],
        ["impure", "a mixture containing other substances (impurities)"],
        ["purity", "a measure of how much of a particular chemical is in a mixture"],
        ["mixture", "two or more substances mixed but not chemically joined"],
        ["impurity", "an unwanted substance mixed in with the one you want"]
      ],
      quiz: [
        { t: "num", q: "A 50 g sample contains 45 g of pure salt. What is its percentage purity?", a: 90, unit: "%", ex: "45 ÷ 50 × 100 = 90%." },
        { t: "num", q: "A 200 g sample of a medicine contains 196 g of the drug. Calculate the % purity.", a: 98, unit: "%", ex: "196 ÷ 200 × 100 = 98%." },
        { t: "mcq", q: "Pure water boils at…", o: ["90 °C", "100 °C", "110 °C", "a range of temperatures"], a: 1, ex: "Exactly 100 °C (at normal pressure)." },
        { t: "mcq", q: "A sample melts gradually between 72 °C and 79 °C. This suggests it is…", o: ["pure", "impure", "a metal", "a gas"], a: 1, ex: "Impure substances melt over a range." },
        { t: "tf", q: "Chemical reactions always produce a single pure product.", a: false, ex: "They can give impure mixtures." },
        { t: "short", q: "Why is it important that medicines are very pure? [1]", marks: 1, kw: [["harm", "dangerous", "poison", "unsafe", "side effect", "toxic", "safe"]], model: "Impurities could be harmful / poisonous to the patient.", ex: "" },
        { t: "mcq", q: "How could chromatography show a dye is pure?", o: ["It makes many spots", "It makes only one spot", "It doesn't move", "It turns white"], a: 1, ex: "" },
        { t: "sort", q: "Pure or impure (mixture)?", buckets: ["Pure", "Mixture"], items: [["Distilled water", 0], ["Oxygen gas", 0], ["Sea water", 1], ["Air", 1], ["Black ink", 1]], ex: "" }
      ]
    },

    /* ---------------------------------------------------- 6.3 */
    {
      id: "6.3",
      title: "Exothermic and endothermic",
      emoji: "🌡️",
      tagline: "Reactions that heat up — and ones that cool down.",
      sections: [
        {
          h: "Energy changes in reactions",
          html: `<p>You can identify the type of reaction by the <b>temperature change</b> you measure.</p>
          <table class="tbl"><tr><th></th><th>🔥 Exothermic</th><th>🧊 Endothermic</th></tr>
          <tr><td>Energy</td><td><b>Released</b> to the surroundings</td><td><b>Taken in</b> from the surroundings</td></tr>
          <tr><td>Temperature</td><td><b>Rises</b> (gets hotter)</td><td><b>Falls</b> (gets colder)</td></tr>
          <tr><td>Examples</td><td>Burning (combustion), respiration, metal + acid, hand warmers, neutralisation</td><td>Sherbet/citric acid + sodium hydrogencarbonate, dissolving ammonium nitrate, instant cold packs, photosynthesis</td></tr></table>
          <p>To test: measure the starting temperature, mix, measure the highest/lowest temperature. <b>Change = end − start</b>. Positive → exothermic; negative → endothermic.</p>
          <p>Try the reactions 👇</p>`,
          widget: "thermoLab"
        }
      ],
      keyFacts: [
        "Exothermic reactions transfer energy to the surroundings — temperature rises.",
        "Endothermic reactions take in energy from the surroundings — temperature falls.",
        "Measuring temperature change tells you which type of reaction it is."
      ],
      terms: [
        ["exothermic", "reaction that releases energy to the surroundings — temperature rises"],
        ["endothermic", "reaction that takes in energy from the surroundings — temperature falls"],
        ["surroundings", "everything around the reaction (the container, the air, the water)"],
        ["thermometer", "instrument used to measure temperature"]
      ],
      quiz: [
        { t: "mcq", q: "During a reaction the temperature rises from 20 °C to 32 °C. The reaction is…", o: ["endothermic", "exothermic", "physical", "neutral"], a: 1, ex: "Temperature rise → exothermic." },
        { t: "num", q: "Start 21 °C, end 14 °C. What is the temperature change? (use a minus sign if it falls)", a: -7, unit: "°C", ex: "14 − 21 = −7 °C → endothermic." },
        { t: "sort", q: "Exothermic or endothermic?", buckets: ["Exothermic", "Endothermic"], items: [["Burning fuel", 0], ["Respiration", 0], ["Magnesium + acid", 0], ["Instant cold pack", 1], ["Sherbet fizzing in your mouth", 1], ["Photosynthesis", 1]], ex: "" },
        { t: "tf", q: "Endothermic reactions take in energy from the surroundings.", a: true, ex: "So the surroundings get colder." },
        { t: "mcq", q: "Which piece of equipment do you need to decide if a reaction is exothermic?", o: ["Balance", "Thermometer", "Ruler", "Stopwatch"], a: 1, ex: "" },
        { t: "short", q: "Describe how you would find out if dissolving a powder in water is exothermic or endothermic. [3]", marks: 3, kw: [["thermometer", "temperature"], ["start", "before", "initial"], ["rise", "fall", "increase", "decrease", "hotter", "colder", "change"]], model: "Measure the starting temperature of the water with a thermometer (1). Add the powder, stir and record the final temperature (1). If the temperature rises it is exothermic; if it falls it is endothermic (1).", ex: "" },
        { t: "mcq", q: "A hand warmer gets hot when you activate it. It uses an…", o: ["endothermic reaction", "exothermic reaction", "physical change only", "electrical reaction"], a: 1, ex: "" },
        { t: "short", q: "Give one control variable when comparing the temperature change of different reactions. [1]", marks: 1, kw: [["volume", "mass", "amount", "same container", "starting temperature", "concentration"]], model: "Same volume of liquid / same mass of solid / same starting temperature.", ex: "" }
      ]
    },

    /* ---------------------------------------------------- 6.4 */
    {
      id: "6.4",
      title: "Reactivity of metals",
      emoji: "🔥",
      tagline: "Some metals explode in water. Some just sit there.",
      sections: [
        {
          h: "The reactivity series",
          html: `<p>Metals react with <b>oxygen</b>, <b>water</b> and <b>dilute acids</b> — but not all equally. Listing them from most to least reactive gives the <b>reactivity series</b>.</p>
          <div class="equation" style="font-size:16px">potassium › sodium › calcium › magnesium › zinc › iron › copper › silver › gold</div>
          <p class="tip">💡 Memory trick: "<b>P</b>lease <b>S</b>end <b>C</b>harlie's <b>M</b>onkeys <b>Z</b>ebras <b>I</b>n <b>C</b>ages <b>S</b>ecurely <b>G</b>uarded"</p>
          <p>Drop metals into acid and compare the fizzing 👇</p>`,
          widget: "reactivity"
        },
        {
          h: "Metals with oxygen, water and acid",
          html: `<table class="tbl"><tr><th>Metal</th><th>Oxygen (air)</th><th>Water</th><th>Dilute acid</th></tr>
          <tr><td>Potassium, sodium</td><td>Tarnish instantly; burn fiercely</td><td>Fizz violently, float, may catch fire</td><td>Explosive — never done in school!</td></tr>
          <tr><td>Calcium</td><td>Burns</td><td>Fizzes steadily</td><td>Very vigorous</td></tr>
          <tr><td>Magnesium</td><td>Burns with a <b>bright white flame</b></td><td>Very slow (cold); fast with steam</td><td>Lots of fizzing</td></tr>
          <tr><td>Zinc, iron</td><td>Burn as powders / slowly</td><td>Very slowly (iron rusts)</td><td>Steady fizzing</td></tr>
          <tr><td>Copper</td><td>Turns black (copper oxide) when heated</td><td>No reaction</td><td>No reaction</td></tr>
          <tr><td>Silver, gold</td><td>No reaction</td><td>No reaction</td><td>No reaction</td></tr></table>
          <p>The gas made with water or acid is <b>hydrogen</b>. Test: a lit splint gives a <b>squeaky pop</b>.</p>
          <p>Gold and silver are so unreactive they stay shiny for thousands of years — great for jewellery!</p>`
        }
      ],
      keyFacts: [
        "Metals can be put in order of reactivity: the reactivity series.",
        "Reactive metals react with water and acids to make hydrogen.",
        "Hydrogen gives a squeaky pop with a lit splint.",
        "Gold, silver and copper do not react with dilute acids."
      ],
      terms: [
        ["reactivity", "how easily a substance takes part in a chemical reaction"],
        ["reactivity series", "list of metals in order of how reactive they are"],
        ["hydrogen", "gas made when reactive metals react with water or acids; burns with a squeaky pop"],
        ["dilute acid", "acid that has been mixed with a lot of water"],
        ["tarnish", "when a shiny metal surface goes dull as it reacts with air"]
      ],
      quiz: [
        { t: "order", q: "Put these metals in order, most reactive first.", items: ["Potassium", "Magnesium", "Iron", "Copper", "Gold"], ex: "" },
        { t: "mcq", q: "Which gas is produced when magnesium reacts with dilute hydrochloric acid?", o: ["Oxygen", "Carbon dioxide", "Hydrogen", "Chlorine"], a: 2, ex: "Metal + acid → salt + hydrogen." },
        { t: "mcq", q: "What is the test for hydrogen?", o: ["Relights a glowing splint", "Lit splint gives a squeaky pop", "Turns limewater milky", "Turns blue litmus red"], a: 1, ex: "" },
        { t: "mcq", q: "Which metal does NOT react with dilute acid?", o: ["Zinc", "Magnesium", "Copper", "Iron"], a: 2, ex: "Copper is below hydrogen in reactivity." },
        { t: "mcq", q: "Why is gold used for jewellery?", o: ["It is very reactive", "It is very unreactive so stays shiny", "It is magnetic", "It is cheap"], a: 1, ex: "" },
        { t: "tf", q: "Sodium reacts violently with water.", a: true, ex: "It fizzes, floats, moves around and may catch fire." },
        { t: "fill", q: "magnesium + hydrochloric acid → magnesium ____ + hydrogen", a: ["chloride"], bank: ["chloride", "oxide", "sulfate", "hydroxide"], ex: "" },
        { t: "short", q: "Describe how you could compare the reactivity of three metals using dilute acid. [3]", marks: 3, kw: [["same volume", "same amount", "same concentration", "same mass", "same size"], ["bubbles", "fizz", "rate", "gas"], ["temperature", "more bubbles", "fastest", "most reactive", "compare"]], model: "Add the same mass/size of each metal to the same volume and concentration of acid (1). Observe the bubbles of gas / measure the temperature rise (1). The metal with the most bubbles / biggest temperature rise is the most reactive (1).", ex: "Fair test!" },
        { t: "mcq", q: "Magnesium burning in air gives…", o: ["a blue flame", "a bright white flame", "no flame", "a green flame"], a: 1, ex: "Don't look directly at it!" },
        { t: "sort", q: "Reacts with dilute acid?", buckets: ["Yes — fizzes", "No reaction"], items: [["Magnesium", 0], ["Zinc", 0], ["Iron", 0], ["Copper", 1], ["Silver", 1], ["Gold", 1]], ex: "" }
      ]
    }
  ],
  review: [
    { t: "mcq", q: "calcium + water → calcium hydroxide + ?", o: ["oxygen", "hydrogen", "carbon dioxide", "calcium oxide"], a: 1, ex: "" },
    { t: "mcq", q: "Which observation shows an endothermic reaction?", o: ["The beaker feels cold", "Bright light", "The beaker gets hot", "A loud bang"], a: 0, ex: "" },
    { t: "num", q: "A 40 g sample contains 30 g of copper sulfate. What is the % purity?", a: 75, unit: "%", ex: "30 ÷ 40 × 100 = 75%." }
  ]
});
