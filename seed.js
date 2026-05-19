const mongoose = require('mongoose');
require('dotenv').config();

const Aircraft = require('./models/Aircraft');
const Lesson   = require('./models/Lesson');

const aircraft = [
  {
    name: 'Airbus A320',
    slug: 'airbus-a320',
    status: 'available',
    description: 'Learn the basic virtual flight flow of the Airbus A320, from aircraft preparation to landing.',
    imagePath: 'assets/logo-blue.png',
    order: 1
  },
  {
    name: 'Boeing 737',
    slug: 'boeing-737',
    status: 'coming-soon',
    order: 2
  }
];

const lessons = [
  {
    aircraftSlug: 'airbus-a320',
    lessonKey:    'aircraft-preparation',
    title:        'Aircraft Preparation',
    description:  'Learn the basic setup steps before starting your virtual Airbus A320 flight.',
    checklist: [
      'Turn on Battery 1 and Battery 2',
      'Connect the External GPU (Ground Power Unit)',
      'Set all ADIRS (Air Data Inertial Reference Systems) to NAV',
      'Set the external lights as needed',
      'Check the fuel quantity on the ECAM'
    ],
    videoPath: '',
    order: 1,
    isActive: true
  },
  {
    aircraftSlug: 'airbus-a320',
    lessonKey:    'flight-planning',
    title:        'Flight Planning',
    description:  'Plan your virtual route using SimBrief and enter it into the MCDU before departure.',
    checklist: [
      'Generate a flight plan on SimBrief',
      'Open the MCDU and go to INIT page',
      'Enter your departure and destination airports',
      'Load your route into the MCDU',
      'Set your cruise altitude and cost index',
      'Check fuel requirements and review the weather'
    ],
    videoPath: '',
    order: 2,
    isActive: true
  },
  {
    aircraftSlug: 'airbus-a320',
    lessonKey:    'taxiing',
    title:        'Taxiing',
    description:  'Learn how to safely move the aircraft from the gate to the runway.',
    checklist: [
      'Request pushback clearance from ground crew',
      'Release the parking brake after pushback',
      'Start engines during or after pushback',
      'Follow the taxi route on your airport chart',
      'Keep taxi speed below 30 knots',
      'Check for crossing traffic at intersections'
    ],
    videoPath: '',
    order: 3,
    isActive: true
  },
  {
    aircraftSlug: 'airbus-a320',
    lessonKey:    'takeoff',
    title:        'Takeoff',
    description:  'Perform a proper takeoff sequence including thrust settings and rotation.',
    checklist: [
      'Line up on the runway centerline',
      'Set TOGA thrust by pushing the throttle forward',
      'Monitor your speed — listen for V1, VR, and V2 callouts',
      'Pull back on the sidestick at VR to rotate',
      'Confirm positive climb on the altimeter',
      'Retract the landing gear after positive climb',
      'Follow the SID departure procedure'
    ],
    videoPath: '',
    order: 4,
    isActive: true
  },
  {
    aircraftSlug: 'airbus-a320',
    lessonKey:    'cruise',
    title:        'Cruise',
    description:  'Manage the aircraft during cruise phase including autopilot and systems monitoring.',
    checklist: [
      'Engage the autopilot after reaching a safe altitude',
      'Set your cruise altitude in the FCU',
      'Switch to managed speed mode',
      'Monitor fuel quantity and system status on the ECAM',
      'Check the MCDU progress page periodically',
      'Stay aware of weather along your route'
    ],
    videoPath: '',
    order: 5,
    isActive: true
  },
  {
    aircraftSlug: 'airbus-a320',
    lessonKey:    'approach-and-landing',
    title:        'Approach and Landing',
    description:  'Set up the approach and perform a safe landing at your destination.',
    checklist: [
      'Load the arrival procedure and approach into the MCDU',
      'Set your approach speed in the FCU',
      'Deploy flaps on schedule as speed decreases',
      'Extend the landing gear below 2500 feet AGL',
      'Arm spoilers and set autobrake',
      'Aim for a stable approach — on speed, on glidepath',
      'Touch down smoothly near the centerline'
    ],
    videoPath: '',
    order: 6,
    isActive: true
  },
  {
    aircraftSlug: 'airbus-a320',
    lessonKey:    'shutdown',
    title:        'Shutdown',
    description:  'Complete the shutdown sequence after arriving at the gate.',
    checklist: [
      'Taxi to the assigned gate or ramp',
      'Set parking brake',
      'Turn off landing lights',
      'Shut down engines',
      'Turn off seatbelt signs',
      'Switch external power on if available',
      'Secure aircraft systems'
    ],
    videoPath: '',
    order: 7,
    isActive: true
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Seed aircraft
    await Aircraft.deleteMany({});
    await Aircraft.insertMany(aircraft);
    console.log('Seeded', aircraft.length, 'aircraft');

    // Seed lessons
    await Lesson.deleteMany({ aircraftSlug: 'airbus-a320' });
    await Lesson.insertMany(lessons);
    console.log('Seeded', lessons.length, 'lessons');

    mongoose.disconnect();
    console.log('Done.');
  })
  .catch(err => {
    console.error('Seed error:', err.message);
    process.exit(1);
  });
