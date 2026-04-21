import { Module, Question } from '../types';

const generateMockQuestions = (count: number, topic: string): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `q-${topic}-${i}`,
    text: `${topic} Assessment Question ${i + 1}: What is the most common resolution for a ${topic} issue discovered during a patient follow-up?`,
    options: [
      `Option A: Immediate adjustment/verification`,
      `Option B: Patient re-education`,
      `Option C: Lab quality re-check`,
      `Option D: Prescription re-evaluation`
    ],
    correctAnswerIndex: 0
  }));
};

const createSlides = (topic: string) => [
  {
    id: `s-${topic}-1`,
    title: `Introduction to ${topic}`,
    content: `This slide introduces the core concepts of ${topic}. Understanding these fundamentals is crucial for any optician.`,
    imageUrl: `https://picsum.photos/seed/${topic}1/800/600`
  },
  {
    id: `s-${topic}-2`,
    title: `${topic} Advanced Techniques`,
    content: `Here we delve into more complex methods used in ${topic}. Focus on precision and patient comfort.`,
    imageUrl: `https://picsum.photos/seed/${topic}2/800/600`
  },
  {
    id: `s-${topic}-3`,
    title: `Practical Application of ${topic}`,
    content: `Learn how to apply your knowledge of ${topic} in real-world scenarios. This involves hands-on practice.`,
    imageUrl: `https://picsum.photos/seed/${topic}3/800/600`
  }
];

export const INITIAL_MODULES: Module[] = [
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Remakes',
    description: 'Diagnosing patient vision complaints and managing lens remakes.',
    content: 'Mastering the art of troubleshooting is what separates great opticians from good ones.',
    videoUrl: '/slidevideos/trouble.mp4',
    order: 1,
    category: 'Clinical',
    slides: [
      {
        id: 'ts1',
        title: 'Initial Verification: The "Three Point" Check',
        content: 'When a patient reports blur, your first step is a neutral verification. First, check the Rx in the lensometer against the original order. Second, verify the Seg Height or Optical Center (OC) placement on the patient\'s face. Third, check the Base Curve—if a patient was in a 6-base and you moved them to a 4-base, they may experience peripheral distortion. Never assume the lab or the doctor was "wrong" until you\'ve confirmed the physical build first.',
        imageUrl: '/slideimages/troubleshooting/trouble1.jpg'
      },
      {
        id: 'ts2',
        title: 'Progressive Non-Adapts: Corridor Check',
        content: 'Progressive complaints often fall into two categories: "Too much swimming" or "I have to tilt my head." Tilted head complaints usually indicate a Seg Height issue. If they tilt up to see far, the seg is too low. If they tilt down, it\'s too high. "Swimming" or narrow fields of vision often result from a frame that sits too far from the face (Vertex Distance issue) or lack of Pantoscopic Tilt.',
        imageUrl: '/slideimages/troubleshooting/trouble2.jpg'
      },
      {
        id: 'ts3',
        title: 'Vertex Distance & Frame Wrap',
        content: 'Vertex distance—the space between the lens and the eye—dramatically affects field of view in progressives. Bringing the frame closer increases the visible corridor. Additionally, check for frame wrap (Face Form). Curving the frame too much or too little can induce unwanted prism and astigmatism, especially in high-power or wrapped sports frames.',
        imageUrl: '/slideimages/troubleshooting/trouble3.jpg'
      },
      {
        id: 'ts4',
        title: 'Types of Remakes: Root Cause Analysis',
        content: 'Remakes are classified for tracking. A "Doctor Redo" is an Rx change. A "Bench Redo" involves errors in measurements (PD/Seg) or frame selection. A "Lab Error" is a physical defect (scratches, poor AR). Understanding the root cause ensures you don\'t repeat the same mistake on the remake—for example, don\'t just reorder the same lens if the pupil wasn\'t centered correctly.',
        imageUrl: '/slideimages/troubleshooting/trouble4.jpg'
      },
      {
        id: 'ts5',
        title: 'Effective Patient Communication during Remakes',
        content: 'Handling a remake is about trust. Never blame the doctor or the lab in front of the patient. Use "We want to optimize these for your specific needs." Explain what change is being made (e.g., "We are moving the reading area up slightly for better comfort") so the patient feels they are receiving a precision improvement rather than a correction of a mistake.',
        imageUrl: '/slideimages/troubleshooting/trouble5.jpg'
      }
    ],
    quiz: { 
      questions: [
        {
          id: 'ts-q1',
          text: 'The "Fishbowl" Effect: A patient with a new high-minus prescription complains that the floor looks like it is curving or that they feel like they are "walking in a bowl." What is the most likely cause and initial adjustment to check?',
          options: [
            'The base curve of the new lenses is significantly flatter than their previous pair.',
            'The pantoscopic tilt is too high, causing vertex distance issues.',
            'The temples are too tight, causing the frame to sit too close to the face.',
            'The frames are crooked, leading to an unwanted induced prism.'
          ],
          correctAnswerIndex: 0
        },
        {
          id: 'ts-q2',
          text: 'Blurry Peripheral Vision: A patient wearing progressive addition lenses (PALs) complains that their side vision is blurry and they have to turn their entire head to see clearly. Which of the following is the most appropriate troubleshooting step?',
          options: [
            'Lower the fitting cross height to move the distance zone up.',
            'Increase the pantoscopic tilt and ensure the frame has proper wrap (face form).',
            'Tell the patient they just need more time to adapt; this is normal for all progressives.',
            'Decrease the vertex distance to move the lenses further from the eyes.'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'ts-q3',
          text: 'Constant Slippage: A patient returns frequently because their glasses keep sliding down their nose, even after the nose pads have been tightened. Upon inspection, the temple bends are starting 10mm past the top of the patient\'s ears. What is the correct fix?',
          options: [
            'Switch to smaller nose pads to increase friction.',
            'Increase the outward spread of the temples.',
            'Shorten the temple length by moving the bend forward to sit snugly against the back of the ear.',
            'Add "ear hooks" to the ends of the temples.'
          ],
          correctAnswerIndex: 2
        },
        {
          id: 'ts-q4',
          text: 'Soreness Behind the Ears: A patient complains of a sharp, localized pain behind their right ear. When you examine the frame, the temple tip is pressing firmly against the mastoid bone. How should you adjust the frame?',
          options: [
            'Straighten the temple bend to remove all pressure from the back of the ear.',
            'Adjust the temple so it follows the contour of the ear and moves pressure away from the mastoid bone.',
            'Narrow the bridge to pull the temples further forward.',
            'Increase the pantoscopic tilt to lift the temples off the ears.'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'ts-q5',
          text: 'Reading Difficulty in Progressives: A patient with new progressive lenses says they can see clearly at a distance but have to tilt their head way back (chin up) to read their phone. What does this indicate?',
          options: [
            'The fitting height is too high.',
            'The lenses have too much "wrap" or face form.',
            'The fitting height is too low.',
            'The prescription for the "Add" power is too strong.'
          ],
          correctAnswerIndex: 2
        }
      ] 
    }
  },
  {
    id: 'lens-types',
    title: 'Lens Designs & Categories',
    description: 'From Single Vision to Advanced Digital Progressives.',
    content: 'An optician must match the patient\'s visual needs with the correct optical architecture.',
    videoUrl: '/slidevideos/lensdesign.mp4',
    order: 2,
    category: 'Optical',
    slides: [
      {
        id: 'lt1',
        title: 'Single Vision (SV)',
        content: 'Single Vision lenses have the same optical power throughout the entire lens. They are used to correct a single focus—either distance, intermediate, or near vision. They are the most common lens type for younger patients or those who only need correction for reading or driving.',
        imageUrl: '/slideimages/lens%20design/lens1.jpg'
      },
      {
        id: 'lt2',
        title: 'Lined Bifocals & Trifocals',
        content: 'Bifocals (typically Flat Top 28 or 35) have two distinct powers separated by a visible line. The top is for distance and the "segment" is for near. Trifocals add a third intermediate segment for computer-distance vision. While less popular than progressives, they offer the widest, most stable reading area for certain vocational tasks.',
        imageUrl: '/slideimages/lens%20design/lens2.png'
      },
      {
        id: 'lt3',
        title: 'Standard Progressives (PAL)',
        content: 'Progressive Addition Lenses (PALs) offer a seamless transition from distance to intermediate to near. "Standard" progressives are semi-finished blanks where the front surface carries the addition. They have a fixed corridor width and can have significant "peripheral swim" or blur on the sides, requiring the patient to point their nose at what they want to see.',
        imageUrl: '/slideimages/lens%20design/lens3.png'
      },
      {
        id: 'lt4',
        title: 'Digital & Free-Form Progressives',
        content: 'Digital progressives are surfaced on the back of the lens using computer-controlled diamond-point tools. This "Free-Form" technology allows for a customized design based on the patient\'s Rx, frame measurements (wrap, tilt, vertex), and even wearer habits. These lenses offer much wider corridors and significantly reduced peripheral distortion compared to standard PALs.',
        imageUrl: '/slideimages/lens%20design/lens4.png'
      },
      {
        id: 'lt5',
        title: 'Near Variable Focus (Office Lenses)',
        content: 'Also known as Computer or Workspace lenses, these are progressives optimized for intermediate and near distance. They lack a true distance area but provide an extremely wide field of view for desktop monitors and desk work. They are perfect for presbyopes who spend 8+ hours a day on a computer and find standard progressives too narrow.',
        imageUrl: '/slideimages/lens%20design/lens5.png'
      }
    ],
    quiz: { 
      questions: [
        {
          id: 'lt-q1',
          text: 'A patient requires a lens that provides clear vision at distance and near, but they specifically want to avoid the "image jump" caused by a visible segment line. Which lens is the most appropriate choice?',
          options: [
            'Lined Bifocal',
            'Lined Trifocal',
            'Progressive Addition Lens (PAL)',
            'Single Vision'
          ],
          correctAnswerIndex: 2
        },
        {
          id: 'lt-q2',
          text: 'Which lens design features three distinct focal points—typically set for distance, intermediate (arm\'s length), and near—separated by two visible horizontal lines?',
          options: [
            'Near Variable Focus',
            'Lined Trifocal',
            'Single Vision',
            'Progressive'
          ],
          correctAnswerIndex: 1
        },
        {
          id: 'lt-q3',
          text: 'A "Near Variable Focus" lens (often called an "Occupational" or "Office" lens) is primarily designed to provide a wider field of view for which two zones?',
          options: [
            'Distance and Driving',
            'Distance and Near',
            'Intermediate and Near',
            'Distance and Intermediate'
          ],
          correctAnswerIndex: 2
        },
        {
          id: 'lt-q4',
          text: 'A patient with no presbyopia (the age-related loss of near focusing) needs a correction only for nearsightedness to see the chalkboard at school. What type of lens will they be prescribed?',
          options: [
            'Single Vision',
            'Lined Bifocal',
            'Progressive',
            'Near Variable Focus'
          ],
          correctAnswerIndex: 0
        },
        {
          id: 'lt-q5',
          text: 'In a Lined Bifocal lens, the top portion of the lens is used for distance vision. What is the lower, "D-shaped" or round segment used for?',
          options: [
            'Intermediate vision (Computer)',
            'Peripheral vision',
            'Near vision (Reading)',
            'Blue light filtering'
          ],
          correctAnswerIndex: 2
        }
      ] 
    }
  },
  {
    id: 'lifestyle-consult',
    title: 'Lifestyle Consultation',
    description: 'Asking the right questions to find the best lens options.',
    content: 'The "discovery" phase of the sale is where you identify the patient\'s true visual pain points.',
    videoUrl: 'https://www.youtube.com/embed/consult',
    order: 3,
    category: 'Sales',
    slides: [
      {
        id: 'lc1',
        title: 'The "Beyond the Rx" Approach',
        content: 'An Rx tells you the power, but it doesn\'t tell you how the patient lives. Start with open-ended questions like "Tell me about your typical day" or "What do you do for work?". This helps you determine if they need specialized computer lenses, high-impact safety materials, or specific coatings.',
        imageUrl: 'https://picsum.photos/seed/lc1/1200/800'
      },
      {
        id: 'lc2',
        title: 'Screen Time & Digital Habits',
        content: 'Ask: "How many hours a day are you on a screen?" and "Are you using a laptop or multiple desktop monitors?". Modern digital life requires blue-light protection and often Near Variable Focus lenses to reduce "Computer Vision Syndrome." Identifying these needs early allows you to recommend the correct digital progressive or office lens.',
        imageUrl: 'https://picsum.photos/seed/lc2/1200/800'
      },
      {
        id: 'lc3',
        title: 'Outdoor & Light Sensitivity',
        content: 'Ask: "Do you spend much time outdoors or driving?" and "Are you sensitive to bright light or glares?". This leads naturally into discussing Transitions for convenience and polarized sunglasses for maximum comfort and safety while driving. If they say they "don\'t wear sunglasses," dig deeper into why (too dark? too heavy?) to find a better solution.',
        imageUrl: 'https://picsum.photos/seed/lc3/1200/800'
      },
      {
        id: 'lc4',
        title: 'Previous Lens Experience',
        content: 'Ask: "What do you like and dislike about your current glasses?". This is critical. If a patient hated their last progressive, they might need a higher-tier digital design or a different seg height. If they complain about scratches, they need a premium hard coat. Use their past frustration to justify your new recommendation.',
        imageUrl: 'https://picsum.photos/seed/lc4/1200/800'
      },
      {
        id: 'lc5',
        title: 'The Benefit-Based Recommendation',
        content: 'Finally, don\'t just sell "features" like "1.67 index." Sell the *benefit*: "This material will make your lenses 30% thinner and lighter, so they don\'t slide down your nose during long work days." Always connect the product back to the specific lifestyle needs the patient shared during the consultation.',
        imageUrl: 'https://picsum.photos/seed/lc5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'Consultation') }
  },
  {
    id: 'customer-service',
    title: 'Customer Service & Satisfaction',
    description: 'Creating a positive patient experience from greeting to dispense.',
    content: 'Superior customer service is what builds long-term loyalty in a competitive market.',
    videoUrl: 'https://www.youtube.com/embed/service',
    order: 4,
    category: 'Service',
    slides: [
      {
        id: 'cs1',
        title: 'The 5-Second Greeting Rule',
        content: 'First impressions are everything. Even if you are with another patient or on the phone, you must acknowledge every person who walks through the door within 5 seconds. A simple "Welcome! I\'ll be right with you" or a friendly nod and eye contact makes the patient feel valued and reduces perceived wait times.',
        imageUrl: 'https://picsum.photos/seed/cs1/1200/800'
      },
      {
        id: 'cs2',
        title: 'Managing Wait Times Proactively',
        content: 'If there is a wait, be honest. "It will be about 10 minutes. Please feel free to browse our new frame collection while you wait." Offering a seat or a drink (if available) shows care. An unacknowledged patient will often leave within 3 minutes; an acknowledged one will wait significantly longer.',
        imageUrl: 'https://picsum.photos/seed/cs2/1200/800'
      },
      {
        id: 'cs3',
        title: 'Active Listening & Mirroring',
        content: 'When a patient speaks, give them your full attention. Do not type or look at other things. "So, if I understand correctly, you\'re finding it hard to see your dashboard while driving?" Mirroring their concerns back to them shows you genuinely understand their vision problems, which builds massive confidence in your technical expertise.',
        imageUrl: 'https://picsum.photos/seed/cs3/1200/800'
      },
      {
        id: 'cs4',
        title: 'Handling Difficult Situations',
        content: 'When a patient is upset (e.g., their glasses aren\'t ready), stay calm and empathetic. Never argue. Use the L.E.A.D technique: Listen, Empathize, Apologize (even if it\'s not your fault), and Deliver a solution. "I understand how frustrating this is. Let me call our lab immediately to see if we can expedite this for you."',
        imageUrl: 'https://picsum.photos/seed/cs4/1200/800'
      },
      {
        id: 'cs5',
        title: 'The "Wow" Dispense',
        content: 'The dispense is the "reveal." Don\'t just hand them the glasses. Clean them perfectly, adjust them carefully on their face, and let them look in a mirror. Remind them of the benefits: "Look how thin those look!" or "Wow, notice how the anti-reflective coating makes the lenses almost invisible." This final positive interaction cements their satisfying experience.',
        imageUrl: 'https://picsum.photos/seed/cs5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'Satisfaction') }
  },
  {
    id: 'frame-fitting',
    title: 'Frame Fitting Guide',
    description: 'Master the art of perfect frame selection and fitting.',
    content: 'Determining the correct frame size is essential for optical performance and patient comfort.',
    videoUrl: 'https://www.youtube.com/embed/frame-fitting',
    order: 5,
    category: 'Fitting',
    slides: [
      {
        id: 'ff1',
        title: 'Anatomy of a Frame Fit: Horizontal Centering',
        content: 'The most critical factor is the relationship between the frame and the pupils. The pupils should be horizontally centered within the lens area or slightly nasal. A common rule is the 70/30 rule: the pupil should sit in the inner 70% of the lens width. Proper centering reduces the amount of decentration required, resulting in a thinner and lighter lens.',
        imageUrl: 'https://picsum.photos/seed/frames1/1200/800'
      },
      {
        id: 'ff2',
        title: 'Vertical Position & Progressives',
        content: 'Vertically, the pupil should sit in the upper 1/3 of the lens. For progressives, ensure there is at least 10-12mm of lens room above the pupil and 14-18mm below (depending on the seg height) to ensure the full reading area fits within the frame. Selecting a frame that is too shallow vertically will cut off the patient\'s reading zone.',
        imageUrl: 'https://picsum.photos/seed/frames2/1200/800'
      },
      {
        id: 'ff3',
        title: 'Bridge Fit: Plastic vs. Metal',
        content: 'The bridge provides stability. For plastic frames, look for complete contact between the frame bridge and the bridge of the nose. For metal frames, ensure nose pads sit flat and are angled correctly. A bridge that is too narrow will sit high and "pinch," while one that is too wide will slide down and rest on the patient\'s cheeks.',
        imageUrl: 'https://picsum.photos/seed/frames3/1200/800'
      },
      {
        id: 'ff4',
        title: 'Temple Length & Ear Placement',
        content: 'The temple should travel straight back to the ear before beginning its downward bend. The bend should occur directly over the root of the temple (where the ear meets the head). If the bend starts too early, it pushes the frame away from the face. Temples should not exert heavy pressure on the mastoid process behind the ear.',
        imageUrl: 'https://picsum.photos/seed/frames4/1200/800'
      },
      {
        id: 'ff5',
        title: 'Width and Face Form',
        content: 'The frame should be approximately as wide as the widest part of the face (the cheekbones). If the temples bow out, the frame is too narrow. If there is more than a finger\'s width between the temple and the head, it\'s too wide. Adjusting Face Form (wrap) can fine-tune the fit and clear peripheral vision.',
        imageUrl: 'https://picsum.photos/seed/frames5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'Frame Fitting') }
  },
  {
    id: 'prism-prentice',
    title: 'Prism and Prentice Rule',
    description: 'Learn calculations for induced prism and centration.',
    content: 'Prism = dcm * Power. Mastering Prentice Rule is vital for avoiding unwanted prismatic effects.',
    videoUrl: 'https://www.youtube.com/embed/prism-prentice',
    order: 6,
    category: 'Calculations',
    slides: [
      {
        id: 'pr1',
        title: 'Understanding Induced Prism',
        content: 'Induced prism occurs when a patient looks through a lens at a point other than its optical center (OC). This displacement causes light to bend, creating a prismatic effect. This can be intentional (prescribed) or unintentional (poor measurement). It is measured in prism diopters (Δ).',
        imageUrl: 'https://picsum.photos/seed/prism1/1200/800'
      },
      {
        id: 'pr2',
        title: 'The Prentice Rule Formula',
        content: 'Prentice Rule calculates induced prism: P = c × F. P is prism in diopters, c is decentration in CENTIMETERS, and F is lens power in the meridian. Example: A +4.00D lens de-centered by 5mm (0.5cm) induces 0.5 * 4 = 2.0Δ of prism.',
        imageUrl: 'https://picsum.photos/seed/prism2/1200/800'
      },
      {
        id: 'pr3',
        title: 'Base Direction: Plus vs. Minus',
        content: 'For plus lenses, the prism base follows the direction of decentration (Base follows the "bulge"). For minus lenses, the base direction is opposite the decentration (Base points away from the "thin spot"). Correctly identifying base direction is critical for binocular comfort.',
        imageUrl: 'https://picsum.photos/seed/prism3/1200/800'
      },
      {
        id: 'pr4',
        title: 'Binocular Prism: Compounding vs. Canceling',
        content: 'Horizontal prism bases in the same direction (e.g., both Base-In) subtract from each other. Bases in opposite directions (Base-In and Base-Out) add. In vertical prism, same-direction bases (Base-Up in both) subtract, while opposite directions (Base-Up and Base-Down) add. Misalignment can cause binocular diplopia.',
        imageUrl: 'https://picsum.photos/seed/prism4/1200/800'
      },
      {
        id: 'pr5',
        title: 'Practical Application: Slab-Off Prism',
        content: 'In cases of significant anisometropia (different Rx in each eye), patients may experience vertical imbalance when reading. Slab-off prism is a laboratory process used to compensate for this vertical imbalance, ensuring the patient can look through the reading zone comfortably without seeing double.',
        imageUrl: 'https://picsum.photos/seed/prism5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'Prism') }
  },
  {
    id: 'transitions-gen-s',
    title: 'Transitions Gen S Technology',
    description: 'The latest in photochromic lens technology.',
    content: 'Understand the speed, color options, and performance metrics of the new Gen S lenses.',
    videoUrl: 'https://www.youtube.com/embed/transitions-gen-s',
    order: 7,
    category: 'Lenses',
    slides: [
      {
        id: 'gs1',
        title: 'Ultra-Fast Activation and Fade-Back',
        content: 'Transitions Gen S is the fastest darkening photochromic lens ever developed. It reaches Category 3 darkness (sunglass level) in seconds when exposed to UV and returns to clear indoors significantly faster than previous generations like Gen 8.',
        imageUrl: 'https://picsum.photos/seed/gens1/1200/800'
      },
      {
        id: 'gs2',
        title: 'Style Without Compromise: 8 Colors',
        content: 'Gen S offers 8 vibrant colors: Amber, Amethyst, Emerald, Sapphire, Brown, Graphite Green, Gray, and the new Ruby. This allows patients to pair high-performance protection with trendy frame styles, moving light-sensitive lenses into the world of fashion.',
        imageUrl: 'https://picsum.photos/seed/gens2/1200/800'
      },
      {
        id: 'gs3',
        title: '100% Protection & Blue Light Blocking',
        content: 'All Gen S lenses block 100% of UVA and UVB rays. Furthermore, they block harmful blue-violet light both indoors and outdoors, protecting patients from high-energy visible light from screens and the sun.',
        imageUrl: 'https://picsum.photos/seed/gens3/1200/800'
      },
      {
        id: 'gs4',
        title: 'Indoor Performance: Zero Residual Tint',
        content: 'A common complaint with older photochromics was a yellow or gray "residual tint" indoors. Gen S is designed to be perfectly clear indoors, maintaining primary lens aesthetics and ensuring no distortion of colors while working or reading in low light.',
        imageUrl: 'https://picsum.photos/seed/gens4/1200/800'
      },
      {
        id: 'gs5',
        title: 'High Contrast & Precision Optics',
        content: 'Gen S technology improves high-contrast vision during recovery, allowing patients to adapt to changing light conditions seamlessly. This makes them a superior choice for active patients who move frequently between indoor and outdoor tasks throughout the day.',
        imageUrl: 'https://picsum.photos/seed/gens5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'Transitions Gen S') }
  },
  {
    id: 'lens-materials',
    title: 'Lens Materials: Pros and Cons',
    description: 'Analyzing CR39, Poly, Trivex, and High Index.',
    content: 'Selecting the right material involves balancing weight, clarity, thickness, and safety.',
    videoUrl: 'https://www.youtube.com/embed/lens-materials',
    order: 8,
    category: 'Lenses',
    slides: [
      {
        id: 'lm1',
        title: 'CR-39: Clarity & Limitations',
        content: 'CR-39 has excellent optical clarity (Abbe 58) but is thick and lacks impact resistance. It is best for low prescriptions and budget-conscious patients, but is rarely recommended for children or sports due to safety concerns.',
        imageUrl: 'https://picsum.photos/seed/lensemat1/1200/800'
      },
      {
        id: 'lm2',
        title: 'Polycarbonate: The Safety Industry Standard',
        content: 'Polycarbonate is thin, light, and impact-resistant. It naturally blocks 100% UV. Its downside is its low Abbe value (30), which can cause chromatic aberration (peripheral color fringing) in patients with high prescriptions.',
        imageUrl: 'https://picsum.photos/seed/lensemat2/1200/800'
      },
      {
        id: 'lm3',
        title: 'Trivex: The Premium Hybrid',
        content: 'Trivex offers the impact resistance of Poly with much better optical clarity (Abbe 45). It is the lightest material available and is highly resistant to chemicals, making it the "gold standard" for rimless and drill-mount frames.',
        imageUrl: 'https://picsum.photos/seed/lensemat3/1200/800'
      },
      {
        id: 'lm4',
        title: 'High Index 1.60 & 1.67: For Mid-High Rx',
        content: 'High index materials bend light more efficiently, allowing lenses to be thinner and flatter. They are essential for prescriptions over +/- 4.00D. High index lenses must always be paired with an Anti-Reflective coating to manage surface reflections.',
        imageUrl: 'https://picsum.photos/seed/lensemat4/1200/800'
      },
      {
        id: 'lm5',
        title: '1.74 High Index: The Thinnest Solution',
        content: '1.74 is the highest index material available in plastic. It creates the thinnest possible profile for extremely high prescriptions. While remarkably thin, it has a lower Abbe value, so precision in measurement (PD/Seg) is vital to ensure patient comfort.',
        imageUrl: 'https://picsum.photos/seed/lensemat5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'Materials') }
  },
  {
    id: 'hipaa-compliance',
    title: 'HIPAA & Patient Privacy',
    description: 'Legal requirements for patient data protection.',
    content: 'Protecting patient privacy is non-negotiable. Learn the rules for handling PHI.',
    videoUrl: 'https://www.youtube.com/embed/hipaa',
    order: 9,
    category: 'Legal',
    slides: [
      {
        id: 'hi1',
        title: 'The Privacy Rule & PHI',
        content: 'HIPAA protects Protected Health Information (PHI)—names, addresses, and medical details. Never discuss a patient\'s clinical info in public areas or leave computer screens visible to unauthorized persons.',
        imageUrl: 'https://picsum.photos/seed/hipaa1/1200/800'
      },
      {
        id: 'hi2',
        title: 'The "Minimum Necessary" Standard',
        content: 'Only access or share the specific information required for your current task. If ordering a frame, you don\'t need a patient\'s full medical history unless it directly impacts the lens selection process.',
        imageUrl: 'https://picsum.photos/seed/hipaa2/1200/800'
      },
      {
        id: 'hi3',
        title: 'Email and Digital Safeguards',
        content: 'Communicating PHI via standard email is generally prohibited unless using encrypted platforms. Always verify the identity of the person you are speaking with on the phone before discussing orders or medical outcomes.',
        imageUrl: 'https://picsum.photos/seed/hipaa3/1200/800'
      },
      {
        id: 'hi4',
        title: 'Documentation and Shredding',
        content: 'Any physical documents containing PHI (RX printouts, old credit card slips) must be disposed of in secure shredding bins. Never place patient records in standard trash cans.',
        imageUrl: 'https://picsum.photos/seed/hipaa4/1200/800'
      },
      {
        id: 'hi5',
        title: 'Consequences of Non-Compliance',
        content: 'HIPAA violations can result in significant fines for the practice and legal action against the individual. Compliance is not just a policy—it\'s a federal law designed to protect the sanctity of the patient-provider relationship.',
        imageUrl: 'https://picsum.photos/seed/hipaa5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'HIPAA') }
  },
  {
    id: 'eye-anatomy',
    title: 'Anatomy of the Human Eye',
    description: 'Understand the basic structures and functions of the eye.',
    content: 'The human eye is a complex organ. In this module, we explore the cornea, iris, pupil, lens, retina, and optic nerve.',
    videoUrl: 'https://www.youtube.com/embed/eye-anatomy',
    order: 10,
    category: 'Anatomy',
    slides: [
      {
        id: 'ea1',
        title: 'The Cornea: The Window of Focus',
        content: 'The cornea provides about 2/3 of the eye\'s refractive power. Its shape determines whether a patient has astigmatism. It must be clear and healthy for sharp vision.',
        imageUrl: 'https://picsum.photos/seed/anatomy1/1200/800'
      },
      {
        id: 'ea2',
        title: 'The Iris & Pupil: Light Control',
        content: 'The iris is the colored muscle that regulates the size of the pupil. A properly functioning iris ensures the right amount of light reaches the retina for optimal image processing.',
        imageUrl: 'https://picsum.photos/seed/anatomy2/1200/800'
      },
      {
        id: 'ea3',
        title: 'The Crystalline Lens & Accommodation',
        content: 'The lens fine-tunes focus. Accommodation allows us to see near objects. As we age, the lens loses elasticity, resulting in Presbyopia and the eventually need for PALs or bifocals.',
        imageUrl: 'https://picsum.photos/seed/anatomy3/1200/800'
      },
      {
        id: 'ea4',
        title: 'The Retina: Capturing the Image',
        content: 'The retina is light-sensitive tissue containing rods and cones. Light signals are converted here into electrical impulses. The macula provides sharp, central vision for reading and detail work.',
        imageUrl: 'https://picsum.photos/seed/anatomy4/1200/800'
      },
      {
        id: 'ea5',
        title: 'The Optic Nerve: The Visual Pipeline',
        content: 'The optic nerve carries impulses from the retina to the brain\'s visual cortex. Damage to the optic nerve (e.g., from glaucoma) can lead to permanent, irreversible vision loss.',
        imageUrl: 'https://picsum.photos/seed/anatomy5/1200/800'
      }
    ],
    quiz: { questions: generateMockQuestions(5, 'Anatomy') }
  }
];
