import { courseImages, instructorImages } from './mockData';

// Additional courses organized by the categories from our Categories component
export const categoryCourses = [
  // Programming Courses
  {
    id: 101,
    title: 'Python for Beginners: Zero to Hero',
    description: 'Start your programming journey with Python, one of the most beginner-friendly and versatile programming languages. Learn fundamentals, data structures, and build real projects.',
    instructor: 'John Doe',
    instructorId: 1,
    price: 49.99,
    rating: 4.7,
    students: 3456,
    image: courseImages.programming,
    thumbnail: courseImages.programming,
    duration: 28,
    language: 'English',
    category: 'Programming',
    lessons: [
      { id: 1, title: "Python Basics", duration: "30:00", videoUrl: "#" },
      { id: 2, title: "Data Structures", duration: "45:00", videoUrl: "#" },
      { id: 3, title: "Functions and OOP", duration: "50:00", videoUrl: "#" },
      { id: 4, title: "Building Your First App", duration: "60:00", videoUrl: "#" }
    ]
  },
  {
    id: 102,
    title: 'JavaScript Mastery: Modern ES6+ Features',
    description: 'Take your JavaScript skills to the next level by mastering modern ES6+ features, async programming, and advanced concepts used in today\'s web development.',
    instructor: 'Sarah Wilson',
    instructorId: 4,
    price: 59.99,
    rating: 4.8,
    students: 2187,
    image: courseImages.webDev,
    thumbnail: courseImages.webDev,
    duration: 32,
    language: 'English',
    category: 'Programming',
    lessons: [
      { id: 1, title: "ES6 Fundamentals", duration: "40:00", videoUrl: "#" },
      { id: 2, title: "Promises and Async/Await", duration: "35:00", videoUrl: "#" },
      { id: 3, title: "Modules and Bundlers", duration: "45:00", videoUrl: "#" }
    ]
  },
  {
    id: 103,
    title: 'Data Structures and Algorithms in Java',
    description: 'Master the core computer science concepts with this comprehensive course on data structures and algorithms using Java. Perfect for interview preparation.',
    instructor: 'Mike Johnson',
    instructorId: 3,
    price: 69.99,
    rating: 4.9,
    students: 1876,
    image: courseImages.programming,
    thumbnail: courseImages.programming,
    duration: 45,
    language: 'English',
    category: 'Programming',
    lessons: [
      { id: 1, title: "Arrays and Strings", duration: "50:00", videoUrl: "#" },
      { id: 2, title: "Linked Lists and Trees", duration: "60:00", videoUrl: "#" },
      { id: 3, title: "Sorting Algorithms", duration: "55:00", videoUrl: "#" },
      { id: 4, title: "Dynamic Programming", duration: "70:00", videoUrl: "#" }
    ]
  },

  // Design Courses
  {
    id: 201,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of effective user interface and user experience design. Create beautiful, functional designs that users will love.',
    instructor: 'Emily Chen',
    instructorId: 5,
    price: 54.99,
    rating: 4.7,
    students: 2345,
    image: courseImages.uiux,
    thumbnail: courseImages.uiux,
    duration: 30,
    language: 'English',
    category: 'Design',
    lessons: [
      { id: 1, title: "Design Principles", duration: "35:00", videoUrl: "#" },
      { id: 2, title: "User Research", duration: "40:00", videoUrl: "#" },
      { id: 3, title: "Wireframing and Prototyping", duration: "50:00", videoUrl: "#" }
    ]
  },
  {
    id: 202,
    title: 'Adobe Photoshop Masterclass',
    description: 'Master Adobe Photoshop from beginner to advanced levels. Learn photo editing, digital art, and graphic design techniques used by professionals.',
    instructor: 'David Brown',
    instructorId: 6,
    price: 49.99,
    rating: 4.8,
    students: 3210,
    image: courseImages.uiux,
    thumbnail: courseImages.uiux,
    duration: 35,
    language: 'English',
    category: 'Design',
    lessons: [
      { id: 1, title: "Photoshop Basics", duration: "45:00", videoUrl: "#" },
      { id: 2, title: "Photo Retouching", duration: "50:00", videoUrl: "#" },
      { id: 3, title: "Digital Art Techniques", duration: "60:00", videoUrl: "#" }
    ]
  },
  {
    id: 203,
    title: 'Web Design: Create Modern Responsive Websites',
    description: 'Learn to design beautiful, responsive websites using modern design principles, HTML, CSS, and design tools like Figma.',
    instructor: 'Jane Smith',
    instructorId: 2,
    price: 59.99,
    rating: 4.6,
    students: 1987,
    image: courseImages.webDev,
    thumbnail: courseImages.webDev,
    duration: 32,
    language: 'English',
    category: 'Design',
    lessons: [
      { id: 1, title: "Design Principles for Web", duration: "40:00", videoUrl: "#" },
      { id: 2, title: "Responsive Design", duration: "45:00", videoUrl: "#" },
      { id: 3, title: "CSS Grid and Flexbox", duration: "50:00", videoUrl: "#" }
    ]
  },

  // Business Courses
  {
    id: 301,
    title: 'Entrepreneurship: Start Your Business from Scratch',
    description: 'Learn how to turn your idea into a successful business. This course covers business planning, marketing, finance, and growth strategies.',
    instructor: 'David Brown',
    instructorId: 6,
    price: 69.99,
    rating: 4.8,
    students: 2156,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
    duration: 40,
    language: 'English',
    category: 'Business',
    lessons: [
      { id: 1, title: "Idea Validation", duration: "45:00", videoUrl: "#" },
      { id: 2, title: "Business Planning", duration: "50:00", videoUrl: "#" },
      { id: 3, title: "Marketing Strategies", duration: "55:00", videoUrl: "#" },
      { id: 4, title: "Funding and Growth", duration: "60:00", videoUrl: "#" }
    ]
  },
  {
    id: 302,
    title: 'Digital Marketing Mastery',
    description: 'Master digital marketing channels including social media, SEO, email marketing, and paid advertising to grow your business online.',
    instructor: 'Sarah Wilson',
    instructorId: 4,
    price: 59.99,
    rating: 4.7,
    students: 2876,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
    duration: 35,
    language: 'English',
    category: 'Business',
    lessons: [
      { id: 1, title: "Social Media Marketing", duration: "40:00", videoUrl: "#" },
      { id: 2, title: "SEO Fundamentals", duration: "45:00", videoUrl: "#" },
      { id: 3, title: "Email Marketing", duration: "35:00", videoUrl: "#" },
      { id: 4, title: "Paid Advertising", duration: "50:00", videoUrl: "#" }
    ]
  },

  // Personal Development Courses
  {
    id: 401,
    title: 'Productivity Masterclass: Time Management and Focus',
    description: 'Learn proven techniques to boost your productivity, manage your time effectively, and achieve more in less time.',
    instructor: 'Emily Chen',
    instructorId: 5,
    price: 39.99,
    rating: 4.9,
    students: 3456,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 25,
    language: 'English',
    category: 'Personal Development',
    lessons: [
      { id: 1, title: "Time Management Fundamentals", duration: "35:00", videoUrl: "#" },
      { id: 2, title: "Focus and Deep Work", duration: "40:00", videoUrl: "#" },
      { id: 3, title: "Goal Setting and Achievement", duration: "45:00", videoUrl: "#" }
    ]
  },
  {
    id: 402,
    title: 'Public Speaking and Presentation Skills',
    description: 'Overcome your fear of public speaking and learn to deliver powerful presentations that engage and persuade your audience.',
    instructor: 'John Doe',
    instructorId: 1,
    price: 49.99,
    rating: 4.7,
    students: 2187,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 30,
    language: 'English',
    category: 'Personal Development',
    lessons: [
      { id: 1, title: "Overcoming Speech Anxiety", duration: "30:00", videoUrl: "#" },
      { id: 2, title: "Structuring Your Presentation", duration: "40:00", videoUrl: "#" },
      { id: 3, title: "Engaging Your Audience", duration: "35:00", videoUrl: "#" },
      { id: 4, title: "Visual Aids and Body Language", duration: "45:00", videoUrl: "#" }
    ]
  },

  // Languages Courses
  {
    id: 501,
    title: 'Spanish for Beginners: Complete Course',
    description: 'Learn Spanish from scratch with this comprehensive course covering vocabulary, grammar, pronunciation, and conversation skills.',
    instructor: 'Mike Johnson',
    instructorId: 3,
    price: 44.99,
    rating: 4.8,
    students: 2876,
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
    duration: 45,
    language: 'English',
    category: 'Languages',
    lessons: [
      { id: 1, title: "Basic Vocabulary and Phrases", duration: "40:00", videoUrl: "#" },
      { id: 2, title: "Grammar Fundamentals", duration: "50:00", videoUrl: "#" },
      { id: 3, title: "Conversation Practice", duration: "45:00", videoUrl: "#" },
      { id: 4, title: "Reading and Writing", duration: "40:00", videoUrl: "#" }
    ]
  },
  {
    id: 502,
    title: 'Mandarin Chinese: From Zero to Conversational',
    description: 'Start speaking Mandarin Chinese with this practical course focused on real-world conversation, pronunciation, and essential characters.',
    instructor: 'Emily Chen',
    instructorId: 5,
    price: 59.99,
    rating: 4.9,
    students: 1876,
    image: 'https://images.unsplash.com/photo-1493856160824-36c8b5c8471a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1493856160824-36c8b5c8471a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 50,
    language: 'English',
    category: 'Languages',
    lessons: [
      { id: 1, title: "Pronunciation and Tones", duration: "45:00", videoUrl: "#" },
      { id: 2, title: "Essential Vocabulary", duration: "50:00", videoUrl: "#" },
      { id: 3, title: "Basic Characters", duration: "55:00", videoUrl: "#" },
      { id: 4, title: "Everyday Conversations", duration: "60:00", videoUrl: "#" }
    ]
  },

  // Health & Fitness Courses
  {
    id: 601,
    title: 'Complete Home Workout: No Equipment Needed',
    description: 'Get fit at home with this comprehensive workout program that requires no equipment. Perfect for beginners and intermediate fitness levels.',
    instructor: 'Sarah Wilson',
    instructorId: 4,
    price: 39.99,
    rating: 4.8,
    students: 3456,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 35,
    language: 'English',
    category: 'Health & Fitness',
    lessons: [
      { id: 1, title: "Beginner Workout Routine", duration: "40:00", videoUrl: "#" },
      { id: 2, title: "Intermediate Strength Training", duration: "45:00", videoUrl: "#" },
      { id: 3, title: "HIIT Cardio Workouts", duration: "35:00", videoUrl: "#" },
      { id: 4, title: "Flexibility and Recovery", duration: "30:00", videoUrl: "#" }
    ]
  },
  {
    id: 602,
    title: 'Nutrition Masterclass: Eat for Health and Fitness',
    description: 'Learn the science of nutrition and how to create a balanced diet that supports your health and fitness goals.',
    instructor: 'David Brown',
    instructorId: 6,
    price: 49.99,
    rating: 4.7,
    students: 2187,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 30,
    language: 'English',
    category: 'Health & Fitness',
    lessons: [
      { id: 1, title: "Nutrition Fundamentals", duration: "45:00", videoUrl: "#" },
      { id: 2, title: "Meal Planning", duration: "40:00", videoUrl: "#" },
      { id: 3, title: "Nutrition for Fitness", duration: "50:00", videoUrl: "#" },
      { id: 4, title: "Healthy Cooking Techniques", duration: "55:00", videoUrl: "#" }
    ]
  },

  // Music Courses
  {
    id: 701,
    title: 'Guitar for Beginners: From Zero to Playing Songs',
    description: 'Learn to play guitar from scratch with this step-by-step course. No prior musical experience needed.',
    instructor: 'John Doe',
    instructorId: 1,
    price: 44.99,
    rating: 4.8,
    students: 2876,
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 40,
    language: 'English',
    category: 'Music',
    lessons: [
      { id: 1, title: "Guitar Basics", duration: "35:00", videoUrl: "#" },
      { id: 2, title: "Chords and Strumming", duration: "45:00", videoUrl: "#" },
      { id: 3, title: "Playing Your First Songs", duration: "50:00", videoUrl: "#" },
      { id: 4, title: "Basic Music Theory", duration: "40:00", videoUrl: "#" }
    ]
  },
  {
    id: 702,
    title: 'Music Production with Ableton Live',
    description: 'Learn music production from scratch using Ableton Live. Create beats, mix tracks, and produce professional-sounding music.',
    instructor: 'Mike Johnson',
    instructorId: 3,
    price: 59.99,
    rating: 4.9,
    students: 1876,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 45,
    language: 'English',
    category: 'Music',
    lessons: [
      { id: 1, title: "Ableton Live Basics", duration: "40:00", videoUrl: "#" },
      { id: 2, title: "Beat Making", duration: "50:00", videoUrl: "#" },
      { id: 3, title: "Mixing and Mastering", duration: "55:00", videoUrl: "#" },
      { id: 4, title: "Finishing Your First Track", duration: "60:00", videoUrl: "#" }
    ]
  },

  // Photography Courses
  {
    id: 801,
    title: 'Digital Photography Masterclass',
    description: 'Master the art of digital photography. Learn camera settings, composition, lighting, and post-processing techniques.',
    instructor: 'Jane Smith',
    instructorId: 2,
    price: 49.99,
    rating: 4.8,
    students: 3210,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 35,
    language: 'English',
    category: 'Photography',
    lessons: [
      { id: 1, title: "Camera Basics", duration: "40:00", videoUrl: "#" },
      { id: 2, title: "Composition Techniques", duration: "45:00", videoUrl: "#" },
      { id: 3, title: "Lighting Fundamentals", duration: "50:00", videoUrl: "#" },
      { id: 4, title: "Photo Editing", duration: "55:00", videoUrl: "#" }
    ]
  },
  {
    id: 802,
    title: 'Smartphone Photography: Take Pro-Quality Photos',
    description: 'Learn to take stunning photos with just your smartphone. Master composition, lighting, editing, and creative techniques.',
    instructor: 'Emily Chen',
    instructorId: 5,
    price: 39.99,
    rating: 4.7,
    students: 2456,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80',
    duration: 25,
    language: 'English',
    category: 'Photography',
    lessons: [
      { id: 1, title: "Smartphone Camera Basics", duration: "30:00", videoUrl: "#" },
      { id: 2, title: "Composition for Mobile", duration: "35:00", videoUrl: "#" },
      { id: 3, title: "Mobile Editing Apps", duration: "40:00", videoUrl: "#" },
      { id: 4, title: "Creative Smartphone Techniques", duration: "45:00", videoUrl: "#" }
    ]
  }
];
