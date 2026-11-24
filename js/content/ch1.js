/* =========================================================
   CHAPTER 1 — Respiration and moving
   To add a new chapter later: copy this file's shape into
   js/content/chN.js and add a <script> tag in index.html.
   ========================================================= */
window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 1,
  title: "Respiration and moving",
  emoji: "🫀",
  color: "#e5484d",
  blurb: "Blood, breathing, bones and muscles — how your body gets oxygen and food to every cell, and how it moves.",
  topics: [
    /* ---------------------------------------------------- 1.1 BLOOD */
    {
      id: "1.1",
      title: "Blood",
      emoji: "🩸",
      tagline: "The delivery service that never stops.",
      sections: [
        {
          h: "Circulation: your body's delivery system",
          html: `<p>Your <b>heart</b> is a pump. It pushes <b>blood</b> around your body through tubes called <b>blood vessels</b>. This movement of blood is called <b>circulation</b>.</p>
          <p>The heart, the blood and the blood vessels together make an organ system: the <b>circulatory system</b>. It brings every cell what it needs (oxygen and digested food) and takes away waste.</p>
          <p>There are <b>two circuits</b>:</p>
          <ul><li>Circuit 1: heart → <b>lungs</b> → heart (blood picks up oxygen)</li>
          <li>Circuit 2: heart → <b>rest of the body</b> → heart (blood drops off oxygen)</li></ul>
          <p class="tip">💡 Watch the dots: they turn <span style="color:#e5484d">bright red</span> in the lungs (lots of oxygen) and <span style="color:#7c5cff">dull purple-red</span> after visiting the body (little oxygen).</p>`,
          widget: "circulation"
        },
        {
          h: "Capillaries: the tiniest blood vessels",
          html: `<p>The smallest blood vessels are <b>capillaries</b>. They reach every tissue in your body.</p>
          <ul><li>Their walls are only <b>one cell thick</b> → substances pass through easily.</li>
          <li>There are tiny <b>gaps between the cells</b> of the wall → <b>plasma</b> can leak out carrying dissolved substances to cells in the tissue.</li></ul>
          <p>Your heart pumps about <b>5 litres</b> of blood every minute through about <b>100 000 km</b> of vessels!</p>
          <div class="callout warn"><b>Test fix!</b> <i>"How do white blood cells reach bacteria outside the blood vessels?"</i><br>
          ✅ They <b>change shape</b> and <b>squeeze through the gaps</b> in the capillary walls into the tissue. (Not "through the veins"!) Press play below 👇</div>`,
          widget: "capillary"
        },
        {
          h: "What is blood made of?",
          html: `<p>Spin blood in a machine and it separates into layers. Tap each layer to learn what it does.</p>
          <ul><li><b>Plasma</b> — about <b>half</b> of your blood. A pale-yellow liquid. It carries dissolved substances: <b>digested food (nutrients)</b> from the small intestine, and <b>carbon dioxide</b> (waste from respiration) from the cells to the lungs.</li>
          <li><b>White blood cells</b> — a thin pale layer.</li>
          <li><b>Red blood cells</b> — the heavy red layer at the bottom.</li></ul>`,
          widget: "bloodTube"
        },
        {
          h: "Red blood cells — built to carry oxygen",
          html: `<p>Red blood cells contain <b>haemoglobin</b>. In the lungs, oxygen sticks to haemoglobin and the blood turns <b>bright red</b>. In the tissues the haemoglobin lets go of the oxygen and blood becomes <b>dull red</b>.</p>
          <table class="tbl"><tr><th>Adaptation</th><th>Why it helps</th></tr>
          <tr><td>No nucleus and no mitochondria</td><td>More space to pack in <b>haemoglobin</b> → carries more oxygen</td></tr>
          <tr><td>Dimpled (biconcave) disc shape</td><td>Large <b>surface area</b> → oxygen gets in and out quickly</td></tr>
          <tr><td>Small and flexible</td><td>Can squeeze through narrow capillaries</td></tr></table>
          <p class="tip">💡 Because they have <b>no mitochondria</b>, red blood cells don't do aerobic respiration — so they don't use the oxygen they carry!</p>`,
          widget: "bloodCells"
        },
        {
          h: "White blood cells — your bodyguards",
          html: `<p><b>White blood cells</b> protect you from infections caused by <b>pathogens</b> (microorganisms that cause disease, like some bacteria and viruses).</p>
          <ul><li>They can <b>change shape</b> easily, so they squeeze through gaps in capillary walls to reach pathogens in the tissues.</li>
          <li>Some white blood cells <b>wrap themselves around</b> microorganisms and <b>destroy</b> them.</li>
          <li>There are far fewer white blood cells than red blood cells (roughly 1 white for every 600 red).</li></ul>`,
          widget: "wbcHunt"
        },
        {
          h: "Science in context: blood transfusions",
          html: `<p>If someone loses a lot of blood (a bad cut, an accident, an operation), the blood pressure falls and not enough oxygen reaches organs like the brain. They can be given donated blood — a <b>blood transfusion</b>.</p>
          <p>Early doctors tried saline, milk and other people's blood — it usually failed. In <b>1900</b> scientists discovered people have different <b>blood groups</b>: <b>A, B, AB and O</b>. Giving the wrong group makes the blood clump. Today donated blood is labelled with its group and matched carefully.</p>`
        },
        {
          h: "Skills: planning a fair test (pulse rate)",
          html: `<p><b>Hypothesis:</b> "Exercise makes the pulse rate increase, because muscles need more substances from the blood for respiration."</p>
          <table class="tbl"><tr><th>Word</th><th>Meaning</th><th>In the pulse experiment</th></tr>
          <tr><td><b>Independent variable</b></td><td>The one you <b>change</b></td><td>Type / amount of exercise</td></tr>
          <tr><td><b>Dependent variable</b></td><td>The one you <b>measure</b></td><td>Pulse rate (beats per minute)</td></tr>
          <tr><td><b>Control variables</b></td><td>Kept the <b>same</b> → fair test</td><td>Same person, same time of exercise (e.g. 2 min), same way of measuring pulse</td></tr>
          <tr><td><b>Hazard</b></td><td>Something that can cause harm</td><td>Slipping / falling while running</td></tr>
          <tr><td><b>Risk</b></td><td>Chance of the hazard causing harm</td><td>Reduce it: clear space, proper shoes</td></tr>
          <tr><td><b>Reliable</b></td><td>Repeat readings give similar results</td><td>Repeat 3 times and take an average</td></tr></table>`,
          widget: "variableGame"
        }
      ],
      keyFacts: [
        "Red blood cells carry oxygen using haemoglobin.",
        "White blood cells destroy microorganisms that get into your body.",
        "Plasma carries the blood cells and dissolved substances such as digested food and carbon dioxide.",
        "Capillary walls are one cell thick with gaps, so substances can pass through."
      ],
      terms: [
        ["blood", "liquid tissue that carries substances around the body"],
        ["blood vessels", "tube-shaped organs that carry blood around the body"],
        ["circulation", "movement of blood around the body"],
        ["circulatory system", "group of organs that moves blood around the body (heart, blood, blood vessels)"],
        ["capillary", "tiny blood vessel found in all the tissues of your body; walls one cell thick"],
        ["nutrient", "a substance that an organism needs to stay healthy and survive"],
        ["plasma", "liquid part of the blood"],
        ["respiration", "chemical process that happens inside cells to release energy"],
        ["haemoglobin", "substance in red blood cells that traps oxygen"],
        ["pathogen", "a microorganism that causes a disease"],
        ["red blood cell", "cell that contains haemoglobin so it can carry oxygen"],
        ["white blood cell", "cell that helps destroy microorganisms"],
        ["surface area", "the area of a surface, measured in square units such as cm²"],
        ["independent variable", "variable you decide to change in an experiment"],
        ["dependent variable", "variable you measure in an experiment"],
        ["control variable", "variable that you keep the same during an investigation"],
        ["hazard", "something that can cause harm"],
        ["risk", "chance of a hazard causing harm"],
        ["reliable", "measurements are reliable when repeated measurements give results that are very similar"]
      ],
      quiz: [
        { t: "mcq", q: "Which part of the blood carries oxygen?", o: ["Plasma", "Red blood cells", "White blood cells", "Capillaries"], a: 1, ex: "Red blood cells contain haemoglobin, which traps oxygen." },
        { t: "fill", q: "Red blood cells contain a red substance called ____ that carries oxygen.", a: ["haemoglobin", "hemoglobin"], bank: ["haemoglobin", "plasma", "glucose", "iron"], ex: "Haemoglobin joins with oxygen in the lungs and releases it in the tissues." },
        { t: "mcq", q: "Which is the liquid part of the blood?", o: ["Haemoglobin", "Plasma", "Mucus", "Lymph"], a: 1, ex: "Plasma is about half of your blood — a pale-yellow liquid." },
        { t: "sort", q: "Sort each job into the part of blood that does it.", buckets: ["Plasma", "Red blood cells", "White blood cells"], items: [["Carries dissolved digested food", 0], ["Carries carbon dioxide to the lungs", 0], ["Carries oxygen", 1], ["Contains haemoglobin", 1], ["Destroys pathogens", 2], ["Wraps around bacteria", 2]], ex: "Plasma = transport liquid; red cells = oxygen; white cells = defence." },
        { t: "mcq", q: "Farida's white blood cells need to reach bacteria in the tissue outside a blood vessel. How do they get there?", o: ["They travel through the veins", "They change shape and squeeze through gaps in the capillary walls", "The bacteria swim into the blood", "Plasma carries the bacteria to them"], a: 1, ex: "White blood cells are flexible — they squeeze out through the gaps between the cells of capillary walls." },
        { t: "tf", q: "Red blood cells have a nucleus.", a: false, ex: "No nucleus (and no mitochondria) → more room for haemoglobin." },
        { t: "short", q: "Explain how a red blood cell is adapted to carry as much oxygen as possible. [2]", marks: 2, kw: [["no nucleus", "no mitochondria", "without a nucleus", "lack a nucleus"], ["more haemoglobin", "more space for haemoglobin", "room for haemoglobin", "space for haemoglobin"]], model: "It has no nucleus or mitochondria (1), so there is more space for haemoglobin, which carries oxygen (1).", ex: "Two marks: the feature AND why it helps." },
        { t: "short", q: "Why is the dimpled shape of a red blood cell useful? [2]", marks: 2, kw: [["surface area", "large area"], ["oxygen", "faster", "quickly", "diffus"]], model: "The dimpled shape gives a large surface area (1) so oxygen can get in and out quickly (1).", ex: "Shape → surface area → speed of oxygen movement." },
        { t: "short", q: "Although red blood cells carry oxygen, they do not need oxygen themselves. Explain why not. [2]", marks: 2, kw: [["no mitochondria", "don't have mitochondria", "do not have mitochondria", "lack mitochondria"], ["respiration", "respire"]], model: "Red blood cells have no mitochondria (1), so they do not carry out aerobic respiration and do not use oxygen (1).", ex: "Aerobic respiration happens in mitochondria." },
        { t: "mcq", q: "Why do capillaries have walls only one cell thick?", o: ["To make them stronger", "So substances can pass through easily", "To stop blood leaking", "So the heart can pump faster"], a: 1, ex: "Thin walls = short distance for substances to move." },
        { t: "mcq", q: "Blood that has just left the lungs is…", o: ["dull red, low in oxygen", "bright red, rich in oxygen", "yellow, full of plasma", "blue"], a: 1, ex: "Haemoglobin + oxygen = bright red. (Blood is never really blue!)" },
        { t: "order", q: "Put the journey of blood in order, starting at the heart (circuit 1 then circuit 2).", items: ["Heart", "Lungs (picks up oxygen)", "Heart", "Body cells (drops off oxygen)", "Heart"], ex: "Two circuits: heart → lungs → heart, then heart → body → heart." },
        { t: "match", q: "Match each word to its meaning.", pairs: [["pathogen", "microorganism that causes disease"], ["capillary", "tiny blood vessel in all tissues"], ["circulation", "movement of blood around the body"], ["haemoglobin", "substance that traps oxygen"]], ex: "Learn these key terms — they appear in every test." },
        { t: "num", q: "A heart pumps 5 litres of blood per minute. How many litres does it pump in 1 hour?", a: 300, unit: "litres", ex: "5 × 60 = 300 litres." },
        { t: "mcq", q: "The circulatory system is made of…", o: ["heart, lungs and trachea", "heart, blood and blood vessels", "blood, bones and muscles", "plasma, alveoli and capillaries"], a: 1, ex: "Heart + blood + blood vessels." },
        { t: "mcq", q: "In 1900 scientists discovered why some transfusions failed. What did they find?", o: ["Blood can be replaced by milk", "People have different blood groups", "Blood is made in the heart", "White blood cells cause clotting"], a: 1, ex: "Blood groups A, B, AB and O — the wrong group makes blood clump." },
        { t: "sort", q: "Rafi tests: 'Does exercise increase pulse rate?' Sort each variable.", buckets: ["Independent", "Dependent", "Control"], items: [["Type of activity", 0], ["Pulse rate", 1], ["Breathing rate", 1], ["Time spent on each activity", 2], ["Same person each time", 2]], ex: "Change → independent; measure → dependent; keep same → control." },
        { t: "mcq", q: "Results are RELIABLE when…", o: ["they match your prediction", "repeated measurements give very similar results", "you use expensive equipment", "you only measure once"], a: 1, ex: "Repeat → similar values → reliable." },
        { t: "fill", q: "A ____ is something that can cause harm; a risk is the chance of it causing harm.", a: ["hazard"], bank: ["hazard", "variable", "pathogen", "risk"], ex: "Hazard = the dangerous thing. Risk = the chance it hurts you." },
        { t: "short", q: "Describe THREE functions of plasma. [3]", marks: 3, kw: [["carries blood cells", "carries the cells", "carries red", "transports cells", "blood cells"], ["food", "nutrient", "glucose"], ["carbon dioxide", "co2"]], model: "Plasma carries the blood cells (1), dissolved digested food/nutrients from the small intestine (1) and carbon dioxide from cells to the lungs (1).", ex: "Plasma = the transport liquid." }
      ]
    },

    /* ---------------------------------------------------- 1.2 RESPIRATORY */
    {
      id: "1.2",
      title: "Human respiratory system",
      emoji: "🫁",
      tagline: "Getting oxygen in and carbon dioxide out.",
      sections: [
        {
          h: "Aerobic respiration",
          html: `<p>All your cells need energy. They get it from <b>glucose</b> (from digested food) using <b>oxygen</b> (from the air). This chemical reaction is <b>aerobic respiration</b>. It happens in the <b>mitochondria</b> of plant and animal cells.</p>
          <div class="equation">oxygen + glucose → carbon dioxide + water</div>
          <p><b>Reactants</b> (left of the arrow): oxygen and glucose. <b>Products</b> (right): carbon dioxide and water. Energy is <b>released</b> slowly and in a controlled way.</p>
          <div class="callout warn"><b>Test fix!</b> On the test, "oxygen + water → glucose + carbon dioxide" was ticked — that's backwards and mixed up! Glucose is a <b>reactant</b> (it gets used up). Build it correctly below 👇</div>`,
          widget: "equationBuilder"
        },
        {
          h: "Diffusion and gas exchange",
          html: `<p>Particles in the air are always moving randomly. If there are more of a particle in one place than another, there is an overall movement from where there are <b>many (high concentration)</b> to where there are <b>fewer (low concentration)</b>. This is <b>diffusion</b>.</p>
          <p><b>Gas exchange</b> is when two or more gases move from place to place in opposite directions. Leaves do it through holes called <b>stomata</b>, opened and closed by <b>guard cells</b>. Humans do it in the <b>lungs</b>.</p>`,
          widget: "diffusion"
        },
        {
          h: "Gas exchange in the alveoli",
          html: `<p>The lungs contain millions of tiny air pockets called <b>alveoli</b> (one = alveolus), each covered in capillaries.</p>
          <ul><li><b>Oxygen</b> is high in the alveolus, low in the blood → diffuses <b>into the blood</b>.</li>
          <li><b>Carbon dioxide</b> is high in the blood, low in the alveolus → diffuses <b>into the alveolus</b> and is breathed out.</li></ul>
          <table class="tbl"><tr><th>Feature of alveoli</th><th>How it speeds up gas exchange</th></tr>
          <tr><td>Walls <b>one cell thick</b></td><td>Short distance for gases to diffuse</td></tr>
          <tr><td>Millions of them → <b>huge surface area</b></td><td>More gas can diffuse at the same time</td></tr>
          <tr><td>Covered in <b>capillaries</b> (good blood supply)</td><td>Blood keeps carrying oxygen away, keeping the difference high</td></tr>
          <tr><td>Moist lining</td><td>Gases dissolve and diffuse across</td></tr></table>
          <p class="tip">💡 On the test you wrote "sack sized" — the mark-winning words are <b>"large surface area"</b> and <b>"thin walls (one cell thick)"</b>.</p>`,
          widget: "alveolus"
        },
        {
          h: "Parts of the respiratory system",
          html: `<p>Air travels: <b>nose/mouth → trachea (windpipe) → bronchi → bronchioles → alveoli</b>.</p>
          <p>The lungs sit inside the <b>chest</b>, protected by the <b>ribcage</b>. <b>Intercostal muscles</b> join the ribs, and the <b>diaphragm</b> is a sheet of muscle under the lungs. Tap the labels to explore.</p>`,
          widget: "lungsLabel"
        },
        {
          h: "Keeping it clean: mucus and cilia",
          html: `<p>Dust, viruses and bacteria may damage your lungs. Your body fights back:</p>
          <ul><li><b>Nose hairs</b> filter out larger particles.</li>
          <li>Smaller particles stick to sticky <b>mucus</b> made by cells in the tubes.</li>
          <li><b>Ciliated epithelial cells</b> have tiny hairs (<b>cilia</b>) that wave to <b>sweep the mucus up</b> to your throat. You swallow it and <b>acid in your stomach</b> kills the microorganisms.</li></ul>
          <p>Try switching on "smoker" — the cilia stop working, mucus builds up → <b>more chest infections</b> and a smoker's cough.</p>`,
          widget: "cilia"
        },
        {
          h: "Muscles and breathing",
          html: `<p><b>Breathing</b> is the movement of muscles that makes air move in and out of your lungs. (Respiration is the chemical reaction in cells — don't mix them up!)</p>
          <table class="tbl"><tr><th></th><th>Inhale (breathe in)</th><th>Exhale (breathe out)</th></tr>
          <tr><td>Intercostal muscles</td><td>contract</td><td>relax</td></tr>
          <tr><td>Ribcage</td><td>moves up and out</td><td>falls down and in</td></tr>
          <tr><td>Diaphragm</td><td>contracts and flattens</td><td>relaxes and rises (dome)</td></tr>
          <tr><td>Chest volume</td><td>increases</td><td>decreases</td></tr>
          <tr><td>Air</td><td>flows in</td><td>flows out</td></tr></table>
          <p>The number of breaths in one minute is your <b>breathing rate</b>.</p>`,
          widget: "breathing"
        },
        {
          h: "Modelling the lungs: the bell jar",
          html: `<p>A <b>model</b> is a simple way of showing something complicated. In the bell jar model:</p>
          <ul><li>glass tubing = <b>trachea</b> and bronchi</li><li>balloons = <b>lungs</b></li><li>bell jar = <b>ribcage / chest</b></li><li>rubber membrane = <b>diaphragm</b></li></ul>
          <p>Pull the membrane down → volume inside increases → air rushes into the balloons. <b>Limitation:</b> the jar can't move like real ribs, and balloons are not made of millions of alveoli.</p>`,
          widget: "bellJar"
        },
        {
          h: "Skills: precise measurements & lung volume",
          html: `<p>Lung volume is the most air you can breathe out after a big breath in. Adult men average about <b>4.8 litres</b>, adult women about <b>3.1 litres</b>.</p>
          <p>A measurement is <b>precise</b> when repeated measurements are close together. Precision depends on the equipment — the smaller the difference it can measure, the more precise it is.</p>
          <p class="tip">⚠️ Hazard: sharing a mouthpiece spreads germs → use a clean mouthpiece each and never breathe in through it.</p>`,
          widget: "breathRate"
        },
        {
          h: "Science in context: air pollution",
          html: `<p>Engines that burn petrol and diesel produce substances that harm the respiratory and circulatory systems. The World Health Organization thinks about <b>7 million people</b> die each year due to air pollution. Cities try to cut it with cheap buses, bicycle lanes, electric vehicles and banning some cars.</p>`
        }
      ],
      keyFacts: [
        "Breathing is the movement of the diaphragm and intercostal muscles, which makes the lungs inflate and deflate.",
        "The walls of the alveoli and capillaries are only one cell thick, so gas exchange happens quickly by diffusion.",
        "Diffusion is the overall movement of particles from where there are many to where there are fewer.",
        "Aerobic respiration occurs in mitochondria and needs glucose and oxygen; it produces carbon dioxide and water."
      ],
      terms: [
        ["aerobic respiration", "respiration that uses oxygen to release energy from glucose"],
        ["respiratory system", "organs that get oxygen into the blood and remove carbon dioxide (breathing system)"],
        ["word equation", "model showing a reaction with reactants on the left of the arrow and products on the right"],
        ["diffusion", "spreading out of particles from where there are many to where there are fewer"],
        ["gas exchange", "when two or more gases move from place to place in opposite directions"],
        ["stoma", "hole in a leaf formed between two guard cells (plural: stomata)"],
        ["guard cell", "cell that helps form a stoma in a leaf, to allow gases in and out"],
        ["lungs", "organs that get oxygen into the blood and remove carbon dioxide"],
        ["alveolus", "tiny, pocket-shaped structure in lungs where gas exchange happens (plural: alveoli)"],
        ["trachea", "tube-shaped organ that allows air to flow in and out of your lungs (windpipe)"],
        ["bronchus", "large tube leading from the trachea into a lung (plural: bronchi)"],
        ["bronchioles", "small tubes leading from the bronchus in a lung"],
        ["diaphragm", "muscle under the lungs that helps with breathing"],
        ["intercostal muscles", "muscles that join the ribs together and move the ribcage"],
        ["ribcage", "all your ribs; protects the heart and lungs"],
        ["cilia", "waving strands that stick out of some cells"],
        ["ciliated epithelial cell", "specialised cell with waving cilia to sweep mucus along"],
        ["mucus", "sticky liquid that traps particles"],
        ["breathing", "movements of muscles that cause air to move in and out of your lungs"],
        ["breathing rate", "number of times you inhale and exhale in one minute"],
        ["inhale", "breathing in"],
        ["exhale", "breathing out"],
        ["contract", "when muscle tissue gets shorter and fatter"],
        ["relax", "when muscle tissue stops contracting"],
        ["precise", "how close repeated measurements are; depends on the measuring equipment"]
      ],
      quiz: [
        { t: "mcq", q: "Which is the correct word equation for aerobic respiration?", o: ["glucose + carbon dioxide → oxygen + water", "oxygen + glucose → carbon dioxide + water", "oxygen + water → glucose + carbon dioxide", "glucose + water → oxygen + carbon dioxide"], a: 1, ex: "Oxygen + glucose (reactants) → carbon dioxide + water (products). This was on your test!" },
        { t: "sort", q: "Sort into reactants and products of aerobic respiration.", buckets: ["Reactants", "Products"], items: [["oxygen", 0], ["glucose", 0], ["carbon dioxide", 1], ["water", 1]], ex: "Reactants are used up; products are made." },
        { t: "mcq", q: "Where in a cell does aerobic respiration happen?", o: ["Nucleus", "Cell membrane", "Mitochondria", "Vacuole"], a: 2, ex: "Mitochondria — muscle cells have lots of them." },
        { t: "mcq", q: "Another name for the trachea is…", o: ["bronchus", "windpipe", "oesophagus", "ventricle"], a: 1, ex: "Trachea = windpipe." },
        { t: "order", q: "Put the path of air into the lungs in order.", items: ["Nose / mouth", "Trachea", "Bronchus", "Bronchioles", "Alveoli"], ex: "Big tube → smaller tubes → tiny air sacs." },
        { t: "fill", q: "Gases move in and out of the alveoli by ____.", a: ["diffusion"], bank: ["diffusion", "breathing", "respiration", "digestion"], ex: "High concentration → low concentration." },
        { t: "short", q: "Gas exchange happens in the alveoli. Describe TWO features of the alveoli and explain how each helps gas exchange happen quickly. [2]", marks: 2, kw: [["one cell thick", "thin wall", "thin"], ["surface area", "large area", "millions", "many alveoli", "blood supply", "capillar"]], model: "Walls are one cell thick, so gases only diffuse a short distance (1). There are millions of alveoli giving a large surface area, so more gas diffuses at once (1). (Also: good blood supply from many capillaries.)", ex: "Feature + why it helps for each mark." },
        { t: "mcq", q: "Why does carbon dioxide move from the blood into an alveolus?", o: ["The lungs suck it out", "There is more CO₂ in the blood than in the alveolus", "Red blood cells push it", "There is more CO₂ in the alveolus"], a: 1, ex: "Diffusion: from high concentration (blood) to low (alveolus)." },
        { t: "tf", q: "When you inhale, your diaphragm contracts and flattens.", a: true, ex: "Contracts + flattens → chest volume increases → air in." },
        { t: "tf", q: "When you exhale, your intercostal muscles contract and your ribs move up.", a: false, ex: "Exhale: intercostals relax, ribcage falls." },
        { t: "match", q: "Match the bell jar model part to the real body part.", pairs: [["balloons", "lungs"], ["rubber membrane", "diaphragm"], ["glass tubing", "trachea"], ["bell jar", "ribcage / chest"]], ex: "Models make complicated things easier to understand." },
        { t: "num", q: "A student inhales and exhales 6 times in 30 seconds. What is the breathing rate (breaths per minute)?", a: 12, unit: "breaths/min", ex: "30 s is half a minute → 6 × 2 = 12." },
        { t: "num", q: "A student breathes in and out 7 times in 35 seconds. Calculate the breathing rate in breaths per minute.", a: 12, unit: "breaths/min", ex: "7 ÷ 35 = 0.2 breaths per second × 60 = 12." },
        { t: "short", q: "Smoke damages the cilia on the cells lining Uncle Karim's trachea. Explain why this means he gets more chest infections. [2]", marks: 2, kw: [["mucus", "sweep", "not removed", "can't move", "cannot move"], ["bacteria", "pathogen", "microorganism", "microbe", "germ", "virus"]], model: "Cilia normally sweep mucus (with trapped bacteria) up to the throat (1). If they are damaged, mucus and pathogens stay in the lungs and cause infections (1).", ex: "Name the mucus AND the pathogens." },
        { t: "mcq", q: "What happens to the mucus that cilia sweep up to the throat?", o: ["It is coughed onto the floor", "It is swallowed and stomach acid kills the microorganisms", "It goes back into the lungs", "It is absorbed into the blood"], a: 1, ex: "Swallowed → stomach acid kills microbes." },
        { t: "short", q: "What is the difference between respiration and breathing? [2]", marks: 2, kw: [["chemical", "reaction", "release energy", "releases energy", "in cells", "glucose"], ["muscle", "air in", "move air", "in and out", "lungs"]], model: "Respiration is a chemical reaction in cells that releases energy from glucose (1). Breathing is the muscle movement that moves air in and out of the lungs (1).", ex: "Very common exam trap!" },
        { t: "mcq", q: "What are the tiny holes in a leaf that let gases in and out called?", o: ["Alveoli", "Stomata", "Cilia", "Bronchioles"], a: 1, ex: "Stomata, opened and closed by guard cells." },
        { t: "mcq", q: "A measurement is precise when…", o: ["it is exactly the true value", "repeated measurements are close to each other", "it uses a ruler", "it is done once carefully"], a: 1, ex: "Precise = repeat values close together." },
        { t: "sort", q: "Inhale or exhale?", buckets: ["Inhale", "Exhale"], items: [["Diaphragm flattens", 0], ["Ribs move up and out", 0], ["Chest volume increases", 0], ["Diaphragm rises into a dome", 1], ["Intercostal muscles relax", 1], ["Air flows out", 1]], ex: "Inhale = contract & expand; exhale = relax & shrink." },
        { t: "mcq", q: "Why do muscle cells have lots of mitochondria?", o: ["To store oxygen", "They need lots of energy from respiration", "To make haemoglobin", "To make them stronger"], a: 1, ex: "More mitochondria → more respiration → more energy." }
      ]
    },

    /* ---------------------------------------------------- 1.3 SKELETON */
    {
      id: "1.3",
      title: "Skeleton, joints and muscles",
      emoji: "🦴",
      tagline: "Support, protection and movement.",
      sections: [
        {
          h: "The skeletal system",
          html: `<p>Babies are born with about <b>270 bones</b>, but adults only have <b>206</b> — some bones join (fuse) together as we grow.</p>
          <p>Your bones work together to form your <b>skeletal system</b> (an <b>organ system</b>). It has three main functions:</p>
          <ul><li><b>Support</b> — holds parts of your body in position (e.g. backbone, leg bones)</li>
          <li><b>Protection</b> — stops parts being damaged (skull → brain, ribs → heart and lungs)</li>
          <li><b>Movement</b> — lets you move using <b>joints</b> and muscles</li></ul>
          <p>Tap a bone to see its job.</p>`,
          widget: "skeleton"
        },
        {
          h: "Joints",
          html: `<p>Bones meet at places called <b>joints</b>.</p>
          <table class="tbl"><tr><th>Joint</th><th>Movement</th><th>Examples</th></tr>
          <tr><td><b>Fixed joint</b></td><td>No movement</td><td>Between skull bones</td></tr>
          <tr><td><b>Ball and socket</b></td><td>Many directions (rotates)</td><td>Hip, shoulder</td></tr>
          <tr><td><b>Hinge</b></td><td>Two opposite directions only (like a door)</td><td>Elbow, knee</td></tr></table>
          <p>In a ball and socket joint, a ball of bone (top of the thigh bone) fits into a socket in another bone (hip).</p>`,
          widget: "joints"
        },
        {
          h: "Muscles, tendons and ligaments",
          html: `<ul><li><b>Ligaments</b> are cords that hold <b>bone to bone</b> at a joint.</li>
          <li><b>Tendons</b> attach <b>muscle to bone</b>.</li>
          <li>A muscle <b>contracts</b> (gets shorter and fatter) to pull a bone. When it stops it <b>relaxes</b>.</li></ul>
          <p>Muscles can only <b>pull</b>, never push! So bones are moved by <b>antagonistic pairs</b> of muscles: one pulls the bone one way, the other pulls it back.</p>
          <p><b>Biceps</b> contracts → arm bends. <b>Triceps</b> contracts → arm straightens. Drag the slider:</p>
          <p class="tip">💡 Your test answer about the triceps got full marks — the key idea is "muscles can only pull, so a second muscle is needed to pull the arm straight again".</p>`,
          widget: "arm"
        },
        {
          h: "Injuries",
          html: `<ul><li><b>Fracture</b> — a broken bone.</li>
          <li><b>Dislocation</b> — a bone comes out of place in a joint, so muscles can't pull the bones in the right direction.</li>
          <li><b>Pulled muscle</b> — a muscle or tendon has been stretched too much.</li>
          <li><b>Sprain</b> — a ligament has been stretched too much.</li></ul>
          <p>Doctors use <b>X-rays</b> to see bones inside the body. Worn-out joints (e.g. the top of the thigh bone) can be replaced with artificial ones — the material must be <b>strong</b>, <b>smooth/low-friction</b> and not react with the body.</p>`,
          widget: "injuryMatch"
        },
        {
          h: "Science in context: walking robots",
          html: `<p>Scientists have tried to build robots that walk like humans for thousands of years. It is hard because our muscles, bones and nervous system work together in a complicated way. Today's robots use batteries and computer control. They can explore dangerous places (like volcanoes) and help people with difficulties moving.</p>`
        }
      ],
      keyFacts: [
        "The skeletal system protects and supports parts of the body, and allows the body to move.",
        "Two important types of joint are ball and socket joints and hinge joints.",
        "Muscles cannot push and so antagonistic pairs of muscles are needed to move a bone in opposite directions."
      ],
      terms: [
        ["skeleton", "another term for your skeletal system"],
        ["skeletal system", "group of organs that support the body and allow movement"],
        ["organ system", "group of organs working together"],
        ["joint", "place in your skeleton where bones meet"],
        ["rib", "bone that helps to protect your heart and lungs"],
        ["skull", "a collection of bones that protect your brain"],
        ["vertebra", "one of the bones in your back (plural: vertebrae)"],
        ["ball and socket joint", "joint where a ball-shaped piece of bone fits into a socket; moves in many directions"],
        ["hinge joint", "joint where two bones form a hinge; moves in two opposite directions"],
        ["antagonistic pair", "two muscles that pull a bone in opposite directions"],
        ["ligament", "cord that holds bones together at a joint"],
        ["tendon", "attaches a muscle to a bone"]
      ],
      quiz: [
        { t: "fill", q: "A ____ attaches a muscle to a bone.", a: ["tendon"], bank: ["tendon", "ligament", "fibre", "joint"], ex: "Tendon = muscle-to-bone. Ligament = bone-to-bone." },
        { t: "fill", q: "A ____ holds bones together at a joint.", a: ["ligament"], bank: ["tendon", "ligament", "cartilage", "muscle"], ex: "Ligament = bone-to-bone." },
        { t: "mcq", q: "Which joint allows movement in many directions?", o: ["Elbow", "Knee", "Shoulder", "Joints between skull bones"], a: 2, ex: "Shoulder (and hip) are ball and socket joints." },
        { t: "mcq", q: "A type of joint that allows movement in just two opposite directions is a…", o: ["sliding joint", "fixed joint", "ball and socket joint", "hinge joint"], a: 3, ex: "Hinge joints: elbow and knee." },
        { t: "mcq", q: "When a muscle gets shorter and fatter it…", o: ["relaxes", "rejoices", "contracts", "constricts"], a: 2, ex: "Contracts." },
        { t: "sort", q: "Which type of joint?", buckets: ["Ball and socket", "Hinge", "Fixed"], items: [["Hip", 0], ["Shoulder", 0], ["Elbow", 1], ["Knee", 1], ["Between skull bones", 2]], ex: "Ball & socket = all directions; hinge = like a door; fixed = no movement." },
        { t: "short", q: "The biceps contracts to bend the arm at the elbow. Explain why the triceps is needed to straighten the arm again. [2]", marks: 2, kw: [["only pull", "cannot push", "can't push", "pull not push"], ["triceps contract", "triceps must contract", "triceps pulls", "pull the arm", "pull the lower arm", "pulls the bone", "opposite direction", "straight", "antagonistic"]], model: "Muscles can only pull, not push (1), so the triceps must contract to pull the lower arm back down / straight (1). They are an antagonistic pair.", ex: "You got this one right on your test 👏" },
        { t: "sort", q: "Sort each example into the function of the skeleton.", buckets: ["Support", "Protection", "Movement"], items: [["Backbone holds the body upright", 0], ["Leg bones hold up your weight", 0], ["Skull around the brain", 1], ["Ribs around the heart and lungs", 1], ["Elbow joint lets you bend your arm", 2]], ex: "Support, protection, movement." },
        { t: "mcq", q: "Which organ is protected by the skull?", o: ["Heart", "Brain", "Lungs", "Stomach"], a: 1, ex: "Skull → brain." },
        { t: "mcq", q: "Which organs are protected by the ribs?", o: ["Brain and eyes", "Heart and lungs", "Kidneys and liver", "Stomach and intestines"], a: 1, ex: "Ribcage → heart and lungs." },
        { t: "match", q: "Match the injury to its description.", pairs: [["fracture", "a broken bone"], ["dislocation", "bone comes out of place in a joint"], ["sprain", "ligament stretched too much"], ["pulled muscle", "muscle or tendon stretched too much"]], ex: "Sprain = ligament; pulled = muscle/tendon." },
        { t: "tf", q: "Adults have more bones than babies.", a: false, ex: "Babies ~270, adults 206 — some bones fuse together." },
        { t: "tf", q: "Muscles can push bones as well as pull them.", a: false, ex: "Muscles can ONLY pull. That's why we need antagonistic pairs." },
        { t: "mcq", q: "When the arm is lowered (straightened), what does the biceps do?", o: ["Contracts", "Relaxes", "Pushes", "Breaks"], a: 1, ex: "Triceps contracts, biceps relaxes." },
        { t: "short", q: "Give one similarity and one difference between a sprain and a pulled muscle. [2]", marks: 2, kw: [["stretched", "over-stretch", "overstretch", "too much"], ["ligament"]], model: "Similarity: both are caused by something being stretched too much (1). Difference: a sprain is a stretched ligament; a pulled muscle is a stretched muscle or tendon (1).", ex: "Name the ligament for the difference mark." },
        { t: "short", q: "The top of a thigh bone sometimes wears down and needs replacing. Explain two properties needed by the replacement material. [2]", marks: 2, kw: [["strong", "hard", "not break", "tough"], ["smooth", "friction", "not react", "safe", "not rust", "won't wear", "long-lasting", "durable"]], model: "Strong so it supports the body's weight without breaking (1); smooth so it moves easily in the socket / does not react with the body (1).", ex: "Property + reason." },
        { t: "num", q: "Babies have about 270 bones and adults 206. How many bones 'disappear' by fusing together?", a: 64, unit: "bones", ex: "270 − 206 = 64." },
        { t: "mcq", q: "Why are muscles found in antagonistic pairs?", o: ["So one can rest while the other pushes", "Because muscles can only pull, so one pulls each way", "To make bones grow", "To protect the joints"], a: 1, ex: "Two pullers = movement both ways." }
      ]
    }
  ],
  review: [
    { t: "mcq", q: "Your heart, blood and blood vessels are all part of your…", o: ["respiratory system", "circulatory system", "excretory system", "nervous system"], a: 1, ex: "Circulatory system." },
    { t: "mcq", q: "The process by which PLANT cells release energy is called…", o: ["aerobic respiration", "photosynthesis", "transpiration", "diffusion"], a: 0, ex: "Plants respire too! Photosynthesis makes glucose; respiration releases energy from it." },
    { t: "short", q: "Describe the function of white blood cells. [1]", marks: 1, kw: [["destroy", "kill", "fight", "protect", "engulf", "wrap"]], model: "They destroy microorganisms / pathogens that get into the body.", ex: "Defence!" },
    { t: "short", q: "Write out the word equation for aerobic respiration. [2]", marks: 2, kw: [["oxygen + glucose", "glucose + oxygen"], ["carbon dioxide + water", "water + carbon dioxide"]], model: "oxygen + glucose → carbon dioxide + water", ex: "Reactants on the left, products on the right." },
    { t: "short", q: "State two functions of the skeletal system other than protection. [2]", marks: 2, kw: [["support"], ["movement", "move"]], model: "Support (1) and movement (1).", ex: "Support, protection, movement." },
    { t: "num", q: "From a graph: an athlete running at 12.8 km/h has a pulse rate of 135 bpm; at 15 km/h it is 152. By how many beats per minute did the pulse rate increase?", a: 17, unit: "bpm", ex: "152 − 135 = 17." },
    { t: "mcq", q: "Why does pulse rate increase as running speed increases?", o: ["The heart gets tired", "Muscles need more oxygen and glucose for respiration, so the heart pumps blood faster", "The lungs get smaller", "Blood gets thicker"], a: 1, ex: "More exercise → more respiration → more O₂ and glucose needed → faster heart." },
    { t: "mcq", q: "Carbon monoxide sticks to haemoglobin. What symptom would you expect?", o: ["Slower breathing", "Increased breathing rate and tiredness", "Stronger bones", "More white blood cells"], a: 1, ex: "Less haemoglobin free to carry oxygen → body breathes faster to compensate." },
    { t: "short", q: "Farida has fewer red blood cells than normal. She feels tired and gets out of breath easily. Explain why. [2]", marks: 2, kw: [["less oxygen", "fewer oxygen", "not enough oxygen", "carry less", "less haemoglobin"], ["respiration", "energy"]], model: "Fewer red blood cells carry less oxygen to her cells (1), so less aerobic respiration happens and less energy is released — she feels tired and breathes faster (1).", ex: "Link oxygen → respiration → energy." },
    { t: "mcq", q: "In the knee, which part connects a muscle to the lower leg bone?", o: ["Ligament", "Tendon", "Cartilage", "Vertebra"], a: 1, ex: "Tendon." }
  ]
});
