/* =========================================================
   CHAPTER 2 — Nutrition
   ========================================================= */
window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 2,
  title: "Nutrition",
  emoji: "🥗",
  color: "#2fb36b",
  blurb: "What's in your food, why you need it, and how your lifestyle — diet, exercise, smoking — affects your health.",
  topics: [
    /* ---------------------------------------------------- 2.1 BALANCED DIET */
    {
      id: "2.1",
      title: "A balanced diet",
      emoji: "🍽️",
      tagline: "Energy, growth, repair and health.",
      sections: [
        {
          h: "Diets and nutrients",
          html: `<p>Your <b>diet</b> is what you eat and drink. You need food for:</p>
          <ul><li>⚡ <b>energy</b></li><li>💪 <b>growth and repair</b></li><li>❤️ <b>health</b></li></ul>
          <p>A <b>nutrient</b> is any substance needed for energy or used as a raw material to make other substances.</p>
          <table class="tbl"><tr><th>Nutrient</th><th>Job</th><th>Good sources</th></tr>
          <tr><td><b>Carbohydrates</b></td><td>Energy</td><td>Rice, bread, pasta, potatoes, sugar</td></tr>
          <tr><td><b>Fats</b> (lipids)</td><td>Store energy, keep you warm</td><td>Butter, cheese, oils, nuts, milk</td></tr>
          <tr><td><b>Proteins</b></td><td>Growth and repair</td><td>Meat, fish, eggs, beans, lentils, tofu</td></tr>
          <tr><td><b>Vitamins</b> & <b>minerals</b></td><td>Health (small amounts)</td><td>Fruit, vegetables, milk, fish</td></tr>
          <tr><td><b>Water</b></td><td>Carries substances, controls temperature (sweating)</td><td>Drinks, food</td></tr></table>
          <p><b>Fibre</b> is <i>not</i> a nutrient — it isn't digested or absorbed — but it helps food move through the intestines and prevents <b>constipation</b>. Sources: wholemeal bread, brown rice, cereals, lentils, fruit.</p>
          <p>Drag each food to its main nutrient 👇</p>`,
          widget: "nutrientSort"
        },
        {
          h: "Food labels and energy",
          html: `<p>Food labels show how much energy and nutrients are in food. Energy is measured in <b>joules (J)</b>. 1000 J = <b>1 kilojoule (kJ)</b>. You need roughly <b>8000–10 000 kJ</b> each day — more if you're active or growing.</p>
          <p>Some labels use <b>kilocalories (kcal)</b>. Labels give values <b>per 100 g</b> so you can compare foods fairly.</p>
          <p class="tip">💡 Units: 1 g = 1000 mg. So 500 mg = 0.5 g.</p>`,
          widget: "foodLabel"
        },
        {
          h: "Carbohydrates",
          html: `<p>Carbohydrates are compounds made of carbon, hydrogen and oxygen. They are an excellent source of <b>energy</b> — respiration releases energy from them.</p>
          <ul><li><b>Sugars</b> are small, <b>soluble</b> particles (e.g. glucose, sucrose = table sugar). Found in sweet foods, sweets and cakes. Sugary foods can damage teeth.</li>
          <li><b>Starch</b> is a large, insoluble carbohydrate. Found in rice, pasta, potatoes and bread.</li></ul>
          <p>Your body does not use all the carbohydrate you eat — extra is turned into <b>fat</b> and stored. Overeating carbohydrates makes people get larger.</p>`
        },
        {
          h: "Investigating energy in food (the burning peanut!)",
          html: `<p>Burning food releases energy that heats water. More energy → bigger temperature rise.</p>
          <div class="equation">change in temperature = temperature at end − temperature at start</div>
          <ul><li><b>Independent variable:</b> type of food</li>
          <li><b>Dependent variable:</b> rise in temperature of the water</li>
          <li><b>Control variables:</b> <b>mass of food</b>, <b>volume of water</b>, starting temperature, distance of food from the tube</li></ul>
          <div class="callout warn"><b>Test fix!</b> When comparing a peanut and a biscuit, say "<b>the same mass of food</b>" or "<b>the same volume of water</b>".
          <br><b>Hazards:</b> the burning food / hot needle / flame can burn you → <b>wear safety goggles, tie hair back, use a heat-proof mat, hold the needle by its handle, don't touch the hot tube</b>. Also: nut allergies — check first!</div>
          <p>Try the experiment yourself 🔥</p>`,
          widget: "burnFood"
        },
        {
          h: "Fats and proteins",
          html: `<p><b>Fats (lipids)</b> store energy. Fat under your skin also helps keep you warm. Sources: butter, cheese, eggs, oils, milk. Eating too many fatty foods makes people get larger.</p>
          <p><b>Proteins</b> are used to make new cells, to repair the body and to let you grow. Muscles are mainly protein, so meat is a good source. Others: beans, cheese, eggs, fish, lentils, milk, tofu. Athletes and growing children need extra protein.</p>`
        },
        {
          h: "Vitamins and minerals",
          html: `<p>You need <b>small amounts</b> of vitamins and minerals to keep your body healthy and working properly. Tap each card to flip it.</p>
          <div class="callout warn"><b>Test fix!</b> A sailor eats no fresh fruit or vegetables and his gums bleed → he's missing <b>vitamin C</b> (the disease is called <b>scurvy</b>). Calcium is for bones and teeth, not gums.</div>`,
          widget: "vitaminCards"
        },
        {
          h: "A balanced diet",
          html: `<p>No single food has every nutrient in the right amount. If you eat <b>many different foods</b> and get nutrients in the <b>correct amounts</b>, you have a <b>balanced diet</b>.</p>
          <p>Governments make recommendations. EU Reference Intakes (adult, per day): <b>energy 8400 kJ (2000 kcal)</b>, protein 50 g, carbohydrate 260 g, <b>sugars max 90 g</b>, fat 70 g.</p>
          <p>Build a plate and see if it's balanced 👇</p>`,
          widget: "plateBuilder"
        },
        {
          h: "Risk assessments",
          html: `<p>A <b>hazard</b> is something that may cause harm. A <b>risk</b> is the chance of it causing harm. A <b>risk assessment</b> is a list of hazards and how to control the risks. Three steps:</p>
          <ol><li>Identify the hazards</li><li>Identify who could be harmed</li><li>Plan ways to control the risk for everyone</li></ol>
          <table class="tbl"><tr><th>Substance</th><th>Hazard</th><th>Control</th></tr>
          <tr><td>Iodine solution</td><td>Stains skin & clothes; stings eyes</td><td>Use a dropper; wear eye protection</td></tr>
          <tr><td>Biuret solution</td><td>Corrosive — can cause eye damage</td><td>Eye protection; avoid splashes</td></tr>
          <tr><td>Burning food</td><td>Burns, fire</td><td>Heat-proof mat, goggles, tie hair back, check for allergies</td></tr></table>`
        }
      ],
      keyFacts: [
        "Your diet needs to contain nutrients (carbohydrates, fats, proteins, minerals and vitamins) for energy, growth and repair, and health.",
        "A balanced diet contains the right amount of the different nutrients from a wide variety of different foods.",
        "You also need water and fibre in your diet.",
        "Carbohydrates and fats store energy, which is measured in joules (J) or kilojoules (kJ)."
      ],
      terms: [
        ["diet", "what you eat and drink"],
        ["nutrient", "a substance that an organism needs to stay healthy and survive"],
        ["carbohydrate", "nutrient needed for energy, e.g. starch and sugars (glucose)"],
        ["fats", "nutrients needed by your body to store energy (also called lipids)"],
        ["lipids", "another name for fats"],
        ["proteins", "nutrients you need for growth and repair"],
        ["vitamins", "nutrients you need in small amounts for health, growth and repair"],
        ["minerals", "nutrients needed in small amounts, e.g. calcium and iron"],
        ["fibre", "food substance that cannot be digested but helps to keep your intestines healthy"],
        ["constipation", "when your intestines become blocked"],
        ["faeces", "solid waste material produced by humans and other animals"],
        ["joule", "unit used to measure energy (1000 J = 1 kJ)"],
        ["sugar", "soluble carbohydrate which exists as small particles, e.g. glucose"],
        ["starch", "large, insoluble carbohydrate found in rice, pasta, potatoes and bread"],
        ["balanced diet", "eating many different foods to get the correct amount of nutrients"],
        ["risk assessment", "a list of hazards and ways of controlling the risks"]
      ],
      quiz: [
        { t: "mcq", q: "A sailor on a long voyage eats no fresh fruit or vegetables. His gums start to bleed. Which nutrient is he missing?", o: ["Vitamin C", "Protein", "Fat", "Calcium"], a: 0, ex: "Vitamin C keeps skin and gums healthy. Lack of it = scurvy. (This was on your test!)" },
        { t: "fill", q: "____ is not digested, but it helps food move through the intestines and prevents constipation.", a: ["fibre", "fiber"], bank: ["fibre", "glucose", "plasma", "calcium"], ex: "Fibre — found in wholemeal bread, brown rice, lentils, fruit." },
        { t: "fill", q: "A person who does not eat enough ____ cannot make enough red blood cells and feels tired all the time.", a: ["iron"], bank: ["iron", "calcium", "fibre", "glucose"], ex: "Iron is needed to make haemoglobin in red blood cells." },
        { t: "sort", q: "Which nutrient is each food mainly a source of?", buckets: ["Carbohydrate", "Protein", "Fat"], items: [["Rice", 0], ["Bread", 0], ["Potatoes", 0], ["Fish", 1], ["Lentils", 1], ["Eggs", 1], ["Butter", 2], ["Cooking oil", 2]], ex: "Starchy = carbohydrate; meat/fish/beans = protein; butter/oil = fat." },
        { t: "match", q: "Match each nutrient to its job.", pairs: [["carbohydrates", "energy"], ["proteins", "growth and repair"], ["fats", "store energy and keep you warm"], ["vitamins and minerals", "keep the body healthy"]], ex: "The big four!" },
        { t: "match", q: "Match the vitamin or mineral to what it does.", pairs: [["vitamin A", "keeps eyes and skin healthy"], ["vitamin C", "keeps skin and gums healthy"], ["calcium", "used in bones and teeth"], ["iron", "used in red blood cells"]], ex: "Vitamin D also helps bones and teeth." },
        { t: "num", q: "Tasnim's water starts at 21.0 °C and ends at 45.5 °C. Calculate the rise in temperature.", a: 24.5, unit: "°C", ex: "45.5 − 21.0 = 24.5 °C. You got this right! ✅" },
        { t: "short", q: "State ONE hazard in the burning-food experiment and how to control the risk. [2]", marks: 2, kw: [["burn", "fire", "flame", "hot", "allerg"], ["goggles", "tie hair", "heat-proof", "heatproof", "mat", "handle", "tongs", "clamp", "away", "careful", "check", "glasses", "eye protection", "insulated"]], model: "Hazard: the burning food / flame could burn you (1). Control: wear safety goggles, tie hair back and use a heat-proof mat; hold the needle by its handle (1).", ex: "A hazard + a sensible control." },
        { t: "mcq", q: "Tasnim wants to compare the energy in a peanut and a biscuit. Which variable must she keep the same?", o: ["The type of food", "The mass of food", "The rise in temperature", "The final temperature"], a: 1, ex: "Mass of food (or volume of water). Type of food is the independent variable; temperature rise is dependent." },
        { t: "sort", q: "Burning-food experiment: sort the variables.", buckets: ["Independent", "Dependent", "Control"], items: [["Type of food", 0], ["Rise in water temperature", 1], ["Mass of food", 2], ["Volume of water", 2], ["Distance of food from tube", 2]], ex: "Change food; measure temperature rise; keep the rest the same." },
        { t: "num", q: "Cookie: water started at 18.5 °C, ended at 28.5 °C. What is the temperature rise?", a: 10, unit: "°C", ex: "28.5 − 18.5 = 10.0 °C." },
        { t: "mcq", q: "From the table: bread rise 5.4 °C, cookie 10.0 °C, popcorn 7.9 °C. Which food contained the most energy?", o: ["Bread", "Cookie", "Popcorn", "All the same"], a: 1, ex: "Biggest temperature rise = most energy released." },
        { t: "mcq", q: "What is energy measured in?", o: ["Grams", "Joules", "Litres", "Degrees"], a: 1, ex: "Joules (J) or kilojoules (kJ)." },
        { t: "num", q: "How many grams is 500 mg?", a: 0.5, unit: "g", ex: "500 ÷ 1000 = 0.5 g." },
        { t: "num", q: "How many milligrams is 4.7 g?", a: 4700, unit: "mg", ex: "4.7 × 1000 = 4700 mg." },
        { t: "tf", q: "Fibre is a nutrient because it is absorbed into the blood.", a: false, ex: "Fibre is NOT digested or absorbed, so it isn't classed as a nutrient." },
        { t: "mcq", q: "What happens to extra carbohydrate your body doesn't use?", o: ["It is breathed out", "It turns into fat and is stored", "It becomes protein", "It turns into fibre"], a: 1, ex: "Overeating carbohydrates → stored fat." },
        { t: "mcq", q: "Which is a large, insoluble carbohydrate?", o: ["Glucose", "Sucrose", "Starch", "Protein"], a: 2, ex: "Starch — in rice, pasta, potatoes, bread." },
        { t: "short", q: "Explain why more active people need to eat more food. [2]", marks: 2, kw: [["energy"], ["respiration", "muscles", "exercise", "move", "active"]], model: "Active people's muscles do more respiration (1) so they need more energy from food (1).", ex: "Activity → respiration → energy." },
        { t: "short", q: "Why should people not eat lots of sweet things? Give two reasons. [2]", marks: 2, kw: [["teeth", "tooth", "decay"], ["fat", "obes", "weight", "larger", "diabetes"]], model: "Sugary foods damage teeth (1). Extra sugar is turned into fat, leading to obesity / type 2 diabetes (1).", ex: "Teeth + fat." },
        { t: "mcq", q: "A hazard is…", o: ["the chance of something causing harm", "something that may cause harm", "a way to control harm", "a variable"], a: 1, ex: "Hazard = the thing; risk = the chance." }
      ]
    },

    /* ---------------------------------------------------- 2.2 LIFESTYLE */
    {
      id: "2.2",
      title: "The effects of lifestyle on health",
      emoji: "🏃",
      tagline: "Diet, exercise, drugs and smoking.",
      sections: [
        {
          h: "Lifestyle and deficiencies",
          html: `<p>The way we live our lives is called our <b>lifestyle</b>. It affects our growth, development and health.</p>
          <p>People who do not get enough of a nutrient may have a <b>nutritional deficiency</b>:</p>
          <ul><li>Not enough <b>protein</b> → poor growth (shorter, weaker muscles)</li>
          <li>Not enough <b>calcium</b> or <b>vitamin D</b> → weak bones and teeth</li>
          <li>Not enough <b>iron</b> → too few red blood cells → tired (anaemia)</li>
          <li>Not enough <b>vitamin C</b> → bleeding gums (scurvy)</li>
          <li>Not enough <b>vitamin A</b> → poor eyesight (even blindness)</li></ul>
          <p>A graph of protein eaten vs. height shows a <b>trend</b> — more protein, taller boys. But a link doesn't <i>prove</i> one causes the other — more studies are needed.</p>`,
          widget: "trendGraph"
        },
        {
          h: "Obesity and heart disease",
          html: `<p>Eating too much carbohydrate and fat, plus too little exercise, can lead to <b>obesity</b> — being so overweight that your health is in danger.</p>
          <p>Health problems linked to obesity:</p>
          <ul><li><b>Type 2 diabetes</b> — too much glucose dissolved in the blood plasma, damaging organs like the heart and eyes.</li>
          <li><b>High blood pressure</b> — blood vessels may burst (also caused by too much <b>salt</b>).</li>
          <li><b>Heart disease</b> — fat blocks the blood vessels that supply the heart muscle, so the heart doesn't work well.</li>
          <li><b>Stroke</b> — part of the brain is damaged when blood stops getting to it.</li></ul>
          <p>Drag the slider to see years of a fatty diet build up in an artery 👇</p>`,
          widget: "artery"
        },
        {
          h: "Fitness and exercise",
          html: `<p>Exercise strengthens your <b>muscles and bones</b> and helps you control your weight. It also strengthens your <b>heart</b>, making it better at pumping blood. Easy ways: walking, running upstairs, cycling, sport.</p>`
        },
        {
          h: "Drugs",
          html: `<p>A <b>drug</b> is a chemical that changes the way your body works.</p>
          <ul><li><b>Pharmaceutical drugs</b> (medicines) are used to fight disease or reduce pain, e.g. painkillers, antibiotics, decongestants.</li>
          <li><b>Illegal drugs</b> are not allowed to be bought or used — they can damage the body and mind.</li></ul>`
        },
        {
          h: "Smoking",
          html: `<p>Tobacco smoke damages the respiratory and circulatory systems.</p>
          <table class="tbl"><tr><th>Substance in smoke</th><th>Effect</th></tr>
          <tr><td><b>Nicotine</b></td><td><b>Addictive</b> drug; increases heart rate; makes blood vessels narrower → more likely to become blocked</td></tr>
          <tr><td><b>Tar</b></td><td>Black sticky substance that coats the lungs; causes <b>cancer</b> (cells divide uncontrollably → a <b>tumour</b>); coats alveoli → poor gas exchange</td></tr>
          <tr><td>Other chemicals</td><td><b>Paralyse the cilia</b> → mucus isn't swept away → <b>smoker's cough</b> and more chest infections</td></tr></table>
          <p>Smoking also destroys alveoli walls → <b>less surface area</b> for gas exchange → smokers get breathless.</p>`,
          widget: "smokerLungs"
        },
        {
          h: "Skills: line graphs and lines of best fit",
          html: `<p>Between 1900 and 1950 lung cancer increased a lot in the UK. Dr Richard Doll tested hypotheses (roads, traffic, smoking) and found: the more people smoked, the more lung cancer deaths. A <b>line graph</b> shows how one variable changes with another. A <b>line of best fit</b> goes through the middle of the points, with about equal numbers above and below. Try drawing one!</p>`,
          widget: "bestFit"
        },
        {
          h: "Science in context: smoking tobacco",
          html: `<p>Between 1990 and 2015 smoking caused about <b>1 in every 10 deaths</b> worldwide. Smoking has fallen in some countries (Brazil, Australia, Nigeria), stayed the same in others (Bangladesh, Indonesia), and increased in some groups. Governments warn people with labels and raise taxes on cigarettes.</p>
          <p>In a <b>smoking machine</b> experiment, smoke is pulled through white cotton wool (turns <b>brown</b> from tar) and Universal Indicator (turns <b>yellow/orange</b> — smoke is <b>acidic</b>).</p>`
        }
      ],
      keyFacts: [
        "Eating too much food that is rich in fat or carbohydrate can cause obesity.",
        "Obesity can cause problems with the heart and blood vessels, so blood does not flow so well.",
        "Tobacco smoke paralyses cilia, and contains an addictive drug called nicotine.",
        "Tar in tobacco smoke causes cancer."
      ],
      terms: [
        ["lifestyle", "the way in which we lead our lives"],
        ["trend", "pattern seen in data in which there is a change in a certain direction"],
        ["obesity", "being so overweight that your health is in danger"],
        ["type 2 diabetes", "disease where too much glucose is dissolved in the blood, which can damage organs"],
        ["heart disease", "when the heart does not work well"],
        ["high blood pressure", "when the pressure of blood inside your blood vessels is at risk of bursting them"],
        ["drug", "a chemical that changes the way your body works"],
        ["pharmaceutical drug", "drug used in medicine"],
        ["illegal drug", "drug that people are not allowed to buy or use"],
        ["addictive", "substance that makes people feel they must have it"],
        ["nicotine", "addictive drug in tobacco smoke"],
        ["tar", "sticky black liquid found in cigarette smoke"],
        ["cancer", "when cells in a tissue start to make many copies of themselves very quickly"],
        ["tumour", "a lump of cancer cells"],
        ["line graph", "graph of two variables, both measured in numbers"],
        ["line of best fit", "straight or curved line drawn through the middle of a set of points to show the pattern of data points"]
      ],
      quiz: [
        { t: "mcq", q: "In your body, carbohydrates that you do not need for energy are converted into…", o: ["fats", "proteins", "sucrose", "glucose"], a: 0, ex: "Stored as fat." },
        { t: "mcq", q: "An important mineral for bones is…", o: ["sodium", "iron", "calcium", "vitamin D"], a: 2, ex: "Calcium (vitamin D helps, but it's a vitamin, not a mineral)." },
        { t: "short", q: "What is obesity? [1]", marks: 1, kw: [["overweight", "too much fat", "very fat", "health is in danger", "too heavy"]], model: "Being so overweight that your health is in danger.", ex: "Key definition." },
        { t: "short", q: "Describe the type of diet that causes obesity. [1]", marks: 1, kw: [["fat", "carbohydrate", "sugar", "too much food", "overeat"]], model: "A diet with too much fat and carbohydrate (eating more energy than you use).", ex: "Too much fat/carbs." },
        { t: "mcq", q: "What is the addictive drug in tobacco smoke?", o: ["Tar", "Nicotine", "Carbon dioxide", "Caffeine"], a: 1, ex: "Nicotine." },
        { t: "mcq", q: "Which substance in smoke causes cancer?", o: ["Nicotine", "Oxygen", "Tar", "Water vapour"], a: 2, ex: "Tar." },
        { t: "short", q: "Explain why people who smoke often have to cough. [2]", marks: 2, kw: [["cilia"], ["mucus"]], model: "Smoke paralyses/damages the cilia (1), so mucus is not swept up and builds up in the airways — coughing is the only way to remove it (1).", ex: "Cilia + mucus." },
        { t: "short", q: "Explain why long-term smokers are more likely to get lung infections. [2]", marks: 2, kw: [["cilia", "mucus"], ["bacteria", "pathogen", "microorganism", "germ", "virus", "microbe"]], model: "Cilia are damaged so they can't sweep mucus away (1), so pathogens trapped in the mucus stay in the lungs and cause infection (1).", ex: "Same idea as Uncle Karim!" },
        { t: "short", q: "Coughing and smoke can destroy alveoli. Explain why this causes people to feel breathless. [2]", marks: 2, kw: [["surface area"], ["oxygen", "gas exchange", "diffus"]], model: "Less surface area in the alveoli (1) so less oxygen diffuses into the blood / less gas exchange (1).", ex: "Surface area → gas exchange." },
        { t: "mcq", q: "Fat building up in the blood vessels that supply the heart muscle causes…", o: ["a stroke", "heart disease", "scurvy", "constipation"], a: 1, ex: "Heart disease." },
        { t: "mcq", q: "A stroke is when…", o: ["the heart stops", "part of the brain is damaged because blood stops getting to it", "a bone breaks", "the lungs fill with mucus"], a: 1, ex: "Blocked or burst vessel to the brain." },
        { t: "mcq", q: "Which factor in the diet can cause high blood pressure?", o: ["Too much fibre", "Too much salt", "Too much water", "Too much vitamin C"], a: 1, ex: "Salt (and too much fat)." },
        { t: "sort", q: "Sort the drugs.", buckets: ["Pharmaceutical", "Not a medicine"], items: [["Painkiller", 0], ["Antibiotic", 0], ["Decongestant", 0], ["Nicotine", 1], ["Illegal drugs", 1]], ex: "Pharmaceutical = medicines." },
        { t: "match", q: "Match each term with its meaning.", pairs: [["tumour", "a lump of cancer cells"], ["addictive", "makes people feel they must have it"], ["trend", "pattern in data changing in one direction"], ["tar", "sticky black liquid in smoke"]], ex: "Key terms." },
        { t: "tf", q: "If two variables show a trend on a graph, this proves one causes the other.", a: false, ex: "A link (correlation) doesn't prove cause — scientists need more studies." },
        { t: "mcq", q: "In the smoking machine, what happens to the white cotton wool?", o: ["Stays white", "Turns brown/black from tar", "Turns blue", "Catches fire"], a: 1, ex: "Tar collects on it." },
        { t: "mcq", q: "Universal Indicator turns orange/yellow when smoke bubbles through. This shows smoke is…", o: ["alkaline", "neutral", "acidic", "pure oxygen"], a: 2, ex: "Acidic gases (like CO₂)." },
        { t: "short", q: "Give two benefits of regular exercise. [2]", marks: 2, kw: [["muscle", "bone"], ["heart", "weight", "obes", "fit"]], model: "Strengthens muscles and bones (1); strengthens the heart / helps control weight (1).", ex: "Any two." },
        { t: "mcq", q: "A line of best fit should…", o: ["join every point dot-to-dot", "go through the middle of the points with about equal numbers above and below", "start at zero always", "only touch the highest point"], a: 1, ex: "Middle of the points." },
        { t: "short", q: "Explain how nicotine damages the circulatory system. [2]", marks: 2, kw: [["heart rate", "heart beat", "heartbeat"], ["narrow", "block", "blood pressure"]], model: "Nicotine increases heart rate (1) and narrows blood vessels so they are more likely to become blocked / blood pressure rises (1).", ex: "Two effects." }
      ]
    }
  ],
  review: [
    { t: "short", q: "Give one reason why we need to eat each of: carbohydrates, fats, proteins. [3]", marks: 3, kw: [["energy"], ["store", "warm", "insulat"], ["growth", "repair", "grow"]], model: "Carbohydrates: energy (1). Fats: store energy / keep warm (1). Proteins: growth and repair (1).", ex: "One job each." },
    { t: "mcq", q: "When Noor is 40, a blockage starts to form in one of his blood vessels and grows as he gets older. What is the most likely cause?", o: ["Eating too much fibre", "Fat building up from a fatty diet / smoking", "Too much vitamin C", "Drinking water"], a: 1, ex: "Fat deposits build up in arteries." },
    { t: "short", q: "Explain why the blockage causes Noor's blood pressure to rise. [1]", marks: 1, kw: [["narrow", "smaller", "less space", "harder to push", "harder to pump"]], model: "The vessel is narrower, so the heart must push harder to get blood through.", ex: "Narrow tube → higher pressure." },
    { t: "mcq", q: "Rice: 850 kJ per serving; beans 500 kJ; avocado 700 kJ. Which provides the most energy per serving?", o: ["Beans", "Avocado", "Rice", "They're equal"], a: 2, ex: "850 kJ is the largest." },
    { t: "num", q: "Avocado contains 0.024 g of calcium. How many milligrams is this?", a: 24, unit: "mg", ex: "0.024 × 1000 = 24 mg." },
    { t: "mcq", q: "In an experiment, as more nicotine was taken, the speed of blood in the capillaries…", o: ["increased", "decreased", "stayed the same", "doubled"], a: 1, ex: "0.000047 → 0.000027 mm³/s: nicotine narrows the vessels." },
    { t: "short", q: "Name the addictive drug in tobacco smoke. [1]", marks: 1, kw: [["nicotine"]], model: "Nicotine.", ex: "" },
    { t: "short", q: "Describe what may happen if we do not eat enough of a nutrient. [1]", marks: 1, kw: [["deficien", "disease", "ill", "unhealthy", "not grow", "weak", "scurvy", "anaemia"]], model: "We get a nutritional deficiency / deficiency disease (e.g. scurvy without vitamin C).", ex: "Deficiency." }
  ]
});
