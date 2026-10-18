/**
 * ============================================================================
 * SPRITUAL TECH — ASHRAM OPERATING SYSTEM & DIGITAL SANCTUARY
 * Co-Founded by RUDRA-2612 & Ishvit-Bhardwaj
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 1. WEB AUDIO API: SACRED SOUND SYNTHESIZER (Om Drone & Singing Bowls)
// ---------------------------------------------------------------------------
class SacredAudioEngine {
  constructor() {
    this.ctx = null;
    this.isOmPlaying = false;
    this.omOsc1 = null;
    this.omOsc2 = null;
    this.omGain = null;
    this.masterGain = null;
    this.volume = 0.3;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  toggleOmDrone() {
    this.init();
    if (this.isOmPlaying) {
      this.stopOmDrone();
      return false;
    } else {
      this.startOmDrone();
      return true;
    }
  }

  startOmDrone() {
    if (this.isOmPlaying) return;
    this.init();

    // 432 Hz Pythagorean sacred frequency base + octave drone
    this.omOsc1 = this.ctx.createOscillator();
    this.omOsc2 = this.ctx.createOscillator();
    this.omGain = this.ctx.createGain();

    this.omOsc1.type = 'sine';
    this.omOsc1.frequency.setValueAtTime(108, this.ctx.currentTime); // 108Hz Root Sub-Harmonic

    this.omOsc2.type = 'triangle';
    this.omOsc2.frequency.setValueAtTime(432 / 2, this.ctx.currentTime); // 216Hz Warm Drone

    // Filter for warm celestial aura
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, this.ctx.currentTime);

    this.omGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.omGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 3);

    this.omOsc1.connect(filter);
    this.omOsc2.connect(filter);
    filter.connect(this.omGain);
    this.omGain.connect(this.masterGain);

    this.omOsc1.start();
    this.omOsc2.start();
    this.isOmPlaying = true;
  }

  stopOmDrone() {
    if (!this.isOmPlaying || !this.omGain) return;
    this.omGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
    setTimeout(() => {
      try {
        if (this.omOsc1) this.omOsc1.stop();
        if (this.omOsc2) this.omOsc2.stop();
      } catch (e) {}
      this.isOmPlaying = false;
    }, 1600);
  }

  playSingingBowl() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // 528Hz Solfeggio / Ancient Tibetan Singing Bowl Frequency
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, this.ctx.currentTime);

    // Subtle metallic overtone
    const oscHarmonic = this.ctx.createOscillator();
    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(528 * 2.76, this.ctx.currentTime);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.8);

    osc.connect(gain);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(this.masterGain);
    gain.connect(this.masterGain);

    osc.start();
    oscHarmonic.start();
    osc.stop(this.ctx.currentTime + 4);
    oscHarmonic.stop(this.ctx.currentTime + 3);
  }

  playBeadClick() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }
}

const audioApp = new SacredAudioEngine();

// ---------------------------------------------------------------------------
// 2. DATA STORES: REVERED GURUS, RETREATS, DISCOURSES & ATTENDEES
// ---------------------------------------------------------------------------
const GURUS_DATA = [
  {
    id: 'guru-vedanta',
    name: 'Acharya Vedantacharya',
    title: 'Advaita Vedanta & Silence Master',
    tradition: 'Advaita Vedanta',
    category: 'Vedanta',
    location: 'Rishikesh Sanctuary',
    avatar: 'assets/hero.jpg',
    discipleCount: '48,000+ Disciples',
    liveStatus: 'Live Mauna Satsang Tomorrow at 6:00 AM IST',
    liveTopic: 'Chitta Shuddhi & The Eternal Witness',
    quote: '"You are not the thoughts that ripple across consciousness; you are the unshakeable stillness in which they arise and dissolve."',
    retreatsCount: 3,
    discoursesCount: 14
  },
  {
    id: 'guru-shantikrupa',
    name: 'Mata Shantikrupa Devi',
    title: 'Bhakti Yoga & Naada Kirtan Visionary',
    tradition: 'Bhakti & Prema Marga',
    category: 'Bhakti',
    location: 'Vrindavan Sacred Dham',
    avatar: 'assets/satsang.jpg',
    discipleCount: '62,000+ Disciples',
    liveStatus: 'Akhanda Kirtan Vigil Tonight at 8:00 PM IST',
    liveTopic: 'Awakening The Pure Devotional Heart Center',
    quote: '"When every heartbeat turns into a prayer, the divine presence does not remain a distant philosophy—it becomes your breath."',
    retreatsCount: 2,
    discoursesCount: 18
  },
  {
    id: 'guru-nirvanananda',
    name: 'Swami Nirvanananda Giri',
    title: 'Himalayan Dhyana & Kriya Master',
    tradition: 'Kriya & Raja Yoga',
    category: 'Kriya',
    location: 'Uttarkashi Hermitage',
    avatar: 'assets/sadhana.jpg',
    discipleCount: '35,000+ Disciples',
    liveStatus: 'Kriya Pranayama Intensive on Sunday',
    liveTopic: 'The Alchemy of Prana & Shushumna',
    quote: '"Pranayama is the divine bridge across which the wanderer mind crosses into pure, boundless transcendence."',
    retreatsCount: 2,
    discoursesCount: 12
  },
  {
    id: 'guru-tejomaya',
    name: 'Brahmarshi Tejomaya',
    title: 'Sacred Sound & Mantra Yogacharya',
    tradition: 'Naada & Mantra Yoga',
    category: 'Meditation',
    location: 'Varanasi Sacred Ghats',
    avatar: 'assets/satsang.jpg',
    discipleCount: '29,000+ Disciples',
    liveStatus: 'Vedic Chanting Stream at Sunset',
    liveTopic: 'Cosmic Harmonics of the 432Hz Om Vibration',
    quote: '"The universe emerged from the primordial vibration of Om. When you align your inner frequency, suffering dissolves into cosmic music."',
    retreatsCount: 1,
    discoursesCount: 10
  },
  {
    id: 'guru-anandabodha',
    name: 'Yogacharya Anandabodha',
    title: 'Raja Yoga & Mindfulness Acharya',
    tradition: 'Classical Patanjali Yoga',
    category: 'Meditation',
    location: 'Almora Pines Sanctuary',
    avatar: 'assets/hero.jpg',
    discipleCount: '41,000+ Disciples',
    liveStatus: 'Mindful Living Satsang this Saturday',
    liveTopic: 'Daily Karma Yoga & Mental Equilibrium',
    quote: '"Spirituality is not abandoning the world, but bringing radiant clarity and love into every single mundane responsibility."',
    retreatsCount: 2,
    discoursesCount: 16
  },
  {
    id: 'guru-chidghanananda',
    name: 'Paramhansa Chidghanananda',
    title: 'Kundalini Awakening & Mauna Diksha',
    tradition: 'Kriya & Tantra Yoga',
    category: 'Kriya',
    location: 'Gangotri Mountain Sanctuary',
    avatar: 'assets/sadhana.jpg',
    discipleCount: '31,000+ Disciples',
    liveStatus: 'Silent Kundalini Transmission at Dawn',
    liveTopic: 'Piercing the Chakras with Pure Consciousness',
    quote: '"Awakening is not something to be acquired; it is the natural fragrance of consciousness when the mind ceases to grasp."',
    retreatsCount: 2,
    discoursesCount: 11
  },
  {
    id: 'guru-amritavani',
    name: 'Sadhvi Amritavani Devi',
    title: 'Prema Bhakti & Akhanda Japa Guru',
    tradition: 'Bhakti & Prema Marga',
    category: 'Bhakti',
    location: 'Ayodhya Sacred Dham',
    avatar: 'assets/satsang_meditation.jpg',
    discipleCount: '54,000+ Disciples',
    liveStatus: 'Divine Naam Japa Session at 7:00 PM',
    liveTopic: 'The Nectar of Devotional Surrender',
    quote: '"In complete surrender, the ego melts and infinite peace floods the soul."',
    retreatsCount: 2,
    discoursesCount: 15
  },
  {
    id: 'guru-prajnatmananda',
    name: 'Swami Prajnatmananda',
    title: 'Mandukya Upanishad & Jnana Yoga',
    tradition: 'Advaita Vedanta',
    category: 'Vedanta',
    location: 'Haridwar Ganges Sanctuary',
    avatar: 'assets/hero.jpg',
    discipleCount: '38,000+ Disciples',
    liveStatus: 'Turiya State Discourse this Sunday',
    liveTopic: 'Beyond Waking, Dreaming, and Deep Sleep',
    quote: '"Discover the witness of all three states of mind, and you will know yourself to be immortal."',
    retreatsCount: 3,
    discoursesCount: 20
  },
  {
    id: 'guru-ishanadeva',
    name: 'Acharya Ishanadeva',
    title: 'Shaktipat & Transcendental Dhyana',
    tradition: 'Kashmir Shaivism',
    category: 'Meditation',
    location: 'Badrinath Sacred Valley',
    avatar: 'assets/sadhana.jpg',
    discipleCount: '27,000+ Disciples',
    liveStatus: 'Spanda Karika Satsang Tomorrow',
    liveTopic: 'The Sacred Throb of Shiva Consciousness',
    quote: '"Every sensation, every perception is nothing other than the divine dance of universal awareness."',
    retreatsCount: 1,
    discoursesCount: 13
  },
  {
    id: 'guru-karunapara',
    name: 'Mata Karunaparameshwari',
    title: 'Seva Yoga & Divine Compassion Guide',
    tradition: 'Bhakti & Karma Yoga',
    category: 'Bhakti',
    location: 'Ujjain Kshipra Sanctuary',
    avatar: 'assets/satsang.jpg',
    discipleCount: '46,000+ Disciples',
    liveStatus: 'Heart Awakening Pravachan Tonight',
    liveTopic: 'Serving the Divine in All Living Beings',
    quote: '"True spiritual vision sees no other; it beholds the Supreme smiling through every tear and every laugh."',
    retreatsCount: 2,
    discoursesCount: 14
  },
  {
    id: 'guru-divyaswarupa',
    name: 'Maharshi Divyaswarupa',
    title: 'Vedic Agnihotra & Chitta Shuddhi',
    tradition: 'Vedic Ritual & Dhyana',
    category: 'Vedanta',
    location: 'Omkareshwar Narmada Island',
    avatar: 'assets/hero.jpg',
    discipleCount: '33,000+ Disciples',
    liveStatus: 'Sacred Homa & Dhyana Stream',
    liveTopic: 'Purification of Mind Through Fire & Mantra',
    quote: '"Offer the restlessness of the senses into the flame of inner awareness."',
    retreatsCount: 1,
    discoursesCount: 9
  },
  {
    id: 'guru-bodhichetana',
    name: 'Yogini Bodhichetana',
    title: 'Prana Vidya & Breath Mastery Acharya',
    tradition: 'Hatha & Prana Yoga',
    category: 'Kriya',
    location: 'Kullu Mountain Hermitage',
    avatar: 'assets/satsang_meditation.jpg',
    discipleCount: '39,000+ Disciples',
    liveStatus: 'Advanced Pranayama Masterclass',
    liveTopic: 'Mastering the 5 Vital Pranic Currents',
    quote: '"Breath is the master of mind. Control the prana, and stillness will follow effortlessly."',
    retreatsCount: 2,
    discoursesCount: 17
  }
];

let currentSelectedGuru = GURUS_DATA[0];

const RETREATS_DATA = [
  {
    id: 'retreat-1',
    guruId: 'guru-vedanta',
    guru: 'Acharya Vedantacharya',
    codePrefix: 'RET-RISHI',
    title: '3-Day Silence & Kundalini Awakening Retreat',
    location: '📍 Rishikesh Ashram, Ganges Riverbank',
    dateMonth: 'NOV',
    dateDay: '14-16',
    desc: 'Complete digital detox, mauna (sacred silence), pranayama by the Ganga, and deep guided meditation with the Acharya.',
    price: 4500,
    image: 'assets/hero.jpg',
    highlights: ['Direct Guru Guidance', 'Complimentary Daily Japa Mala', 'Ashram Vegetarian Mahaprasad']
  },
  {
    id: 'retreat-2',
    guruId: 'guru-shantikrupa',
    guru: 'Mata Shantikrupa Devi',
    codePrefix: 'RET-VRINDA',
    title: 'Bhakti & Prema Satsang Maha-Utsav',
    location: '📍 Vrindavan Sacred Dham',
    dateMonth: 'DEC',
    dateDay: '05-07',
    desc: 'Immersive Naam Sankirtan, devotion philosophy discourses, and temple seva walks for spiritual transformation.',
    price: 3800,
    image: 'assets/satsang.jpg',
    highlights: ['Night Kirtan Vigils', 'Direct Question & Answer Session', 'Sacred Prasadam Distribution']
  },
  {
    id: 'retreat-3',
    guruId: 'guru-nirvanananda',
    guru: 'Swami Nirvanananda Giri',
    codePrefix: 'RET-KEDAR',
    title: 'Himalayan Dhyana & Upanishad Intensive',
    location: '📍 Uttarkashi Mountain Ashram',
    dateMonth: 'JAN',
    dateDay: '10-14',
    desc: 'Advanced seekers residential program studying the Mandukya Upanishad and experiencing deep Samadhi states.',
    price: 8500,
    image: 'assets/sadhana.jpg',
    highlights: ['5-Day Residential Stay', 'Personal Diksha Consultation', 'Lifelong Sadhana Mentorship']
  }
];

const DISCOURSES_DATA = [
  {
    id: 'disc-1',
    guruId: 'guru-vedanta',
    guru: 'Acharya Vedantacharya',
    title: 'Chitta Shuddhi: Master the Stillness Beyond Mental Chaos',
    category: 'meditation',
    categoryLabel: 'Meditation & Dhyana',
    duration: '42 min',
    desc: 'A pure sacred exploration of how the ancient rishis mastered mental agitations without external distractions.',
    image: 'assets/satsang.jpg'
  },
  {
    id: 'disc-2',
    guruId: 'guru-vedanta',
    guru: 'Acharya Vedantacharya',
    title: 'Bhagavad Gita Chapter 2: The Art of Nishkama Karma in Modern Life',
    category: 'vedanta',
    categoryLabel: 'Upanishad & Vedanta',
    duration: '58 min',
    desc: 'How to work effortlessly in high-pressure business and career environments while remaining established in peace.',
    image: 'assets/hero.jpg'
  },
  {
    id: 'disc-3',
    guruId: 'guru-shantikrupa',
    guru: 'Mata Shantikrupa Devi',
    title: 'Naam Sankirtan & The Awakening of Pure Heart Center',
    category: 'bhakti',
    categoryLabel: 'Bhakti & Kirtan',
    duration: '35 min',
    desc: 'Transformative devotional chanting session activating heart chakras with celestial melody.',
    image: 'assets/sadhana.jpg'
  },
  {
    id: 'disc-4',
    guruId: 'guru-anandabodha',
    guru: 'Yogacharya Anandabodha',
    title: 'Seeker Dialogue: Balancing Family, Work & Daily Sadhana',
    category: 'qa',
    categoryLabel: 'Seeker Q&A',
    duration: '28 min',
    desc: 'Real questions from disciples answered with practical wisdom, mindfulness, and Vedic clarity.',
    image: 'assets/satsang.jpg'
  },
  {
    id: 'disc-5',
    guruId: 'guru-nirvanananda',
    guru: 'Swami Nirvanananda Giri',
    title: 'Kriya Pranayama: The Alchemy of Cosmic Breath & Shushumna',
    category: 'meditation',
    categoryLabel: 'Meditation & Dhyana',
    duration: '48 min',
    desc: 'Deep Himalayan guidance on directing prana into the spine for effortless meditation states.',
    image: 'assets/hero.jpg'
  },
  {
    id: 'disc-6',
    guruId: 'guru-tejomaya',
    guru: 'Brahmarshi Tejomaya',
    title: 'Mandukya Upanishad: The 4 States of Consciousness & Om',
    category: 'vedanta',
    categoryLabel: 'Upanishad & Vedanta',
    duration: '54 min',
    desc: 'Unlocking the profound secrets of Waking, Dreaming, Deep Sleep, and Turiya through sacred vibration.',
    image: 'assets/sadhana.jpg'
  }
];

// Initial Live Checked-in Roster for Ashram Gate Volunteers
let ATTENDEE_ROSTER = [
  { id: 'RET-RISHI-9041', name: 'Ishvit Bhardwaj', tier: 'Standard Sadhak Pass', status: 'Booked', gate: 'Gate 1' },
  { id: 'RET-RISHI-8812', name: 'Ashish Jain', tier: 'Residential Ashram Stay', status: 'Verified', gate: 'Gate 1' },
  { id: 'RET-RISHI-7749', name: 'Sunita Mehra', tier: 'Standard Sadhak Pass', status: 'Verified', gate: 'Gate 2' },
  { id: 'RET-RISHI-6520', name: 'Dr. Alok Verma', tier: 'Residential Ashram Stay', status: 'Booked', gate: 'Gate 1' },
  { id: 'RET-RISHI-4311', name: 'Ananya Joshi', tier: 'Standard Sadhak Pass', status: 'Booked', gate: 'Gate 1' }
];

// Complete Directory of Disciples & Seekers for Guru Studio
let DISCIPLES_DIRECTORY = [
  { id: 'RET-RISHI-9041', name: 'Ishvit Bhardwaj', city: 'Delhi', tier: 'Standard Sadhak Pass', streak: '18 Days', status: 'Booked' },
  { id: 'RET-RISHI-8812', name: 'Ashish Jain', city: 'Varanasi', tier: 'Residential Ashram Stay', streak: '42 Days', status: 'Verified' },
  { id: 'RET-RISHI-7749', name: 'Sunita Mehra', city: 'Rishikesh', tier: 'Standard Sadhak Pass', streak: '12 Days', status: 'Verified' },
  { id: 'RET-RISHI-6520', name: 'Dr. Alok Verma', city: 'Bengaluru', tier: 'Residential Ashram Stay', streak: '30 Days', status: 'Booked' },
  { id: 'RET-RISHI-4311', name: 'Ananya Joshi', city: 'Pune', tier: 'Standard Sadhak Pass', streak: '9 Days', status: 'Booked' },
  { id: 'RET-RISHI-5190', name: 'Vikramaditya Roy', city: 'Kolkata', tier: 'Residential Ashram Stay', streak: '65 Days', status: 'Verified' },
  { id: 'RET-RISHI-3124', name: 'Meera Deshmukh', city: 'Mumbai', tier: 'Standard Sadhak Pass', streak: '21 Days', status: 'Booked' },
  { id: 'RET-RISHI-2901', name: 'Gaurav Singhal', city: 'Jaipur', tier: 'Residential Ashram Stay', streak: '15 Days', status: 'Booked' },
  { id: 'RET-RISHI-1144', name: 'Pooja Kashyap', city: 'Dehradun', tier: 'Standard Sadhak Pass', streak: '27 Days', status: 'Verified' },
  { id: 'RET-RISHI-9921', name: 'Swami Chaitanya', city: 'Haridwar', tier: 'Residential Ashram Stay', streak: '108 Days', status: 'Verified' }
];

// ---------------------------------------------------------------------------
// 3. APPLICATION INITIALIZATION & DOM BINDINGS
// ---------------------------------------------------------------------------
function bootstrapApp() {
  setupNavigation();
  setupRoleGate();
  setupSadhanaMenuDrawer();
  setupGurusDirectory();
  setupGuruStudio();
  setupAmbientAudio();
  renderGurusDirectory('all');
  renderDiscourses('all');
  renderRetreats();
  renderUserPasses();
  renderRoster();
  renderDisciplesTable('all');
  setupJapaMala();
  setupPranayama();
  setupSwadhyayaJournal();
  setupModals();
  setupScannerSimulation();
  setupLiveSatsangRoom();
  setupDakshinaLogic();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}

// ---------------------------------------------------------------------------
// UNIVERSAL SADHANA PRACTICES DRAWER / MENU CONTROLLER
// ---------------------------------------------------------------------------
function openSadhanaDrawer() {
  const drawer = document.getElementById('sadhanaMenuDrawer');
  if (!drawer) return;
  drawer.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  history.pushState({ sadhanaDrawerOpen: true }, '', window.location.pathname + window.location.search);
}

function closeSadhanaDrawer(fromPopState = false) {
  const drawer = document.getElementById('sadhanaMenuDrawer');
  if (!drawer || drawer.classList.contains('hidden')) return;
  drawer.classList.add('hidden');

  const anyOpenModal = document.querySelector('.modal-overlay:not(.hidden)');
  if (!anyOpenModal) {
    document.body.style.overflow = '';
  }

  if (!fromPopState && history.state && history.state.sadhanaDrawerOpen) {
    history.back();
  }
}

function setupSadhanaMenuDrawer() {
  const triggerBtn = document.getElementById('btnSadhanaMenuTrigger');
  const closeBtn = document.getElementById('btnCloseSadhanaDrawer');
  const drawer = document.getElementById('sadhanaMenuDrawer');
  const omDroneBtn = document.getElementById('drawerBtnOmDrone');
  const singingBowlBtn = document.getElementById('drawerBtnSingingBowl');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openSadhanaDrawer();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeSadhanaDrawer();
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        closeSadhanaDrawer();
      }
    });
  }

  if (omDroneBtn) {
    omDroneBtn.addEventListener('click', () => {
      const isPlaying = audioApp.toggleOmDrone();
      omDroneBtn.textContent = isPlaying ? '⏸ Pause Om' : '▶ 432Hz Om';
      showToast(isPlaying ? '🕉️ 432Hz Cosmic Om Drone started' : '432Hz Om Drone paused');
    });
  }

  if (singingBowlBtn) {
    singingBowlBtn.addEventListener('click', () => {
      audioApp.playSingingBowl();
      showToast('🔔 528Hz Tibetan Singing Bowl struck');
    });
  }

  // Practices Item Click Handlers
  document.querySelectorAll('.practice-menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      closeSadhanaDrawer();
      audioApp.playBeadClick();

      // Ensure seeker view is active
      const seekerWrapper = document.getElementById('viewSeekerWrapper');
      const guruWrapper = document.getElementById('viewGuruWrapper');
      if (seekerWrapper) seekerWrapper.classList.add('active');
      if (guruWrapper) guruWrapper.classList.remove('active');
      const btnRoleSeeker = document.getElementById('btnRoleSeeker');
      const btnRoleGuru = document.getElementById('btnRoleGuru');
      if (btnRoleSeeker) btnRoleSeeker.classList.add('active');
      if (btnRoleGuru) btnRoleGuru.classList.remove('active');

      if (action === 'goto-directory') {
        returnToGurusDirectory();
        return;
      }

      if (action === 'goto-dakshina') {
        openModal('dakshinaModal');
        return;
      }

      // If on home directory, open sanctuary first so the feature view exists
      const homeDir = document.getElementById('seekerHomeDirectory');
      if (homeDir && homeDir.classList.contains('active')) {
        selectGuru(currentSelectedGuru.id);
      }

      setTimeout(() => {
        if (action === 'goto-japa') {
          const target = document.getElementById('view-sadhana');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          const bead = document.getElementById('beadCircle');
          if (bead) {
            bead.classList.add('tap-anim');
            setTimeout(() => bead.classList.remove('tap-anim'), 300);
          }
          showToast('📿 108 Japa Mala Counter ready. Tap bead or press Spacebar!');
        } else if (action === 'goto-pranayama') {
          const target = document.getElementById('view-sadhana');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          showToast('🌬️ 4-4-4-4 Pranayama Box Breathing suite ready.');
        } else if (action === 'goto-journal') {
          const target = document.getElementById('view-sadhana');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          const input = document.getElementById('journalInput');
          if (input) input.focus();
          showToast('📖 Swadhyaya Daily Contemplative Journal ready.');
        } else if (action === 'goto-kirtan') {
          const target = document.getElementById('view-discourses');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          triggerDiscourseTab('bhakti');
          showToast('🪕 Bhakti & Naam Sankirtan discourses loaded.');
        } else if (action === 'goto-dhyan') {
          const target = document.getElementById('view-discourses');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          triggerDiscourseTab('meditation');
          showToast('🧘 Meditation & Dhyana discourses loaded.');
        } else if (action === 'goto-vedanta') {
          const target = document.getElementById('view-discourses');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          triggerDiscourseTab('vedanta');
          showToast('📜 Upanishad & Vedanta Pravachan loaded.');
        } else if (action === 'goto-retreats') {
          const target = document.getElementById('view-retreats');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          showToast('🎟️ Ashram Retreats & Digital Passes ready.');
        }
      }, 120);
    });
  });
}

// ---------------------------------------------------------------------------
// GURUS DIRECTORY & SANCTUARY PORTAL NAVIGATION
// ---------------------------------------------------------------------------
function getFollowedGurus() {
  try {
    return JSON.parse(localStorage.getItem('spritual_followed_gurus') || '[]');
  } catch (e) {
    return [];
  }
}

function toggleFollowGuru(guruId, buttonEl) {
  let followed = getFollowedGurus();
  const guru = GURUS_DATA.find(g => g.id === guruId);
  const guruName = guru ? guru.name : 'Guru';

  if (followed.includes(guruId)) {
    followed = followed.filter(id => id !== guruId);
    localStorage.setItem('spritual_followed_gurus', JSON.stringify(followed));
    if (buttonEl) {
      buttonEl.classList.remove('followed');
      buttonEl.textContent = '➕ Follow';
      buttonEl.title = 'Follow Guru';
    }
    showToast(`Unfollowed ${guruName}`);
  } else {
    followed.push(guruId);
    localStorage.setItem('spritual_followed_gurus', JSON.stringify(followed));
    if (buttonEl) {
      buttonEl.classList.add('followed');
      buttonEl.textContent = '✓ Following';
      buttonEl.title = 'Unfollow Guru';
    }
    audioApp.playBeadClick();
    showToast(`🌸 You are now following ${guruName}! Direct updates enabled.`);
  }
}

function renderGurusDirectory(filter = 'all', searchQuery = '') {
  const grid = document.getElementById('gurusGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let list = GURUS_DATA;
  if (filter && filter !== 'all') {
    const fLower = filter.toLowerCase();
    list = list.filter(g => 
      g.category.toLowerCase().includes(fLower) || 
      g.tradition.toLowerCase().includes(fLower)
    );
  }

  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(g => 
      g.name.toLowerCase().includes(q) || 
      g.tradition.toLowerCase().includes(q) || 
      g.location.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--gold-300);">
        <p style="font-size: 1.2rem; margin-bottom: 12px;">🕉️ No Gurus found matching your search.</p>
        <button class="btn btn-sm btn-gold" id="btnResetGuruFilter">View All Revered Gurus</button>
      </div>
    `;
    const resetBtn = document.getElementById('btnResetGuruFilter');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const searchInput = document.getElementById('guruSearchInput');
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.guru-filter-pill').forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-filter') === 'all');
        });
        renderGurusDirectory('all', '');
      });
    }
    return;
  }

  const followedList = getFollowedGurus();

  list.forEach(guru => {
    const isFollowed = followedList.includes(guru.id);
    const card = document.createElement('div');
    card.className = 'guru-card';
    card.innerHTML = `
      <div class="guru-card-media">
        <img src="${guru.avatar}" alt="${guru.name}" loading="lazy">
        <span class="guru-tradition-pill">${guru.tradition}</span>
        <span class="guru-location-pill">📍 ${guru.location}</span>
      </div>
      <div class="guru-card-body">
        <h3 class="guru-card-name">${guru.name}</h3>
        <p class="guru-card-subtitle">${guru.title}</p>
        <div class="guru-card-stats">
          <span>👥 ${guru.discipleCount}</span>
          <span>📜 ${guru.discoursesCount} Teachings</span>
        </div>
        <div class="guru-card-actions">
          <button class="btn-follow-guru ${isFollowed ? 'followed' : ''}" data-guru-id="${guru.id}" title="${isFollowed ? 'Unfollow Guru' : 'Follow Guru'}">
            ${isFollowed ? '✓ Following' : '➕ Follow'}
          </button>
          <button class="btn-select-guru" data-guru-id="${guru.id}">
            Enter Sanctuary ➔
          </button>
        </div>
      </div>
    `;

    // Follow button click
    const followBtn = card.querySelector('.btn-follow-guru');
    if (followBtn) {
      followBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFollowGuru(guru.id, followBtn);
      });
    }

    // Select guru button & entire card click
    card.addEventListener('click', () => {
      audioApp.playSingingBowl();
      selectGuru(guru.id);
    });

    grid.appendChild(card);
  });
}

function selectGuru(guruId) {
  const guru = GURUS_DATA.find(g => g.id === guruId) || GURUS_DATA[0];
  currentSelectedGuru = guru;

  // 1. Update Mini Sticky Bar
  const miniName = document.getElementById('miniGuruName');
  if (miniName) miniName.textContent = guru.name;

  const miniTradition = document.getElementById('miniGuruTradition');
  if (miniTradition) miniTradition.textContent = `${guru.tradition} • ${guru.location}`;

  // 2. Update Grand Hero Elements
  const heroHeading = document.getElementById('guruHeroHeading');
  if (heroHeading) {
    heroHeading.innerHTML = `${guru.name}<br><span class="gradient-gold">Digital Ashram Sanctuary</span>`;
  }

  const traditionTag = document.getElementById('guruHeroTraditionTag');
  if (traditionTag) {
    traditionTag.innerHTML = `<span class="dot"></span> ${guru.tradition} Master • ${guru.location}`;
  }

  const heroQuote = document.getElementById('guruHeroQuote');
  if (heroQuote) heroQuote.textContent = guru.quote;

  const heroBgImg = document.getElementById('guruHeroBgImg');
  if (heroBgImg) heroBgImg.src = guru.avatar;

  const liveGuruName = document.getElementById('liveGuruName');
  if (liveGuruName) liveGuruName.textContent = `${guru.name}:`;

  const liveGuruTopic = document.getElementById('liveGuruTopic');
  if (liveGuruTopic) liveGuruTopic.textContent = `"${guru.liveTopic || 'Direct Satsang'}"`;

  // 3. Render offerings personalized to this Guru
  renderDiscourses('all', guru);
  renderRetreats(guru);

  // 4. Switch Subview
  const homeDir = document.getElementById('seekerHomeDirectory');
  const sanctuary = document.getElementById('seekerGuruSanctuary');
  if (homeDir) homeDir.classList.remove('active');
  if (sanctuary) sanctuary.classList.add('active');

  // 5. Browser history push for back navigation
  if (!history.state || history.state.guruSelected !== guru.id) {
    history.pushState({ guruSelected: guru.id }, '', `#guru=${guru.id}`);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast(`🙏 Welcome to the sacred sanctuary of ${guru.name}`);
}

function returnToGurusDirectory(fromPopState = false) {
  const homeDir = document.getElementById('seekerHomeDirectory');
  const sanctuary = document.getElementById('seekerGuruSanctuary');
  if (sanctuary) sanctuary.classList.remove('active');
  if (homeDir) homeDir.classList.add('active');

  if (!fromPopState && history.state && history.state.guruSelected) {
    history.back();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupGurusDirectory() {
  const searchInput = document.getElementById('guruSearchInput');
  const filterPills = document.querySelectorAll('.guru-filter-pill');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('.guru-filter-pill.active');
      const filter = activePill ? activePill.getAttribute('data-filter') : 'all';
      renderGurusDirectory(filter, e.target.value);
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      const q = searchInput ? searchInput.value : '';
      renderGurusDirectory(filter, q);
    });
  });

  // Return to Gurus button in Sticky Topbar
  const backBtn = document.getElementById('btnBackToGurus');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      audioApp.playBeadClick();
      returnToGurusDirectory(false);
    });
  }

  // Quick Dakshina button in Sticky Topbar
  const quickDakshina = document.getElementById('btnQuickDakshina');
  if (quickDakshina) {
    quickDakshina.addEventListener('click', () => {
      openModal('dakshinaModal');
    });
  }

  // Brand Logo click navigates back to directory if in sanctuary
  const brandLogo = document.getElementById('brandLogo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      const sanctuary = document.getElementById('seekerGuruSanctuary');
      if (sanctuary && sanctuary.classList.contains('active')) {
        returnToGurusDirectory(false);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Quick feature jump tabs inside selected Guru sanctuary
  document.querySelectorAll('.feature-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.feature-nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      const targetHref = link.getAttribute('href');
      const targetEl = document.querySelector(targetHref);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }

      const text = link.textContent;
      if (text.includes('Meditation') || text.includes('Dhyana')) {
        triggerDiscourseTab('meditation');
      } else if (text.includes('Bhakti') || text.includes('Kirtan')) {
        triggerDiscourseTab('bhakti');
      } else if (text.includes('Upanishad') || text.includes('Pravachan') || text.includes('Vedanta')) {
        triggerDiscourseTab('vedanta');
      }
    });
  });

  // Check URL hash on initial load
  const hash = window.location.hash;
  if (hash && hash.startsWith('#guru=')) {
    const targetGuruId = hash.replace('#guru=', '');
    selectGuru(targetGuruId);
  }
}

function triggerDiscourseTab(category) {
  document.querySelectorAll('.tab-chip').forEach(tab => {
    if (tab.getAttribute('data-category') === category) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  renderDiscourses(category);
}

// ---------------------------------------------------------------------------
// NAVIGATION & ROLE SWITCHER
// ---------------------------------------------------------------------------
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // If in Guru Studio, switch back to seeker view
        const seekerWrapper = document.getElementById('viewSeekerWrapper');
        const guruWrapper = document.getElementById('viewGuruWrapper');
        if (seekerWrapper) seekerWrapper.classList.add('active');
        if (guruWrapper) guruWrapper.classList.remove('active');
        const btnRoleSeeker = document.getElementById('btnRoleSeeker');
        const btnRoleGuru = document.getElementById('btnRoleGuru');
        if (btnRoleSeeker) btnRoleSeeker.classList.add('active');
        if (btnRoleGuru) btnRoleGuru.classList.remove('active');

        // If in directory and user clicks a feature nav item, select default guru and view that section
        const homeDir = document.getElementById('seekerHomeDirectory');
        if (homeDir && homeDir.classList.contains('active')) {
          selectGuru(currentSelectedGuru.id);
        }

        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  });

  // Hero Quick CTAs
  const heroExplore = document.getElementById('heroExploreRetreats');
  if (heroExplore) {
    heroExplore.addEventListener('click', () => {
      const viewRetreats = document.getElementById('view-retreats');
      if (viewRetreats) viewRetreats.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const heroSadhana = document.getElementById('heroStartSadhana');
  if (heroSadhana) {
    heroSadhana.addEventListener('click', () => {
      const viewSadhana = document.getElementById('view-sadhana');
      if (viewSadhana) viewSadhana.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ---------------------------------------------------------------------------
// ROLE GATE ENTRANCE (GURU OR DISCIPLE) & ROLE CONTROLLER
// ---------------------------------------------------------------------------
function openRoleGateModal() {
  const modal = document.getElementById('roleGateModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeRoleGateModal() {
  const modal = document.getElementById('roleGateModal');
  if (!modal) return;
  modal.classList.add('hidden');
  const anyOpenModal = document.querySelector('.modal-overlay:not(.hidden)');
  if (!anyOpenModal) {
    document.body.style.overflow = '';
  }
}

function applyUserRole(role, notify = true) {
  const seekerWrapper = document.getElementById('viewSeekerWrapper');
  const guruWrapper = document.getElementById('viewGuruWrapper');
  const avatar = document.getElementById('headerAvatar');
  const roleTag = document.getElementById('headerRoleTag');
  const nameDisplay = document.getElementById('headerNameDisplay');
  const mainNav = document.getElementById('mainNav');

  localStorage.setItem('spritual_user_role', role);

  if (role === 'guru') {
    if (seekerWrapper) seekerWrapper.classList.remove('active');
    if (guruWrapper) guruWrapper.classList.add('active');
    if (avatar) avatar.textContent = '🕉️';
    if (roleTag) roleTag.textContent = 'Guru Studio';
    if (nameDisplay) nameDisplay.textContent = 'Acharya Vedantacharya';
    if (mainNav) mainNav.style.display = 'none'; // Guru has dedicated ashram studio
    if (notify) showToast('🕉️ Welcome to Guru Studio: Acharya Vedantacharya');
  } else {
    // Default: Disciple / Seeker
    if (guruWrapper) guruWrapper.classList.remove('active');
    if (seekerWrapper) seekerWrapper.classList.add('active');
    if (avatar) avatar.textContent = '🧘';
    if (roleTag) roleTag.textContent = 'Disciple Mode';
    if (nameDisplay) nameDisplay.textContent = 'Ishvit Bhardwaj';
    if (mainNav) mainNav.style.display = 'flex';
    if (notify) showToast('🧘 Welcome to Disciple Sanctuary: Ishvit Bhardwaj');
  }

  closeRoleGateModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupRoleGate() {
  // Check persisted role on initial load
  const savedRole = localStorage.getItem('spritual_user_role');
  if (!savedRole) {
    // Show role entrance prompt
    openRoleGateModal();
  } else {
    applyUserRole(savedRole, false);
  }

  // Bind Card 1: Disciple
  const cardDisciple = document.getElementById('cardChooseDisciple');
  const btnEnterDisciple = document.getElementById('btnEnterAsDisciple');
  if (cardDisciple) {
    cardDisciple.addEventListener('click', () => {
      audioApp.playSingingBowl();
      applyUserRole('disciple', true);
    });
  }
  if (btnEnterDisciple) {
    btnEnterDisciple.addEventListener('click', (e) => {
      e.stopPropagation();
      audioApp.playSingingBowl();
      applyUserRole('disciple', true);
    });
  }

  // Bind Card 2: Guru
  const cardGuru = document.getElementById('cardChooseGuru');
  const btnEnterGuru = document.getElementById('btnEnterAsGuru');
  if (cardGuru) {
    cardGuru.addEventListener('click', () => {
      audioApp.playSingingBowl();
      applyUserRole('guru', true);
    });
  }
  if (btnEnterGuru) {
    btnEnterGuru.addEventListener('click', (e) => {
      e.stopPropagation();
      audioApp.playSingingBowl();
      applyUserRole('guru', true);
    });
  }

  // Top-Right Logout / Switch Button
  const btnLogout = document.getElementById('btnLogoutRole');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      audioApp.playBeadClick();
      localStorage.removeItem('spritual_user_role');
      openRoleGateModal();
      showToast('🚪 Logged out. Choose your portal: Guru or Disciple.');
    });
  }

  // Backdrop click to close if already logged in
  const roleModal = document.getElementById('roleGateModal');
  if (roleModal) {
    roleModal.addEventListener('click', (e) => {
      if (e.target === roleModal) {
        // If a role is already set, allow closing modal; otherwise enforce selection
        if (localStorage.getItem('spritual_user_role')) {
          closeRoleGateModal();
        } else {
          showToast('Please select Guru or Disciple to enter.');
        }
      }
    });
  }

  // Legacy switcher buttons if present
  const btnSeeker = document.getElementById('btnRoleSeeker');
  const btnGuru = document.getElementById('btnRoleGuru');
  if (btnSeeker) {
    btnSeeker.addEventListener('click', () => applyUserRole('disciple', true));
  }
  if (btnGuru) {
    btnGuru.addEventListener('click', () => applyUserRole('guru', true));
  }

  const openScanBtn = document.getElementById('btnOpenScanner');
  if (openScanBtn) {
    openScanBtn.addEventListener('click', () => {
      const scannerEl = document.getElementById('sectionGuruScanner') || document.querySelector('.scanner-simulation-box');
      if (scannerEl) {
        scannerEl.scrollIntoView({ behavior: 'smooth' });
        const input = document.getElementById('manualTicketInput');
        if (input) input.focus();
      }
    });
  }
}

// Backwards compatibility alias
const setupRoleSwitcher = setupRoleGate;

// ---------------------------------------------------------------------------
// GURU STUDIO INTERACTIVE DASHBOARD & DISCIPLES DIRECTORY
// ---------------------------------------------------------------------------
function renderDisciplesTable(filter = 'all', searchQuery = '') {
  const tbody = document.getElementById('disciplesTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  let list = DISCIPLES_DIRECTORY;

  if (filter !== 'all') {
    if (filter === 'Verified') {
      list = list.filter(d => d.status === 'Verified');
    } else {
      list = list.filter(d => d.tier === filter);
    }
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.id.toLowerCase().includes(q) || 
      d.city.toLowerCase().includes(q)
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 24px; color: var(--text-muted);">No disciples matching this filter.</td></tr>`;
    return;
  }

  list.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="mono-code">${d.id}</span></td>
      <td><strong>${d.name}</strong></td>
      <td><span style="color: var(--text-muted); font-size: 0.85rem;">📍 ${d.city}</span></td>
      <td>${d.tier}</td>
      <td><span style="color: #fb923c; font-weight: 600;">🔥 ${d.streak}</span></td>
      <td>
        <span class="status-pill ${d.status === 'Verified' ? 'status-verified' : 'status-pending'}">
          ${d.status === 'Verified' ? '✓ Gate Verified' : 'Booked'}
        </span>
      </td>
      <td>
        <button class="btn-sm btn-ghost btn-disciple-action" data-id="${d.id}" data-name="${d.name}">
          ${d.status === 'Verified' ? 'View Details' : 'Verify Entry'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.btn-disciple-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const disciple = DISCIPLES_DIRECTORY.find(d => d.id === id);
      if (disciple && disciple.status !== 'Verified') {
        disciple.status = 'Verified';
        // Also update roster if present
        const att = ATTENDEE_ROSTER.find(a => a.id === id);
        if (att) att.status = 'Verified';
        renderDisciplesTable(filter, searchQuery);
        renderRoster();
        audioApp.playSingingBowl();
        showToast(`✓ Entry verified for ${name} (${id})`);
      } else {
        showToast(`📋 Seeker: ${name} • Diksha: ${disciple?.tier} • Streak: ${disciple?.streak}`);
      }
    });
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.right = '30px';
  toast.style.background = 'linear-gradient(135deg, #fb923c, #ea580c)';
  toast.style.color = '#fff';
  toast.style.padding = '12px 22px';
  toast.style.borderRadius = '30px';
  toast.style.fontWeight = '600';
  toast.style.fontSize = '0.9rem';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
  toast.style.zIndex = '9999';
  toast.style.transition = 'all 0.3s ease';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}

function setupGuruStudio() {
  // 1. Core 4 Questions Metric Cards Smooth Jump Handlers
  const cardViews = document.getElementById('guruCardViews');
  if (cardViews) {
    cardViews.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('panelSatsangViews');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 35px rgba(234, 88, 12, 0.45)';
        setTimeout(() => el.style.boxShadow = '', 1600);
      }
    });
  }

  const cardPopularity = document.getElementById('guruCardPopularity');
  if (cardPopularity) {
    cardPopularity.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('panelContentPopularity');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 35px rgba(245, 158, 11, 0.45)';
        setTimeout(() => el.style.boxShadow = '', 1600);
      }
    });
  }

  const cardTickets = document.getElementById('guruCardTickets');
  if (cardTickets) {
    cardTickets.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('sectionGuruRetreats');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 35px rgba(234, 88, 12, 0.45)';
        setTimeout(() => el.style.boxShadow = '', 1600);
      }
    });
  }

  const cardFollowers = document.getElementById('guruCardFollowers');
  if (cardFollowers) {
    cardFollowers.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('panelFollowersReach') || document.getElementById('sectionGuruDisciples');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 35px rgba(249, 115, 22, 0.45)';
        setTimeout(() => el.style.boxShadow = '', 1600);
      }
    });
  }

  // Backward compatible handlers
  const cardDisciples = document.getElementById('guruCardDisciples');
  if (cardDisciples) {
    cardDisciples.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('sectionGuruDisciples');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.4)';
        setTimeout(() => el.style.boxShadow = '', 1500);
      }
    });
  }

  const cardRetreat = document.getElementById('guruCardRetreat');
  if (cardRetreat) {
    cardRetreat.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('sectionGuruRetreats');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.4)';
        setTimeout(() => el.style.boxShadow = '', 1500);
      }
    });
  }

  const cardScanner = document.getElementById('guruCardScanner');
  if (cardScanner) {
    cardScanner.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('sectionGuruScanner');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        const input = document.getElementById('manualTicketInput');
        if (input) input.focus();
      }
    });
  }

  const cardLedger = document.getElementById('guruCardLedger');
  if (cardLedger) {
    cardLedger.addEventListener('click', () => {
      audioApp.playBeadClick();
      const el = document.getElementById('sectionGuruLedger');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.style.boxShadow = '0 0 30px rgba(249, 115, 22, 0.4)';
        setTimeout(() => el.style.boxShadow = '', 1500);
      }
    });
  }

  // 2. Rishikesh Retreat Capacity Interaction
  let rishikeshSlots = 450;
  const btnAddSlots = document.getElementById('btnAddSlotsBtn');
  if (btnAddSlots) {
    btnAddSlots.addEventListener('click', () => {
      rishikeshSlots += 25;
      const booked = 412;
      const remaining = rishikeshSlots - booked;
      const pct = ((booked / rishikeshSlots) * 100).toFixed(1);

      const capNumber = document.getElementById('rishikeshCapNumber');
      if (capNumber) capNumber.textContent = `${booked} / ${rishikeshSlots}`;

      const capPct = document.getElementById('rishikeshCapPct');
      if (capPct) capPct.textContent = `${pct}% Total Capacity Filled`;

      const capBar = document.getElementById('rishikeshCapBar');
      if (capBar) capBar.style.width = `${pct}%`;

      const remainingVal = document.getElementById('rishikeshRemainingVal');
      if (remainingVal) remainingVal.textContent = `${remaining} Passes`;

      const statBooked = document.getElementById('statRishikeshBooked');
      if (statBooked) statBooked.textContent = `${booked} / ${rishikeshSlots}`;

      const statCapText = document.getElementById('statRishikeshCapText');
      if (statCapText) statCapText.textContent = `${pct}% capacity filled • ${remaining} slots left`;

      audioApp.playSingingBowl();
      showToast(`✨ +25 Accommodation slots added! Total capacity is now ${rishikeshSlots}.`);
    });
  }

  const btnNotice = document.getElementById('btnSendSeekerNotice');
  if (btnNotice) {
    btnNotice.addEventListener('click', () => {
      audioApp.playSingingBowl();
      showToast('📢 WhatsApp message sent to all 412 registered disciples.');
    });
  }

  // 3. Disciples Search & Filter Pills
  const searchInput = document.getElementById('discipleSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('.disciple-filter-pill.active');
      const filter = activePill ? activePill.getAttribute('data-filter') : 'all';
      renderDisciplesTable(filter, e.target.value);
    });
  }

  document.querySelectorAll('.disciple-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.disciple-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      const q = searchInput ? searchInput.value : '';
      renderDisciplesTable(filter, q);
    });
  });

  // 4. Quick Code Chips in Scanner
  document.querySelectorAll('.quick-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      const input = document.getElementById('manualTicketInput');
      if (input) {
        input.value = code;
        const btnVerify = document.getElementById('btnManualScanVerify');
        if (btnVerify) btnVerify.click();
      }
    });
  });

  // 5. Export Ledger CSV
  const btnExport = document.getElementById('btnExportLedgerCsv');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Transaction ID,Source,Purpose,Gross (INR),Ashram Fee (INR),Net Settled (INR),Status\n" +
        "TXN-8841-A,Retreat Bookings,Rishikesh Silence Retreat,545000,0,545000,Settled SBI A/C 8841\n" +
        "TXN-8841-B,Devotee Dakshina,Gau Seva & Ashram Langar,140000,0,140000,Settled SBI A/C 8841\n" +
        "TOTAL,,685000,0,685000,T+0 Cleared\n";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Ashram_Ledger_Settlement_2026.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast('📥 Ashram Statement CSV downloaded successfully.');
    });
  }

  // 6. Launch New Retreat Modal
  const btnCreateModal = document.getElementById('btnCreateRetreatModal');
  const createModal = document.getElementById('createRetreatModal');
  const closeCreateModalBtn = document.getElementById('closeCreateRetreatModalBtn');
  const btnCancelCreate = document.getElementById('btnCancelCreateRetreat');
  const btnSubmitNew = document.getElementById('btnSubmitNewRetreat');

  if (btnCreateModal) {
    btnCreateModal.addEventListener('click', () => {
      openModal('createRetreatModal');
    });
  }

  if (closeCreateModalBtn) {
    closeCreateModalBtn.addEventListener('click', () => {
      closeModal('createRetreatModal');
    });
  }

  if (btnCancelCreate) {
    btnCancelCreate.addEventListener('click', () => {
      closeModal('createRetreatModal');
    });
  }

  if (btnSubmitNew && createModal) {
    btnSubmitNew.addEventListener('click', () => {
      const title = document.getElementById('newRetreatTitle').value.trim() || 'Himalayan Silence Gathering';
      const loc = document.getElementById('newRetreatLocation').value.trim() || '📍 Rishikesh Ashram';
      const month = document.getElementById('newRetreatMonth').value.trim() || 'FEB';
      const days = document.getElementById('newRetreatDays').value.trim() || '18-22';
      const price = parseInt(document.getElementById('newRetreatPrice').value, 10) || 5000;

      RETREATS_DATA.push({
        id: `retreat-${Date.now()}`,
        codePrefix: 'RET-NEW',
        title: title,
        location: loc,
        dateMonth: month,
        dateDay: days,
        desc: 'New residential ashram gathering published by the Guru.',
        price: price,
        image: 'assets/hero.jpg',
        highlights: ['Direct Guru Guidance', 'Ashram Prasadam Included', 'Direct Guru Diksha Slot']
      });

      renderRetreats();
      closeModal('createRetreatModal');
      audioApp.playSingingBowl();
      showToast(`✨ "${title}" successfully published to Sanctuary retreats!`);
    });
  }
}

// ---------------------------------------------------------------------------
// AMBIENT SACRED AUDIO BAR
// ---------------------------------------------------------------------------
function setupAmbientAudio() {
  const toggleBtn = document.getElementById('toggleAmbientBtn');
  const volumeSlider = document.getElementById('ambientVolume');
  const trackName = document.getElementById('ambientTrackName');
  const playIcon = document.getElementById('ambientPlayIcon');

  toggleBtn.addEventListener('click', () => {
    const isPlaying = audioApp.toggleOmDrone();
    if (isPlaying) {
      playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
      trackName.textContent = 'Digital Sanctuary: 432Hz Om Drone Active (Pure Vani)';
      trackName.style.color = '#10b981';
    } else {
      playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
      trackName.textContent = 'Digital Sanctuary: 432Hz Cosmic Om Drone (Paused)';
      trackName.style.color = 'var(--gold-300)';
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    audioApp.setVolume(parseFloat(e.target.value));
  });

  document.getElementById('btnDemoBackgroundAudio').addEventListener('click', () => {
    audioApp.playSingingBowl();
    audioApp.startOmDrone();
    playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    trackName.textContent = 'Background Audio Mode Active: You can close apps or turn off screen!';
    trackName.style.color = '#38bdf8';
  });
}

// ---------------------------------------------------------------------------
// SACRED DISCOURSES & PRAVACHAN LIBRARY
// ---------------------------------------------------------------------------
function renderDiscourses(category = 'all', filterGuru = null) {
  const grid = document.getElementById('discoursesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const activeGuru = filterGuru || currentSelectedGuru;
  let list = DISCOURSES_DATA;
  if (activeGuru) {
    const guruSpecific = list.filter(d => d.guru === activeGuru.name || d.guruId === activeGuru.id);
    const others = list.filter(d => d.guru !== activeGuru.name && d.guruId !== activeGuru.id);
    list = [...guruSpecific, ...others];
  }

  const filtered = category === 'all' 
    ? list 
    : list.filter(d => d.category === category);

  filtered.forEach(d => {
    const card = document.createElement('div');
    card.className = 'discourse-card';
    card.innerHTML = `
      <div class="card-media">
        <img src="${d.image}" alt="${d.title}">
        <span class="sacred-audio-tag">🕉️ Sacred Audio</span>
        <span class="duration-tag">${d.duration}</span>
      </div>
      <div class="card-body">
        <span class="card-category">${d.categoryLabel}</span>
        <h3 class="card-title">${d.title}</h3>
        <p class="card-desc">${d.desc}</p>
        <div class="card-footer">
          <span class="guru-name">Vani: ${d.guru}</span>
          <button class="btn-sm btn-gold btn-play-discourse" data-id="${d.id}">
            ▶ Listen to Pravachan
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach audio triggers
  grid.querySelectorAll('.btn-play-discourse').forEach(btn => {
    btn.addEventListener('click', () => {
      audioApp.playSingingBowl();
      showToast('Playing discourse in Sacred Sanctuary Mode with background audio support.');
    });
  });
}

// Global Tab Filtering for Discourses
document.querySelectorAll('.tab-chip').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-chip').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderDiscourses(tab.getAttribute('data-category'));
  });
});

// ---------------------------------------------------------------------------
// RETREATS & QR PASS BOOKING ENGINE
// ---------------------------------------------------------------------------
let selectedRetreatForBooking = RETREATS_DATA[0];

function renderRetreats(filterGuru = null) {
  const grid = document.getElementById('retreatsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const activeGuru = filterGuru || currentSelectedGuru;
  let list = RETREATS_DATA;
  if (activeGuru) {
    const guruSpecific = list.filter(r => r.guru === activeGuru.name || r.guruId === activeGuru.id);
    const others = list.filter(r => r.guru !== activeGuru.name && r.guruId !== activeGuru.id);
    list = [...guruSpecific, ...others];
  }

  list.forEach(r => {
    const card = document.createElement('div');
    card.className = 'retreat-card';
    card.innerHTML = `
      <div class="retreat-media">
        <img src="${r.image}" alt="${r.title}">
        <div class="retreat-date-badge">
          <span class="month">${r.dateMonth}</span>
          <span class="day">${r.dateDay}</span>
        </div>
      </div>
      <div class="retreat-body">
        <span class="retreat-loc">${r.location}</span>
        <h3 class="retreat-title">${r.title}</h3>
        <p style="color: var(--gold-400); font-size: 0.82rem; font-weight: 600; margin-bottom: 8px;">Presided by: ${r.guru}</p>
        <p class="retreat-desc">${r.desc}</p>
        <ul class="retreat-highlights">
          ${r.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="retreat-footer">
          <div class="retreat-price">
            <span>Pass from</span>
            <strong>₹ ${r.price.toLocaleString('en-IN')}</strong>
          </div>
          <button class="btn btn-gold btn-book-retreat" data-id="${r.id}">
            Book Pass & Get QR
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('.btn-book-retreat').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      selectedRetreatForBooking = RETREATS_DATA.find(r => r.id === id);
      openRetreatBookingModal(selectedRetreatForBooking);
    });
  });
}

function openRetreatBookingModal(retreat) {
  const modal = document.getElementById('retreatModal');
  document.getElementById('modalStepBooking').classList.remove('hidden');
  document.getElementById('modalStepSuccess').classList.add('hidden');

  document.getElementById('modalRetreatTitle').textContent = retreat.title;
  document.getElementById('modalRetreatLocation').textContent = retreat.location;
  document.getElementById('modalTotalAmount').textContent = `₹ ${retreat.price.toLocaleString('en-IN')}`;

  openModal('retreatModal');
}

function renderUserPasses() {
  const container = document.getElementById('activePassesList');
  const countBadge = document.getElementById('userPassCount');
  
  // Retrieve saved passes from localStorage or default
  let savedPasses = JSON.parse(localStorage.getItem('spritual_tech_passes') || '[]');
  if (savedPasses.length === 0) {
    savedPasses = [
      {
        id: 'RET-RISHI-9041',
        title: '3-Day Silence & Kundalini Awakening Retreat',
        location: 'Rishikesh Ashram',
        dates: 'NOV 14-16, 2026',
        tier: 'Standard Sadhak Pass'
      }
    ];
    localStorage.setItem('spritual_tech_passes', JSON.stringify(savedPasses));
  }

  countBadge.textContent = `${savedPasses.length} Pass${savedPasses.length > 1 ? 'es' : ''} Active`;
  container.innerHTML = '';

  savedPasses.forEach(pass => {
    const item = document.createElement('div');
    item.className = 'user-mini-pass';
    item.innerHTML = `
      <div class="mini-pass-info">
        <h5>${pass.title}</h5>
        <p>📍 ${pass.location} • ${pass.dates} • <strong style="color:var(--gold-400)">${pass.id}</strong></p>
      </div>
      <button class="btn-sm btn-outline-gold btn-view-qr-pass" data-code="${pass.id}">
        Show QR Pass
      </button>
    `;
    container.appendChild(item);
  });

  document.querySelectorAll('.btn-view-qr-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      showPassQRModal(code, 'Ishvit Bhardwaj', 'Rishikesh Silence Retreat', 'Standard Sadhak Pass');
    });
  });
}

// ---------------------------------------------------------------------------
// QR CODE DRAWING ON HTML5 CANVAS (Matrix generator)
// ---------------------------------------------------------------------------
function drawSacredQRCode(canvasId, textData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  
  // Clear canvas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Hash text to create deterministic distinct matrix
  let hash = 0;
  for (let i = 0; i < textData.length; i++) {
    hash = (hash << 5) - hash + textData.charCodeAt(i);
    hash |= 0;
  }

  const moduleCount = 21; // standard QR version 1 grid
  const cellSize = size / moduleCount;

  ctx.fillStyle = '#0f172a';

  // Draw 3 corner finder patterns
  function drawFinder(x, y) {
    // 7x7 outer square
    ctx.fillRect(x * cellSize, y * cellSize, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect((x + 1) * cellSize, (y + 1) * cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect((x + 2) * cellSize, (y + 2) * cellSize, 3 * cellSize, 3 * cellSize);
  }

  drawFinder(0, 0);
  drawFinder(moduleCount - 7, 0);
  drawFinder(0, moduleCount - 7);

  // Pseudo-random data cells based on hash and position
  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      // Skip finder areas
      if ((r < 8 && c < 8) || (r < 8 && c >= moduleCount - 8) || (r >= moduleCount - 8 && c < 8)) {
        continue;
      }
      const val = Math.abs(Math.sin((r * 13) + (c * 29) + hash));
      if (val > 0.46) {
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 0.5, cellSize - 0.5);
      }
    }
  }

  // Draw central sacred golden lotus symbol
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, cellSize * 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function showPassQRModal(ticketCode, name, retreatName, tierName) {
  const modal = document.getElementById('retreatModal');
  document.getElementById('modalStepBooking').classList.add('hidden');
  document.getElementById('modalStepSuccess').classList.remove('hidden');

  document.getElementById('passRetreatName').textContent = retreatName;
  document.getElementById('passAttendeeName').textContent = name;
  document.getElementById('passTierName').textContent = tierName;
  document.getElementById('passTicketId').textContent = ticketCode;

  drawSacredQRCode('qrCanvas', ticketCode);
  openModal('retreatModal');
}

// ---------------------------------------------------------------------------
// 4. DAILY SADHANA & DISCIPLINE SUITE
// ---------------------------------------------------------------------------
let japaCount = 0;
let malasCompleted = parseInt(localStorage.getItem('spritual_malas_count') || '0', 10);
let sadhanaStreak = parseInt(localStorage.getItem('spritual_streak_days') || '14', 10);

function setupJapaMala() {
  const beadCountEl = document.getElementById('japaBeadCount');
  const malaCountEl = document.getElementById('japaMalaCount');
  const beadCircle = document.getElementById('beadCircle');
  const btnChant = document.getElementById('btnChantBead');
  const btnReset = document.getElementById('btnResetMala');

  malaCountEl.textContent = `${malasCompleted} Malas Completed Today`;

  function advanceBead() {
    japaCount++;
    audioApp.playBeadClick();

    // Trigger visual pulse
    beadCircle.classList.add('tap-anim');
    setTimeout(() => beadCircle.classList.remove('tap-anim'), 120);

    if (japaCount >= 108) {
      japaCount = 0;
      malasCompleted++;
      localStorage.setItem('spritual_malas_count', malasCompleted);
      audioApp.playSingingBowl();
      malaCountEl.textContent = `${malasCompleted} Malas Completed Today`;
      alert('🕉️ 108 Japa Beads Complete! 1 Sacred Mala completed. Blessed vibrations to your sadhana!');
    }

    beadCountEl.textContent = japaCount;
  }

  btnChant.addEventListener('click', advanceBead);
  btnReset.addEventListener('click', () => {
    japaCount = 0;
    beadCountEl.textContent = '0';
  });

  // Spacebar triggers bead advance when in sadhana view
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      advanceBead();
    }
  });
}

// Pranayama Box Breathing Engine (4s Inhale - 4s Hold - 4s Exhale - 4s Hold)
let isBreathingActive = false;
let breathInterval = null;
let breathSeconds = 4;
let breathPhaseIndex = 0;
const BREATH_PHASES = [
  { label: 'Inhale Prana (Deeply)', cls: 'inhale' },
  { label: 'Hold Antar Kumbhaka', cls: 'hold' },
  { label: 'Exhale Surrender (Slowly)', cls: 'exhale' },
  { label: 'Hold Bahya Kumbhaka', cls: 'hold' }
];

function setupPranayama() {
  const btnToggle = document.getElementById('btnToggleBreath');
  const ring = document.getElementById('breathingRing');
  const labelEl = document.getElementById('breathInstruction');
  const timerEl = document.getElementById('breathTimerDisplay');

  btnToggle.addEventListener('click', () => {
    if (isBreathingActive) {
      clearInterval(breathInterval);
      isBreathingActive = false;
      btnToggle.textContent = 'Start Guided Breath';
      labelEl.textContent = 'Press Start to Begin';
      ring.className = 'breathing-ring';
    } else {
      isBreathingActive = true;
      btnToggle.textContent = 'Stop Breathing Guide';
      breathSeconds = 4;
      breathPhaseIndex = 0;
      audioApp.playSingingBowl();
      runBreathCycle();
    }
  });

  function runBreathCycle() {
    updatePhaseUI();
    breathInterval = setInterval(() => {
      breathSeconds--;
      if (breathSeconds <= 0) {
        breathSeconds = 4;
        breathPhaseIndex = (breathPhaseIndex + 1) % BREATH_PHASES.length;
        audioApp.playBeadClick();
        updatePhaseUI();
      }
      timerEl.textContent = `${breathSeconds}s`;
    }, 1000);
  }

  function updatePhaseUI() {
    const phase = BREATH_PHASES[breathPhaseIndex];
    labelEl.textContent = phase.label;
    timerEl.textContent = `${breathSeconds}s`;
    ring.className = `breathing-ring ${phase.cls}`;
  }
}

// Swadhyaya Journal
function setupSwadhyayaJournal() {
  const input = document.getElementById('journalInput');
  const btnSave = document.getElementById('btnSaveJournal');
  const statusEl = document.getElementById('journalStatus');
  const pastList = document.getElementById('pastReflectionsList');

  // Load existing reflections
  let reflections = JSON.parse(localStorage.getItem('spritual_reflections') || '[]');
  
  function renderReflections() {
    pastList.innerHTML = '';
    reflections.slice(-3).reverse().forEach(ref => {
      const el = document.createElement('div');
      el.className = 'reflection-item';
      el.innerHTML = `
        <span class="reflection-time">${ref.time}</span>
        <p>${ref.text}</p>
      `;
      pastList.appendChild(el);
    });
  }
  renderReflections();

  btnSave.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    reflections.push({ text, time: timeStr });
    localStorage.setItem('spritual_reflections', JSON.stringify(reflections));
    input.value = '';
    statusEl.textContent = 'Saved to private sanctuary';
    renderReflections();
    audioApp.playBeadClick();
    setTimeout(() => { statusEl.textContent = 'Autosaved locally'; }, 3000);
  });
}

// ---------------------------------------------------------------------------
// 5. GURU STUDIO & GATE VOLUNTEER SCANNER
// ---------------------------------------------------------------------------
function renderRoster() {
  const tbody = document.getElementById('rosterTableBody');
  const badge = document.getElementById('attendeeSummaryBadge');
  tbody.innerHTML = '';

  const checkedInCount = ATTENDEE_ROSTER.filter(a => a.status === 'Verified').length;
  badge.textContent = `${checkedInCount} / ${ATTENDEE_ROSTER.length} Entered`;

  ATTENDEE_ROSTER.forEach((att, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong style="color:var(--gold-400)">${att.id}</strong></td>
      <td>${att.name}</td>
      <td>${att.tier}</td>
      <td>
        <span class="status-badge ${att.status === 'Verified' ? 'verified' : 'booked'}">
          ${att.status === 'Verified' ? '✓ Checked In' : '⏳ Booked'}
        </span>
      </td>
      <td>
        ${att.status === 'Verified'
          ? '<span style="color:#10b981;font-size:0.75rem;">Gate Passed</span>'
          : `<button class="btn-sm btn-outline-gold btn-verify-roster" data-idx="${idx}">Verify Gate Entry</button>`
        }
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.btn-verify-roster').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      ATTENDEE_ROSTER[idx].status = 'Verified';
      audioApp.playSingingBowl();
      renderRoster();
    });
  });
}

function setupScannerSimulation() {
  const input = document.getElementById('manualTicketInput');
  const btnVerify = document.getElementById('btnManualScanVerify');
  const resultCard = document.getElementById('scanResultBadge');

  function verifyTicket(code) {
    const cleanCode = code.trim().toUpperCase();
    const attendee = ATTENDEE_ROSTER.find(a => a.id.toUpperCase() === cleanCode);

    resultCard.classList.remove('hidden', 'success', 'error');

    if (attendee) {
      attendee.status = 'Verified';
      audioApp.playSingingBowl();
      resultCard.classList.add('success');
      resultCard.innerHTML = `
        <strong>✓ GATE ENTRY VERIFIED</strong><br>
        Attendee: <strong>${attendee.name}</strong><br>
        Tier: ${attendee.tier} • Gate 1 Approved
      `;
      renderRoster();
    } else {
      resultCard.classList.add('error');
      resultCard.innerHTML = `
        <strong>❌ TICKET NOT FOUND / INVALID</strong><br>
        Code "${cleanCode}" is not registered in this retreat roster.
      `;
    }
  }

  btnVerify.addEventListener('click', () => {
    if (input.value) verifyTicket(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value) {
      verifyTicket(input.value);
    }
  });
}

// ---------------------------------------------------------------------------
// 6. GLOBAL UNIFIED MODAL SYSTEM (Click Outside, Escape Key, Back Gesture)
// ---------------------------------------------------------------------------
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Push state to browser history so touchpad swipe back or back button closes modal smoothly
  history.pushState({ modalOpen: modalId }, '', window.location.pathname + window.location.search);
}

function closeModal(modalOrId, fromPopState = false) {
  const modal = typeof modalOrId === 'string' ? document.getElementById(modalOrId) : modalOrId;
  if (!modal || modal.classList.contains('hidden')) return;

  modal.classList.add('hidden');

  // If no other modal is open, restore page scroll
  const anyOpen = document.querySelector('.modal-overlay:not(.hidden)');
  if (!anyOpen) {
    document.body.style.overflow = '';
  }

  // If closed by user click/key and history state is this modal, revert state
  if (!fromPopState && history.state && history.state.modalOpen) {
    history.back();
  }
}

function closeAllModals(fromPopState = false) {
  document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => {
    closeModal(m, fromPopState);
  });
}

function setupModals() {
  // Global Click Outside (Backdrop click closes modal)
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Global Escape Key to close any open modal or drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const drawer = document.getElementById('sadhanaMenuDrawer');
      if (drawer && !drawer.classList.contains('hidden')) {
        closeSadhanaDrawer();
        return;
      }
      closeAllModals();
    }
  });

  // Global PopState: Touchpad swipe back / browser back button closes drawer/modal or returns to Gurus Directory smoothly
  window.addEventListener('popstate', (e) => {
    const drawer = document.getElementById('sadhanaMenuDrawer');
    if (drawer && !drawer.classList.contains('hidden')) {
      closeSadhanaDrawer(true);
      return;
    }

    const openModals = document.querySelectorAll('.modal-overlay:not(.hidden)');
    if (openModals.length > 0) {
      closeAllModals(true);
      return;
    }

    // If inside selected Guru sanctuary, return to Gurus Directory
    const sanctuary = document.getElementById('seekerGuruSanctuary');
    if (sanctuary && sanctuary.classList.contains('active')) {
      returnToGurusDirectory(true);
    }
  });

  // Booking modal close button
  const closeRetreatBtn = document.getElementById('closeRetreatModalBtn');
  if (closeRetreatBtn) {
    closeRetreatBtn.addEventListener('click', () => {
      closeModal('retreatModal');
    });
  }

  // Tier selection in booking modal
  document.querySelectorAll('.tier-box').forEach(box => {
    box.addEventListener('click', () => {
      document.querySelectorAll('.tier-box').forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      const price = parseInt(box.getAttribute('data-price'), 10);
      const totalDisplay = document.getElementById('modalTotalAmount');
      if (totalDisplay) totalDisplay.textContent = `₹ ${price.toLocaleString('en-IN')}`;
    });
  });

  // Booking confirm button
  const confirmBtn = document.getElementById('btnConfirmBooking');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const name = document.getElementById('seekerName')?.value || 'Ishvit Bhardwaj';
      const selectedTierBox = document.querySelector('.tier-box.selected');
      const tierName = selectedTierBox ? selectedTierBox.getAttribute('data-name') : 'Standard Sadhak Pass';
      const retreat = selectedRetreatForBooking;

      // Generate ticket ID
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newTicketId = `${retreat.codePrefix}-${randomSuffix}`;

      // Add to attendee roster
      ATTENDEE_ROSTER.unshift({
        id: newTicketId,
        name: name,
        tier: tierName,
        status: 'Booked',
        gate: 'Gate 1'
      });
      renderRoster();

      // Show generated QR pass
      audioApp.playSingingBowl();
      showPassQRModal(newTicketId, name, retreat.title, tierName);
    });
  }

  // Save pass button
  const savePassBtn = document.getElementById('btnSavePassToDevice');
  if (savePassBtn) {
    savePassBtn.addEventListener('click', () => {
      const code = document.getElementById('passTicketId')?.textContent;
      let savedPasses = JSON.parse(localStorage.getItem('spritual_tech_passes') || '[]');
      savedPasses.push({
        id: code,
        title: document.getElementById('passRetreatName')?.textContent || 'Retreat',
        location: 'Rishikesh Ganges Ashram',
        dates: 'Upcoming',
        tier: document.getElementById('passTierName')?.textContent || 'Standard Sadhak Pass'
      });
      localStorage.setItem('spritual_tech_passes', JSON.stringify(savedPasses));
      renderUserPasses();
      showToast('✨ Pass saved to your Active Passes! Accessible anytime offline.');
    });
  }

  const goSadhanaBtn = document.getElementById('btnGoToSadhanaSuite');
  if (goSadhanaBtn) {
    goSadhanaBtn.addEventListener('click', () => {
      closeModal('retreatModal');
      const sadhanaSection = document.getElementById('view-sadhana');
      if (sadhanaSection) sadhanaSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ---------------------------------------------------------------------------
// 7. LIVE SATSANG INTERACTIVE ROOM
// ---------------------------------------------------------------------------
function setupLiveSatsangRoom() {
  const satsangModal = document.getElementById('satsangModal');
  const closeBtn = document.getElementById('closeSatsangModalBtn');
  const bannerBtn = document.getElementById('joinLiveSatsangBtn');
  const chatInput = document.getElementById('liveChatInput');
  const sendChatBtn = document.getElementById('btnSendChat');
  const chatMessages = document.getElementById('liveChatMessages');

  if (bannerBtn) {
    bannerBtn.addEventListener('click', () => {
      openModal('satsangModal');
      audioApp.startOmDrone();
    });
  }

  const pillar4Btn = document.getElementById('btnOpenLiveRoomFromPillar4');
  if (pillar4Btn) {
    pillar4Btn.addEventListener('click', () => {
      openModal('satsangModal');
      audioApp.startOmDrone();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal('satsangModal');
    });
  }

  function sendChat() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    const div = document.createElement('div');
    div.className = 'chat-msg';
    div.innerHTML = `
      <span class="chat-user">Ishvit Bhardwaj:</span>
      <span class="chat-text">${msg}</span>
    `;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
    audioApp.playBeadClick();
  }

  sendChatBtn.addEventListener('click', sendChat);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });

  // Floating stream buttons
  document.getElementById('btnFlowerPranam').addEventListener('click', () => {
    audioApp.playBeadClick();
    // Visual flower toast
    const flower = document.createElement('div');
    flower.textContent = '🌸 Pushpanjali Offered to Guruji';
    flower.style.position = 'fixed';
    flower.style.bottom = '100px';
    flower.style.right = '40px';
    flower.style.background = 'rgba(245, 158, 11, 0.9)';
    flower.style.color = '#000';
    flower.style.padding = '10px 18px';
    flower.style.borderRadius = '30px';
    flower.style.fontWeight = 'bold';
    flower.style.zIndex = '1000';
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 2500);
  });

  document.getElementById('btnStreamBells').addEventListener('click', () => {
    audioApp.playSingingBowl();
  });
}

// ---------------------------------------------------------------------------
// 8. DAKSHINA SEVA CONTRIBUTIONS
// ---------------------------------------------------------------------------
function setupDakshinaLogic() {
  const dakshinaModal = document.getElementById('dakshinaModal');
  const openBtn = document.getElementById('openDakshinaModalBtn');
  const closeBtn = document.getElementById('closeDakshinaModalBtn');
  const customInput = document.getElementById('customDakshinaInput');
  const totalDisplay = document.getElementById('dakshinaTotalDisplay');
  const submitBtn = document.getElementById('btnSubmitDakshina');
  const successBox = document.getElementById('dakshinaReceiptSuccess');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openModal('dakshinaModal');
      if (successBox) successBox.classList.add('hidden');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal('dakshinaModal');
    });
  }

  // Seva buttons from Seva Section
  document.querySelectorAll('.btn-seva').forEach(btn => {
    btn.addEventListener('click', () => {
      const cause = btn.getAttribute('data-cause');
      const amt = btn.getAttribute('data-amt');
      
      const select = document.getElementById('dakshinaPurposeSelect');
      if (select) select.value = cause;
      if (customInput) customInput.value = amt;
      if (totalDisplay) totalDisplay.textContent = `₹ ${parseInt(amt, 10).toLocaleString('en-IN')}`;

      openModal('dakshinaModal');
      if (successBox) successBox.classList.add('hidden');
    });
  });

  // Amount chips
  document.querySelectorAll('.amt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.amt-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const amt = chip.getAttribute('data-amt');
      customInput.value = amt;
      totalDisplay.textContent = `₹ ${parseInt(amt, 10).toLocaleString('en-IN')}`;
    });
  });

  customInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10) || 0;
    totalDisplay.textContent = `₹ ${val.toLocaleString('en-IN')}`;
  });

  submitBtn.addEventListener('click', () => {
    audioApp.playSingingBowl();
    successBox.classList.remove('hidden');
    submitBtn.textContent = '✓ Dakshina Received by Ashram';
    submitBtn.style.background = '#10b981';
    setTimeout(() => {
      submitBtn.textContent = 'Complete Digital Dakshina';
      submitBtn.style.background = '';
    }, 4000);
  });
}
