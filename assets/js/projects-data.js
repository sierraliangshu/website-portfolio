window.PROJECTS_DATA = [
  {
    id: "millennium-falcon",
    title: "Millennium Falcon Model",
    category: "CAD & Design",
    summary: "A gift-focused CAD and fabrication build that translated complex geometry into a printable, high-detail model.",
    details:
      "This personal project combined CAD modeling in OnShape with additive manufacturing on a Prusa 3D printer. The main challenge was preserving recognizable geometry and fine details while creating a structure suitable for fabrication and printing.",
    highlights: [
      "Modeled in OnShape with printability in mind",
      "Fabricated on a Prusa 3D printer",
      "Focused on detail retention and manufacturable geometry"
    ],
    media: [
      { type: "image", src: "assets/media/projects/millennium-falcon-cad.png", alt: "Millennium Falcon CAD model render" },
      { type: "image", src: "assets/media/projects/millennium-falcon-print.jpg", alt: "3D printed Millennium Falcon model" }
    ],
    links: []
  },
  {
    id: "claw-clip",
    title: "Bio-Inspired Claw Clip",
    category: "CAD & Design",
    summary: "A design concept inspired by biological gripping systems and the mechanical elegance of simple compliant motion.",
    details:
      "This project explored how natural gripping mechanisms can inform compact, functional engineered devices. The concept focused on combining biological inspiration with mechanical design thinking in a form that could translate to wearable or medical device applications.",
    highlights: [
      "Biology-informed mechanical concept",
      "Explored simple gripping behavior through form and motion",
      "Relevant to wearable and medical device design"
    ],
    media: [
      { type: "image", src: "assets/media/projects/claw-clip-cad.png", alt: "CAD image of bio-inspired claw clip" },
      { type: "image", src: "assets/media/projects/claw-clip-prototype.jpg", alt: "Prototype photo of bio-inspired claw clip" }
    ],
    links: []
  },
  {
    id: "truss-simulation",
    title: "Truss Failure Simulation",
    category: "Code & AI",
    summary: "A MATLAB simulation predicting truss member buckling, validated by physical testing of an acrylic-and-tape prototype.",
    details:
      "The simulation analyzed force distribution in a truss structure and predicted the member most likely to fail first due to buckling. The model was then validated experimentally by constructing and testing the truss physically, with the observed failure behavior matching the simulation output.",
    highlights: [
      "Built in MATLAB",
      "Predicted first buckling failure member",
      "Validated through physical experiment with matching results"
    ],
    media: [
      { type: "image", src: "assets/media/projects/truss-design.png", alt: "Truss design image" },
      { type: "image", src: "assets/media/projects/truss-test.png", alt: "Physical truss failure validation test" }
    ],
    links: []
  },
  {
    id: "ai4all-covid",
    title: "AI4ALL – COVID-19 X-Ray Classification",
    category: "Code & AI",
    summary: "An early medical imaging AI project using VGG16 and VGG19 to classify chest X-rays as COVID-positive or negative.",
    details:
      "This project explored deep learning for medical diagnostics through chest X-ray classification. It included train, validation, and test dataset splitting, data augmentation through rotation, flipping, and scaling, and hyperparameter experimentation across model architectures. VGG16 achieved strong test accuracy, demonstrating the promise of AI for diagnostic support.",
    highlights: [
      "Used VGG16 and VGG19 architectures",
      "Included augmentation and controlled data splits",
      "Reserved space for graphs, figures, and performance comparison"
    ],
    media: [
      { type: "image", src: "assets/media/projects/ai4all-data.png", alt: "AI4ALL project data and graph figure" },
      { type: "image", src: "assets/media/projects/ai4all-covid.jpeg", alt: "COVID-positive X-ray example" },
      { type: "image", src: "assets/media/projects/ai4all-normal.jpeg", alt: "Normal X-ray example" }
    ],
    links: []
  },
  {
    id: "bluegait",
    title: "BlueGait – Gait Tracking Device",
    category: "Hardware / Systems",
    summary: "A wearable rehabilitation support system that detects heel and toe strikes and provides real-time visual and haptic feedback.",
    details:
      "BlueGait was designed to support stroke rehabilitation by detecting gait events and relaying them wirelessly for real-time feedback. The system used force-sensitive resistors in voltage divider circuits, Arduino Nano control, Bluetooth communication between foot and arm modules, RGB LEDs for visual feedback, and vibration motors for haptic cues.",
    highlights: [
      "Designed housings for ankle and arm units",
      "Integrated FSR sensing, Arduino Nano control, and Bluetooth communication",
      "Used RGB LEDs and vibration motors to support users with reduced sensation"
    ],
    media: [
      { type: "image", src: "assets/media/projects/gait-components.png", alt: "All gait tracker components" },
      { type: "image", src: "assets/media/projects/gait-ankle-component.jpg", alt: "Ankle component of gait tracker" },
      { type: "image", src: "assets/media/projects/gait-arm-component.jpg", alt: "Arm component of gait tracker" },
      { type: "image", src: "assets/media/projects/gait-ankle-circuit.png", alt: "Ankle circuit diagram" },
      { type: "image", src: "assets/media/projects/gait-arm-circuit.png", alt: "Arm band circuit diagram" },
      { type: "image", src: "assets/media/projects/gait-code-diagram.jpg", alt: "Code and system diagram for gait tracker" },
      { type: "image", src: "assets/media/projects/gait-glass-box.jpg", alt: "Glass box analysis for gait tracker" },
      { type: "image", src: "assets/media/projects/gait-demo.jpg", alt: "Demonstration of how to wear gait tracker" },
      {
        type: "video",
        src: "assets/media/projects/gait-demo-video.mp4",
        alt: "BlueGait demonstration video"
      }
    ],
    links: []
  },
  {
    id: "emg-system",
    title: "EMG-Controlled System",
    category: "Hardware / Systems",
    summary: "A surface EMG system that amplified, filtered, and interpreted muscle activation to drive real-time motion.",
    details:
      "This system was built to detect surface electromyography signals, process them using Arduino, and convert the signal into mechanical output with a servo motor and OLED display. The analog front-end was designed for amplification and filtering, and the project demonstrated the feasibility of real-time myoelectric control.",
    highlights: [
      "Designed analog front-end for amplification and filtering",
      "Processed EMG signals with Arduino and controlled a servo",
      "Reached approximately 28 dB SNR and roughly 80% detection accuracy"
    ],
    media: [
      { type: "image", src: "assets/media/projects/emg-circuit.png", alt: "EMG circuit diagram" },
      { type: "image", src: "assets/media/projects/emg-ltspice.png", alt: "LTspice simulation for EMG system" }
    ],
    links: [
      { label: "Project Report", href: "assets/media/projects/emg-report.pdf" }
    ]
  },
  {
    id: "medtronic",
    title: "Medtronic – Surgical Robotics Computer Vision Intern",
    category: "Research & Professional",
    summary: "Research and development work on computer vision for robotic-assisted surgery, centered on 6D pose estimation.",
    details:
      "On the Surgical Robotics R&D team, this work focused on extending GDR-Net to support SO-Pose, enabling improved 6D pose estimation with self-occlusion reasoning. The project centered on inferring 3D geometry from 2D visual data in a medical robotics context. Specific implementation details are limited due to confidentiality.",
    highlights: [
      "Extended GDR-Net architecture to support SO-Pose",
      "Worked on self-occlusion-aware 6D pose estimation",
      "Applied Python and deep learning in medical robotics"
    ],
    media: [
      { type: "image", src: "assets/media/projects/medtronic-me.png", alt: "Sierra Robison during Medtronic internship presentation" },
      { type: "image", src: "assets/media/projects/medtronic-hugo.jpg", alt: "Medtronic Hugo robotic-assisted surgery system" }
    ],
    links: [
      {
        label: "GDR-Net Paper",
        href: "https://openaccess.thecvf.com/content/CVPR2021/papers/Wang_GDR-Net_Geometry-Guided_Direct_Regression_Network_for_Monocular_6D_Object_Pose_CVPR_2021_paper.pdf"
      },
      {
        label: "SO-Pose Paper",
        href: "https://openaccess.thecvf.com/content/ICCV2021/papers/Di_SO-Pose_Exploiting_Self-Occlusion_for_Direct_6D_Pose_Estimation_ICCV_2021_paper.pdf"
      }
    ]
  },
  {
    id: "statics-la",
    title: "Statics Learning Assistant + Educational Research",
    category: "Research & Professional",
    summary: "Instructional support in statics combined with educational content creation and evidence-based reflection on student learning.",
    details:
      "As a learning assistant, this role centered on helping students strengthen conceptual understanding and problem-solving in statics. It also included creating a midterm review video and collecting feedback showing that every student who watched it found it helpful, reflecting a strong interest in engineering education and teaching methodology.",
    highlights: [
      "Supported statics problem-solving and conceptual learning",
      "Created a midterm review video",
      "Reported 100% helpfulness among students who watched it"
    ],
    media: [
      { type: "image", src: "assets/media/projects/la-expo-me.png", alt: "Learning assistant expo image" },
      {
        type: "embed",
        embedUrl: "https://www.youtube.com/embed/ZgiPOTkKmyE",
        alt: "Statics review video"
      }
    ],
    links: [
      { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=ZgiPOTkKmyE" }
    ]
  },
  {
    id: "epic-lab",
    title: "EPIC Lab Projects",
    category: "Research & Professional",
    summary: "Fabrication and lab support projects spanning topographical modeling, 3D scanning, rapid prototyping, and workflow tracking.",
    details:
      "At the Engineering Product Innovation Center, these projects included creating a layered topographical map of Boston University from satellite elevation data, scanning and reproducing a cordless drill through both 3D printing and laser-cut assembly, and building a spreadsheet-based task tracking system to improve coordination among lab assistants.",
    highlights: [
      "Created a layered topographical map using Slicer for Fusion 360 and laser cutting",
      "Used professional 3D scanning for drill digitization and reproduction",
      "Built a spreadsheet-based task tracking system for lab collaboration"
    ],
    media: [
      { type: "image", src: "assets/media/projects/topography-map.png", alt: "Laser cut topographical map of Boston University" },
      { type: "image", src: "assets/media/projects/drill-reproduction.png", alt: "Scanned drill with laser cut and 3D printed reproductions" },
      { type: "image", src: "assets/media/projects/drill-scan-model.png", alt: "3D scanning software model of drill" },
      { type: "video", src: "assets/media/projects/task-tracking.mov", alt: "Screen recording of task tracking system" }
    ],
    links: []
  }
];
