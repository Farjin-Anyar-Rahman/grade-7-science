/* =========================================================
   CHAPTER 5 — Solutions and solubility
   ========================================================= */
window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 5,
  title: "Solutions and solubility",
  emoji: "🧂",
  color: "#8b5cf6",
  blurb: "Solutes, solvents and solutions — how concentrated they are, and how temperature changes how much dissolves.",
  topics: [
    /* ---------------------------------------------------- 5.1 */
    {
      id: "5.1",
      title: "Concentration of solutions",
      emoji: "🥤",
      tagline: "How many solute particles are packed into the solvent?",
      sections: [
        {
          h: "Solutions, solutes and solvents",
          html: `<p>Solutions are all around us — coffee, petrol and rainwater are all solutions. Your blood plasma is a watery solution too, with dissolved food, carbon dioxide and blood cells.</p>
          <p>A <b>solution</b> is a mixture of a <b>solute</b> and a <b>solvent</b>.</p>
          <ul><li><b>Solute</b> — the substance that dissolves (e.g. salt).</li>
          <li><b>Solvent</b> — the liquid it dissolves in (e.g. water).</li>
          <li><b>Soluble</b> — able to dissolve. <b>Insoluble</b> — does not dissolve (e.g. chalk in water).</li></ul>
          <div class="equation">solute + solvent → solution</div>
          <p class="tip">💡 Soda water: the <b>solute</b> is carbon dioxide gas, the <b>solvent</b> is water. A solute can be a gas!</p>`
        },
        {
          h: "A particle model of dissolving",
          html: `<p>When a solute dissolves, its particles <b>break away from one another</b>. They <b>mix with the solvent</b> particles and fill the gaps between them.</p>
          <p>That's why you can't see the solute after it has dissolved — the particles are spread out far too small to see. But it's still there (the mass doesn't change, and you can taste the salt!).</p>
          <p>There is a limit to how much solute will dissolve. When no more will dissolve, the solution has reached its <b>saturation point</b> — it's a <b>saturated solution</b>. Add solute and watch 👇</p>`,
          widget: "dissolveSim"
        },
        {
          h: "Concentration: dilute vs concentrated",
          html: `<p>The <b>concentration</b> of a solution is a measure of how many particles of solute there are in a certain volume of solvent.</p>
          <table class="tbl"><tr><th>Dilute solution</th><th>Concentrated solution</th></tr>
          <tr><td><b>Small</b> number of solute particles in a <b>large</b> volume of solvent</td><td><b>Large</b> number of solute particles in a <b>small</b> volume of solvent</td></tr></table>
          <ul><li>Make it <b>more concentrated</b>: add more solute (or evaporate some solvent).</li>
          <li>Make it <b>more dilute</b>: add more solvent (e.g. adding water to strong coffee makes it paler).</li></ul>
          <p>To compare, work out <b>grams of solute per 100 cm³</b> of water. Mix your own drink 👇</p>`,
          widget: "concMixer"
        },
        {
          h: "Skills: investigating the saturation point",
          html: `<p>The <b>saturation point</b> is the maximum mass of a solute that will dissolve in 100 cm³ of water.</p>
          <p>Plan: measure 100 cm³ of water → add salt <b>1 g at a time</b>, stirring until it dissolves → keep going until some salt stays undissolved → record the total mass added.</p>
          <ul><li><b>Independent:</b> type of solute (or temperature)</li><li><b>Dependent:</b> mass that dissolves</li><li><b>Control:</b> volume of water, temperature, amount of stirring</li></ul>`
        }
      ],
      keyFacts: [
        "The concentration of a solution relates to how many particles of the solute are present in a volume of the solvent.",
        "A dilute solution has a small number of solute particles dissolved in a large volume of solvent.",
        "A concentrated solution has a large number of solute particles dissolved in a small volume of solvent."
      ],
      terms: [
        ["solution", "a mixture of a solute dissolved in a solvent"],
        ["solute", "a substance that dissolves in a liquid, e.g. salt"],
        ["solvent", "a liquid that dissolves a substance"],
        ["soluble", "a substance that dissolves in a solvent"],
        ["insoluble", "a substance that does not dissolve"],
        ["concentration", "a measurement of how many particles of a certain type there are in a volume of liquid or gas"],
        ["dilute solution", "solution with a small number of solute particles in a large volume of solvent"],
        ["concentrated solution", "solution with a large number of solute particles in a small volume of solvent"],
        ["saturated solution", "a solution in which no more solute will dissolve"],
        ["volume", "how much space an object takes up; measured in cm³"]
      ],
      quiz: [
        { t: "fill", q: "A solution is a mixture of a solute and a ____.", a: ["solvent"], bank: ["solvent", "solid", "particle", "gas"], ex: "Solute + solvent = solution." },
        { t: "mcq", q: "In salt water, what is the solute?", o: ["Water", "Salt", "Salt water", "Air"], a: 1, ex: "The salt dissolves → solute. Water → solvent." },
        { t: "mcq", q: "Soda water contains bubbles of carbon dioxide dissolved in water. Name the solvent.", o: ["Carbon dioxide", "Water", "Bubbles", "Sugar"], a: 1, ex: "" },
        { t: "match", q: "Match the words.", pairs: [["solute", "the substance that dissolves"], ["solvent", "the liquid it dissolves in"], ["insoluble", "does not dissolve"], ["saturated", "no more solute will dissolve"]], ex: "" },
        { t: "short", q: "Explain why you can't see the solute after it has dissolved. [2]", marks: 2, kw: [["break", "separate", "spread", "split"], ["gaps", "between", "mix", "too small", "tiny"]], model: "The solute particles break away from each other (1) and spread out into the gaps between the solvent particles — they are too small to see (1).", ex: "Particle model." },
        { t: "mcq", q: "Rosa's coffee is too strong, so she adds more water. What happens to the colour?", o: ["Gets darker", "Gets paler", "Stays the same", "Turns white"], a: 1, ex: "More solvent → more dilute → paler." },
        { t: "short", q: "Why does adding water make Rosa's coffee paler? [1]", marks: 1, kw: [["dilute", "fewer particles", "less concentrated", "spread out", "more solvent", "same number of particles"]], model: "The same number of coffee particles are spread through a bigger volume of water — the solution is more dilute.", ex: "" },
        { t: "mcq", q: "Davin's sugar solutions: X = 5 g in 100 cm³, Y = 20 g in 200 cm³, Z = 25 g in 50 cm³. Which is the MOST concentrated?", o: ["X", "Y", "Z", "All equal"], a: 2, ex: "Per 100 cm³: X = 5 g, Y = 10 g, Z = 50 g." },
        { t: "mcq", q: "Using the same solutions (X 5 g/100 cm³, Y 20 g/200 cm³, Z 25 g/50 cm³), which is the most DILUTE?", o: ["X", "Y", "Z", "All equal"], a: 0, ex: "X has only 5 g per 100 cm³." },
        { t: "mcq", q: "Laila dissolved 2 g of copper sulfate in 100 cm³ of water. Ahmed dissolved 5 g in 200 cm³. Whose solution is more concentrated?", o: ["Laila's", "Ahmed's", "Same", "Can't tell"], a: 1, ex: "Ahmed: 5 g in 200 cm³ = 2.5 g per 100 cm³ > 2 g." },
        { t: "sort", q: "Dilute or concentrated?", buckets: ["Dilute", "Concentrated"], items: [["Few solute particles, lots of water", 0], ["Pale squash drink", 0], ["Lots of solute particles, little water", 1], ["Very strong coffee", 1]], ex: "" },
        { t: "short", q: "A student made a weak (dilute) solution. Give two ways to make it more concentrated. [2]", marks: 2, kw: [["more solute", "add more", "more powder", "more salt", "more sugar"], ["evaporat", "less water", "less solvent", "boil", "heat"]], model: "Dissolve more solute in it (1); evaporate some of the water/solvent (1).", ex: "" },
        { t: "fill", q: "When no more solute will dissolve, the solution is ____.", a: ["saturated"], bank: ["saturated", "dilute", "insoluble", "pure"], ex: "" },
        { t: "tf", q: "Chalk is soluble in water.", a: false, ex: "Chalk is insoluble — it just makes the water cloudy and settles." },
        { t: "num", q: "4 g of salt is dissolved in 50 cm³ of water. How many grams is this per 100 cm³?", a: 8, unit: "g", ex: "Double both: 8 g per 100 cm³." },
        { t: "order", q: "Put the steps to find the saturation point of salt in order.", items: ["Measure 100 cm³ of water", "Add 1 g of salt and stir until dissolved", "Keep adding 1 g at a time", "Stop when salt stays undissolved", "Record the total mass added"], ex: "" }
      ]
    },

    /* ---------------------------------------------------- 5.2 */
    {
      id: "5.2",
      title: "Solubility",
      emoji: "🌡️",
      tagline: "How much dissolves — and why heat helps.",
      sections: [
        {
          h: "What is solubility?",
          html: `<p><b>Solubility</b> is the mass of solute that will dissolve in a certain volume of solvent (usually <b>100 cm³ of water</b>) at a certain <b>temperature</b>. It is a <b>physical property</b> of a substance.</p>
          <p>Different solutes have different solubilities. A <b>salt</b> is a compound of a metal and a non-metal, e.g. sodium chloride.</p>
          <table class="tbl"><tr><th>Solute (salt)</th><th>Solubility in g per 100 cm³ at 20 °C</th></tr>
          <tr><td>Iron(II) chloride</td><td><b>52.6</b> (most soluble)</td></tr>
          <tr><td>Sodium chloride</td><td>36</td></tr>
          <tr><td>Lead(II) iodide</td><td><b>0.07</b> (least soluble)</td></tr></table>
          <p>So 36 g of sodium chloride dissolves in 100 cm³ → <b>18 g</b> in 50 cm³ → <b>72 g</b> in 200 cm³.</p>`,
          widget: "saltRace"
        },
        {
          h: "Effect of temperature on solubility",
          html: `<p>Why can't you make iced coffee by adding coffee straight to cold water? Because the coffee is not very soluble in cold water. <b>The solubility of most solids increases with temperature.</b></p>
          <p>Particle model: when the temperature increases, solvent particles have <b>more energy</b> and move around more. They hit the solute particles <b>more often and with more force</b>, breaking it up into individual particles.</p>
          <p>A <b>solubility curve</b> is a graph showing solubility at different temperatures. Read it by going up from a temperature to the curve, then across.</p>
          <p class="tip">⚠️ <b>Gases are the opposite!</b> Carbon dioxide gets <b>less</b> soluble as temperature rises — that's why warm fizzy drinks go flat faster.</p>
          <p>Explore the curves and try cooling a saturated solution 👇</p>`,
          widget: "solCurve"
        },
        {
          h: "Science in context: soluble drugs",
          html: `<p>When you take a tablet, the drug <b>dissolves</b> in your digestive system and then passes into your blood. It is carried in your bloodstream to the place in your body where it has an effect.</p>
          <p>Problem: many useful drugs are <b>insoluble</b> in water. Scientists have developed techniques to turn an insoluble substance into a <b>soluble</b> one, so more drugs can be developed.</p>`
        }
      ],
      keyFacts: [
        "The solubility of salts varies, depending on their type.",
        "The solubility of most salts increases with temperature.",
        "Gases such as carbon dioxide become less soluble as temperature increases."
      ],
      terms: [
        ["solubility", "the mass of solute that will dissolve in a certain volume of solvent at a certain temperature"],
        ["salt", "a compound made of a metal and a non-metal, e.g. sodium chloride"],
        ["solubility curve", "a graph showing how solubility changes with temperature"],
        ["physical property", "a property that can be observed without changing the substance into a new one"],
        ["saturation point", "the maximum mass of solute that will dissolve in 100 cm³ of water"]
      ],
      quiz: [
        { t: "mcq", q: "From the table (iron(II) chloride 52.6 g, lead(II) iodide 0.07 g, sodium chloride 36 g), which salt is MOST soluble?", o: ["Iron(II) chloride", "Lead(II) iodide", "Sodium chloride"], a: 0, keep: true, ex: "52.6 g per 100 cm³." },
        { t: "mcq", q: "Which salt from the table is LEAST soluble?", o: ["Iron(II) chloride", "Lead(II) iodide", "Sodium chloride"], a: 1, keep: true, ex: "Only 0.07 g dissolves." },
        { t: "num", q: "36 g of sodium chloride dissolves in 100 cm³ of water at 20 °C. How much will dissolve in 50 cm³?", a: 18, unit: "g", ex: "Half the water → half the salt." },
        { t: "num", q: "36 g of sodium chloride dissolves in 100 cm³ at 20 °C. How much will dissolve in 200 cm³?", a: 72, unit: "g", ex: "36 × 2 = 72 g." },
        { t: "mcq", q: "What effect does increasing temperature normally have on the solubility of salts?", o: ["Decreases it", "Increases it", "No effect", "Makes them insoluble"], a: 1, ex: "" },
        { t: "short", q: "Use the particle model to explain why sugar dissolves faster and more in hot water. [2]", marks: 2, kw: [["energy", "faster", "move more", "moving more"], ["hit", "collide", "bump", "force", "more often"]], model: "In hot water the solvent particles have more energy and move faster (1), so they hit the solute particles more often and with more force, breaking it up (1).", ex: "" },
        { t: "mcq", q: "How does the solubility of carbon dioxide gas change as water gets warmer?", o: ["Increases", "Decreases", "Stays the same", "Doubles"], a: 1, ex: "Gases are less soluble in warm water — warm drinks go flat." },
        { t: "fill", q: "Solubility is a ____ property of a substance.", a: ["physical"], bank: ["physical", "chemical", "magnetic", "living"], ex: "" },
        { t: "num", q: "Potassium nitrate solubility curve: at 60 °C about 110 g dissolves in 100 cm³. Amelia wants to dissolve 150 g in 100 cm³ at 60 °C. How many grams will NOT dissolve?", a: 40, unit: "g", ex: "150 − 110 = 40 g stays undissolved." },
        { t: "short", q: "A saturated solution at 80 °C is cooled to 40 °C. Describe and explain what happens. [2]", marks: 2, kw: [["crystal", "solid", "comes out", "precipitat", "undissolved", "appear"], ["less soluble", "solubility decreases", "lower solubility", "can't hold", "cannot hold", "solubility falls"]], model: "Crystals of solid form / appear in the solution (1) because solubility decreases as it cools, so the water can't hold as much dissolved solute (1).", ex: "" },
        { t: "mcq", q: "Why is it important that carbon dioxide is soluble in blood?", o: ["So it can be carried in the plasma to the lungs", "So blood stays red", "So it makes glucose", "It isn't important"], a: 0, ex: "Plasma carries dissolved CO₂ to the lungs (Topic 1.1!)." },
        { t: "tf", q: "Solubility is usually given as grams of solute per 100 cm³ of water.", a: true, ex: "" },
        { t: "short", q: "Why does a drug need to be soluble? [1]", marks: 1, kw: [["blood", "absorb", "carried", "dissolve"]], model: "So it can dissolve and pass into the blood, which carries it to where it acts.", ex: "" }
      ]
    }
  ],
  review: [
    { t: "short", q: "What is a solution? [1]", marks: 1, kw: [["solute"], ["solvent", "dissolved", "mixture"]], model: "A mixture of a solute dissolved in a solvent.", ex: "" },
    { t: "short", q: "Name the solute and solvent in saltwater. [2]", marks: 2, kw: [["salt"], ["water"]], model: "Solute: salt (1). Solvent: water (1).", ex: "" },
    { t: "short", q: "Describe how the particles are arranged in a concentrated solution. [1]", marks: 1, kw: [["many", "lots", "large number", "close"]], model: "Lots of solute particles packed among a small number of solvent particles.", ex: "" },
    { t: "short", q: "What is meant by the term solubility? [1]", marks: 1, kw: [["mass", "how much", "amount"], ["dissolve"]], model: "The mass of solute that will dissolve in 100 cm³ of solvent at a given temperature.", ex: "" },
    { t: "mcq", q: "Luca's black ink didn't separate in water during chromatography. What links this to Chapter 5?", o: ["The ink is insoluble in water", "The ink is too concentrated", "The water is saturated", "The paper is soluble"], a: 0, ex: "Insoluble substances don't dissolve, so they don't move up the paper." }
  ]
});
