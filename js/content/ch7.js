/* =========================================================
   CHAPTER 7 — Measuring motion
   ========================================================= */
window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 7,
  title: "Measuring motion",
  emoji: "🏎️",
  color: "#0ea5a4",
  blurb: "Measuring distance and time accurately, calculating speed, and reading distance/time graphs.",
  topics: [
    /* ---------------------------------------------------- 7.1 */
    {
      id: "7.1",
      title: "Measuring distance and time",
      emoji: "📏",
      tagline: "Pick the right tool — and use it well.",
      sections: [
        {
          h: "Accurate, precise and reliable",
          html: `<p>To investigate how something moves, you measure the <b>distance</b> it travels and the <b>time</b> taken. Distance is measured in <b>metres (m)</b>; time in <b>seconds (s)</b>.</p>
          <table class="tbl"><tr><th>Word</th><th>Meaning</th></tr>
          <tr><td><b>Accurate</b></td><td>Close to the <b>real (true) answer</b></td></tr>
          <tr><td><b>Precise</b></td><td>Depends on the equipment — the <b>smaller the difference</b> it can measure, the more precise (mm is more precise than cm)</td></tr>
          <tr><td><b>Reliable</b></td><td>Repeated measurements give results that are <b>very similar</b></td></tr></table>
          <p>Think of a dartboard 👇</p>`,
          widget: "dartboard"
        },
        {
          h: "Choosing the best apparatus to measure distance",
          html: `<ul><li><b>15 cm ruler</b> (marked in mm) — small things: your thumb, a pencil.</li>
          <li><b>Metre rule</b> (mm) — a table, a desk, a chair.</li>
          <li><b>10 m tape measure</b> (cm) — a classroom, a long jump.</li>
          <li><b>100 m tape measure</b> (cm) — a running track, how far you run in 10 s.</li></ul>
          <p>For small distances you need to be more precise (nearest mm). For large distances the nearest cm is fine. Using a metre rule for your desk is more accurate than a 15 cm ruler — fewer moves, fewer errors.</p>
          <p>Take more measurements and you can make sure your results are <b>reliable</b>.</p>`,
          widget: "apparatusSort"
        },
        {
          h: "Choosing the best apparatus to measure time",
          html: `<p>A clock or watch is fine for a lesson. For a 20 m sprint you need a <b>stopwatch</b>. But humans have a <b>reaction time</b> (about 0.2 s) when starting and stopping a stopwatch — that adds errors. So:</p>
          <ul><li><b>Repeat</b> measurements and take an <b>average</b>.</li>
          <li>For very short times, use <b>light gates</b> connected to a data logger or computer — much more accurate.</li></ul>
          <p>Test your own reaction time 👇 — try to stop the watch at exactly 5.00 s.</p>`,
          widget: "stopwatchGame"
        },
        {
          h: "Science in context: GPS",
          html: `<p>The <b>Global Positioning System</b> uses signals from <b>satellites</b> orbiting the Earth. A GPS receiver works out how far away each satellite is from the <b>time</b> the radio signal takes to arrive. With signals from at least <b>four</b> satellites, it can calculate your position accurately. There are other systems too, like Russia's GLONASS, the European Galileo and China's BeiDou.</p>`
        }
      ],
      keyFacts: [
        "Rulers and measuring tapes can be used to measure distance.",
        "Clocks, watches, stopwatches and light gates connected to electronic timers or computers can be used to measure time.",
        "Different pieces of apparatus give measurements with different levels of precision."
      ],
      terms: [
        ["accurate", "an accurate result is one that is close to the real answer"],
        ["precise", "how precise your measurement is depends on the measuring equipment; the smaller the difference it can measure, the more precise"],
        ["reliable", "measurements are reliable when repeated measurements give results that are very similar"],
        ["light gate", "electronic sensor that measures time very accurately when something passes through its beam"],
        ["reaction time", "the time it takes a person to respond to something"]
      ],
      quiz: [
        { t: "sort", q: "Choose the best apparatus for each.", buckets: ["15 cm ruler", "Metre rule", "100 m tape"], items: [["Length of your thumb", 0], ["Length of a pencil", 0], ["Height of a table", 1], ["Width of a desk", 1], ["How far you run in 10 s", 2], ["Length of a running track", 2]], ex: "Match the size of the tool to the size of the distance." },
        { t: "mcq", q: "An accurate result is one that is…", o: ["measured with a ruler", "close to the real (true) answer", "repeated three times", "written neatly"], a: 1, ex: "" },
        { t: "mcq", q: "Which is more precise?", o: ["A tape marked in centimetres", "A ruler marked in millimetres", "Both the same", "Pacing it out"], a: 1, ex: "Smaller divisions = more precise." },
        { t: "short", q: "Why is it more accurate to measure the width of your desk with a metre rule than a 15 cm ruler? [1]", marks: 1, kw: [["move", "once", "one go", "fewer", "errors", "gaps", "repeatedly"]], model: "You only need to measure once — moving the short ruler many times adds errors.", ex: "" },
        { t: "short", q: "Why is it important to repeat your measurements if using a stopwatch to time a toy car down a ramp? [2]", marks: 2, kw: [["reaction time", "human error", "error"], ["average", "reliable", "anomal"]], model: "Your reaction time when starting/stopping causes errors (1); repeating lets you spot anomalous results and take an average so results are more reliable (1).", ex: "" },
        { t: "mcq", q: "Why is a light gate a more accurate way of measuring time than a stopwatch?", o: ["It's cheaper", "It doesn't depend on human reaction time", "It measures distance too", "It is bigger"], a: 1, ex: "" },
        { t: "mcq", q: "What does GPS use to work out your position?", o: ["Light gates", "Signals from satellites", "Tape measures", "Magnets"], a: 1, ex: "" },
        { t: "tf", q: "Reliable results are ones where repeated measurements are very similar.", a: true, ex: "" },
        { t: "mcq", q: "What is the best way to time a 20 m sprint?", o: ["A wall clock", "A stopwatch (or light gates)", "A calendar", "A sundial"], a: 1, ex: "" }
      ]
    },

    /* ---------------------------------------------------- 7.2 */
    {
      id: "7.2",
      title: "Speed and average speed",
      emoji: "⚡",
      tagline: "How far, how fast?",
      sections: [
        {
          h: "Measuring speed",
          html: `<p><b>Speed</b> is how far something travels in a given time.</p>
          <div class="equation">speed = distance ÷ time &nbsp;&nbsp; <i>v = d / t</i></div>
          <p>Speed in science is usually in <b>metres per second (m/s)</b>. In everyday life we use <b>kilometres per hour (km/h)</b>. A speed of 10 m/s means the object travels 10 m in 1 s.</p>
          <p>When you travel, your speed changes many times. The <b>average speed</b> takes account of speeding up and slowing down:</p>
          <div class="equation">average speed = total distance travelled ÷ total time taken</div>
          <p>Rearranging: <b>distance = speed × time</b> and <b>time = distance ÷ speed</b>. Use the triangle 👇</p>`,
          widget: "speedTriangle"
        },
        {
          h: "Light gates, averages and anomalous results",
          html: `<p><b>Light gates</b> are electronic sensors. A card on top of a toy car breaks the light beam; the timer measures how long the beam is blocked. If the card is 10 cm long you can calculate the speed.</p>
          <p>To find the <b>average</b> (mean): add up all the numbers and divide by how many there are.</p>
          <p><b>Anomalous results</b> do not fit the pattern of the other results — much higher or lower. Repeat the experiment and <b>leave anomalous results out</b> of the average.</p>
          <p>Example: Ali's times: 10, 12, 11, <b>24</b>, 11, 13, 10, 11, 12, 10 s → 24 s is anomalous. Run the ramp 👇</p>`,
          widget: "rampLab"
        }
      ],
      keyFacts: [
        "Average speed = distance travelled ÷ time taken.",
        "Speed is measured in metres per second (m/s).",
        "Leave anomalous results out when calculating an average."
      ],
      terms: [
        ["speed", "how far something travels in a given time"],
        ["average speed", "total distance travelled ÷ total time taken"],
        ["average", "the mean of a set of numbers: add them all and divide by how many there are"],
        ["anomalous result", "a result that does not fit the pattern of the other results"],
        ["m/s", "metres per second — the unit of speed in science"]
      ],
      quiz: [
        { t: "num", q: "A girl takes 25 s to run 100 m. What is her average speed?", a: 4, unit: "m/s", ex: "100 ÷ 25 = 4 m/s." },
        { t: "num", q: "A dog takes 20 s to run 220 m. What is its average speed?", a: 11, unit: "m/s", ex: "220 ÷ 20 = 11 m/s." },
        { t: "num", q: "How far will a train with a speed of 20 m/s travel in 10 s?", a: 200, unit: "m", ex: "20 × 10 = 200 m." },
        { t: "num", q: "How far will a train with a speed of 20 m/s travel in 2 minutes?", a: 2400, unit: "m", ex: "2 min = 120 s; 20 × 120 = 2400 m." },
        { t: "num", q: "How long would a leopard running at 20 m/s take to travel 500 m?", a: 25, unit: "s", ex: "500 ÷ 20 = 25 s." },
        { t: "num", q: "How far could a horse with an average speed of 15 m/s run in 1 minute?", a: 900, unit: "m", ex: "15 × 60 = 900 m." },
        { t: "num", q: "A man walks 450 m at an average speed of 3 m/s. How long is he walking for?", a: 150, unit: "s", ex: "450 ÷ 3 = 150 s." },
        { t: "num", q: "What is a speed of 3 m/s in cm/s?", a: 300, unit: "cm/s", ex: "1 m = 100 cm → 300 cm/s." },
        { t: "num", q: "What is 50 cm/s in m/s?", a: 0.5, unit: "m/s", ex: "50 ÷ 100 = 0.5 m/s." },
        { t: "num", q: "What is 60 km/h in m/s? (nearest whole number)", a: 17, unit: "m/s", tol: 0.6, ex: "60 000 m ÷ 3600 s = 16.7 ≈ 17 m/s." },
        { t: "mcq", q: "Ali's times: 10, 12, 11, 24, 11, 13, 10, 11, 12, 10 s. Which result is anomalous?", o: ["10 s", "13 s", "24 s", "12 s"], a: 2, ex: "24 s doesn't fit the pattern." },
        { t: "num", q: "Ali's times without the anomaly: 10, 12, 11, 11, 13, 10, 11, 12, 10 s. What is the average time?", a: 11.1, unit: "s", tol: 0.06, ex: "100 ÷ 9 = 11.1 s." },
        { t: "num", q: "Ali's times INCLUDING the anomaly (10, 12, 11, 24, 11, 13, 10, 11, 12, 10). Average?", a: 12.4, unit: "s", tol: 0.06, ex: "124 ÷ 10 = 12.4 s — the anomaly pulls the average up." },
        { t: "mcq", q: "The unit of speed in science is…", o: ["km", "m/s", "s/m", "mph"], a: 1, ex: "" },
        { t: "short", q: "Why is it important to place the light gate halfway along the ramp? [1]", marks: 1, kw: [["average", "middle", "halfway", "mean speed"]], model: "The car speeds up down the ramp, so the speed halfway gives the average speed over the ramp.", ex: "" },
        { t: "short", q: "A toy car is pushed across a flat surface. It slows down and stops. Explain why. [1]", marks: 1, kw: [["friction", "air resistance", "energy"]], model: "Friction (and air resistance) act against its motion, transferring/dissipating its energy, so it slows down.", ex: "" }
      ]
    },

    /* ---------------------------------------------------- 7.3 */
    {
      id: "7.3",
      title: "Distance/time graphs",
      emoji: "📈",
      tagline: "The steeper the line, the faster it goes.",
      sections: [
        {
          h: "Reading distance/time graphs",
          html: `<p>A <b>distance/time graph</b> shows how far an object has travelled over time.</p>
          <ul><li>A <b>straight sloping line</b> → moving at a <b>constant speed</b>.</li>
          <li>A <b>steeper</b> line → <b>faster</b>.</li>
          <li>A <b>horizontal (flat) line</b> → <b>stopped</b> (distance not changing).</li>
          <li>A <b>curved</b> line → speed is <b>changing</b> (getting steeper = speeding up).</li>
          <li>A line going <b>down</b> → moving <b>back towards the start</b>.</li></ul>
          <p>Choose a journey and watch the graph draw itself 👇</p>`,
          widget: "dtGraph"
        },
        {
          h: "Calculating speed from the gradient",
          html: `<p>The <b>gradient</b> (slope) of a distance/time graph tells you the speed.</p>
          <div class="equation">gradient = distance travelled ÷ time taken = speed</div>
          <p>Example: a runner travels 30 m in 10 s → gradient = 30 ÷ 10 = <b>3 m/s</b>.</p>
          <p>Drag the point on the line and read the speed 👇</p>`,
          widget: "gradientTool"
        }
      ],
      keyFacts: [
        "The gradient of a distance/time graph tells you the speed of a moving object.",
        "The steeper the gradient on a distance/time graph, the faster an object is moving.",
        "A straight horizontal line on a distance/time graph shows that the object has stopped moving."
      ],
      terms: [
        ["distance/time graph", "graph showing distance travelled against time"],
        ["gradient", "the slope of a graph; on a distance/time graph it tells you the speed"],
        ["constant speed", "speed that does not change — a straight sloping line"],
        ["stationary", "not moving — a flat line on a distance/time graph"]
      ],
      quiz: [
        { t: "mcq", q: "On a distance/time graph, a horizontal line means the object is…", o: ["moving fast", "stopped", "speeding up", "going backwards"], a: 1, ex: "Distance isn't changing." },
        { t: "mcq", q: "Two runners' lines on the same axes: which is faster?", o: ["The steeper line", "The less steep line", "The longer line", "The lower line"], a: 0, ex: "Steeper gradient = faster." },
        { t: "num", q: "A runner travels 30 m in 10 s at constant speed. What is the gradient (speed)?", a: 3, unit: "m/s", ex: "30 ÷ 10 = 3 m/s." },
        { t: "num", q: "A graph goes in a straight line from (0 s, 0 m) to (4 s, 12 m). What is the average speed?", a: 3, unit: "m/s", ex: "12 ÷ 4 = 3 m/s." },
        { t: "num", q: "An animal runs 30 m in 3 s then stops. What was its speed while running?", a: 10, unit: "m/s", ex: "30 ÷ 3 = 10 m/s." },
        { t: "mcq", q: "A curved line getting steeper shows the object is…", o: ["slowing down", "speeding up", "stopped", "at constant speed"], a: 1, ex: "" },
        { t: "match", q: "Match each part of a walk to how its graph looks.", pairs: [["walking at a constant speed", "straight sloping line"], ["stopped to rest", "horizontal line"], ["walking back to the start", "line sloping downwards"], ["walking quicker", "steeper line"]], ex: "" },
        { t: "num", q: "Beetle: 0 m at 0 s, 24 m at 60 s. What is its average speed?", a: 0.4, unit: "m/s", ex: "24 ÷ 60 = 0.4 m/s." },
        { t: "short", q: "How can you tell from a distance/time graph that an animal's speed is changing all the time? [1]", marks: 1, kw: [["curve", "not straight", "gradient changes", "slope changes", "changing gradient"]], model: "The line is curved — the gradient keeps changing.", ex: "" },
        { t: "tf", q: "A straight sloping line on a distance/time graph shows a constant speed.", a: true, ex: "" }
      ]
    }
  ],
  review: [
    { t: "num", q: "How far will a train with a speed of 20 m/s travel in 10 minutes?", a: 12000, unit: "m", ex: "10 min = 600 s; 20 × 600 = 12 000 m." },
    { t: "num", q: "How far could a horse with an average speed of 15 m/s run in 10 s?", a: 150, unit: "m", ex: "" },
    { t: "mcq", q: "A student measures a beetle's distance every 10 s. Reading at 40 s = 15 m, others go up by 4 m each time (0, 4, 8, 12, ?, 20, 24). Which reading suggests it wasn't at constant speed?", o: ["The reading at 40 s (15 m instead of 16 m)", "The reading at 0 s", "The reading at 60 s", "None"], a: 0, ex: "Pattern is +4 m each 10 s; 15 breaks it." },
    { t: "short", q: "Why is a light gate a more accurate way of measuring time than a stopwatch? [1]", marks: 1, kw: [["reaction time", "human", "automatic", "electronic"]], model: "It doesn't rely on human reaction time — it starts and stops automatically.", ex: "" }
  ]
});
