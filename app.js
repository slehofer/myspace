import { audioEngine } from './audio-player.js';

const initialComments = [
  {
    name: 'Lt. Kim Kitsuragi',
    avatar: 'public/images/IMG_1974.webp',
    date: 'Oct 14, 2024 at 10:14 AM',
    text: 'Detective. I see you have set up a personal webpage on this "network". We still have a body to examine behind the Whirling-in-Rags. Please focus on the investigation.'
  },
  {
    name: 'Cuno',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cuno',
    date: 'Oct 14, 2024 at 09:42 AM',
    text: 'CUNO DOESN\'T GIVE A SHIT ABOUT YOUR MYSPACE! CUNO\'S BUSY CHUCKIN\' STONES AT THE DEAD GUY! GET OUTTA HERE PIG!'
  },
  {
    name: 'Klaasje Amandou',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Klaasje',
    date: 'Oct 13, 2024 at 11:15 PM',
    text: 'Thanks for not arresting me yesterday, Harrier. Nice song on your player... very Revacholian. Stay safe up on that roof.'
  },
  {
    name: 'Garte, Whirling Manager',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Garte',
    date: 'Oct 13, 2024 at 04:30 PM',
    text: 'Reminder: You still owe 130 Real for damages to the ceiling fan and the room. Do not ignore my messages.'
  }
];

function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- Top Navbar -->
    <header class="ms-navbar">
      <div class="logo-area">
        <span>myspace.com</span>
        <span class="badge">Revachol District 41</span>
      </div>
      <div class="nav-links">
        <a href="#about">Home</a> |
        <a href="#friends">Top Friends</a> |
        <a href="#skills">Skill Internalization</a> |
        <a href="#comments">Wall Comments</a>
      </div>
    </header>

    <div class="container">
      <!-- Header Banner -->
      <div class="header-banner">
        <div class="user-title">
          <h1>Harrier "Harry" Du Bois</h1>
          <div class="user-status-quote">
            <span class="label">Status:</span> "Looking for my gun and my past... missing: 1 badge, 1 memory, 1 shoe"
          </div>
        </div>
        <div class="header-search">
          <input type="text" placeholder="Search Revachol..." readonly value="Case File #41-089">
          <button type="button">Search</button>
        </div>
      </div>

      <!-- Main Profile Grid -->
      <div class="profile-grid">

        <!-- LEFT COLUMN -->
        <div class="left-col">

          <!-- Profile Pic & Status -->
          <div class="box profile-pic-container">
            <div class="box-header de-accent">
              <span>Harrier Du Bois</span>
              <span class="status-online">● Online</span>
            </div>
            <div class="box-body">
              <img class="main-avatar" src="public/images/IMG_1973.jpeg" alt="Harry Du Bois Portrait">
              <div class="status-indicator">
                "The Expression" is active.
              </div>
              <p style="margin-top: 8px; font-size: 11px; color: var(--de-parchment-dim);">
                Male, 44, Single<br>
                Revachol West, Martinaise
              </p>
            </div>
          </div>

          <!-- Web Audio Player Widget -->
          <div class="box">
            <div class="box-header de-accent">
              <span>RCM Radio Synth Audio</span>
            </div>
            <div class="box-body">
              <div class="audio-player-widget">
                <div class="player-title">
                  <span>♪ Whirling-in-Rags (Revachol Synth Mix)</span>
                </div>
                <div class="player-controls">
                  <button id="playBtn" class="btn-play">
                    <span id="playIcon">▶</span> <span id="playText">PLAY SOUNDTRACK</span>
                  </button>
                  <span id="timeDisplay" class="time-display">00:00</span>
                </div>
                <canvas id="eqCanvas" class="equalizer-canvas" width="280" height="45"></canvas>
                <div class="synth-info">
                  * Live procedural Web Audio API synthesis engine modeling Sea Power's ambient brass & minor key synths.
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Box -->
          <div class="box">
            <div class="box-header de-accent">
              <span>Contacting Harry</span>
            </div>
            <div class="box-body">
              <div class="contact-grid">
                <a href="#comments" class="contact-btn">📩 Send Message</a>
                <a href="#friends" class="contact-btn">➕ Add to Friends</a>
                <a href="#skills" class="contact-btn">🧠 Interrogate</a>
                <a href="#gallery" class="contact-btn">📷 View Evidence</a>
                <a href="#skills" class="contact-btn">🍸 Offer Drink</a>
                <a href="#comments" class="contact-btn">⭐ Add to Favorites</a>
              </div>
            </div>
          </div>

          <!-- Personal Info Box -->
          <div class="box">
            <div class="box-header de-accent">
              <span>Harry's Information</span>
            </div>
            <div class="box-body" style="padding: 0;">
              <table class="info-table">
                <tr>
                  <td class="label">Occupation</td>
                  <td>Lieutenant Double-Yefreitor, RCM 41st Precinct</td>
                </tr>
                <tr>
                  <td class="label">Archetype</td>
                  <td>Superstar Cop / Apocalypse Cop</td>
                </tr>
                <tr>
                  <td class="label">Copotype</td>
                  <td>Sorry Cop / Tequila Sunset</td>
                </tr>
                <tr>
                  <td class="label">Weapon of Choice</td>
                  <td>Pepperbox Pistol (Lost) / Words</td>
                </tr>
                <tr>
                  <td class="label">Favorite Drink</td>
                  <td>Commodore Red / Frittte Wine</td>
                </tr>
                <tr>
                  <td class="label">Fashion Style</td>
                  <td>Horrific Necktie, Green Blazer, Snake Skin Shoes</td>
                </tr>
              </table>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN -->
        <div class="right-col">

          <!-- About Me / Blurbs -->
          <div class="box" id="about">
            <div class="box-header de-accent">
              <span>Harrier Du Bois's Blurbs</span>
            </div>
            <div class="box-body">
              <div class="blurb-title">About me:</div>
              <div class="blurb-content">
                I am a high-ranking detective officer of the Citizens Militia. I lost my memory three days ago after an extraordinary emotional breakthrough at the Whirling-in-Rags hotel. My name might be Harrier Du Bois, or Tequila Sunset, or Raphael Ambrosius Costeau.
                <br><br>
                I am currently solving a murder case in Martinaise alongside my partner, Lieutenant Kim Kitsuragi. I enjoy disco music, screaming into the void, questioning inanimate objects, and staring into mirrors to maintain "The Expression".
              </div>

              <div class="disco-quote-box">
                "DISCO NEVER DIES! It just retreated into the shadows of Martinaise to wait for the apocalypse."
              </div>

              <div class="blurb-title" style="margin-top: 15px;">Who I'd like to meet:</div>
              <div class="blurb-content">
                Anyone who knows where my badge is. Also looking for my lost shoe, my past, and anyone willing to dance to hard-core disco beats at the church.
              </div>
            </div>
          </div>

          <!-- Internal Skill Thoughts (Disco Elysium Special Feature) -->
          <div class="box" id="skills">
            <div class="box-header de-accent">
              <span>Internal Monologue (Active Skill Checks)</span>
            </div>
            <div class="box-body">
              <div class="skill-grid">
                <div class="skill-card inland-empire">
                  <div class="skill-name" style="color: #be79df;">
                    <span>Inland Empire</span>
                    <span>[Medium: Success]</span>
                  </div>
                  <div class="skill-text">
                    "This webpage... it's made of code and ghosts. Millions of forgotten blue backgrounds from 2006 floating in the pale."
                  </div>
                </div>

                <div class="skill-card shivers">
                  <div class="skill-name" style="color: #5dade2;">
                    <span>Shivers</span>
                    <span>[Challenging: Success]</span>
                  </div>
                  <div class="skill-text">
                    "TWO KILOMETERS EAST — A lonely radio mast in Jamrock hums with HTML data packets. Rain trickles down the screen."
                  </div>
                </div>

                <div class="skill-card electrochemistry">
                  <div class="skill-name" style="color: #ec7063;">
                    <span>Electrochemistry</span>
                    <span>[Easy: Success]</span>
                  </div>
                  <div class="skill-text">
                    "BROTHER! Push play on that synth music and let's find some speed or magnesium. We need to party!"
                  </div>
                </div>

                <div class="skill-card drama">
                  <div class="skill-name" style="color: #f4d03f;">
                    <span>Drama</span>
                    <span>[Formidable: Success]</span>
                  </div>
                  <div class="skill-text">
                    "Sire, Kim Kitsuragi is indeed thy truest companion. Place him at the pinnacle of thy Top 8 list!"
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Photo Gallery / Evidence Attachments -->
          <div class="box" id="gallery">
            <div class="box-header de-accent">
              <span>Evidence & Case Attachments (Uploaded Pictures)</span>
            </div>
            <div class="box-body">
              <div class="gallery-grid">
                <div class="gallery-item">
                  <img src="public/images/IMG_1976.webp" alt="Martinaise Watercolor Scene">
                  <div class="gallery-caption">Martinaise Coast & Sea Wall</div>
                </div>
                <div class="gallery-item">
                  <img src="public/images/IMG_1975.jpeg" alt="Disco Elysium Skill Art">
                  <div class="gallery-caption">Thought Cabinet & Neural Links</div>
                </div>
                <div class="gallery-item">
                  <img src="public/images/IMG_1974.webp" alt="Lieutenant Kim Kitsuragi">
                  <div class="gallery-caption">Lt. Kim Kitsuragi (#1 Friend)</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Top 8 Friends Section -->
          <div class="box" id="friends">
            <div class="box-header de-accent">
              <span>Harrier's Top 8 Friends</span>
            </div>
            <div class="box-body">
              <div class="top8-header">Harrier has 8 friends in his network.</div>
              <div class="friends-grid">

                <!-- BEST FRIEND #1: KIM KITSURAGI -->
                <div class="friend-card number-one">
                  <div class="badge-number-one">★ #1 BEST FRIEND</div>
                  <img class="friend-img" src="public/images/IMG_1974.webp" alt="Kim Kitsuragi">
                  <a class="friend-name" href="#kim">Kim Kitsuragi</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">RCM Lieutenant</span>
                </div>

                <div class="friend-card">
                  <img class="friend-img" src="https://api.dicebear.com/7.x/bottts/svg?seed=Cuno" alt="Cuno">
                  <a class="friend-name" href="#cuno">Cuno</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">Martinaise Kid</span>
                </div>

                <div class="friend-card">
                  <img class="friend-img" src="https://api.dicebear.com/7.x/bottts/svg?seed=Klaasje" alt="Klaasje">
                  <a class="friend-name" href="#klaasje">Klaasje</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">Whirling Guest</span>
                </div>

                <div class="friend-card">
                  <img class="friend-img" src="https://api.dicebear.com/7.x/bottts/svg?seed=Garte" alt="Garte">
                  <a class="friend-name" href="#garte">Garte</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">Cafeteria Mgr</span>
                </div>

                <div class="friend-card">
                  <img class="friend-img" src="https://api.dicebear.com/7.x/bottts/svg?seed=Evrart" alt="Evrart Claire">
                  <a class="friend-name" href="#evrart">Evrart Claire</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">Union Boss</span>
                </div>

                <div class="friend-card">
                  <img class="friend-img" src="https://api.dicebear.com/7.x/bottts/svg?seed=Titus" alt="Titus Hardie">
                  <a class="friend-name" href="#titus">Titus Hardie</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">Hardie Boys Leader</span>
                </div>

                <div class="friend-card">
                  <img class="friend-img" src="https://api.dicebear.com/7.x/bottts/svg?seed=Lena" alt="Lena">
                  <a class="friend-name" href="#lena">Lena</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">Cryptozoologist Wife</span>
                </div>

                <div class="friend-card">
                  <img class="friend-img" src="https://api.dicebear.com/7.x/bottts/svg?seed=Measurehead" alt="Measurehead">
                  <a class="friend-name" href="#measurehead">Measurehead</a>
                  <span style="font-size: 9px; color: var(--de-parchment-dim);">Semenese Thinker</span>
                </div>

              </div>
            </div>
          </div>

          <!-- Comments Wall Section -->
          <div class="box" id="comments">
            <div class="box-header de-accent">
              <span>Harrier's Comment Wall</span>
            </div>
            <div class="box-body">
              <div id="commentsContainer"></div>

              <!-- Add Comment Form -->
              <div class="add-comment-box">
                <h4>Leave a Comment for Harry</h4>
                <input type="text" id="commentAuthorInput" placeholder="Your Name / Persona (e.g., Jean Vicquemare)">
                <textarea id="commentTextInput" placeholder="Write your message..."></textarea>
                <button type="button" id="submitCommentBtn">Post Comment</button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Footer -->
      <footer>
        <p>Harry Du Bois Myspace Profile &copy; Revachol Citizen Network 089. Powered by Web Audio API & Disco Elysium Palette.</p>
      </footer>
    </div>
  `;

  setupAudioUI();
  renderComments();
  setupCommentForm();
}

let commentsData = [...initialComments];

function renderComments() {
  const container = document.getElementById('commentsContainer');
  if (!container) return;

  container.innerHTML = `
    <table class="comments-table">
      ${commentsData.map(c => `
        <tr>
          <td class="comment-author">
            <a href="#">${c.name}</a><br>
            <img src="${c.avatar}" alt="${c.name}">
            <div class="comment-date">${c.date}</div>
          </td>
          <td class="comment-body">
            ${c.text}
          </td>
        </tr>
      `).join('')}
    </table>
  `;
}

function setupCommentForm() {
  const btn = document.getElementById('submitCommentBtn');
  const authorInput = document.getElementById('commentAuthorInput');
  const textInput = document.getElementById('commentTextInput');

  if (!btn) return;

  btn.addEventListener('click', () => {
    const author = authorInput.value.trim() || 'Anonymous Revacholian';
    const text = textInput.value.trim();

    if (!text) {
      alert('Please enter a comment message!');
      return;
    }

    const newComment = {
      name: author,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(author)}`,
      date: 'Just Now',
      text: text
    };

    commentsData.unshift(newComment);
    renderComments();

    textInput.value = '';
    authorInput.value = '';
  });
}

function setupAudioUI() {
  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');
  const timeDisplay = document.getElementById('timeDisplay');
  const canvas = document.getElementById('eqCanvas');
  const ctx = canvas.getContext('2d');

  let animFrameId = null;

  function drawEQ() {
    if (!audioEngine.analyser || !audioEngine.isPlaying) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#1c2829';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#d96b27';
      ctx.font = '10px monospace';
      ctx.fillText('[ AUDIO PAUSED - CLICK PLAY ]', 60, 26);
      return;
    }

    const bufferLength = audioEngine.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    audioEngine.analyser.getByteFrequencyData(dataArray);

    ctx.fillStyle = '#0a0e0e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 1.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height;

      // Disco Elysium Orange & Gold Gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, '#d96b27');
      gradient.addColorStop(0.5, '#e6a13b');
      gradient.addColorStop(1, '#2e5959');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);

      x += barWidth + 1;
    }

    timeDisplay.textContent = audioEngine.getElapsedTime();
    animFrameId = requestAnimationFrame(drawEQ);
  }

  playBtn.addEventListener('click', () => {
    if (!audioEngine.isPlaying) {
      audioEngine.start();
      playIcon.textContent = '⏸';
      playText.textContent = 'PAUSE SOUNDTRACK';
      drawEQ();
    } else {
      audioEngine.stop();
      playIcon.textContent = '▶';
      playText.textContent = 'PLAY SOUNDTRACK';
      if (animFrameId) cancelAnimationFrame(animFrameId);
      drawEQ();
    }
  });

  // Initial canvas draw
  drawEQ();
}

document.addEventListener('DOMContentLoaded', renderApp);
